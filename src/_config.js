'use strict';

import deepAssign from 'deep-assign';

const defaultConfig = {
  cache: {
    period: 3e5 // 5 min
  },
  backend: {
    url: 'http://localhost:3000',
    connectUrl: 'http://localhost:3000/connect'
  },
  frontend: {
    port: 3001,
    url: 'http://localhost:3001',
    connectUrl: 'http://localhost:3001/connect'
  }
};

let config;

try {
  // eslint-disable-next-line import/no-unresolved, global-require
  config = require('../../../config').react;
} catch (e) {
  config = {};
}

const finalConfig = deepAssign({}, defaultConfig, config);

export default finalConfig;
