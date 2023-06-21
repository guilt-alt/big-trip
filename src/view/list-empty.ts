import { createElement } from 'utils/render';

const createEmptyList = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class ListEmpty {
  #element: Element | null = null;

  #createEmptyList: string = createEmptyList();

  get Template() {
    return this.#createEmptyList;
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
