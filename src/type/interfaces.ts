import { Dayjs } from 'dayjs';

export enum OfferType {
  luggage = 'luggage',
  meal = 'meal',
  comfort = 'comfort',
  seats = 'seats',
  taxi = 'taxi',
  car = 'car',
  breakfast = 'breakfast',
  tickets = 'tickets',
  lunch = 'lunch',
}

export enum Destinations {
  Amsterdam = 'Amsterdam',
  Geneva = 'Geneva',
  Chamonix = 'Chamonix',
  Monaco = 'Monaco',
}

export type IOffer = {
  -readonly [key in keyof typeof OfferType]?: {
    name: string;
    type: keyof typeof OfferType;
    category: string | string[];
    price: number;
    checked: boolean;
  }
};

export type IDestinations = Record<
Destinations,
{
  name: Destinations,
  description: string,
  photos: string[]
}>;

export interface IEvent {
  id?: number;
  type: string;
  destination: string;
  startDate: Dayjs;
  endDate: Dayjs;
  photos: string[];
  description: string;
  price: number;
  favorite: boolean;
  offers: IOffer;
}
