'use strict';

import React, { PropTypes, Component } from 'react';

export default class Counter extends Component {
  constructor(props) {
    super(props);

    this.handleChoice = this.handleChoice.bind(this);
  }

  handleChoice() {
    this.props.handleChoice(this.props.type, this.props.val);
  }

  render() {
    const { type, id, site, val } = this.props;
    return (
      <label className="counter counters-list__element input__label">
        <input
          className="input counter__input input--radio"
          type="radio" name={`${type}-counter`} value={val} onChange={this.handleChoice}
        />
        <span className="counter__id">{id}<small className="counter__site">{site}</small></span>
      </label>
    );
  }
}

Counter.propTypes = {
  type: PropTypes.string,
  id: PropTypes.any,
  site: PropTypes.string,
  val: PropTypes.any,
  handleChoice: PropTypes.func
};
