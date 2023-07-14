import NavigationModel from 'model/navigation';

import FiltersView from 'view/filters';

import { FilterType, UpdateType } from 'types/enums';
import { render, replace, remove } from 'utils/render';

export default class Filter {
  #filterView: FiltersView | null = null;

  #current: FilterType;

  #container: Element;

  #navModel: NavigationModel;

  constructor(container: Element, navModel: NavigationModel) {
    this.#container = container;
    this.#navModel = navModel;
    this.#current = navModel.filter;

    this.#navModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderFilter();
  }

  #renderFilter() {
    this.#current = this.#navModel.filter;
    const prevFilterView = this.#filterView;

    this.#filterView = new FiltersView(this.#current);
    this.#filterView.changeFilterTypeHandler = this.#handleFilterTypeChange;

    if (!prevFilterView) {
      render(this.#container, this.#filterView, 'afterend');
      return;
    }

    replace(prevFilterView, this.#filterView);
    remove(prevFilterView);
  }

  #handleModelEvent = (updateType: UpdateType) => {
    switch (updateType) {
      case UpdateType.MAJOR:
        this.#navModel.setFilter(UpdateType.MINOR, FilterType.EVERYTHING);
        break;
      default:
        this.init();
        break;
    }
  };

  #handleFilterTypeChange = (filterType: FilterType) => {
    if (this.#current === filterType) return;

    this.#navModel.setFilter(UpdateType.MINOR, filterType);
  };
}
