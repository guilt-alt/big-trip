export enum Mode {
  DEFAULT = 'default',
  EDITING = 'editing',
}

export enum MenuType {
  TABLE = 'table',
  STATS = 'stats',
}

export enum SortType {
  DAY = 'sort-day',
  EVENT = 'sort-event',
  TIME = 'sort-time',
  PRICE = 'sort-price',
  OFFER = 'sort-offer',
}

export enum FilterType {
  EVERYTHING = 'everything',
  FUTURE = 'future',
  PAST = 'past',
}

export enum UpdateType {
  PATCH_ADD = 'patch_add',
  PATCH_UPDATE = 'patch_update',
  PATCH_DELETE = 'patch_delete',
  PATCH = 'patch',
  MINOR = 'minor',
  MAJOR = 'major',
}

export enum ActionType {
  ADD_POINT = 'add_point',
  UPDATE_POINT = 'update_point',
  DELETE_POINT = 'delete_point',
}

export enum StatsType {
  MONEY = 'money',
  TRANSPORT = 'transport',
  TIME_SPEND = 'time-spend',
}
