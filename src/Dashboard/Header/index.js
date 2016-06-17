'use strict';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteSite, unuseCounter } from '../_actions';
import Site from './Site';
import Links from './Links';
import User from './User';

function Header(props) {
  const { showAdd, showSettings, user, data, link, period, type } = props;
  return (
    <header className="header main__header">
      <nav className="header__nav">
        <Site
          deleteSite={props.deleteSite}
          unuseCounter={props.unuseCounter}
          showEdit={showSettings}
          data={data}
          type={type}
        />
        <Links link={link} period={period} />
        <User showAdd={showAdd} showSettings={showSettings} user={user} />
      </nav>
    </header>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    deleteSite: bindActionCreators(deleteSite, dispatch),
    unuseCounter: bindActionCreators(unuseCounter, dispatch)
  };
}

Header.propTypes = {
  showAdd: PropTypes.func,
  showSettings: PropTypes.func,
  user: PropTypes.object,
  data: PropTypes.object,
  link: PropTypes.string,
  period: PropTypes.string,
  type: PropTypes.string,
  deleteSite: PropTypes.func,
  unuseCounter: PropTypes.func
};

export default connect(() => ({}), mapDispatchToProps)(Header);
