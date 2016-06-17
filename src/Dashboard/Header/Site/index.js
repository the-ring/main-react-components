'use strict';

import React, { PropTypes, Component } from 'react';
import Icon from '../../../_helpers/Icon';

export default class Site extends Component {
  constructor(props) {
    super(props);

    this.onEditBtnClick = this.onEditBtnClick.bind(this);
    this.onDeleteBtnClick = this.onDeleteBtnClick.bind(this);
  }

  onEditBtnClick(e) {
    e.preventDefault();
    const { showEdit, data } = this.props;
    if (showEdit) {
      showEdit('edit', data);
    }
  }

  onDeleteBtnClick(e) {
    e.preventDefault();
    const { deleteSite, unuseCounter, data } = this.props;
    deleteSite(data.id);
    unuseCounter('google', data.google);
    unuseCounter('yandex', data.yandex);
  }

  render() {
    const { type } = this.props;
    return (
      <div className="header__element header__element--site">
        <nav className="dropdown">
          {
            this.props.data &&
              <a
                className="dropdown__element"
                href={this.props.data.url}
              >
                <span className="dropdown__element--site">{this.props.data.title} - {type}</span>
                <Icon className={['icon', 'icon--chevron-down']} />
              </a>
        }
          <ul className="sub header__sub">
            <li className="sub__item">
              <a className="sub__link" onClick={this.onEditBtnClick}>Edit site</a>
            </li>
            <li className="sub__item">
              <a className="sub__link" onClick={this.onDeleteBtnClick}>Delete site</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

Site.propTypes = {
  type: PropTypes.string,
  showEdit: PropTypes.func,
  deleteSite: PropTypes.func,
  unuseCounter: PropTypes.func,
  data: PropTypes.object
};
