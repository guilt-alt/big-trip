import MenuView from 'view/menu';
import FiltersView from 'view/filters';
import SortView from 'view/sort';
import TripInfoView from 'view/trip-info';
import ListView from 'view/list';
import PointView from 'view/point';

import { events } from 'mocks/event';

import render from 'utils/render';
import { RenderPosition, EVENTS_COUNT } from 'utils/const';

// import NewPointView from "view/new-point";
import EditFormView from 'view/edit-form';

const pageHeader = document.querySelector('.page-header')!;
const tripMainElement = pageHeader.querySelector('.trip-main')!;
const tripControlsElement = tripMainElement.querySelector('.trip-main__trip-controls')!;
const pageMain = document.querySelector('.page-body__page-main')!;
const tripEventsSection = pageMain.querySelector('.trip-events')!;

render(tripMainElement, TripInfoView(events), RenderPosition.AFTERBEGIN);
render(tripControlsElement, MenuView(), RenderPosition.AFTERBEGIN);
render(tripControlsElement, FiltersView(), RenderPosition.BEFOREEND);
render(tripEventsSection, SortView(), RenderPosition.BEFOREEND);
render(tripEventsSection, ListView(), RenderPosition.BEFOREEND);

const tripList = tripEventsSection.querySelector('.trip-events__list')!;
render(tripList, EditFormView(events[0]!), RenderPosition.BEFOREEND);

for (let i = 0; i < EVENTS_COUNT; i += 1) {
  render(tripList, PointView(events[i]!), RenderPosition.BEFOREEND);
}
