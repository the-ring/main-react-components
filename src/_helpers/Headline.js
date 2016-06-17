'use strict';

import React, { PropTypes } from 'react';

export default function Headline(props) {
  return <span className="modal__headline">{props.title}</span>;
}

Headline.propTypes = {
  title: PropTypes.string.isRequired
};
