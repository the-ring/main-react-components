'use strict';

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Buttons from './Buttons';
import { register } from '../_actions';
import Icon from '../../_helpers/Icon';
import Field from '../../_helpers/Field';

function validateEmail(email) {
  // eslint-disable-next-line max-len
  const exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return exp.test(email);
}

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: { value: '', status: '' },
      password: { value: '', secondValue: '', status: '' }
    };

    this.onSignupClick = this.onSignupClick.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkRePassword = this.checkRePassword.bind(this);
    this.checkForm = this.checkForm.bind(this);
  }

  componentWillMount() {
    const { history } = this.context;
    const isLoggedIn = window.localStorage.getItem('user.id') &&
      window.localStorage.getItem('user.authToken');
    if (isLoggedIn) {
      history.push('/');
    }
  }

  componentDidMount() {
    document.querySelector('body').classList.add('center');
  }

  componentDidUpdate() {
    const { history } = this.context;
    const { login } = this.props;
    const isLoggedIn = window.localStorage.getItem('user.id') &&
      window.localStorage.getItem('user.authToken');
    if (!login.error && isLoggedIn) {
      history.push('/');
    }
  }

  componentWillUnmount() {
    document.querySelector('body').classList.remove('center');
  }

  onSignupClick(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const { doRegister } = this.props;
    if (this.checkForm()) {
      doRegister(email.value, password.value, password.secondValue);
    }
  }

  checkEmail(e) {
    const value = e.target.value.trim();
    const status = validateEmail(value) ? 'success' : 'error';
    this.setState({ email: { value, status } });
  }

  checkPassword(e) {
    const { password } = this.state;
    const value = e.target.value.trim();
    const status = value === password.secondValue ? 'success' : 'error';
    this.setState({ password: { ...password, value, status } });
  }

  checkRePassword(e) {
    const { password } = this.state;
    const secondValue = e.target.value.trim();
    const status = secondValue === password.value ? 'success' : 'error';
    this.setState({ password: { ...password, secondValue, status } });
  }

  checkForm() {
    const { email, password } = this.state;
    return email.status === 'success' && password.status === 'success';
  }

  render() {
    const { email, password } = this.state;
    const status = (this.props.login && this.props.login.error) ? 'error' : '';
    return (
      <section className="login">
        <div className="login__logo">
          <Icon className={['icon', 'icon--logo']} />
          <span>The Ring</span>
        </div>
        <div className="login__form">
          <Field
            status={status || email.status} stateValue={email.value} handleChange={this.checkEmail}
            addonType="icon" addonContent="icon--user" ref="email" inputType="email"
            inputPlaceholder="name@example.com"
          />
          <Field
            status={status || password.status} stateValue={password.value}
            handleChange={this.checkPassword} addonType="icon" addonContent="icon--lock"
            ref="password" inputType="password" inputPlaceholder="password"
          />
          <Field
            status={status || password.status} stateValue={password.secondValue}
            handleChange={this.checkRePassword} addonType="icon" addonContent="icon--lock"
            ref="rePassword" inputType="password" inputPlaceholder="repeat password"
          />
        </div>
        <Buttons disabled={this.checkForm() || 'disabled'} onSignupClick={this.onSignupClick} />
      </section>
    );
  }
}

Signup.contextTypes = {
  history: PropTypes.object.isRequired
};

Signup.propTypes = {
  login: PropTypes.object,
  doRegister: PropTypes.func
};

function mapStateToProps(state) {
  return {
    login: { ...state.login }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    doRegister: bindActionCreators(register, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
