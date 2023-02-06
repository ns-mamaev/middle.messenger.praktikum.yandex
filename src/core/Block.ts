import { v4 as makeUUID } from 'uuid';
import EventBus from './EventBus';

type Props = object;

export default abstract class Block {
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

  constructor(tagName = 'div', props = {}) {
    this._meta = {
      tagName,
      props,
    };

    this._id = props?.settings?.withExternalID ? makeUUID() : null;

    this.props = this._makePropsProxy({ ...props, _id: this._id });

    this.eventBus = new EventBus();

    this._registerEvents(this.eventBus);
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  _makePropsProxy(props: Props) {
    const self = this;

    return new Proxy(props, {
      set(target, prop, value) {
        // @ts-ignore;
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;
        self.eventBus.emit(Block.EVENTS.FLOW_CDU);
        return true;
      },
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.attach(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.attach(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.attach(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.attach(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createDocumentElement(tagName: string): HTMLElement {
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

  init() {
    this._createResources();
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.componentDidMount();
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount(oldProps) {}

  dispatchComponentDidMount() {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps, newProps) {
    const responce = this.componentDidUpdate(oldProps, newProps);
    if (responce) {
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  setProps = (nextProps) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();
    console.log('render');
    this._removeEvents();
    this._element.innerHTML = block;
    this._addEvents();
  }

  render(): string {
    return '';
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;

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
