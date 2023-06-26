import AbstractView from 'type/view-classes';

import { Mode } from 'type/enums';
import { IEvent } from 'type/interfaces';

import EditPointView from 'view/trip-edit';
import TripPointView from 'view/trip-point';

import { render, remove, replace } from 'utils/render';

export default class Point {
  #editPoint: EditPointView | null = null;

  #tripPoint: TripPointView | null = null;

  #mode: Mode = Mode.DEFAULT;

  #data: IEvent | null = null;

  #container: AbstractView | null = null;

  #changeData: Function | null = null;

  #changeMode: Function | null = null;

  constructor(container: AbstractView, changeData: Function, changeMode: Function) {
    this.#container = container;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init(data: IEvent) {
    this.#data = data;

    this.#renderTripPoint();
  }

  #renderTripPoint() {
    if (!this.#container || !this.#data) {
      return;
    }

    const prevTripPoint = this.#tripPoint;

    this.#tripPoint = new TripPointView(this.#data);
    this.#tripPoint.clickFavoriteHandler = this.#handleFavoriteClick;
    this.#tripPoint.openFormHandler = this.#handleFormOpen;

    if (!prevTripPoint) {
      render(this.#container, this.#tripPoint, 'beforeend');
      return;
    }

    replace(prevTripPoint, this.#tripPoint);
    remove(prevTripPoint);
  }

  updatePoint(data: IEvent) {
    this.#data = data;
    const prevTripPoint = this.#tripPoint;

    this.#tripPoint = new TripPointView(data);
    this.#tripPoint.clickFavoriteHandler = this.#handleFavoriteClick;
    this.#tripPoint.openFormHandler = this.#handleFormOpen;

    if (!prevTripPoint) {
      throw new Error('Can\'t update unexisted point');
    }

    replace(prevTripPoint, this.#tripPoint);
    remove(prevTripPoint);
  }

  resetView() {
    if (this.#mode === Mode.DEFAULT) return;

    this.#replaceFormToPoint();
  }

  destroy() {
    if (this.#tripPoint) {
      remove(this.#tripPoint);
    }

    if (this.#editPoint) {
      remove(this.#editPoint);
    }
  }

  #replacePointToForm() {
    if (!this.#container || !this.#data || !this.#tripPoint || !this.#changeMode) return;

    this.#editPoint = new EditPointView(this.#data);
    this.#editPoint.closeFormHandler = this.#handleFormClose;

    replace(this.#tripPoint, this.#editPoint);

    this.#changeMode(this.#data);
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    if (!this.#tripPoint || !this.#editPoint || !this.#changeMode) return;

    replace(this.#editPoint, this.#tripPoint);
    remove(this.#editPoint);

    this.#changeMode(this.#data);
    this.#mode = Mode.DEFAULT;
  }

  #handleFormOpen = () => {
    this.#replacePointToForm();
  };

  #handleFormClose = () => {
    this.#replaceFormToPoint();
  };

  #handleFavoriteClick = () => {
    if (!this.#data) return;

    this.#changeData!(
      {
        ...this.#data,
        ...{ favorite: !this.#data.favorite },
      },
    );
  };
}
