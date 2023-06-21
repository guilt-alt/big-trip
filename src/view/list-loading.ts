import { createElement } from 'utils/render';

const createLoading = () => '<p class="trip-events__msg">Loading...</p>';

export default class ListLoading {
  #element: Element | null = null;

  #createLoading: string = createLoading();

  get Template() {
    return this.#createLoading;
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
