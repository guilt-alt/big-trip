import { createElement } from 'utils/render';

const createMenu = (): string => (
  `<div>
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs trip-tabs">
      <a class="trip-tabs__btn trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>
  </div>`
);

export default class Menu {
  #element: Element | null = null;

  #createMenu: string = createMenu();

  get Template() {
    return this.#createMenu;
  }

  get Element() {
    if (!this.#element) {
      this.#element = createElement(this.Template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
