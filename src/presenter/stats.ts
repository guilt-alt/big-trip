import PointModel from 'model/point';
import NavigationModel from 'model/navigation';

import StatsView from 'view/stats';

import filter from 'utils/filter';
import { MenuType, UpdateType } from 'types/enums';
import { render, remove, replace } from 'utils/render';

export default class Stats {
  #container: HTMLElement;

  #pointModel: PointModel;

  #navModel: NavigationModel;

  #statsView: StatsView | null = null;

  constructor(container: HTMLElement, navModel: NavigationModel, pointModel: PointModel) {
    this.#container = container;
    this.#navModel = navModel;
    this.#pointModel = pointModel;

    this.#navModel.addObserver(this.#handleModelEvent);
    this.#pointModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#container.classList.remove('hidden');
    this.#renderStats();
  }

  destroy() {
    if (!this.#statsView) return;

    this.#container.classList.add('hidden');
    remove(this.#statsView);
    this.#statsView = null;
  }

  #getData() {
    const { points } = this.#pointModel;
    const { filter: filterType } = this.#navModel;

    return filter[filterType](points);
  }

  #handleModelEvent = (updateType: UpdateType) => {
    if (this.#navModel.page !== MenuType.STATS) return;

    switch (updateType) {
      case UpdateType.MAJOR:
        this.init();
        break;
      case UpdateType.MINOR:
        this.init();
        break;
      default:
    }
  };

  #renderStats() {
    const points = this.#getData();
    const prevStatsView = this.#statsView;

    this.#statsView = new StatsView(points);

    if (!prevStatsView) {
      render(this.#container, this.#statsView, 'beforeend');
      return;
    }

    replace(prevStatsView, this.#statsView);
    remove(prevStatsView);
  }
}
