'use strict';

import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAIL
} from '../_constants';
import { post } from '../_actions';

export function login(l, p) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST
    });
    post('auth/login', { login: l, password: p }).then(r => {
      const _localStorage = {
        'user.login': l,
        'user.id': r.data.userId,
        'user.authToken': r.data.authToken
      };

      dispatch({
        type: LOGIN_SUCCESS,
        _localStorage
      });
    }).catch(e => {
      dispatch({
        type: LOGIN_FAIL,
        payload: e.response
      });
    });
  };
}

export function register(l, p, rePassword) {
  return (dispatch) => {
    dispatch({
      type: SIGNUP_REQUEST
    });
    post('auth/registration', { login: l, password: p, rePassword }).then(() => {
      const _localStorage = {
        'user.login': l,
        firstTime: true
      };

      dispatch({
        type: SIGNUP_SUCCESS,
        _localStorage
      });
      login(l, p, true)(dispatch);
    }).catch(e => {
      dispatch({
        type: SIGNUP_FAIL,
        payload: e.response
      });
    });
  };
}
