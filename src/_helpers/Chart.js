'use strict';

import React, { PropTypes, Component } from 'react';

function color(rgb, a = 1) {
  return `rgba(${rgb.join(',')},${a})`;
}

function chartData(label, data, _color) {
  return {
    label,
    backgroundColor: color(_color, 0.5),
    borderColor: color(_color),
    borderWidth: 2,
    hoverBackgroundColor: color(_color, 0.7),
    hoverBorderColor: color(_color),
    data,
  };
}

export default class Chart extends Component {
  constructor(props) {
    super(props);

    this.getChartType = this.getChartType.bind(this);
    this.createChart = this.createChart.bind(this);
    this.prepareData = this.prepareData.bind(this);
    this.destroyLegend = this.destroyLegend.bind(this);
    this.types = {
      line: 'line',
      bar: 'bar',
      pie: 'pie',
      doughnut: 'doughnut'
    };
    this.chart = null;
  }

  componentDidMount() {
    if (this.props.data && (this.props.data.google && this.props.data.yandex)) {
      this.destroyLegend();
      this.prepareData();
    }
  }

  componentDidUpdate() {
    if (this.props.data && (this.props.data.google && this.props.data.yandex)) {
      this.destroyLegend();
      this.prepareData();
    }
  }

  getChartType() {
    return this.types[this.props.chartType] || 'bar';
  }

  destroyLegend() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.props.destroyLegend();
  }

  prepareData(manual) {
    const { google: g, yandex: y, median: m } = this.props.data;
    const labels = [];
    const dataGoogle = [];
    const dataYandex = [];
    const dataMedian = [];

    for (const key in g) {
      const date = moment(key, 'YYYYMMDD');
      labels.push(date.isValid() ? date.format('MMM D') : key);
      dataGoogle.push(g[key]);
      dataYandex.push(y[key]);
      dataMedian.push(m[key]);
    }

    const data = {
      labels,
      datasets: [
        chartData('Google', dataGoogle, [68, 183, 89]),
        chartData('Yandex', dataYandex, [255, 204, 0]),
        chartData('Median', dataMedian, [120, 120, 120])
      ]
    };
    if (manual) {
      return data;
    }
    this.createChart(data);
  }

  createChart(data) {
    const { hidden } = this.props;
    const change = (check, chart) => {
      const i = check.dataset.legendIndex;
      const meta = chart.data.datasets[i];
      meta.hidden = !meta.hidden;
      chart.update();
    };

    const options = {
      responsive: true,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          gridLines: {
            color: 'transparent',
            zeroLineColor: 'transparent'
          },
        }],
        yAxes: [{
          display: false,
          gridLines: {
            color: 'rgba(255,255,255,0.05)',
            zeroLineColor: 'rgba(255,255,255,0.05)'
          },
          ticks: {
            /* stepSize: 5, //25,*/
            beginAtZero: true
          }
        }]
      },
      legendCallback(chart) {
        const _data = chart.data.datasets;
        const legend = [];
        for (let i = 0; i < _data.length; i++) {
          const L = _data[i].label;
          const l = L.toLowerCase();
          const label = document.createElement('label');
          label.className = 'input__label';
          label.innerHTML = `<input class="input input--checkbox" type="checkbox"
          data-legend-index="${i}" ${(hidden.indexOf(l) === -1) ? 'checked' : ''} />
          <span class="input__icon input__icon--circle input__icon--${l}"
            data-tooltip="${L}" data-tooltip-pos="down"></span>`;
          const check = label.querySelector('input');
          check.addEventListener('change', function () {
            change(this, chart);
          });

          if (!check.checked) {
            change(check, chart);
          }

          legend.push(label);
        }

        return legend;
      }
    };

    this.chart = new window.Chart(this.refs.canvas, {
      type: this.getChartType(),
      data: JSON.parse(JSON.stringify(data)),
      options
    });
    this.props.generateLegend(this.chart);
  }

  render() {
    return (
      <canvas
        className="card__chart"
        ref="canvas"
        style={{ marginTop: '15px' }}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}

Chart.propTypes = {
  data: PropTypes.object,
  generateLegend: PropTypes.func,
  hidden: PropTypes.array,
  chartType: PropTypes.string,
  width: PropTypes.any,
  height: PropTypes.any,
  destroyLegend: PropTypes.func
};
