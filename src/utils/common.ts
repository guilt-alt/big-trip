import dayjs, { Dayjs } from 'dayjs';
import duration, { Duration } from 'dayjs/plugin/duration';

import { IEvent } from 'type/interfaces';

dayjs.extend(duration);

const addZeroToNumber = (num: number): string | number => (num < 10 ? `0${num}` : num);

export const getRandomInt = (min: number = 0, max: number = 1): number => {
  const lower: number = Math.ceil(Math.min(min, max));
  const upper: number = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
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
  const selectedOffersTotalPrice = card.offers
    .filter((offer) => offer.checked)
    .reduce(((offersAcc, offer) => offersAcc + offer.price), 0);

  return selectedOffersTotalPrice + cardsAcc + card.price;
}), 0);
