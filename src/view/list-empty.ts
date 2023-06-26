import AbstractView from 'type/view-classes';

const createEmptyList = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class ListEmpty extends AbstractView {
  #staticTemplate: string = createEmptyList();

  get template() {
    return this.#staticTemplate;
  }
}
