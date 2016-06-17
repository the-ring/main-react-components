'use strict';

import React, { PropTypes } from 'react';

export default function Row(props) {
  const { data } = props;
  return (
    <div className="table__row">
      { // eslint-disable-next-line arrow-body-style
        data.map((r, i) => {
          return Array.isArray(r) ?
            <span key={i} className="table"><Row key={i} data={r} /></span> :
            <span key={i} className="center" title={r}>{r}</span>;
        })
      }
    </div>
  );
}

Row.propTypes = {
  data: PropTypes.array
};
