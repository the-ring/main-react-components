'use strict';

import React, { PropTypes } from 'react';
import Counter from './Counter';

export default function Counters(props) {
  return (
    <div className="counters-choice">
      <Counter type="google" text="Google counter" onChangeSelect={props.onChange} />
      <Counter type="yandex" text="Yandex counter" onChangeSelect={props.onChange} />
    </div>
  );
}

Counters.propTypes = {
  onChange: PropTypes.func
};
