'use strict';

import React, { PropTypes, Component } from 'react';

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    const { onChangeSelect, type } = this.props;
    onChangeSelect(type, this.refs.input.checked);
  }

  render() {
    const { type, text } = this.props;
    return (
      <label className="counter counters-choice__element input__label">
        <input
          className="input counter__input input--checkbox" ref="input"
          type="checkbox" onChange={this.onChange}
        />
        <span className={`input__icon input__icon--circle input__icon--${type}`}></span>
        <span className="counter__type">{text}</span>
      </label>
    );
  }
}

Counter.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  onChangeSelect: PropTypes.func
};
