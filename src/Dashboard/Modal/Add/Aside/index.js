'use strict';

import React, { PropTypes, Component } from 'react';
import Counter from './Counter';

export default class Aside extends Component {
  render() {
    const { type, counters, handleChoice } = this.props;
    const className = (type === 'google') ? 'left' : 'right';

    const data = [];
    for (const key in counters) {
      const counter = counters[key];
      if (!counter.used) {
        data.push(
          <Counter
            key={counter.ga}
            type={type}
            val={counter.ga}
            id={counter.id}
            site={counter.site}
            handleChoice={handleChoice}
          />
        );
      }
    }

    return (
      <aside
        ref="counter" className={`modal__aside modal__aside--${className}`}
        data-scrollable="true" style={{ display: 'none' }}
      >
        <ul className="counters-list">
          {data}
        </ul>
      </aside>
    );
  }
}

Aside.propTypes = {
  type: PropTypes.string,
  counters: PropTypes.object,
  handleChoice: PropTypes.func
};
