import AbstractView from 'types/classes/abstract-view';
import { IEvent, IOffer } from 'types/interfaces';
import { destinations } from 'mocks/event';

const createOffers = (offers: IOffer, id: number): string => {
  if (!Object.keys(offers).length) return '';

  const offersList = Object.values(offers).map(({
    type, checked, name, price,
  }) => (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox visually-hidden" id="event-offer-${type}-${id}" type="checkbox" name="event-offer-${type}" ${checked ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${type}-${id}">
        <span class="event__offer-title">${name}</span>
        &plus; &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </label>
    </div>`
  )).join('');

  return (
    `<section class="event__section event__section--offers">
      <h3 class="event__section-title event__section-title--offers">Offers</h3>
      <div class="event__available-offers">${offersList}</div>
    </section>`
  );
};

const createPhotos = (photos: string[]): string => (photos.length ? (
  `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${photos.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join('')}
    </div>
  </div>`
) : '');

const createEditForm = (event: IEvent) => {
  const {
    type, startDate, endDate, destination, offers, description, photos, price, id,
  } = event;

  const formatedEndDate = endDate.format('DD/MM/YY HH:mm');
  const formatedStartDate = startDate.format('DD/MM/YY HH:mm');

  const destinationsList = Object.keys(destinations).map((item) => `<option value="${item}">`).join('');

  const photosList = createPhotos(photos);
  const offersList = createOffers(offers, id!);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="/big-trip/assets/img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

                <div class="event__type-item">
                  <input id="event-type-taxi-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi"
                  ${type === 'taxi' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-${id}">Taxi</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-bus-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus"
                  ${type === 'bus' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-${id}">Bus</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-train-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train"
                  ${type === 'train' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--train" for="event-type-train-${id}">Train</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-ship-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship"
                  ${type === 'ship' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-${id}">Ship</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-transport-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport"
                  ${type === 'transport' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--transport" for="event-type-transport-${id}">Transport</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-drive-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive"
                  ${type === 'drive' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-${id}">Drive</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-flight-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight"
                  ${type === 'flight' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-${id}">Flight</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-check-in-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in"
                  ${type === 'check-in' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-${id}">Check-in</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-sightseeing-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing"
                  ${type === 'sightseeing' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-${id}">Sightseeing</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-restaurant-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant"
                  ${type === 'restaurant' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-${id}">Restaurant</label>
                </div>
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${id}">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination}" list="destination-list-${id}" required>
            <datalist id="destination-list-${id}">
              ${destinationsList}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${formatedStartDate}" required>
            &mdash;
            <label class="visually-hidden" for="event-end-time-${id}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${formatedEndDate}" required>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${price}" required>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${offersList}

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>

            ${photosList}
          </section>
        </section>
      </form>
    </li>`
  );
};

export default class NewTripPoint extends AbstractView {
  #data: IEvent;

  constructor(data: IEvent) {
    super();
    this.#data = data;
  }

  get template() {
    return createEditForm(this.#data);
  }
}
