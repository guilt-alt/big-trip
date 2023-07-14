import { Dayjs } from 'dayjs';
import { IEvent } from 'types/interfaces';

const getEventDuration = (startDate: Dayjs, endDate: Dayjs) => endDate.diff(startDate);

export const pointsByDefault = (
  { startDate: startDateA }: IEvent,
  { startDate: startDateB }: IEvent,
) => startDateA.diff(startDateB);

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
