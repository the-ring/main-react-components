'use strict';

/* eslint-disable global-require */

import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import { createHistory } from 'history';
import rootReducer from './_reducers';
import thunk from 'redux-thunk';

const stateToLocalStorage = () => next => action => {
  if (action._localStorage) {
    const s = action._localStorage;
    for (const key in s) {
      if (s[key] !== null && s[key] !== undefined) {
        window.localStorage.setItem(key, s[key]);
      }
    }

    delete action._localStorage;
  }

  return next(action);
};

const middlewares = [thunk, stateToLocalStorage];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(require('redux-logger')());
}

const finalCreateStore = compose(
  applyMiddleware(...middlewares),
  reduxReactRouter({ createHistory })
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('./_reducers', () => {
      const nextRootReducer = require('./_reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
