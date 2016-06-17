'use strict';

import React, { PropTypes, Component } from 'react';
import Field from '../../../../_helpers/Field';
import Connect from './Connect';
import Buttons from '../../../../_helpers/Buttons';

export default class Form extends Component {
  render() {
    return (
      <div className="modal__form">
        <Field
          ref="name" addonType="icon" addonContent="icon--user"
          inputType="text" inputPlaceholder="name" value={this.props.name}
        />
        <Field
          ref="email" addonType="icon" addonContent="icon--mail" inputType="text"
          inputPlaceholder="email"
          value={this.props.login || window.localStorage.getItem('user.login')}
        />
        <Field
          ref="password" addonType="icon" addonContent="icon--lock"
          inputType="password" inputPlaceholder="New password"
        />
        <Field
          ref="repassword" addonType="icon" addonContent="icon--lock"
          inputType="password" inputPlaceholder="Repeat new password"
        />
        <Connect
          yandex={this.props.yandex} connectYandex={this.props.connectYandex}
          google={this.props.google} connectGoogle={this.props.connectGoogle}
        />
        <Buttons
          onSaveBtnClick={this.props.onSaveBtnClick} onCancelBtnClick={this.props.onCancelBtnClick}
        />
      </div>
    );
  }
}

Form.propTypes = {
  name: PropTypes.string,
  login: PropTypes.string,
  yandex: PropTypes.bool,
  google: PropTypes.bool,
  connectYandex: PropTypes.func,
  connectGoogle: PropTypes.func,
  onSaveBtnClick: PropTypes.func,
  onCancelBtnClick: PropTypes.func
};
