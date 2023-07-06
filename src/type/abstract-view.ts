type ICallback = {
  [key: string]: Function;
};

export default abstract class AbstractView {
  protected callback: ICallback = {};

  #element: Element | null = null;

  #newElement: HTMLDivElement = document.createElement('div');

  constructor() {
    if (new.target === AbstractView) {
      throw Error('Can\'t instantiate AbstractView, only concrete one.');
    }
  }

  abstract get template(): string;

  get element(): Element {
    if (!this.#element) {
      this.#element = this.#createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }

  #createElement(template: string): Element {
    this.#newElement.innerHTML = template;

    return this.#newElement.firstElementChild as Element;
  }
}
