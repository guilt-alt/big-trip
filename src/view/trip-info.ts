import { IEvent } from 'type/interfaces';
import { getTripCost, getTripDates, getTripRoute } from 'utils/common';

export default (events: IEvent[]): string => {
  const tripCost = getTripCost(events);
  const tripRoute = getTripRoute(events);
  const [tripStartDate, tripEndDate] = getTripDates(events);

  return (
    `<section class="trip-main__trip-info trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripRoute}</h1>

        <p class="trip-info__dates">${tripStartDate} — ${tripEndDate}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripCost}</span>
      </p>
    </section>`
  );
};
