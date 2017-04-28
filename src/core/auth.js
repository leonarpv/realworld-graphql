import jwt from 'hapi-auth-jwt2';

import config from './config';

exports.register = (server, options, next) => {
  server.register(jwt, registerAuth);

  function registerAuth (err) {
    if (err) { return next(err); }

    server.auth.strategy('jwt', 'jwt', 'try', {
      key: config.server.jwt,
      validateFunc: validate,
      verifyOptions: {algorithms: [ 'HS256' ]}
    });

    return next();
  }

  async function validate (decoded, request, cb) {
    if (!decoded) {
      return cb(null, false);
    }

    return cb(null, true);
  }
};

exports.register.attributes = {
  name: 'auth-jwt',
  version: '1.0.0'
};

