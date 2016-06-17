'use strict';

import 'whatwg-fetch';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { getSite, getSiteData } from '../_actions';

class ReportView extends Component {
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
    const { period, siteId, reportId } = this.props;
    const { history } = this.context;
    if (period === 'weekly' || period === 'monthly') {
      window.localStorage.setItem('period', period);
    } else {
      window.localStorage.setItem('period', 'weekly');
      history.push(`/weekly/${siteId}/${reportId}`);
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
    const { showModal, path, siteId, reportId, period } = this.props;
    const link = `/${siteId}/reports/${reportId}`;
    const card = () => {
      switch (reportId) {
        case 'views':
          return (<Card
            ref="report" period={period} siteId={siteId} getData={this.getSiteViews}
            size="xl" title="Views" hidden={['median']} chartType="bar" showEdit={showModal}
          />);
        case 'users':
          return (<Card
            ref="report" period={period} siteId={siteId} getData={this.getSiteUsers}
            size="xl" title="Users" hidden={['median']} chartType="bar" showEdit={showModal}
          />);
        case 'device':
          return (<Card
            ref="report" period={period} siteId={siteId} getData={this.getSiteDevice}
            size="xl" title="Device" hidden={['median']} chartType="bar" showEdit={showModal}
          />);
        case 'bounce':
          return (<Card
            ref="report" period={period} siteId={siteId} getData={this.getSiteBounce}
            size="xl" title="Bounce" hidden={['median']} chartType="bar" showEdit={showModal}
          />);
        case 'pageDepth':
          return (<Card
            ref="report" period={period} siteId={siteId} getData={this.getSitePageDepth}
            size="xl" title="Page Depth" hidden={['median']} chartType="bar" showEdit={showModal}
          />);
        default:
          return (<Card
            ref="report" period={period} siteId={siteId} getData={this.getSiteViews}
            size="xl" title="Views" hidden={['median']} chartType="bar" showEdit={showModal}
          />);
      }
    };
    return (
      <main className="main">
        <Header
          showSettings={showModal} data={this.state.data} user={this.props.user}
          link={link} period={period} type={`${reportId} report`}
        />
        <Sidebar path={path} showSettings={showModal} period={period} forceRefresh={this.refs} />
        <section className="cards main__cards">
          {card()}
        </section>
      </main>
    );
  }
}

ReportView.propTypes = {
  path: PropTypes.string,
  period: PropTypes.string,
  siteId: PropTypes.string,
  reportId: PropTypes.string,
  showModal: PropTypes.func,
  user: PropTypes.object
};

ReportView.contextTypes = {
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(ReportView);
