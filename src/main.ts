import TripInfoView from 'view/trip-info';

import NavigationModel from 'model/navigation';
import PointModel from 'model/point';

import MenuPresenter from 'presenter/menu';
import FilterPresenter from 'presenter/filter';
import SortPresenter from 'presenter/sort';
import BoardPresenter from 'presenter/board';
import StatsPresenter from 'presenter/stats';

import { events } from 'mocks/event';
import { render } from 'utils/render';

const tripMainElement = document.querySelector('.trip-main') as HTMLElement;
const tripControlsTitles = tripMainElement.querySelectorAll('.trip-main__trip-controls h2') as NodeListOf<Element>;

const pageMain = document.querySelector('.page-body__page-main')!;
const pointsContainer = pageMain.querySelector('.trip-events') as HTMLElement;
const statsContainer = pageMain.querySelector('.statistics') as HTMLElement;

render(tripMainElement, new TripInfoView(events).element, 'afterbegin');

const navModel = new NavigationModel();
const pointModel = new PointModel();

pointModel.points = events;

const menuPresenter = new MenuPresenter(tripControlsTitles[0] as Element, navModel);
const filterPresenter = new FilterPresenter(tripControlsTitles[1] as Element, navModel);
const sortPresenter = new SortPresenter(pointsContainer, navModel);
const boardPresenter = new BoardPresenter(pointsContainer, navModel, pointModel);
const statsPresenter = new StatsPresenter(statsContainer, navModel, pointModel);

menuPresenter.init();
menuPresenter.setPresenters(boardPresenter, statsPresenter);
filterPresenter.init();
sortPresenter.init();
boardPresenter.init();
