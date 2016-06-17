'use strict';

import * as c from '../_constants';
import config from '../_config';
import { get, post, update, del } from '../_actions';

export function getSites(timestamp) {
  return (dispatch) => {
    dispatch({
      type: c.GET_SITES_REQUEST
    });
    get('sites').then(r => {
      dispatch({
        type: c.GET_SITES_SUCCESS,
        payload: r.data,
        timestamp
      });
    }).catch(e => {
      dispatch({
        type: c.GET_SITES_FAIL,
        payload: e.response
      });
    });
  };
}

export function addSite(site) {
  return (dispatch) => {
    dispatch({
      type: c.ADD_SITE_REQUEST
    });
    post('sites', { ...site }).then(r => {
      dispatch({
        type: c.ADD_SITE_SUCCESS,
        site: site.id,
        payload: r.data
      });
    }).catch(e => {
      dispatch({
        type: c.ADD_SITE_FAIL,
        payload: e.response
      });
    });
  };
}

export function editSite(id, data) {
  return (dispatch) => {
    dispatch({
      type: c.EDIT_SITE_REQUEST
    });
    update(`site/${id}`, { ...data }).then(() => {
      dispatch({
        type: c.EDIT_SITE_SUCCESS
      });
      getSites(Date.now())(dispatch);
    }).catch(e => {
      dispatch({
        type: c.EDIT_SITE_FAIL,
        payload: e.response
      });
    });
  };
}

export function deleteSite(id, timestamp) {
  return (dispatch) => {
    dispatch({
      type: c.DELETE_SITE_REQUEST
    });
    del(`site/${id}`).then(() => {
      dispatch({
        type: c.DELETE_SITE_SUCCESS
      });
      getSites(timestamp)(dispatch);
    }).catch(e => {
      dispatch({
        type: c.DELETE_SITE_FAIL,
        payload: e.response
      });
    });
  };
}

export function getSettings() {
  return (dispatch) => {
    dispatch({
      type: c.GET_SETTINGS_REQUEST
    });
    get('user').then(r => {
      const user = {
        login: r.data.login, name: r.data.name, image: r.data.image,
        yandex: r.data.yandex, google: r.data.google
      };
      const _localStorage = {
        'user.login': r.data.login, 'user.name': r.data.name,
        'user.image': r.data.image, 'user.yandex': r.data.yandex,
        'user.google': r.data.google
      };
      dispatch({
        type: c.GET_SETTINGS_SUCCESS,
        payload: user,
        _localStorage
      });
    }).catch(e => {
      dispatch({
        type: c.GET_SETTINGS_FAIL,
        payload: e
      });
    });
  };
}

export function saveSettings(user) {
  return (dispatch) => {
    dispatch({
      type: c.SAVE_SETTINGS_REQUEST
    });
    update('user', { ...user }).then(r => {
      const _localStorage = {
        'user.login': r.data.login, 'user.name': r.data.name,
        'user.image': r.data.image, 'user.yandex': r.data.yandex,
        'user.google': r.data.google
      };

      dispatch({
        type: c.SAVE_SETTINGS_SUCCESS,
        payload: r.data,
        _localStorage
      });
    }).catch(e => {
      dispatch({
        type: c.SAVE_SETTINGS_FAIL,
        payload: e.response
      });
    });
  };
}

export function connectYandex(bool) {
  return (dispatch) => {
    const _localStorage = { 'user.yandex': bool };
    dispatch({
      type: bool ? c.CONNECT_YANDEX_SUCCESS : c.CONNECT_YANDEX_FAIL,
      payload: { yandex: bool },
      _localStorage
    });
  };
}

export function connectGoogle(bool) {
  return (dispatch) => {
    const _localStorage = { 'user.google': bool };
    dispatch({
      type: bool ? c.CONNECT_GOOGLE_SUCCESS : c.CONNECT_GOOGLE_FAIL,
      payload: { google: bool },
      _localStorage
    });
  };
}

export function getCounters(timestamp) {
  return (dispatch) => { // getState()
    dispatch({
      type: c.GET_COUNTERS_REQUEST
    });
    get('user/counters').then(r => {
      const _localStorage = {
        'counters.google': JSON.stringify({ ...r.data.google }),
        'counters.yandex': JSON.stringify({ ...r.data.yandex })
      };
      dispatch({
        type: c.GET_COUNTERS_SUCCESS,
        payload: r.data,
        _localStorage,
        timestamp
      });
    }).catch(e => {
      dispatch({
        type: c.GET_COUNTERS_FAIL,
        payload: e.response
      });
    });
  };
}

export function useCounter(type, id) {
  return (dispatch) => {
    dispatch({
      type: c.USE_COUNTER,
      payload: { type, id }
    });
  };
}

export function unuseCounter(type, id) {
  return (dispatch) => {
    dispatch({
      type: c.UNUSE_COUNTER,
      payload: { type, id }
    });
  };
}

export function getSite(site) {
  const t = Date.now();
  const item = window.localStorage.getItem(`site.${site}`);
  const timestamp = window.localStorage.getItem(`site.${site}.timestamp`);
  if (item && timestamp && t - timestamp < config.cache.period) {
    return Promise.resolve(JSON.parse(item));
  }
  return get(`site/${site}`).then(r => {
    window.localStorage.setItem(`site.${site}`, JSON.stringify({ ...r.data }));
    window.localStorage.setItem(`site.${site}.timestamp`, t);
    return r.data;
  });
}

export function getSiteData(site, d, force) {
  const period = window.localStorage.getItem('period') || 'weekly';
  const t = Date.now();
  const item = window.localStorage.getItem(`site.${site}.${d}.${period}`);
  const timestamp = window.localStorage.getItem(`site.${site}.${d}.${period}.timestamp`);
  const realTimestamp = window.localStorage.getItem(`site.${site}.${d}.${period}.realTimestamp`);
  if (!force && item && timestamp && t - timestamp < config.cache.period) {
    return Promise.resolve({ ...JSON.parse(item), timestamp: parseInt(realTimestamp, 10) });
  }
  return get(`site/${site}/${d}/${period}${force ? '?force=true' : ''}`).then(r => {
    window.localStorage.setItem(`site.${site}.${d}.${period}`, JSON.stringify({ ...r.data }));
    window.localStorage.setItem(`site.${site}.${d}.${period}.timestamp`, t);
    window.localStorage.setItem(`site.${site}.${d}.${period}.realTimestamp`, r.timestamp);
    return { ...r.data, timestamp: r.timestamp };
  });
}
