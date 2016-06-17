'use strict';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default function RegisterButtons(props) {
  const { disabled } = props;
  return (
    <div className="login__buttons">
      <a
        className={`button button--sign-up button--${disabled || ''}`}
        onClick={props.onSignupClick}
      >sign up</a>
      <Link to="/login" className="restore">already have an account?</Link>
    </div>
  );
}

RegisterButtons.propTypes = {
  disabled: PropTypes.any,
  onSignupClick: PropTypes.func
};
