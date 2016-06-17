'use strict';

import React, { PropTypes, Component } from 'react';
import Field from '../../../../_helpers/Field';
import Buttons from '../../../../_helpers/Buttons';

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = { siteId: this.props.id };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let siteId = e.target.value.trim();
    siteId = siteId.toLowerCase();
    siteId = siteId.split(' ');
    siteId = siteId.join('-');
    this.setState({ siteId });
  }

  render() {
    const { name, url, id, onSaveBtnClick, onCancelBtnClick } = this.props;
    return (
      <div className="modal__form">
        <Field
          handleChange={this.handleChange} addonType="icon" addonContent="icon--pin"
          ref="name" inputType="text" inputPlaceholder="name" value={name}
        />
        <Field
          addonType="icon" addonContent="icon--link" ref="link"
          inputType="url" inputPlaceholder="url" value={url}
        />
        <Field
          readonly stateValue={this.state.siteId} addonType="text"
          addonContent="localhost:3000/" ref="id" inputType="text" inputPlaceholder="id"
        />
        <Field addonType="text" ref="oldId" inputType="hidden" value={id} />
        <Buttons onSaveBtnClick={onSaveBtnClick} onCancelBtnClick={onCancelBtnClick} />
      </div>
    );
  }
}

Form.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
  onSaveBtnClick: PropTypes.func,
  onCancelBtnClick: PropTypes.func
};
