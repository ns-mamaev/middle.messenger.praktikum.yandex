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

  constructor(tagName = 'div', propsAndChildren = {}) {
    const { children, props } = this._getPropsAndChildren(propsAndChildren);

    this.children = this._makePropsProxy(children);

    this._meta = {
      tagName,
      props,
    };

    this._id = makeUUID();

    this.props = this._makePropsProxy({ ...props, _id: this._id });

    this.eventBus = new EventBus();

    this._registerEvents(this.eventBus);

    this.eventBus.emit(Component.EVENTS.INIT);
  }

  _getPropsAndChildren(propsAndChildren) {
    const children = {};
    const props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Component) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  _setAttributes() {
    const { attr = {} } = this.props;

    Object.entries(attr).forEach(([key, value]) => {
      this._element.setAttribute(key, value);
    });
  }

  protected compile(templator, props) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id=${child._id}></div>`;
    });

    const fragment = this._createDocumentElement('template');

    fragment.innerHTML = templator(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      stub.replaceWith(child.getContent());
    });

    return fragment.content;
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
          this._shouldUpdate = true;
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

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  private _init() {
    this._createResources();

    this.init();

    this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });

    this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
  }

  componentDidMount(oldProps = {}) {}

  public dispatchComponentDidMount() {
    this.eventBus.emit(Component.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => child.dispatchComponentDidMount());
  }

  private _componentDidUpdate(oldProps, newProps) {
    const responce = this.componentDidUpdate(oldProps, newProps);
    if (responce) {
      this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  setProps = (nextProps) => {
    if (!nextProps) {
      return;
    }

    this._shouldUpdate = false;
    const oldProps = { ...this.props };
    const { children, props } = this._getPropsAndChildren(nextProps);

    if (Object.values(children).length) {
      Object.assign(this.children, children);
    }

    if (Object.values(props).length) {
      Object.assign(this.props, props);
    }

    if (this._shouldUpdate) {
      this.eventBus.emit(Component.EVENTS.FLOW_CDU, oldProps, nextProps);
      this._shouldUpdate = false;
    }
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const element = this.render();
    this._removeEvents();
    this._element.innerHTML = '';
    this._element.appendChild(element);
    this._addEvents();
    this._setAttributes();
  }

  protected render() {}

  _addEvents() {
    const { events = {} } = this.props as { events: Record<string, () => void> };

    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
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
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}
