import Observer from 'types/classes/observer';

import { IEvent } from 'types/interfaces';
import { UpdateType } from 'types/enums';

export default class PointModel extends Observer {
  #points: IEvent[] | [] = [];

  get points() {
    return this.#points;
  }

  set points(points: IEvent[]) {
    this.#points = points.slice();
  }

  updatePoint(updateType: UpdateType, update: IEvent) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) throw new Error('Can\'t update non-existing point');

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this.notify(updateType, update);
  }

  addPoint(updateType: UpdateType, update: IEvent) {
    this.#points = [
      ...this.#points,
      update,
    ];

    this.notify(updateType, update);
  }

  deletePoint(updateType: UpdateType, update: IEvent) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) throw new Error('Can\'t delete unexisting point');

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this.notify(updateType, update);
  }
}
