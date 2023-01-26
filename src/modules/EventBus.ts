type EventListener = (...args: any) => void;

export default class EventBus {
  listeners: Record<string, EventListener[]>;

  constructor() {
    this.listeners = {};
  }

  _checkEvent(event: string) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
  }

  attach(event: string, callback: EventListener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  detach(event: string, callback: EventListener) {
    this._checkEvent(event);
    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  emit(event: string, ...args: any) {
    this._checkEvent(event);
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
