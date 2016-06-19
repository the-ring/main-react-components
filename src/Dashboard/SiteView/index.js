'use strict';

import 'whatwg-fetch';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { getSiteData, getSite } from '../_actions';

class SiteView extends Component {
  constructor(props) {
    super(props);

    const { siteId } = this.props;

    this.state = { id: siteId, data: {}, error: null, fetching: false };
    this.refresh = this.refresh.bind(this, siteId);

    this.getSiteViews = getSiteData.bind(this, siteId, 'views');
    this.getSiteUsers = getSiteData.bind(this, siteId, 'users');
    this.getSiteDevice = getSiteData.bind(this, siteId, 'device');
    this.getSiteBounce = getSiteData.bind(this, siteId, 'bounce');
    this.getSitePageDepth = getSiteData.bind(this, siteId, 'pageDepth');
  }

  componentWillMount() {
    const { period, siteId } = this.props;
    const { history } = this.context;
    if (period === 'weekly' || period === 'monthly') {
      window.localStorage.setItem('period', period);
    } else {
      window.localStorage.setItem('period', 'weekly');
      history.push(`/weekly/${siteId}`);
    }
  }

  componentDidMount() {
    this.refresh();
  }

  refresh(siteId) {
    this.setState({ fetching: true });
    getSite(siteId, Date.now()).then(r => {
      this.setState({ data: r, fetching: false });
    }).catch(e => this.setState({ error: e, fetching: false }));
  }

  render() {
    const { showModal, path, siteId, period } = this.props;
    const link = `/${siteId}`;
    return (
      <main className="main">
        <Header
          showSettings={showModal} data={this.state.data}
          user={this.props.user} link={link} period={period}
          type="site view"
        />
        <Sidebar path={path} showSettings={showModal} period={period} forceRefresh={this.refs} />
        <section className="cards main__cards main__cards--sites-view">
          <Card
            ref="1" period={period} siteId={siteId} dataType="users"
            getData={this.getSiteUsers} size="md" title="Users"
            hidden={['median']} type="chart" chartType="bar" showEdit={showModal}
          />
          <Card
            ref="2" period={period} siteId={siteId} dataType="bounce"
            getData={this.getSiteBounce} size="sm" title="Bounce Rate"
            hidden={['google', 'yandex']} type="chart3" chartType="line"
            showEdit={showModal}
          />
          <Card
            ref="4" period={period} siteId={siteId} dataType="pageDepth"
            getData={this.getSitePageDepth} size="sm" title="Page Depth"
            hidden={['google', 'yandex']} type="chart" chartType="line"
            showEdit={showModal}
          />
          <Card
            ref="5" period={period} siteId={siteId} dataType="views"
            getData={this.getSiteViews} size="md" title="Page Views"
            hidden={['median']} type="chart" chartType="bar"
            showEdit={showModal}
          />
          <Card
            ref="6" period={period} siteId={siteId} dataType="device"
            getData={this.getSiteDevice} size="sm" title="Device Type (Google)"
            hidden={['median', 'yandex']} type="chart" chartType="doughnut"
            showEdit={showModal}
          />
          <Card
            ref="7" period={period} siteId={siteId} dataType="device"
            getData={this.getSiteDevice} size="sm" title="Device Type (Yandex)"
            hidden={['median', 'google']} type="chart" chartType="doughnut"
            showEdit={showModal}
          />
          <Card
            ref="8" period={period} siteId={siteId} dataType="device"
            getData={this.getSiteDevice} size="sm" title="Device Type (Median)"
            hidden={['google', 'yandex']} type="chart" chartType="doughnut"
            showEdit={showModal}
          />
        </section>
      </main>
    );
  }
}

SiteView.contextTypes = {
  history: PropTypes.object.isRequired
};

SiteView.propTypes = {
  period: PropTypes.string,
  siteId: PropTypes.string,
  path: PropTypes.string,
  user: PropTypes.object,
  showModal: PropTypes.func
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(SiteView);
