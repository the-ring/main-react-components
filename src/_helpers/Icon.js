'use strict';

import React, { PropTypes, Component } from 'react';
import equal from 'deep-equal';

export default class Icon extends Component {
  shouldComponentUpdate(nextProps) {
    return !equal(nextProps.className, this.props.className);
  }

  render() {
    const { className } = this.props;
    return <span className={className.join(' ')} />;
  }
}

Icon.propTypes = {
  className: PropTypes.array.isRequired
};
