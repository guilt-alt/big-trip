export default class Observer {
  #observers: Set<Function> = new Set();

  addObserver(observer: Function) {
    this.#observers.add(observer);
  }

  removeObserver(observer: Function) {
    this.#observers.delete(observer);
  }

  protected notify<T>(event: string, payload?: T) {
    this.#observers.forEach((observer) => observer(event, payload));
  }
}
