'use strict';

import React, { PropTypes, Component } from 'react';
import Icon from './Icon';

export default class Field extends Component {
  render() {
    const {
      addonType,
      addonContent,
      inputType,
      inputPlaceholder,
      value,
      stateValue,
      status,
      readonly,
      handleChange
    } = this.props;
    return inputType === 'hidden' ? <input ref="input" type={inputType} defaultValue={value} /> : (
      <div className={`form__element form__element--${status}`}>
        <div className="form__field">
          {
            addonType === 'text' ?
              <span className={`form__field-${addonType}`}>{addonContent}</span> :
              <Icon className={[addonType, addonContent]} />
          }
          {
            stateValue !== undefined ?
              <input
                className="input form__input input--text" ref="input"
                type={inputType} placeholder={inputPlaceholder} value={stateValue}
                onChange={handleChange} readOnly={readonly ? 'readonly' : ''}
              /> :
              <input
                className="input form__input input--text" ref="input"
                type={inputType} placeholder={inputPlaceholder} defaultValue={value}
                onChange={handleChange} readOnly={readonly ? 'readonly' : ''}
              />
          }
        </div>
        <hr />
      </div>
    );
  }
}

Field.propTypes = {
  addonType: PropTypes.string,
  addonContent: PropTypes.string,
  inputType: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  value: PropTypes.any,
  stateValue: PropTypes.any,
  status: PropTypes.string,
  readonly: PropTypes.any,
  handleChange: PropTypes.func
};
