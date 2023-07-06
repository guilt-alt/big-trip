import { IEvent } from 'type/interfaces';
import { SortType } from 'type/enums';

import SortView from 'view/sort';
import TripListView from 'view/list';
import EmptyListView from 'view/list-empty';

import PointPresenter from 'presenter/point';

import { render } from 'utils/render';
import { updateItem } from 'utils/common';
import { pointsByDuration, pointsByPrice } from 'utils/sort';

type ValueOf<T> = T[keyof T];

export default class Board {
  #sort: SortView = new SortView();

  #tripList: TripListView = new TripListView();

  #emptyList: EmptyListView = new EmptyListView();

  #points: IEvent[];

  #sourcedPoints: IEvent[];

  #container: Element;

  #currentSortType: SortType = SortType.DEFAULT;

  #pointPresenters: Map<ValueOf<IEvent>, PointPresenter> = new Map();

  constructor(container: Element, data: IEvent[]) {
    this.#container = container;
    this.#points = data.slice();
    this.#sourcedPoints = data;
  }

  init() {
    if (!this.#points) {
      this.#renderEmptyTripList();
      return;
    }

    this.#renderSort();
    this.#renderTripList();
    this.#renderPoints(this.#points);
  }

  #renderSort() {
    if (!this.#container) return;

    render(this.#container, this.#sort, 'beforeend');
    this.#sort.changeSortHandler = this.#handleSortChange;
  }

  #sortPoints(sortType: SortType) {
    switch (sortType) {
      case SortType.PRICE:
        this.#points.sort(pointsByPrice);
        break;
      case SortType.TIME:
        this.#points.sort(pointsByDuration);
        break;
      default:
        this.#points = this.#sourcedPoints.slice();
    }

    this.#currentSortType = sortType;
  }

  #handleSortChange = (sortType: SortType) => {
    if (this.#currentSortType === sortType) return;

    this.#sortPoints(sortType);
    this.#clearList();
    this.#renderPoints(this.#points);
  };

  #clearList() {
    this.#pointPresenters.forEach((v) => v.destroy());
    this.#pointPresenters.clear();
  }

  #renderTripList() {
    if (!this.#container) return;

    render(this.#container, this.#tripList, 'beforeend');
  }

  #renderEmptyTripList() {
    if (!this.#container) return;

    render(this.#container, this.#emptyList, 'beforeend');
  }

  #renderPoints(points: IEvent[]) {
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point: IEvent) {
    const pointPresenter = new PointPresenter(
      this.#tripList,
      this.#handleViewAction,
      this.#handleModeChange,
    );
    pointPresenter.init(point);

    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleViewAction = (update: IEvent) => {
    this.#points = updateItem(this.#points, update);
    this.#pointPresenters.get(update.id)?.update(update);
  };

  #handleModeChange = (data: IEvent) => {
    this.#pointPresenters.forEach((v, k) => {
      if (k !== data.id) v.resetView();
    });
  };
}
