'use strict';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default function Info(props) {
  const { id, title, url, period } = props;
  return (
    <div className="card__info">
      <span className="card__info-name"><Link to={`/${period}/${id}`}>{title}</Link></span>
      <a className="card__info-site" href="#">{url}</a>
    </div>
  );
}

Info.propTypes = {
  id: PropTypes.any,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  period: PropTypes.string
};
