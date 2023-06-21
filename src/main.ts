import MenuView from 'view/menu';
import FiltersView from 'view/filters';
import SortView from 'view/sort';
import TripInfoView from 'view/trip-info';
import ListView from 'view/list';
import ListEmpty from 'view/list-empty';
import PointView from 'view/point';

import { events } from 'mocks/event';

import { EVENTS_COUNT } from 'utils/const';
import { render, RenderPosition } from 'utils/render';

// import NewPointView from "view/new-point";
// import EditFormView from 'view/edit-point';

const pageHeader = document.querySelector('.page-header')!;
const tripMainElement = pageHeader.querySelector('.trip-main')!;
const tripControlsElement = tripMainElement.querySelector('.trip-main__trip-controls')!;
const pageMain = document.querySelector('.page-body__page-main')!;
const tripEventsSection = pageMain.querySelector('.trip-events')!;

render(tripControlsElement, new MenuView().Element, RenderPosition.AFTERBEGIN);
render(tripControlsElement, new FiltersView().Element, RenderPosition.BEFOREEND);
render(tripEventsSection, new SortView().Element, RenderPosition.BEFOREEND);

const tripList = new ListView();
render(tripEventsSection, tripList.Element, RenderPosition.BEFOREEND);

if (events.length) {
  render(tripMainElement, new TripInfoView(events).Element, RenderPosition.AFTERBEGIN);
  for (let i = 0; i < EVENTS_COUNT; i += 1) {
    render(tripList.Element!, new PointView(events[i]!).Element, RenderPosition.BEFOREEND);
  }
} else {
  render(tripEventsSection, new ListEmpty().Element, RenderPosition.BEFOREEND);
}
