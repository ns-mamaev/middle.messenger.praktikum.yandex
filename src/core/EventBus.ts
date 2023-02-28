type EventListener = (...args: any) => void;

export default class EventBus {
  private listeners: Record<string, EventListener[]>;

  constructor() {
    this.listeners = {};
  }

  private checkEvent(event: string) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
  }

  public attach(event: string, callback: EventListener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  public detach(event: string, callback: EventListener) {
    this.checkEvent(event);
    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  public emit(event: string, ...args: any) {
    this.checkEvent(event);
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
