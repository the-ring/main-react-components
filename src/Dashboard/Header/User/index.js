'use strict';

import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Icon from '../../../_helpers/Icon';

export default class User extends Component {
  constructor(props) {
    super(props);

    this.onAddBtnClick = this.onAddBtnClick.bind(this);
    this.onSettingsBtnClick = this.onSettingsBtnClick.bind(this);
  }

  onAddBtnClick(e) {
    e.preventDefault();
    const { showAdd } = this.props;
    if (showAdd) {
      showAdd('add');
    }
  }

  onSettingsBtnClick(e) {
    e.preventDefault();
    const { showSettings } = this.props;
    if (showSettings) {
      showSettings('settings');
    }
  }

  render() {
    const { user, showAdd } = this.props;
    const image = 'https://secure.gravatar.com/avatar/0?d=retro';
    return (
      <div className="header__element header__element--user">
        <a
          className={`header__button header__button--add ${showAdd ? '' : 'disabled'}`}
          onClick={this.onAddBtnClick}
        >
          <Icon className={['icon', 'icon--circle-plus']} />
        </a>
        <nav className="dropdown">
          <a className="dropdown__element">
            <span className="dropdown__element--user">{user.name || user.login}</span>
            <Icon className={['icon', 'icon--chevron-down']} />
          </a>
          <ul className="sub header__sub">
            <li className="sub__item">
              <a className="sub__link" onClick={this.onSettingsBtnClick}>Settings</a>
            </li>
            <li className="sub__item"><Link className="sub__link" to="/logout">Logout</Link></li>
          </ul>
        </nav>
        <span
          className="header__image"
          style={{ backgroundImage: `url('${user.image || image}')` }}
        />
      </div>
    );
  }
}

User.propTypes = {
  showAdd: PropTypes.func,
  showSettings: PropTypes.func,
  user: PropTypes.object
};
