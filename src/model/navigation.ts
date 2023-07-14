import Observer from 'types/classes/observer';
import {
  MenuType, FilterType, SortType, UpdateType,
} from 'types/enums';

export default class NavigationModel extends Observer {
  #activeSort: SortType = SortType.DAY;

  #activePage: MenuType = MenuType.TABLE;

  #activeFilter: FilterType = FilterType.EVERYTHING;

  get page() {
    return this.#activePage;
  }

  get filter() {
    return this.#activeFilter;
  }

  get sort() {
    return this.#activeSort;
  }

  setPage(updateType: UpdateType, page: MenuType) {
    this.#activePage = page;
    this.notify(updateType, page);
  }

  setFilter(updateType: UpdateType, filter: FilterType) {
    this.#activeFilter = filter;
    this.notify(updateType, filter);
  }

  setSort(updateType: UpdateType, sort: SortType) {
    this.#activeSort = sort;
    this.notify(updateType, sort);
  }
}
