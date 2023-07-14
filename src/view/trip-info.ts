import AbstractView from 'types/classes/abstract-view';
import { IEvent } from 'types/interfaces';
import { getTripCost, getTripDates, getTripRoute } from 'utils/common';

const createTripInfo = (events: IEvent[]): string => {
  const tripCost = getTripCost(events);
  const tripRoute = getTripRoute(events);
  const [tripStartDate, tripEndDate] = getTripDates(events);

  return (
    `<section class="trip-main__trip-info trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripRoute}</h1>

        <p class="trip-info__dates">${tripStartDate}&nbsp;&mdash;&nbsp;${tripEndDate}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripCost}</span>
      </p>
    </section>`
  );
};

export default class TripInfo extends AbstractView {
  #data: IEvent[];

  constructor(data: IEvent[]) {
    super();
    this.#data = data;
  }

  get template() {
    return createTripInfo(this.#data);
  }
}
