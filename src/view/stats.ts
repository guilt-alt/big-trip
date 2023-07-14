import AbstractView from 'types/classes/abstract-view';

import { Chart } from 'chart.js';
import { IEvent } from 'types/interfaces';
import { StatsType } from 'types/enums';

import createChart from 'utils/chart';

const createStatsTemplate = () => {
  const statsList = Object.values(StatsType).map((value) => (
    `<div class="statistics__item statistics__item--${value}">
      <canvas class="statistics__chart statistics__chart--${value}" data-type="${value}" width="900"></canvas>
    </div>`
  )).join('');

  return `<div>${statsList}</div>`;
};

export default class Stats extends AbstractView {
  #staticTemplate = createStatsTemplate();

  #data: IEvent[];

  #moneyChart: Chart | null = null;

  #typeChart: Chart | null = null;

  #timeChart: Chart | null = null;

  constructor(data: IEvent[]) {
    super();

    this.#data = data;
    this.#setCharts();
  }

  get template() {
    return this.#staticTemplate;
  }

  override removeElement() {
    super.removeElement();
    this.#removeCharts();
  }

  #setCharts() {
    const timeCtx = this.element.querySelector('.statistics__chart--time-spend') as HTMLCanvasElement;
    const moneyCtx = this.element.querySelector('.statistics__chart--money') as HTMLCanvasElement;
    const typeCtx = this.element.querySelector('.statistics__chart--transport') as HTMLCanvasElement;

    this.#typeChart = createChart(typeCtx, this.#data);
    this.#timeChart = createChart(timeCtx, this.#data);
    this.#moneyChart = createChart(moneyCtx, this.#data);
  }

  #removeCharts() {
    if ([this.#moneyChart, this.#typeChart, this.#timeChart].includes(null)) {
      // this.#moneyChart?.destroy();
      this.#moneyChart = null;
      // this.#typeChart?.destroy();
      this.#typeChart = null;
      // this.#timeChart?.destroy();
      this.#timeChart = null;
    }
  }
}
