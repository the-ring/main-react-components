'use strict';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default function Info(props) {
  const { id, title, type, period } = props;
  return (
    <div className="card__info">
      <span className="card__info-name">
        <Link to={`/${period}/${id}/reports/${type}`}>{title}</Link>
      </span>
    </div>
  );
}

Info.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  period: PropTypes.string,
  type: PropTypes.string
};
