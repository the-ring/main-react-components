'use strict';

import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import equal from 'deep-equal';
import Chart from '../../../_helpers/Chart';
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
    const { title, dataType, siteId, period } = this.props;
    return (
      <section className={`card card--${this.getSize()}`}>
        <div className="card__toolbar">
          <nav className="settings">
            <a className="settings__element"><Icon className={['icon', 'icon--settings']} /></a>
            <ul className="sub">
              <li className="sub__item">
                <Link
                  className="sub__link"
                  to={`/${period}/${siteId}/reports/${dataType}`}
                >View report</Link>
              </li>
              <li className="sub__item">
                <a
                  className="disabled sub__link"
                  href={`/${period}/${siteId}/edit`} onClick={this.onEditClick}
                >Edit widget</a>
              </li>
              <li className="sub__item">
                <a
                  className="disabled sub__link"
                  href={`/${period}/${siteId}/delete`} onClick={this.onDeleteClick}
                >Delete widget</a>
              </li>
            </ul>
          </nav>
          <span className="card__title" title="View report">
            <Link to={`/${period}/${siteId}/reports/${dataType}`}>{title}</Link>
          </span>
          <div ref="legend" className="card__legend"></div>
        </div>
        <div className="card__data">
          {
            this.state.fetching ?
              <Spinner /> :
              <Chart
                width={this.sizes[this.getSize()]} height="300" data={this.state.data}
                generateLegend={this.generateLegend} destroyLegend={this.destroyLegend}
                hidden={this.props.hidden} chartType={this.props.chartType}
              />
          }
        </div>
      </section>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string,
  chartType: PropTypes.string,
  dataType: PropTypes.string,
  siteId: PropTypes.string,
  period: PropTypes.string,
  size: PropTypes.string,
  hidden: PropTypes.array,
  getData: PropTypes.func,
  showEdit: PropTypes.func
};
