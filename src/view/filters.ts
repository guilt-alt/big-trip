import AbstractView from 'types/classes/abstract-view';
import { FilterType } from 'types/enums';

const createFilters = (current: FilterType): string => {
  const filtersList = Object.values(FilterType).map((type) => (
    `<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === current ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>`
  )).join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersList}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class Filters extends AbstractView {
  #current: FilterType;

  constructor(current: FilterType) {
    super();
    this.#current = current;
  }

  get template() {
    return createFilters(this.#current);
  }

  set changeFilterTypeHandler(callback: Function) {
    this.callback.change = callback;

    this.element.addEventListener('change', this.#changeFilterTypeHandler);
  }

  #changeFilterTypeHandler = (e: Event) => {
    if (!this.callback.change) return;

    const target = e.target as HTMLInputElement;

    if (target.tagName !== 'INPUT') return;

    this.callback.change(target.value);
  };
}
