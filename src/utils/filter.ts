import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import { FilterType } from 'types/enums';
import { IEvent } from 'types/interfaces';

dayjs.extend(isSameOrAfter);

const today = dayjs().format('YYYY-MM-DD');

const isFutureDate = (date: Dayjs) => {
  const formattedDate = date.format('YYYY-MM-DD');
  return dayjs(formattedDate).isSameOrAfter(today, 'date');
};

const isPastDate = (date: Dayjs) => {
  const formattedDate = date.format('YYYY-MM-DD');
  return dayjs(formattedDate).isBefore(today, 'date');
};

export default {
  [FilterType.EVERYTHING]: (points: IEvent[]) => points,
  [FilterType.FUTURE]: (points: IEvent[]) => points.filter(
    ({ startDate }) => isFutureDate(startDate),
  ),
  [FilterType.PAST]: (points: IEvent[]) => points.filter(({ endDate }) => isPastDate(endDate)),
};
