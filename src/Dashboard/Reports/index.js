'use strict';

import 'whatwg-fetch';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { getSite, getSiteData } from '../_actions';

class Reports extends Component {
  constructor(props) {
    super(props);

    const { siteId } = this.props;

    this.refresh = this.refresh.bind(this, siteId);

    this.state = { id: siteId, data: {}, error: null, fetching: false };

    this.getSiteViews = getSiteData.bind(this, siteId, 'views');
    this.getSiteUsers = getSiteData.bind(this, siteId, 'users');
    this.getSiteDevice = getSiteData.bind(this, siteId, 'device');
    this.getSiteBounce = getSiteData.bind(this, siteId, 'bounce');
    this.getSitePageDepth = getSiteData.bind(this, siteId, 'pageDepth');
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
    const { showModal, path, period, siteId } = this.props;
    const link = `/${siteId}/reports`;
    return (
      <main className="main">
        <Header
          showSettings={showModal} data={this.state.data} user={this.props.user}
          link={link} period={period} type="reports"
        />
        <Sidebar path={path} showSettings={showModal} period={period} forceRefresh={this.refs} />
        <section className="cards main__cards">
          <Card
            ref="1" period={period} siteId={siteId} dataType="users"
            getData={this.getSiteUsers} size="sm" title="Users report"
          />
          <Card
            ref="2" period={period} siteId={siteId} dataType="bounce"
            getData={this.getSiteBounce} size="sm" title="Bounce Rate report"
          />
          <Card
            ref="3" period={period} siteId={siteId} dataType="pageDepth"
            getData={this.getSitePageDepth} size="sm" title="Page Depth report"
          />
          <Card
            ref="4" period={period} siteId={siteId} dataType="views"
            getData={this.getSiteViews} size="sm" title="Page Views report"
          />
        </section>
      </main>
    );
  }
}

Reports.propTypes = {
  showModal: PropTypes.func,
  path: PropTypes.string,
  period: PropTypes.string,
  siteId: PropTypes.string,
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Reports);
