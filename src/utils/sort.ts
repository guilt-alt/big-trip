import { Dayjs } from 'dayjs';
import { IEvent } from 'type/interfaces';

const getEventDuration = (startDate: Dayjs, endDate: Dayjs) => endDate.diff(startDate);

export const pointsByPrice = (
  { price: priceA }: IEvent,
  { price: priceB }: IEvent,
) => priceB - priceA;

export const pointsByDuration = (
  { startDate: startDateA, endDate: endDateA }: IEvent,
  { startDate: startDateB, endDate: endDateB }: IEvent,
) => {
  const timeA = getEventDuration(startDateA, endDateA);
  const timeB = getEventDuration(startDateB, endDateB);

  return timeB - timeA;
};
