import { IEvent } from 'types/interfaces';
import AbstractView from './abstract-view';

export default abstract class SmartView extends AbstractView {
  protected abstract data: IEvent;

  protected abstract restoreHandlers(): void;

  updateData(update: Partial<IEvent>, justDataUpdating?: boolean) {
    this.data = {
      ...this.data,
      ...update,
    };

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.element;
    const parent = prevElement.parentElement;

    this.removeElement();

    const newElement = this.element;

    if (!parent) return;

    parent.replaceChild(newElement, prevElement);
    this.restoreHandlers();
  }
}
