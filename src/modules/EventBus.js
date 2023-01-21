export default class EventBus {
  constructor() {
    this.listeners = {};
  }

  _checkEvent(event) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event, callback) {
    this._checkEvent(event);
    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  emit(event, ...args) {
    this._checkEvent(event);
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
