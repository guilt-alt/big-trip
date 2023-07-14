import AbstractView from 'types/classes/abstract-view';
import { SortType } from 'types/enums';

const createSort = (currentSort: SortType): string => {
  const sortList = Object.entries(SortType).map(([key, value]) => (
    `<div class="trip-sort__item trip-sort__item--${key.toLowerCase()}">
      <input id="${value}" class="trip-sort__input visually-hidden" type="radio"
        name="trip-sort" value="${value}" ${value === currentSort ? 'checked' : ''}>
      <label class="trip-sort__btn" for="${value}">${key}</label>
    </div>`
  )).join('');

  return (
    `<form class="trip-events__trip-sort trip-sort" action="#" method="get">
      ${sortList}
    </form>`
  );
};

export default class Sort extends AbstractView {
  #currentSort: SortType;

  constructor(currentSort: SortType) {
    super();
    this.#currentSort = currentSort;
  }

  get template() {
    return createSort(this.#currentSort);
  }

  set changeSortHandler(callback: Function) {
    this.callback.sort = callback;

    this.element.addEventListener('change', this.#changeSortHandler);
  }

  #changeSortHandler = (e: Event) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;

    if (!this.callback.sort || target.tagName !== 'INPUT') return;

    this.callback.sort(target.value);
  };
}
