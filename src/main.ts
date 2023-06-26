import TripInfoView from 'view/trip-info';
import MenuView from 'view/menu';
import FiltersView from 'view/filters';

import BoardPresenter from 'presenter/board';

import { events } from 'mocks/event';
import { render } from 'utils/render';

const tripMainElement = document.querySelector('.trip-main')!;
const tripControlsTitles = tripMainElement.querySelectorAll('.trip-main__trip-controls h2')!;
const pageMain = document.querySelector('.page-body__page-main')!;
const tripEventsSection = pageMain.querySelector('.trip-events')!;

if (events.length) {
  render(tripMainElement, new TripInfoView(events).element, 'afterbegin');
}

render(tripControlsTitles[0]!, new MenuView().element, 'afterend');
render(tripControlsTitles[1]!, new FiltersView().element, 'afterend');

const boardPresenter = new BoardPresenter(tripEventsSection, events);
boardPresenter.init();
