import AbstractView from 'type/abstract-view';
import { IEvent } from 'type/interfaces';
import { getEventDuration } from 'utils/common';

const createPoint = (data: IEvent): string => {
  const {
    startDate, endDate, type, destination, offers, price, favorite,
  } = data;

  const startDateTime = startDate.format('YYYY-MM-DDTHH:mm');
  const startTime = startDate.format('HH:mm');

  const endDateTime = endDate.format('YYYY-MM-DDTHH:mm');
  const endTime = endDate.format('HH:mm');

  const duration = getEventDuration(startDate, endDate);

  const offersList = Object.values(offers)
    .filter(({ checked }) => checked === true)
    .map((offer) => (
      `<li class= "event__offer">
        <span class="event__offer-title">${offer.name}</span>
        &plus; &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </li>`
    )).join('');

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">MAR 18</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="/big-trip/assets/img/icons/${type}.png" alt="Event ${type} icon">
        </div>
        <h3 class="event__title">${type} ${destination}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDateTime}">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${endDateTime}">${endTime}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersList}
        </ul>
        <button class="event__favorite-btn ${favorite ? 'event__favorite-btn--active' : ''}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class TripPoint extends AbstractView {
  #data: IEvent;

  constructor(data: IEvent) {
    super();
    this.#data = data;
  }

  get template() {
    return createPoint(this.#data);
  }

  set openFormHandler(callback: Function) {
    this.callback.open = callback;

    this.element
      .querySelector('.event__rollup-btn')
      ?.addEventListener('click', this.#openFormHandler);
  }

  #openFormHandler = (e: Event) => {
    e.preventDefault();

    if (!this.callback.open) return;
    this.callback.open();
  };

  set clickFavoriteHandler(callback: Function) {
    this.callback.favorite = callback;

    this.element
      .querySelector('.event__favorite-btn')
      ?.addEventListener('click', this.#clickFavoriteHandler);
  }

  #clickFavoriteHandler = (e: Event) => {
    e.preventDefault();

    if (!this.callback.favorite) return;
    this.callback.favorite();
  };
}
