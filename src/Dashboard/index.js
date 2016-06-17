'use strict';

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getSettings } from './_actions';

import ModalAdd from './Modal/Add';
import ModalEdit from './Modal/Edit';
import ModalSettings from './Modal/Settings';
import Sites from './Sites';
import SiteView from './SiteView';
import Reports from './Reports';
import ReportView from './ReportView';
import Footer from './Footer';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { modal: { type: null, show: false, data: {} } };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.c = false;
  }

  componentDidMount() {
    this.props.getSettings();
    Chart.defaults.global.defaultFontColor = '#fff';
    Chart.defaults.global.defaultFontFamily = 'Roboto';

    if (window.localStorage.getItem('firstTime') === 'true') {
      this.showModal('settings');
      window.localStorage.setItem('firstTime', false);
    }
  }

  showModal(type, data) {
    this.setState({ modal: { type, show: true, data } });
  }

  hideModal(type) {
    this.setState({ modal: { type, show: false } });
  }

  render() {
    const { route, routeParams } = this.props;
    const { modal } = this.state;
    return (
      <section>
        {
          modal.type === 'add' && modal.show &&
            <ModalAdd type={modal.type} hide={this.hideModal} />
        }
        {
          modal.type === 'edit' && modal.show &&
            <ModalEdit type={modal.type} data={modal.data} hide={this.hideModal} />
        }
        {
          modal.type === 'settings' && modal.show &&
            <ModalSettings type={modal.type} hide={this.hideModal} />
        }
        {
          route.path === '/:period' &&
            <Sites path={route.path} showModal={this.showModal} period={routeParams.period} />
        }
        {
          route.path === '/:period/:id' &&
            <SiteView
              path={route.path} showModal={this.showModal}
              siteId={routeParams.id} period={routeParams.period}
            />
        }
        {
          route.path === '/:period/:id/reports' &&
            <Reports
              path={route.path} showModal={this.showModal}
              siteId={routeParams.id} period={routeParams.period}
            />
        }
        {
          route.path === '/:period/:id/reports/:report' &&
            <ReportView
              path={route.path} showModal={this.showModal}
              siteId={routeParams.id} reportId={routeParams.report} period={routeParams.period}
            />
        }
        <Footer />
        {this.props.children}
      </section>
    );
  }
}

Dashboard.propTypes = {
  route: PropTypes.object,
  routeParams: PropTypes.object,
  getSettings: PropTypes.func,
  children: PropTypes.any
};

function mapDispatchToProps(dispatch) {
  return {
    getSettings: bindActionCreators(getSettings, dispatch)
  };
}

export default connect(() => ({}), mapDispatchToProps)(Dashboard);
