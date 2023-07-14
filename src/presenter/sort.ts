import NavigationModel from 'model/navigation';

import SortVeiw from 'view/sort';

import { SortType, UpdateType } from 'types/enums';
import { render, replace, remove } from 'utils/render';

export default class Sort {
  #sortView: SortVeiw | null = null;

  #current: SortType;

  #container: Element;

  #navModel: NavigationModel;

  constructor(container: Element, navModel: NavigationModel) {
    this.#container = container;
    this.#navModel = navModel;
    this.#current = navModel.sort;

    this.#navModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderSort();
  }

  #renderSort() {
    this.#current = this.#navModel.sort;
    const prevSortView = this.#sortView;

    this.#sortView = new SortVeiw(this.#current);
    this.#sortView.changeSortHandler = this.#handleTypeChange;

    if (!prevSortView) {
      render(this.#container, this.#sortView, 'beforeend');
      return;
    }

    replace(prevSortView, this.#sortView);
    remove(prevSortView);
  }

  #handleModelEvent = (updateType: UpdateType) => {
    switch (updateType) {
      case UpdateType.MINOR:
        this.#navModel.setSort(UpdateType.PATCH, SortType.DAY);
        break;
      default:
        this.init();
        break;
    }
  };

  #handleTypeChange = (sortType: SortType) => {
    if (this.#current === sortType) return;

    this.#navModel.setSort(UpdateType.PATCH, sortType);
  };
}
