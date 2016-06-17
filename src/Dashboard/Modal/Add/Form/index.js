'use strict';

import React, { PropTypes, Component } from 'react';
import Field from '../../../../_helpers/Field';
import Counters from './Counters';
import Buttons from '../../../../_helpers/Buttons';

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = { siteId: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.checkField('title')(e);
    let siteId = e.target.value.trim();
    siteId = siteId.toLowerCase();
    siteId = siteId.split(' ');
    siteId = siteId.join('-');
    this.setState({ siteId });
  }

  render() {
    return (
      <div className="modal__form">
        <Field
          handleChange={this.handleChange} addonType="icon" addonContent="icon--pin"
          ref="name" inputType="text" inputPlaceholder="name"
        />
        <Field
          handleChange={this.props.checkField('url')} addonType="icon" addonContent="icon--link"
          ref="link" inputType="url" inputPlaceholder="url"
        />
        <Field
          stateValue={this.state.siteId} addonType="text"
          addonContent="localhost:3000/" ref="id" inputType="text" inputPlaceholder="id"
          readonly
        />
        <Counters onChange={this.props.onChange} />
        <Buttons
          disabled={this.props.disabled}
          onSaveBtnClick={this.props.onSaveBtnClick} onCancelBtnClick={this.props.onCancelBtnClick}
        />
      </div>
    );
  }
}

Form.propTypes = {
  disabled: PropTypes.any,
  checkField: PropTypes.func,
  onChange: PropTypes.func,
  onSaveBtnClick: PropTypes.func,
  onCancelBtnClick: PropTypes.func
};
