import TripInfoView from 'view/trip-info';
import MenuView from 'view/menu';
import FiltersView from 'view/filters';
import SortView from 'view/sort';
import ListView from 'view/list';
import ListEmpty from 'view/list-empty';
import PointView from 'view/trip-point';

import { events } from 'mocks/event';

import { EVENTS_COUNT } from 'utils/const';
import { render } from 'utils/render';

// import NewPointView from "view/new-point";
// import EditFormView from 'view/edit-point';

const tripMainElement = document.querySelector('.trip-main')!;
const tripControlsTitles = tripMainElement.querySelectorAll('.trip-main__trip-controls h2')!;
const pageMain = document.querySelector('.page-body__page-main')!;
const tripEventsSection = pageMain.querySelector('.trip-events')!;

render(tripControlsTitles[0]!, new MenuView().element, 'afterend');
render(tripControlsTitles[1]!, new FiltersView().element, 'afterend');
render(tripEventsSection, new SortView().element, 'beforeend');

const tripList = new ListView();
render(tripEventsSection, tripList.element, 'beforeend');

if (events.length) {
  render(tripMainElement, new TripInfoView(events).element, 'afterbegin');
  for (let i = 0; i < EVENTS_COUNT; i += 1) {
    render(tripList.element!, new PointView(events[i]!).element, 'beforeend');
  }
} else {
  render(tripEventsSection, new ListEmpty().element, 'beforeend');
}
