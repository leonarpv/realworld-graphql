import Errors from 'request-promise/errors';
import request from 'request-promise';

import config from './config';

const BASE_URL = config.api.base_url;

class Api {
  constructor({ endpoint, authenticated=false, replaces=[] }) {
    this.endpoint = endpoint;
    this.authenticated = authenticated;
    this.replaces = replaces;

    this.defaultOptions = { json: true };
  }

  _handleResponseError(err) {
    const error = new Error();

    console.error('ERROR', err);
    error.message = err.error ? err.error.errors : err.message;
    error.isGraphQLError = true;
    error.statusCode = err.statusCode;

    if (404 === err.statusCode) {
      error.message = `${err.error.status} - ${err.error.error}`;
    }

    if (401 === err.statusCode) {
      error.message = `${err.statusCode} - You must be authenticated OR Your credentials are invalid`;
    }

    throw error;
  }

  async _makeRequest({ options, ...reqOptions }) {
    try {
      const uri = this._getUri(options);
      const headers = this.headers;

      reqOptions = Object.assign(this.defaultOptions, reqOptions, { uri, headers });

      console.log('ReqOptions', reqOptions);

      const response = await request(reqOptions);

      return response;
    } catch (err) {
      if (err instanceof Errors.StatusCodeError) {
        return this._handleResponseError(err);
      }

      throw err;
    }
  }

  _getUri({ endpoint, replaces }={}) {
    endpoint = endpoint ? endpoint.toLowerCase() : this.endpoint.toLowerCase();

    this.replaces.map((replaceObj) => {
      const regex = new RegExp(`{${replaceObj.key}}`, 'g');

      endpoint = endpoint.replace(regex, replaces[replaceObj.key]);
    });

    return `${BASE_URL}/${endpoint}`;
  }

  _checkAuth (options) {
    if (this.authenticated && !options.token) {
      throw new Error('401 - You must be authenticated');
    }

    if (options.token) {
      this.headers = {
        'Authorization': `Token ${options.token}`
      };
    }
  }

  get(qs={}, options={}) {
    this._checkAuth(options);

    const rpOptions = {
      method: 'GET',
      qs,
      options
    };

    return this._makeRequest(rpOptions);
  }

  create(body={}, options={}) {
    this._checkAuth(options);

    const rpOptions = {
      method: 'POST',
      body,
      options
    };

    return this._makeRequest(rpOptions);
  }

  update(body={}, options={}) {
    this._checkAuth(options);

    const rpOptions = {
      method: 'PUT',
      body,
      options
    };

    return this._makeRequest(rpOptions);
  }

  delete(body={}, options={}) {
    this._checkAuth(options);

    const rpOptions = {
      method: 'DELETE',
      body,
      options
    };

    return this._makeRequest(rpOptions);
  }
}

export default Api;
