import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { IEvent } from 'types/interfaces';
import { StatsType } from 'types/enums';

import { BAR_HEIGHT } from './const';
import { getDuration } from './common';

Chart.register(...registerables);
Chart.register(ChartDataLabels);

const filterByPrice = (labels: string[], data: IEvent[]) => labels.map(
  (label) => data.reduce((acc, { type, price }) => (type === label ? acc + price : acc), 0),
);

const filterByTransport = (labels: string[], data: IEvent[]) => labels.map(
  (label) => data
    .reduce((acc, { type }) => (type === label ? acc + 1 : acc), 0),
);

const filterByTime = (labels: string[], data: IEvent[]) => labels.map(
  (label) => data.reduce((
    acc,
    { type, startDate, endDate },
  ) => (type === label ? acc + endDate.diff(startDate) : acc), 0),
);

const statsData = {
  [StatsType.MONEY]: filterByPrice,
  [StatsType.TRANSPORT]: filterByTransport,
  [StatsType.TIME_SPEND]: filterByTime,
};

const formatter = {
  [StatsType.MONEY]: (val: number) => `€ ${val}`,
  [StatsType.TRANSPORT]: (val: number) => `${val}x`,
  [StatsType.TIME_SPEND]: (val: number) => getDuration(val),
};

export default (ctx: HTMLCanvasElement, data: IEvent[]) => {
  const statsType = ctx.dataset.type as StatsType;
  const labels = [...new Set(data.map(({ type }) => type))];

  const CHART_TITLE = statsType.toUpperCase();
  const CHART_DATA = statsData[statsType](labels, data);
  const CHART_LABELS = labels.map((label) => label.toUpperCase());

  ctx.style.height = `${labels.length * BAR_HEIGHT}`;

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: CHART_LABELS,
      datasets: [{
        data: CHART_DATA,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        barThickness: 44,
        minBarLength: 88,
      }],
    },
    options: {
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
        title: {
          display: true,
          text: CHART_TITLE,
          color: '#000000',
          font: {
            size: 23,
          },
          position: 'left',
        },
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: formatter[statsType],
        },
      },
      scales: {
        y: {
          ticks: {
            font: {
              size: 13,
            },
            color: '#000000',
            padding: 5,
          },
          border: {
            width: 0,
          },
          grid: {
            display: false,
          },
        },
        x: {
          display: false,
        },
      },
    },
  });
};
