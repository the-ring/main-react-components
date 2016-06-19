'use strict';

import React, { PropTypes, Component } from 'react';
import config from '../../../../../_config';

export default class Connect extends Component {
  constructor(props) {
    super(props);

    this.onConnectGoogleClick = this.onConnectGoogleClick.bind(this);
    this.onConnectYandexClick = this.onConnectYandexClick.bind(this);
  }

  componentDidMount() {
    window.connectYandex = this.props.connectYandex;
    window.connectGoogle = this.props.connectGoogle;
  }

  onConnectGoogleClick(e) {
    e.preventDefault();
    const userId = window.localStorage.getItem('user.id');
    const state = window.btoa(`${userId}|${config.frontend.connectUrl}`);
    if (!this.props.google) {
      window.open(
        `${config.backend.url}${config.backend.connectUrl}/google?state=${state}`,
        'connectGoogle',
        'width=800,height=600,scrollbars=yes'
      );
    }
  }

  onConnectYandexClick(e) {
    e.preventDefault();
    const userId = window.localStorage.getItem('user.id');
    const state = window.btoa(`${userId}|${config.frontend.connectUrl}`);
    if (!this.props.yandex) {
      window.open(
        `${config.backend.url}${config.backend.connectUrl}/yandex?state=${state}`,
        'connectYandex',
        'width=800,height=600,scrollbars=yes'
      );
    }
  }

  render() {
    const { yandex, google } = this.props;
    return (
      <div className="modal__connect">
        <a
          className={`button button--google ${google ? 'disabled' : ''}`}
          onClick={this.onConnectGoogleClick}
        >{google ? 'Google connected' : 'Connect with Google'}</a>
        <a
          className={`button button--yandex ${yandex ? 'disabled' : ''}`}
          onClick={this.onConnectYandexClick}
        >{yandex ? 'Yandex connected' : 'Connect with Yandex'}</a>
      </div>
    );
  }
}

Connect.propTypes = {
  yandex: PropTypes.bool,
  google: PropTypes.bool,
  connectYandex: PropTypes.func,
  connectGoogle: PropTypes.func
};
