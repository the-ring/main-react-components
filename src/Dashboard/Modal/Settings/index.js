'use strict';

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { saveSettings, connectYandex, connectGoogle } from '../../_actions';

import Headline from '../../../_helpers/Headline';
import Form from './Form';

class ModalSettings extends Component {
  constructor(props) {
    super(props);

    this.onClickOutside = this.onClickOutside.bind(this);
    this.onSaveBtnClick = this.onSaveBtnClick.bind(this);
    this.onCancelBtnClick = this.onCancelBtnClick.bind(this);
  }

  componentDidMount() {
    this.refs.modal.addEventListener('click', this.onClickOutside);
  }

  componentWillUnmount() {
    this.refs.modal.removeEventListener('click', this.onClickOutside);
  }

  onClickOutside(e) {
    if (this.refs.modal === e.target) {
      this.props.hide('settings');
    }
  }

  onSaveBtnClick(e) {
    e.preventDefault();
    const form = this.refs.form;
    this.props.saveSettings({
      login: form.refs.email.refs.input.value,
      name: form.refs.name.refs.input.value,
      password: form.refs.password.refs.input.value
    });
    this.onCancelBtnClick(e);
  }

  onCancelBtnClick(e) {
    e.preventDefault();
    this.props.hide('settings');
  }

  render() {
    const { connectYandexCounter, connectGoogleCounter } = this.props;
    const { user } = this.props;
    return (
      <section ref="modal" id="settings" className="modal modal--settings">
        <Headline title="Settings" />
        <Form
          ref="form" login={user.login} name={user.name} yandex={user.yandex}
          onSaveBtnClick={this.onSaveBtnClick} onCancelBtnClick={this.onCancelBtnClick}
          connectYandex={connectYandexCounter} google={user.google}
          connectGoogle={connectGoogleCounter}
        />
      </section>
    );
  }
}

ModalSettings.propTypes = {
  hide: PropTypes.func,
  user: PropTypes.object,
  saveSettings: PropTypes.func,
  connectYandexCounter: PropTypes.func,
  connectGoogleCounter: PropTypes.func
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveSettings: bindActionCreators(saveSettings, dispatch),
    connectYandexCounter: bindActionCreators(connectYandex, dispatch),
    connectGoogleCounter: bindActionCreators(connectGoogle, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalSettings);
