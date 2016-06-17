'use strict';

import React, { PropTypes } from 'react';
import Icon from './Icon';

export default function Buttons(props) {
  const { disabled } = props;
  return (
    <div className="modal__buttons">
      <a
        className={`button button--save button--${disabled || ''}`}
        onClick={props.onSaveBtnClick}
      >save</a>
      <a className="button button--cancel" onClick={props.onCancelBtnClick}>
        <Icon className={['icon', 'icon--cross']} />
      </a>
    </div>
  );
}

Buttons.propTypes = {
  disabled: PropTypes.any,
  onSaveBtnClick: PropTypes.func.isRequired,
  onCancelBtnClick: PropTypes.func.isRequired
};
