import { IEvent } from 'types/interfaces';
import { ActionType, SortType, UpdateType } from 'types/enums';

import TripListView from 'view/list';
import EmptyListView from 'view/list-empty';

import PointPresenter from 'presenter/point';

import filter from 'utils/filter';
import { render, remove } from 'utils/render';
import { pointsByDefault, pointsByDuration, pointsByPrice } from 'utils/sort';
import PointModel from 'model/point';
import NavigationModel from 'model/navigation';

export default class Board {
  #tripListView: TripListView = new TripListView();

  #emptyListView: EmptyListView = new EmptyListView();

  #container: HTMLElement;

  #navModel: NavigationModel;

  #pointModel: PointModel;

  #pointPresenters: Map<number, PointPresenter> = new Map();

  constructor(
    container: HTMLElement,
    navModel: NavigationModel,
    pointModel: PointModel,
  ) {
    this.#container = container;
    this.#navModel = navModel;
    this.#pointModel = pointModel;

    this.#navModel.addObserver(this.#handleModelEvent);
    this.#pointModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#container.classList.remove('hidden');
    this.#renderBoard();
  }

  destroy() {
    if (!this.#tripListView) return;

    this.#container.classList.add('hidden');
    remove(this.#tripListView);
  }

  #getPoints() {
    const { points } = this.#pointModel;
    const { sort: sortType } = this.#navModel;
    const { filter: filterType } = this.#navModel;

    const filteredPoints = filter[filterType](points);

    switch (sortType) {
      case SortType.PRICE:
        return filteredPoints.sort(pointsByPrice);
      case SortType.TIME:
        return filteredPoints.sort(pointsByDuration);
      default:
        return filteredPoints.sort(pointsByDefault);
    }
  }

  #renderBoard() {
    const points = this.#getPoints();
    const pointsCount = points.length;

    if (!pointsCount) {
      this.#renderEmptyTripList();
      return;
    }

    this.#renderTripList();
    this.#renderPoints(points);
  }

  #clearBoard() {
    this.#pointPresenters.forEach((v) => v.destroy());
    this.#pointPresenters.clear();

    if (this.#tripListView) remove(this.#tripListView);
    if (this.#emptyListView) remove(this.#emptyListView);
  }

  #renderTripList() {
    render(this.#container, this.#tripListView, 'beforeend');
  }

  #renderEmptyTripList() {
    render(this.#container, this.#emptyListView, 'beforeend');
  }

  #renderPoints(points: IEvent[]) {
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point: IEvent) {
    const pointPresenter = new PointPresenter(
      this.#tripListView,
      this.#handleViewAction,
      this.#handleModeChange,
    );

    if (!point.id) return;

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleViewAction = (actionType: ActionType, updateType: UpdateType, update: IEvent) => {
    switch (actionType) {
      case ActionType.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case ActionType.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case ActionType.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
      default:
        throw new Error('Unexpected action type');
    }
  };

  #handleModelEvent = (updateType: UpdateType, data: IEvent) => {
    switch (updateType) {
      case UpdateType.PATCH_UPDATE:
        this.#pointPresenters.get(data.id!)?.update(data);
        break;
      case UpdateType.PATCH_DELETE:
        this.#pointPresenters.get(data.id!)?.destroy();
        this.#pointPresenters.delete(data.id!);
        break;
      default:
        this.#clearBoard();
        this.#renderBoard();
    }
  };

  #handleModeChange = (data: IEvent) => {
    this.#pointPresenters.forEach((v, k) => {
      if (k !== data.id) v.resetEditing();
    });
  };
}
