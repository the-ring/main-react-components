'use strict';

import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Icon from '../../../_helpers/Icon';

export default class Navigation extends Component {
  constructor(props) {
    super(props);

    this.onRefreshClick = this.onRefreshClick.bind(this);
    this.onSettingsClick = this.onSettingsClick.bind(this);
  }

  onRefreshClick(e) {
    e.preventDefault();
    const { forceRefresh } = this.props;
    if (forceRefresh) {
      for (const key in forceRefresh) {
        forceRefresh[key].refresh(true);
      }
    }
  }

  onSettingsClick(e) {
    e.preventDefault();
    this.props.showSettings('settings');
  }

  render() {
    const { path, period } = this.props;
    return (
      <nav className="nav sidebar__nav">
        <div className="nav__element">
          <Link className="nav__link logo" to="/"><Icon className={['icon', 'icon--logo']} /></Link>
          <Link
            className={`nav__link nav__link--${(path === '/:period' || path === '/:period/:id') ?
            'active' : ''}`}
            to={`/${period}`} data-tooltip="Dashboard" data-tooltip-pos="right"
          ><Icon className={['icon', 'icon--home']} /></Link>
          <a
            className={`disabled nav__link nav__link--disabled
              nav__link--${(path === '/:period/:id/reports' ||
              path === '/:period/:id/reports/:report') ? 'active' : ''}`}
            data-tooltip="Reports" data-tooltip-pos="right"
          ><Icon className={['icon', 'icon--report']} /></a>
          <a
            className={`disabled nav__link nav__link--disabled nav__link--${(path === '/charts') ?
            'active' : ''}`} data-tooltip="Charts" data-tooltip-pos="right"
          ><Icon className={['icon', 'icon--chart']} /></a>
        </div>
        <div className="nav__element">
          <a
            className="nav__link" onClick={this.onRefreshClick} data-tooltip="Force refresh"
            data-tooltip-pos="right"
          ><Icon className={['icon', 'icon--cycle']} /></a>
        </div>
        <div className="nav__element">
          <a
            className="nav__link" onClick={this.onSettingsClick} data-tooltip="Settings"
            data-tooltip-pos="right"
          ><Icon className={['icon', 'icon--settings']} /></a>
        </div>
      </nav>
    );
  }
}

Navigation.propTypes = {
  links: PropTypes.array,
  forceRefresh: PropTypes.object,
  showSettings: PropTypes.func,
  path: PropTypes.string,
  period: PropTypes.string
};
