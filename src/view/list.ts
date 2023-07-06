import AbstractView from 'type/abstract-view';

const createList = (): string => '<ul class="trip-events__list"></ul>';

export default class TripList extends AbstractView {
  #staticTemplate: string = createList();

  get template() {
    return this.#staticTemplate;
  }
}
