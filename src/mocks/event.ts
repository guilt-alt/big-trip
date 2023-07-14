import dayjs, { Dayjs } from 'dayjs';
import { getRandomInt } from 'utils/common';

import { TypesOfCatygories } from 'types/types';
import {
  IOffer, IEvent, OfferType, Destinations, IDestinations,
} from 'types/interfaces';

import {
  MAX_TRIP_TIME, Price,
  CARDS_AMOUNT, MAX_PHOTOS_AMOUNT,
} from 'utils/const';

const text = [
  'Cat ipsum dolor sit amet, skid on floor, crash into wall but crusty butthole yet jump on human and sleep on her all night long be long in the bed, purr in the morning and then give a bite to every human around for not waking up request food, purr loud scratch the walls, the floor, the windows, the humans.',
  'Stick butt in face run up and down stairs and cat sit like bread, meow loudly just to annoy owners.',
  'Love me! kitty ask to go outside and ask to come inside and ask to go outside and ask to come inside chase after silly colored fish toys around the house.',
  'I is not fat, i is fluffy cuddle no cuddle cuddle love scratch scratch.',
  'Blow up sofa in 3 seconds sit by the fire yet the fat cat sat on the mat bat away with paws.',
  'Headbutt owner\'s knee cry louder at reflection hell is other people so mew.',
  'Cat playing a fiddle in hey diddle diddle? cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip so pet me pet me pet me pet me, bite, scratch, why are you petting me climb into cupboard and lick the salt off rice cakes toilet paper attack claws fluff everywhere meow miao french ciao litterbox jump five feet high and sideways when a shadow moves, yet hack up furballs.',
  'Loves cheeseburgers more napping, more napping all the napping is exhausting cat playing a fiddle in hey diddle diddle? so lick arm hair so i like big cats and i can not lie or meeeeouw.',
];

const shuffleArray = <T>(arr: T[]): T[] => {
  const array = arr;

  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j]!, array[i]!];
  }

  return array;
};

const getRandomPhoto = () => `http://picsum.photos/248/152?r=${Math.random()}`;

const generateDescription = <T>(content: T[]): string => shuffleArray(content)
  .slice(0, getRandomInt(1, 4))
  .join(' ');

const getRandomArrayItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)] as T;

const getRandomProperty = <T extends IDestinations>(obj: T) => {
  const keys: Destinations[] = Object.keys(obj) as Destinations[];
  const key: Destinations = keys[getRandomInt(0, keys!.length! - 1)]!;

  return obj[key];
};

export const destinations: IDestinations = {
  Amsterdam: {
    name: Destinations.Amsterdam,
    description: generateDescription(text),
    photos: Array(getRandomInt(0, MAX_PHOTOS_AMOUNT)).fill('').map(getRandomPhoto),
  },
  Geneva: {
    name: Destinations.Geneva,
    description: generateDescription(text),
    photos: Array(getRandomInt(0, MAX_PHOTOS_AMOUNT)).fill('').map(getRandomPhoto),
  },
  Chamonix: {
    name: Destinations.Chamonix,
    description: generateDescription(text),
    photos: Array(getRandomInt(0, MAX_PHOTOS_AMOUNT)).fill('').map(getRandomPhoto),
  },
  Monaco: {
    name: Destinations.Monaco,
    description: generateDescription(text),
    photos: Array(getRandomInt(0, MAX_PHOTOS_AMOUNT)).fill('').map(getRandomPhoto),
  },
};

const AllOffers: IOffer = {
  luggage: {
    name: 'Add meal',
    type: 'meal',
    category: ['train', 'flight'],
    price: 15,
    checked: Boolean(getRandomInt()),
  },
  meal: {
    name: 'Add meal',
    type: 'meal',
    category: ['train', 'flight'],
    price: 15,
    checked: Boolean(getRandomInt()),
  },
  comfort: {
    name: 'Switch to comfort',
    type: 'comfort',
    category: ['train', 'flight'],
    price: 80,
    checked: Boolean(getRandomInt()),
  },
  seats: {
    name: 'Choose seats',
    type: 'seats',
    category: ['train', 'bus', 'flight'],
    price: 15,
    checked: Boolean(getRandomInt()),
  },
  taxi: {
    name: 'Order Uber',
    type: 'taxi',
    category: 'taxi',
    price: 20,
    checked: Boolean(getRandomInt()),
  },
  car: {
    name: 'Rent a car',
    type: 'car',
    category: 'drive',
    price: 200,
    checked: Boolean(getRandomInt()),
  },
  breakfast: {
    name: 'Add breakfast',
    type: 'breakfast',
    category: 'check-in',
    price: 50,
    checked: Boolean(getRandomInt()),
  },
  tickets: {
    name: 'Book tickets',
    type: 'tickets',
    category: 'sightseeing',
    price: 40,
    checked: Boolean(getRandomInt()),
  },
  lunch: {
    name: 'Lunch in city',
    type: 'lunch',
    category: 'sightseeing',
    price: 30,
    checked: Boolean(getRandomInt()),
  },
};

const types: TypesOfCatygories = [
  'taxi', 'bus', 'train', 'ship', 'transport',
  'drive', 'flight', 'check-in', 'sightseeing', 'restaurant',
];

export const generateDate = () => {
  const date = dayjs();
  const tripTime = getRandomInt(0, MAX_TRIP_TIME);
  const startDate: Dayjs = date.add(getRandomInt(1, MAX_TRIP_TIME), 'day');
  const endDate: Dayjs = startDate.add(tripTime, 'day')
    .add(getRandomInt(0, 24), 'hour').add(getRandomInt(0, 60), 'minute');

  return { startDate, endDate };
};

export const getAvailaibleOffers = (eventType: string) => {
  const result: IOffer = {};

  Object.entries(AllOffers).forEach(([type, offer]) => {
    if (offer.category.includes(eventType)) {
      const key = type as keyof typeof OfferType;
      result[key] = offer;
    }
  });

  return result;
};

const generateEventCard = (): IEvent => {
  const { startDate, endDate } = generateDate();
  const type = getRandomArrayItem(types);
  const destination = getRandomProperty(destinations);

  return {
    type,
    destination: destination.name,
    startDate,
    endDate,
    offers: getAvailaibleOffers(type),
    photos: destination.photos,
    description: destination.description,
    price: getRandomInt(Price.min, Price.max),
    favorite: Boolean(getRandomInt()),
  };
};

const generateEventCards = (amount: number) => {
  let index = 0;
  return Array(amount)
    .fill('')
    .map(() => {
      index += 1;
      const card = generateEventCard();
      card.id = index;
      return card;
    })
    .sort(
      (currentCard, nextCard) => currentCard.startDate!.diff(nextCard.startDate),
    );
};

export const events = generateEventCards(CARDS_AMOUNT);
