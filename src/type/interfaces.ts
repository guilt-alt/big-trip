import { Dayjs } from 'dayjs';

export type IPosition = {
  AFTERBEGIN: InsertPosition;
  BEFOREEND: InsertPosition;
};

export type IOffer = {
  name: string;
  type: string;
  category: string[] | string;
  price: number;
  checked: boolean;
};

export type IEvent = {
  id?: number;
  type: string;
  destination: string;
  startDate: Dayjs;
  endDate: Dayjs;
  offers: IOffer[];
  photos: string[];
  description: string;
  price: number;
  favourite: boolean;
};
