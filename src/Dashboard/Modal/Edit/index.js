'use strict';

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { editSite } from '../../_actions';

import Headline from '../../../_helpers/Headline';
import Form from './Form';

class ModalEdit extends Component {
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
      this.props.hide('edit');
    }
  }

  onSaveBtnClick(e) {
    e.preventDefault();
    const form = this.refs.form;
    this.props.editSite(form.refs.oldId.refs.input.value, {
      id: form.refs.id.refs.input.value,
      title: form.refs.name.refs.input.value,
      url: form.refs.link.refs.input.value
    });
    this.onCancelBtnClick(e);
  }

  onCancelBtnClick(e) {
    e.preventDefault();
    this.props.hide('edit');
  }

  render() {
    const { data, type } = this.props;
    return (
      <section ref="modal" className="modal" id={`${type}-card`}>
        <Headline title={`Editing ${data.title} site`} />
        <Form
          ref="form" onSaveBtnClick={this.onSaveBtnClick} onCancelBtnClick={this.onCancelBtnClick}
          name={data.title} url={data.url} id={data.id}
        />
      </section>
    );
  }
}

ModalEdit.propTypes = {
  type: PropTypes.string,
  data: PropTypes.object,
  hide: PropTypes.func,
  editSite: PropTypes.func
};

function mapDispatchToProps(dispatch) {
  return {
    editSite: bindActionCreators(editSite, dispatch)
  };
}

export default connect(() => ({}), mapDispatchToProps)(ModalEdit);
