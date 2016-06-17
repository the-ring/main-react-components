'use strict';

import 'whatwg-fetch';
import equal from 'deep-equal';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Card from './Card';
import Header from '../Header';
import Sidebar from '../Sidebar';
import * as actions from '../_actions';

class Sites extends Component {
  constructor(props) {
    super(props);

    this.c = false;

    this.refresh = this.refresh.bind(this);
    this.getCountersTimestamp = this.getCountersTimestamp.bind(this);
    this.getSiteViews = actions.getSiteData.bind(this);
  }

  componentWillMount() {
    const { period } = this.props;
    const { history } = this.context;
    if (period === 'weekly' || period === 'monthly') {
      window.localStorage.setItem('period', period);
    } else {
      window.localStorage.setItem('period', 'weekly');
      history.push('/weekly');
    }
  }

  componentDidMount() {
    this.refresh();
  }

  shouldComponentUpdate(nextProps) {
    const { user: nextUser, sites: nextSites, counters: nextCounters } = nextProps;
    const { user, sites, counters } = this.props;

    return !(
      equal(nextUser, user) &&
      equal(nextSites, sites) &&
      equal(nextCounters, counters) &&
      this.props.period === nextProps.period
    );
  }

  componentDidUpdate() {
    const { user } = this.props;
    if (!this.c && user.google && user.yandex) {
      this.props.actions.getCounters(0);
      this.c = true;
    }
  }

  getCountersTimestamp() {
    const { counters } = this.props;
    return counters.timestamp || 0;
  }

  refresh() {
    const { user } = this.props;
    const timestamp = Date.now();

    if (user.google && user.yandex && timestamp - this.getCountersTimestamp() > 5 * 60 * 1000) {
      this.props.actions.getCounters(timestamp);
      this.c = true;
    }

    this.props.actions.getSites();
  }

  render() {
    const { sites, showModal, path, period } = this.props;
    const link = '';
    const c = [];

    for (const key in sites) {
      c.push(
        <Card
          ref={key} key={key} refresh={this.refresh} period={period}
          data={sites[key]} delete={this.props.actions.deleteSite}
          unuseCounter={this.props.actions.unuseCounter} showEdit={showModal}
          getData={this.getSiteViews} siteId={key}
        />
      );
    }
    return (
      <main className="main">
        <Header
          showAdd={showModal} showSettings={showModal}
          user={this.props.user} link={link} period={period}
        />
        <Sidebar path={path} showSettings={showModal} period={period} forceRefresh={this.refs} />
        <section className="cards main__cards">
          {(!c || !c.length) && <p>Nothing to see here</p>}
          {c}
        </section>
      </main>
    );
  }
}

Sites.contextTypes = {
  history: PropTypes.object.isRequired
};

Sites.propTypes = {
  sites: PropTypes.object,
  user: PropTypes.object,
  counters: PropTypes.object,
  actions: PropTypes.object,
  period: PropTypes.string,
  path: PropTypes.string,
  showModal: PropTypes.func
};

function mapStateToProps(state) {
  return {
    counters: state.counters,
    sites: state.sites.site.data,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sites);
