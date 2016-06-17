'use strict';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default function Links(props) {
  const { period, link } = props;
  return (
    <div className="header__element header__element--links">
      <Link
        className={`header__link header__link--${period === 'monthly' ? 'active' : ''}`}
        to={`/monthly${link}`}
      >
      Monthly
      </Link>
      <Link
        className={`header__link header__link--${period === 'weekly' ? 'active' : ''}`}
        to={`/weekly${link}`}
      >
      Weekly
      </Link>
      <a className="disabled header__link header__link--disabled">Period</a>
    </div>
  );
}

Links.propTypes = {
  period: PropTypes.string,
  link: PropTypes.string
};
