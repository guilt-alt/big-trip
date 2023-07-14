import AbstractView from 'types/classes/abstract-view';
import { MenuType } from 'types/enums';

const createMenu = (current: MenuType): string => {
  const menuList = Object.values(MenuType).map((value) => (
    `<a class="trip-tabs__btn ${current === value ? 'trip-tabs__btn--active' : ''}"
      href="#" data-type="${value}">
      ${value.charAt(0).toUpperCase() + value.slice(1)}
    </a>`
  )).join('');

  return `<nav class="trip-controls__trip-tabs trip-tabs">${menuList}</nav>`;
};

export default class Menu extends AbstractView {
  #current: MenuType;

  constructor(current: MenuType) {
    super();
    this.#current = current;
  }

  get template() {
    return createMenu(this.#current);
  }

  set clickMenuHandler(callback: Function) {
    this.callback.click = callback;

    this.element.addEventListener('click', this.#clickMenuHandler);
  }

  #clickMenuHandler = (e: Event) => {
    e.preventDefault();
    const target = e.target as HTMLAnchorElement;

    if (!this.callback.click || target.tagName !== 'A') return;

    this.callback.click(target.dataset.type);
  };
}
