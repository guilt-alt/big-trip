import AbstractView from 'types/classes/abstract-view';

import { ActionType, Mode, UpdateType } from 'types/enums';
import { IEvent } from 'types/interfaces';

import EditPointView from 'view/trip-edit';
import TripPointView from 'view/trip-point';

import { render, remove, replace } from 'utils/render';

export default class Point {
  #editPoint: EditPointView | null = null;

  #tripPoint: TripPointView | null = null;

  #mode: Mode = Mode.DEFAULT;

  #data: IEvent | null = null;

  #container: AbstractView;

  #changeData: Function;

  #changeMode: Function;

  constructor(container: AbstractView, changeData: Function, changeMode: Function) {
    this.#container = container;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init(data: IEvent) {
    this.#data = data;

    this.#renderTripPoint();
  }

  update(data: IEvent) {
    this.#data = data;

    this.#updateForm();
    this.#updatePoint();
  }

  resetEditing() {
    if (this.#mode === Mode.DEFAULT) return;

    this.#replaceFormToPoint();
  }

  destroy() {
    if (this.#tripPoint) {
      remove(this.#tripPoint);
      this.#tripPoint = null;
    }

    if (this.#editPoint) {
      remove(this.#editPoint);
      this.#editPoint = null;
    }
  }

  #renderTripPoint() {
    if (!this.#data) {
      return;
    }

    const prevTripPoint = this.#tripPoint;

    this.#tripPoint = new TripPointView(this.#data);
    this.#tripPoint.openFormHandler = this.#replacePointToForm;
    this.#tripPoint.clickFavoriteHandler = this.#handleFavoriteClick;

    if (!prevTripPoint) {
      render(this.#container, this.#tripPoint!, 'beforeend');
      return;
    }

    replace(prevTripPoint, this.#tripPoint!);
    remove(prevTripPoint);
  }

  #updatePoint() {
    if (!this.#data) return;

    const prevTripPoint = this.#tripPoint;

    this.#tripPoint = new TripPointView(this.#data);
    this.#tripPoint.openFormHandler = this.#replacePointToForm;
    this.#tripPoint.clickFavoriteHandler = this.#handleFavoriteClick;

    if (!prevTripPoint) {
      throw new Error('Can\'t update unexisted element');
    }

    replace(prevTripPoint, this.#tripPoint!);
    remove(prevTripPoint);
  }

  #updateForm() {
    if (!this.#data) return;

    const prevEditPoint = this.#editPoint;

    this.#editPoint = new EditPointView(this.#data);
    this.#editPoint.savePointHandler = this.#handleFormSave;
    this.#editPoint.closeFormHandler = this.#replaceFormToPoint;
    this.#editPoint.deletePointHandler = this.#handleFormDelete;

    if (!prevEditPoint) {
      throw new Error('Can\'t update unexisted element');
    }

    replace(prevEditPoint, this.#editPoint);
    remove(prevEditPoint);
  }

  #replacePointToForm = () => {
    if (!this.#data || !this.#tripPoint) return;

    this.#editPoint = new EditPointView(this.#data);
    this.#editPoint.savePointHandler = this.#handleFormSave;
    this.#editPoint.closeFormHandler = this.#replaceFormToPoint;
    this.#editPoint.deletePointHandler = this.#handleFormDelete;

    replace(this.#tripPoint, this.#editPoint);
    remove(this.#tripPoint);

    this.#changeMode(this.#data);
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    if (!this.#data || !this.#editPoint) return;

    this.#tripPoint = new TripPointView(this.#data);
    this.#tripPoint.openFormHandler = this.#replacePointToForm;
    this.#tripPoint.clickFavoriteHandler = this.#handleFavoriteClick;

    replace(this.#editPoint, this.#tripPoint);
    remove(this.#editPoint);

    this.#changeMode(this.#data);
    this.#mode = Mode.DEFAULT;
  };

  #handleFormSave = (data: IEvent) => {
    this.#changeData(
      ActionType.UPDATE_POINT,
      UpdateType.PATCH_ADD,
      data,
    );
  };

  #handleFormDelete = (data: IEvent) => {
    this.#changeData(
      ActionType.DELETE_POINT,
      UpdateType.PATCH_DELETE,
      data,
    );
  };

  #handleFavoriteClick = () => {
    if (!this.#data) return;

    this.#changeData(
      ActionType.UPDATE_POINT,
      UpdateType.PATCH_UPDATE,
      {
        ...this.#data,
        ...{ favorite: !this.#data.favorite },
      },
    );
  };
}
