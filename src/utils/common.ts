import dayjs, { Dayjs } from 'dayjs';
import duration, { Duration } from 'dayjs/plugin/duration';

import flatpickr from 'flatpickr';
import { Hook } from 'flatpickr/dist/types/options';
import 'flatpickr/dist/flatpickr.min.css';

import { IEvent } from 'type/interfaces';

dayjs.extend(duration);

const addZeroToNumber = (num: number): string | number => (num < 10 ? `0${num}` : num);

export const isEscKeyDown = ({ key }: KeyboardEvent): boolean => (key === 'Escape' || key === 'Esc');

export const getRandomInt = (min: number = 0, max: number = 1): number => {
  const lower: number = Math.ceil(Math.min(min, max));
  const upper: number = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const checkDurationIsValid = (
  start: HTMLInputElement,
  end: HTMLInputElement,
  data: IEvent,
) => {
  const startElement = start;
  const endElement = end;

  if (data.startDate.diff(data.endDate, 'minute') >= 0) {
    startElement.style.border = '3px solid #ffd054';
    startElement.style.borderRadius = '5px';

    startElement.setCustomValidity('The start of the event can\'t be later than the end');
    startElement.reportValidity();

    endElement.disabled = true;
    return;
  }

  startElement.style.border = 'none';
  startElement.setCustomValidity('');
  endElement.disabled = false;
};

export const getEventDuration = (startDate: Dayjs, endDate: Dayjs) => {
  const diffInMs: number = endDate.diff(startDate);
  const timeDuration: Duration = dayjs.duration(diffInMs);
  const days: number = timeDuration.days();
  const hours: number = timeDuration.hours();
  const minutes: number = timeDuration.minutes();

  return (
    `${(days > 0 && `${addZeroToNumber(days)}D`) || ''}
    ${((days > 0 || hours > 0) && `${addZeroToNumber(hours)}H`) || ''}
    ${addZeroToNumber(minutes)}M`
  );
};

export const getTripRoute = (cards: IEvent[]): string => {
  const cities = [...new Set(cards.map((card) => card.destination))];

  return cities.length > 3
    ? `${cities[0]} &mdash; ... &mdash; ${cities[cities.length - 1]}`
    : `${cities.join(' &mdash; ')}`;
};

export const getTripDates = (cards: IEvent[]) => {
  const tripStartDate = cards[0]!.startDate.format('MMM D');
  const tripEndDate = cards[cards.length - 1]!.endDate.format('MMM D');

  return [tripStartDate, tripEndDate];
};

export const getTripCost = (cards: IEvent[]) => cards.reduce(((cardsAcc, card) => {
  const selectedOffersTotalPrice = Object.values(card.offers)
    .filter((offer) => offer.checked)
    .reduce(((offersAcc, offer) => offersAcc + offer.price), 0);

  return selectedOffersTotalPrice + cardsAcc + card.price;
}), 0);

export const updateItem = (items: IEvent[], update: IEvent) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export const pickDate = (
  target: HTMLInputElement,
  minDate: Date | number,
  defaultDate: Date,
  onChangeHandler: Hook,
  onCloseHandler: Hook,
) => flatpickr(
  target,
  {
    enableTime: true,
    time_24hr: true,
    altInput: true,
    altFormat: 'd/m/y H:i',
    dateFormat: 'Y-m-d',
    allowInput: true,
    minDate,
    defaultDate,
    onChange: onChangeHandler,
    onClose: onCloseHandler,
  },
);
