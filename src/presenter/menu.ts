import NavigationModel from 'model/navigation';

import MenuView from 'view/menu';

import { MenuType, UpdateType } from 'types/enums';
import { remove, render, replace } from 'utils/render';
import BoardPresenter from './board';
import StatsPresenter from './stats';

export default class Menu {
  #menuView: MenuView | null = null;

  #boardPresenter: BoardPresenter | null = null;

  #statsPresenter: StatsPresenter | null = null;

  #current: MenuType;

  #container: Element;

  #navModel: NavigationModel;

  constructor(container: Element, navModel: NavigationModel) {
    this.#container = container;
    this.#navModel = navModel;
    this.#current = navModel.page;

    this.#navModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderMenu();
  }

  setPresenters(board: BoardPresenter, stats: StatsPresenter) {
    this.#boardPresenter = board;
    this.#statsPresenter = stats;
  }

  #renderMenu() {
    this.#current = this.#navModel.page;
    const prevMenuView = this.#menuView;

    this.#menuView = new MenuView(this.#current);
    this.#menuView.clickMenuHandler = this.#handleMenuClick;

    if (!prevMenuView) {
      render(this.#container, this.#menuView, 'afterend');
      return;
    }

    replace(prevMenuView, this.#menuView);
    remove(prevMenuView);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleMenuClick = (menuItem: MenuType) => {
    if (!this.#statsPresenter || !this.#boardPresenter) throw new Error('Presenters is unexpected');
    if (menuItem === this.#current) return;

    this.#navModel.setPage(UpdateType.MAJOR, menuItem);

    switch (menuItem) {
      case MenuType.TABLE:
        this.#statsPresenter.destroy();
        this.#boardPresenter.init();
        break;
      case MenuType.STATS:
        this.#boardPresenter.destroy();
        this.#statsPresenter.init();
        break;
      default:
        throw new Error('Unexpected menu type');
    }
  };
}
