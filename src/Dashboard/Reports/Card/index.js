'use strict';

import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import TimeAgo from 'react-timeago';
import equal from 'deep-equal';
import Icon from '../../../_helpers/Icon';
import Spinner from '../../../_helpers/Spinner';
import Info from './Info';
import Table from './Table';

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = { data: {}, error: null, fetching: false };

    this.refresh = this.refresh.bind(this);
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

  refresh(force) {
    this.setState({ fetching: true });
    this.props.getData(force).then(r => {
      this.setState({ data: r, fetching: false });
    }).catch(e => this.setState({ error: e, fetching: false }));
  }

  render() {
    const { title, siteId, period, dataType } = this.props;
    return (
      <section ref="card" className="card card--sm">
        <div className="card__toolbar">
          <nav className="settings">
            <a className="settings__element"><Icon className={['icon', 'icon--settings']} /></a>
            <ul className="sub">
              <li className="sub__item">
                <Link
                  className="sub__link" to={`/${period}/${siteId}/reports/${dataType}`}
                >View this report</Link>
              </li>
            </ul>
          </nav>
          <span className="card__title">{
              this.state.data &&
              this.state.data.timestamp &&
                <small>Updated <TimeAgo date={new Date(this.state.data.timestamp)} /></small>
          }</span>
          <div ref="legend" className="card__legend"></div>
        </div>
        <Info id={siteId} title={title} type={dataType} period={period} />
        <div className="card__data">
          {
            this.state.fetching ?
              <Spinner /> :
              <Table
                ref="table" scrollable="true"
                header={['Date', ['Google', 'Yandex', 'Median']]} data={this.state.data}
              />
          }
        </div>
      </section>
    );
  }
}

Card.propTypes = {
  getData: PropTypes.func,
  title: PropTypes.string,
  period: PropTypes.string,
  siteId: PropTypes.string,
  dataType: PropTypes.string
};
