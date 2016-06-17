'use strict';

import 'whatwg-fetch';
import config from './_config';

function checkStatus(response) {
  if (response.ok) {
    return response.json();
  }
  return response.json().then(r => {
    const error = new Error(response.statusText);
    error.response = r;
    throw error;
  });
}

export function request(link,
  options = {},
  endpoint = config.backend.url ||
  window.localStorage.getItem('endpoint')) {
  const userId = window.localStorage.getItem('user.id');
  const authToken = window.localStorage.getItem('user.authToken');
  return fetch(`${endpoint}/${link}`, {
    ...options,
    headers: {
      'X-User-Id': userId,
      'X-Auth-Token': authToken,
      ...options.headers
    }
  }).then(checkStatus);
}

export function get(link) {
  return request(link);
}

export function post(link, body = {}) {
  return request(link, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}

export function update(link, body = {}) {
  return request(link, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}

export function del(link) {
  return request(link, {
    method: 'DELETE'
  });
}
