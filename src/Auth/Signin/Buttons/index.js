'use strict';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default function LoginButtons(props) {
  const { disabled } = props;
  return (
    <div className="login__buttons">
      <a
        className={`button button--sign-in button--${disabled || ''}`}
        onClick={props.onLoginClick}
      >sign in</a>
      <Link to="/signup" className="restore">don't have an account?</Link>
    </div>
  );
}

LoginButtons.propTypes = {
  disabled: PropTypes.any,
  onLoginClick: PropTypes.func
};
