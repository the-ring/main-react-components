'use strict';

import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import equal from 'deep-equal';
import Chart from '../../../_helpers/Chart';
import Table from './Table';
import Icon from '../../../_helpers/Icon';
import Spinner from '../../../_helpers/Spinner';

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = { data: {}, error: null, fetching: false };

    this.refresh = this.refresh.bind(this);
    this.getSize = this.getSize.bind(this);
    this.generateLegend = this.generateLegend.bind(this);
    this.destroyLegend = this.destroyLegend.bind(this);
    this.onExcelClick = this.onExcelClick.bind(this);
    this.sizes = {
      sm: 400,
      md: 900,
      lg: 1350,
      xl: 1800
    };
  }

  componentDidMount() {
    this.refresh();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.period !== nextProps.period) {
      if (nextProps.period === 'weekly' || nextProps.period === 'monthly') {
        window.localStorage.setItem('period', nextProps.period);
        this.refresh();
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(equal(nextState, this.state));
  }

  onDeleteClick(e) {
    e.preventDefault();
  }

  onExcelClick(e) {
    e.preventDefault();
    this.refs.table.refs.header.value = JSON.stringify(['Date', ['Google', 'Yandex', 'Median']]);
    this.refs.table.refs.data.value = JSON.stringify(this.refs.table.prepareData());
    const newChart = new Chart(this.refs.hiddenChart, {
      type: this.props.chartType,
      data: this.refs.chart.prepareData(true),
      options: {
        animation: false,
        responsive: true,
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontColor: '#000',
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: 'transparent',
              zeroLineColor: 'rgba(0,0,0,0.05)'
            },
            ticks: {
              fontColor: '#000'
            },
            scaleLabel: {
              fontColor: '#000'
            }
          }],
          yAxes: [{
            gridLines: {
              color: 'rgba(0,0,0,0.05)',
              zeroLineColor: 'rgba(0,0,0,0.05)'
            },
            ticks: {
              fontColor: '#000',
              beginAtZero: true
            },
            scaleLabel: {
              fontColor: '#000'
            }
          }]
        }
      }
    });
    this.refs.image.value = newChart.toBase64Image();
    newChart.destroy();
    this.refs.form.submit();
  }

  onEditClick(e) {
    e.preventDefault();
    this.props.showEdit('edit', this.state.data);
  }

  getSize() {
    return this.sizes[this.props.size] ? this.props.size : 'sm';
  }

  refresh(force) {
    this.setState({ fetching: true });
    this.props.getData(force).then(r => {
      this.setState({ data: r, fetching: false });
    }).catch(e => this.setState({ error: e, fetching: false }));
  }

  generateLegend(chart) {
    const legend = this.refs.legend;
    chart.generateLegend().forEach(n => {
      legend.appendChild(n);
    });
  }

  destroyLegend() {
    this.refs.legend.innerHTML = '';
  }

  render() {
    const { title, siteId, period } = this.props;
    return (
      <section className={`card card--${this.getSize()}`}>
        <div className="card__toolbar">
          <nav className="settings">
            <a className="settings__element"><Icon className={['icon', 'icon--settings']} /></a>
            <ul className="sub">
              <li className="sub__item">
                <Link className="sub__link" to={`/${period}/${siteId}`}>Back to site view</Link>
              </li>
              <li className="sub__item">
                <Link
                  className="sub__link" to={`/${period}/${siteId}/reports`}
                >Back to reports</Link>
              </li>
              <li className="sub__item">
                <a className="disabled sub__link">Export to PDF</a>
              </li>
              <li className="sub__item">
                <a className="sub__link" onClick={this.onExcelClick}>Export to Excel</a>
              </li>
            </ul>
          </nav>
          <span className="card__title">{title}</span>
          <div ref="legend" className="card__legend"></div>
        </div>
        <div className="card__data-report">
          <form ref="form" method="post" action="https://demo-api.thering.co/report">
            <div>
              {
                this.state.fetching ?
                  <Spinner /> :
                  <Chart
                    ref="chart" width={this.sizes[this.getSize()]} height="400"
                    data={this.state.data} generateLegend={this.generateLegend}
                    destroyLegend={this.destroyLegend} hidden={this.props.hidden}
                    chartType={this.props.chartType}
                  />
              }
              <canvas
                ref="hiddenChart" style={{ position: 'absolute', left: '-9999px' }}
                width={this.sizes[this.getSize()]} height="400"
              ></canvas>
              <input ref="image" type="hidden" name="image" />
            </div>
            {
              this.state.fetching ?
                <Spinner /> :
                <Table
                  ref="table" scrollable="true" header={['Date', ['Google', 'Yandex', 'Median']]}
                  data={this.state.data}
                />
            }
            <input type="hidden" name="userId" value={window.localStorage.getItem('user.id')} />
            <input
              type="hidden" name="authToken"
              value={window.localStorage.getItem('user.authToken')}
            />
          </form>
        </div>
      </section>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string,
  siteId: PropTypes.string,
  period: PropTypes.string,
  size: PropTypes.string,
  showEdit: PropTypes.func,
  getData: PropTypes.func,
  chartType: PropTypes.string,
  hidden: PropTypes.any
};
