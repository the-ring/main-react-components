'use strict';

import React, { PropTypes, Component } from 'react';

export default class Connect extends Component {
  componentDidMount() {
    const { location } = this.props;
    if (window.opener) {
      if (location.query.yandex && window.opener.connectYandex) {
        window.opener.connectYandex(location.query.yandex === 'true');
      }

      if (location.query.google && window.opener.connectGoogle) {
        window.opener.connectGoogle(location.query.google === 'true');
      }
    }

    window.close();
  }

  render() {
    return <div />;
  }
}

Connect.propTypes = {
  location: PropTypes.object
};
