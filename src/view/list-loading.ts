import AbstractView from 'types/classes/abstract-view';

const createLoading = () => '<p class="trip-events__msg">Loading...</p>';

export default class ListLoading extends AbstractView {
  #staticTemplate: string = createLoading();

  get template() {
    return this.#staticTemplate;
  }
}
