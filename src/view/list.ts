import { createElement } from 'utils/render';

const createList = (): string => '<ul class="trip-events__list"></ul>';

export default class TripList {
  #element: Element | null = null;

  #createList: string = createList();

  get Template() {
    return this.#createList;
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
