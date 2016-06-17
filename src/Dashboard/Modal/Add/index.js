'use strict';

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addSite, useCounter } from '../../_actions';

import Headline from '../../../_helpers/Headline';
import Aside from './Aside';
import Form from './Form';

class ModalAdd extends Component {
  constructor(props) {
    super(props);

    this.state = { title: null, url: null, google: null, yandex: null };

    this.handleChoice = this.handleChoice.bind(this);
    this.checkForm = this.checkForm.bind(this);
    this.checkField = this.checkField.bind(this);
    this.onChange = this.onChange.bind(this);
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

  onChange(type, selected) {
    const display = selected ? '' : 'none';
    if (type === 'google') {
      this.refs.google.refs.counter.style.display = display;
    } else {
      this.refs.yandex.refs.counter.style.display = display;
    }
  }

  onClickOutside(e) {
    if (this.refs.modal === e.target) {
      this.props.hide('add');
    }
  }

  onSaveBtnClick(e) {
    e.preventDefault();
    if (this.checkForm()) {
      const form = this.refs.form;
      const { title, url, google, yandex } = this.state;
      this.props.addSite({
        id: form.state.siteId,
        title,
        url,
        google,
        yandex
      });
      this.props.useCounter('google', google);
      this.props.useCounter('yandex', yandex);
      this.onCancelBtnClick(e);
    }
  }

  onCancelBtnClick(e) {
    e.preventDefault();
    this.props.hide('add');
  }

  handleChoice(type, value) {
    this.setState({ [type]: value });
  }

  checkField(type) {
    return (e) => {
      const value = e.target.value.trim();
      this.setState({ [type]: value });
    };
  }

  checkForm() {
    const { title, url, google, yandex } = this.state;
    return title && url && google && yandex;
  }

  render() {
    const { type, counters } = this.props;
    return (
      <section ref="modal" className="modal" id={`${type}-card`}>
        <Headline title="Adding new site" />
        <Aside
          handleChoice={this.handleChoice}
          counters={counters.google}
          ref="google"
          type="google"
        />
        <Aside
          handleChoice={this.handleChoice}
          counters={counters.yandex}
          ref="yandex"
          type="yandex"
        />
        <Form
          ref="form"
          checkField={this.checkField}
          onChange={this.onChange}
          onSaveBtnClick={this.onSaveBtnClick}
          onCancelBtnClick={this.onCancelBtnClick}
          disabled={this.checkForm() || 'disabled'}
        />
      </section>
    );
  }
}

ModalAdd.propTypes = {
  hide: PropTypes.func,
  type: PropTypes.string,
  counters: PropTypes.object,
  addSite: PropTypes.func,
  useCounter: PropTypes.func
};

function mapStateToProps(state) {
  return {
    counters: state.counters
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addSite: bindActionCreators(addSite, dispatch),
    useCounter: bindActionCreators(useCounter, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalAdd);
