import Handlebars from 'Handlebars';
import { v4 as makeUUID } from 'uuid';
import EventBus from './EventBus';

type Props = object;

export default abstract class Component {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  _meta: {
    tagName: string;
    props: Props;
  };

  props: Props;

  private eventBus: EventBus;

  _element: HTMLElement;

  _id: string | null;

  children;

  _shouldUpdate = false;

  constructor(propsAndChildren = {}) {
    const { children, props } = this._getPropsAndChildren(propsAndChildren);

    this.children = this._makePropsProxy(children);

    this._id = makeUUID();

    this.props = this._makePropsProxy({ ...props, _id: this._id });

    this.eventBus = new EventBus();

    this._registerEvents(this.eventBus);

    this.eventBus.emit(Component.EVENTS.INIT);
  }

  _getPropsAndChildren(propsAndChildren) {
    const children: { [key: string]: Component | Component[] } = {};
    const props: { [key: string]: unknown } = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value) && value.every((item) => item instanceof Component)) {
        children[key] = value;
      }
      if (value instanceof Component) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  private createStub(child) {
    return `<div data-id="${child._id}"></div>`;
  }

  private replaceStub(child, fragment) {
    const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

    if (!stub) {
      return;
    }

    stub.replaceWith(child.getContent());
  }

  _makePropsProxy(props: Props) {
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        if (target[prop] !== value) {
          target[prop] = value;
        }
        return true;
      },
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.attach(Component.EVENTS.INIT, this._init.bind(this));
    eventBus.attach(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.attach(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.attach(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createDocumentElement(tagName: string) {
    const element = document.createElement(tagName);
    if (this._id) {
      element.setAttribute('data-id', this._id);
    }
    return element;
  }

  private _init() {
    this.init();

    this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount(oldProps = {}) {}

  public dispatchComponentDidMount() {
    this.eventBus.emit(Component.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((nestedChild) => nestedChild.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  private _componentDidUpdate(oldProps, newProps) {
    const responce = this.shouldComponentUpdate(oldProps, newProps);
    if (responce) {
      this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
    }
  }

  shouldComponentUpdate(oldProps, newProps) {
    return true;
  }

  setProps = (nextProps) => {
    if (!nextProps) {
      return;
    }

    const oldProps = { ...this.props };
    const { children, props } = this._getPropsAndChildren(nextProps);

    if (Object.values(children).length) {
      Object.assign(this.children, children);
    }

    if (Object.values(props).length) {
      Object.assign(this.props, props);
    }

    this.eventBus.emit(Component.EVENTS.FLOW_CDU, oldProps, nextProps);

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  protected compile(template: string) {
    const propsAndStubs = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map((nestedChild) => this.createStub(nestedChild));
      } else {
        propsAndStubs[key] = this.createStub(child);
      }
    });

    const fragment = this._createDocumentElement('template');

    const html = Handlebars.compile(template, this.props)(propsAndStubs);

    fragment.innerHTML = html;

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((nestedChild) => this.replaceStub(nestedChild, fragment));
      } else {
        this.replaceStub(child, fragment);
      }
    });

    return fragment.content;
  }

  _render() {
    const template = this.render();

    const fragment = this.compile(template);

    const element = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._element.replaceWith(element);
    }
    this._element = element;

    this._addEvents();
  }

  protected render() {}

  _addEvents() {
    const { events } = this.props as { events: Record<string, () => void> };

    if (events) {
      Object.entries(events).forEach(([node, events]) => {
        let element = this._element;
        if (node !== 'root') {
          element = this._element.querySelector(node);
        }
        Object.keys(events).forEach((eventName) => {
          element.addEventListener(eventName, events[eventName]);
        });
      });
    }
  }

  _removeEvents() {
    const { events = {} } = this.props as { events: Record<string, () => void> };

    Object.keys(events).forEach((eventName) => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  getContent() {
    return this.element;
  }

  show() {
    this.getContent().style.display = 'flex';
  }

  hide() {
    this.getContent().style.display = 'none';
  }

  protected changeEvtTarget() {}
}
