'use strict';

import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import * as c from './_constants';

const user = (state = {
  login: null, name: null, image: null,
  google: false, yandex: false, fetching: false
}, action) => {
  switch (action.type) {
    case c.SAVE_SETTINGS_REQUEST:
    case c.GET_SETTINGS_REQUEST:
    case c.CONNECT_YANDEX_REQUEST:
    case c.CONNECT_GOOGLE_REQUEST:
      return { ...state, fetching: true };
    case c.SAVE_SETTINGS_SUCCESS:
    case c.GET_SETTINGS_SUCCESS:
    case c.CONNECT_YANDEX_SUCCESS:
    case c.CONNECT_GOOGLE_SUCCESS:
      return { ...state, ...action.payload, fetching: false };
    case c.SAVE_SETTINGS_FAIL:
    case c.GET_SETTINGS_FAIL:
    case c.CONNECT_YANDEX_FAIL:
    case c.CONNECT_GOOGLE_FAIL:
      return { ...state, error: action.payload, fetching: false };
    default:
      return state;
  }
};

const login = (state = { fetching: false }, action) => {
  switch (action.type) {
    case c.SIGNUP_REQUEST:
    case c.LOGIN_REQUEST:
      return { fetching: true };
    case c.SIGNUP_SUCCESS:
    case c.LOGIN_SUCCESS:
      return { fetching: false };
    case c.SIGNUP_FAIL:
    case c.LOGIN_FAIL:
      return { ...state, error: action.payload, fetching: false };
    case c.LOGOUT:
      return { fetching: false };
    default:
      return state;
  }
};

const counters = (state = { yandex: [], google: [], fetching: false }, action) => {
  switch (action.type) {
    case c.GET_COUNTERS_REQUEST:
      return { ...state, fetching: true };
    case c.GET_COUNTERS_SUCCESS:
      return { ...state, ...action.payload, timestamp: action.timestamp, fetching: false };
    case c.GET_COUNTERS_FAIL:
      return { ...state, error: action.payload, fetching: false };
    case c.USE_COUNTER:
      return { ...state, [action.payload.type]: {
        ...state[action.payload.type],
        [action.payload.id]: {
          ...state[action.payload.type][action.payload.id], used: true
        }
      }, fetching: false };
    case c.UNUSE_COUNTER:
      return { ...state, [action.payload.type]: {
        ...state[action.payload.type],
        [action.payload.id]: {
          ...state[action.payload.type][action.payload.id], used: false
        }
      }, fetching: false };
    default:
      return state;
  }
};

const site = (state = { data: {}, fetching: false }, action) => {
  switch (action.type) {
    case c.GET_SITES_REQUEST:
    case c.GET_SITE_REQUEST:
    case c.ADD_SITE_REQUEST:
    case c.EDIT_SITE_REQUEST:
      return { ...state, fetching: true };
    case c.GET_SITES_SUCCESS:
      return { data: { ...action.payload }, timestamp: action.timestamp, fetching: false };
    case c.GET_SITE_SUCCESS:
    case c.ADD_SITE_SUCCESS:
      return { ...state, data: {
        ...state.data, [action.site]: {
          ...state.data[action.site], ...action.payload
        }
      }, timestamp: action.timestamp, fetching: false };
    case c.GET_SITES_FAIL:
    case c.GET_SITE_FAIL:
    case c.ADD_SITE_FAIL:
    case c.EDIT_SITE_FAIL:
      return { ...state, error: action.payload, fetching: false };
    case c.GET_SITE_DATA_SUCCESS:
    case c.GET_SITE_DATA_REQUEST:
    case c.GET_SITE_DATA_FAIL:
      return { ...state, data: {
        ...state.data, [action.site]: {
          ...state.data[action.site], data: {
            ...state.data[action.site].data, ...action.payload
          }
        }
      } };
    default:
      return state;
  }
};

export default combineReducers({
  router: routerStateReducer,
  sites: combineReducers({ site }),
  login,
  counters,
  user
});
