'use strict';

import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import TimeAgo from 'react-timeago';
import equal from 'deep-equal';
import Chart from '../../../_helpers/Chart';
import Icon from '../../../_helpers/Icon';
import Spinner from '../../../_helpers/Spinner';
import Info from './Info';

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = { data: {}, error: null, fetching: false };

    this.refresh = this.refresh.bind(this);

    this.generateLegend = this.generateLegend.bind(this);
    this.destroyLegend = this.destroyLegend.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
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
    const { data: nextPropsData } = nextProps;
    const { data: propsData } = this.props;

    return !(
      equal(nextPropsData, propsData) &&
      equal(nextState, this.state) &&
      this.props.period === nextProps.period
    );
  }

  onDeleteClick(e) {
    e.preventDefault();
    this.props.delete(this.props.data.id);
    this.props.unuseCounter('google', this.props.data.google);
    this.props.unuseCounter('yandex', this.props.data.yandex);
  }

  onEditClick(e) {
    e.preventDefault();
    this.props.showEdit('edit', this.props.data);
  }

  refresh(force) {
    this.setState({ fetching: true });
    this.props.getData(this.props.siteId, 'views', force).then(r => {
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
    const { data, period } = this.props;
    return (
      <section ref="card" className="card card--sm">
        <div className="card__toolbar">
          <nav className="settings">
            <a className="settings__element"><Icon className={['icon', 'icon--settings']} /></a>
            <ul className="sub">
              <li className="sub__item">
                <Link className="sub__link" to={`/${period}/${data.id}`}>View site</Link>
              </li>
              <li className="sub__item">
                <Link
                  className="sub__link" to={`/${period}/${data.id}/reports`}
                >View site reports</Link>
              </li>
              <li className="sub__item">
                <a
                  className="sub__link" href={`/${period}/${data.id}/edit`}
                  onClick={this.onEditClick}
                >Edit site</a>
              </li>
              <li className="sub__item">
                <a
                  className="sub__link" href={`/${period}/${data.id}/delete`}
                  onClick={this.onDeleteClick}
                >Delete site</a>
              </li>
            </ul>
          </nav>
          <span className="card__title">
          {
            this.state.data &&
            this.state.data.timestamp &&
              <small>Updated <TimeAgo date={new Date(this.state.data.timestamp)} /></small>
          }
          </span>
          <div ref="legend" className="card__legend"></div>
        </div>
        <Info {...data} period={period} />
        <div className="card__data">
          {
            this.state.fetching ?
              <Spinner /> :
              <Chart
                ref="chart" width="400" height="215" data={this.state.data}
                generateLegend={this.generateLegend} destroyLegend={this.destroyLegend}
                hidden={['median']} chartType="bar"
              />
          }
        </div>
      </section>
    );
  }
}

Card.propTypes = {
  period: PropTypes.string,
  siteId: PropTypes.string,
  data: PropTypes.object,
  getData: PropTypes.func,
  showEdit: PropTypes.func,
  delete: PropTypes.func,
  unuseCounter: PropTypes.func
};
