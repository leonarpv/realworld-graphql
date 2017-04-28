import 'babel-polyfill';

import hapi from 'hapi';

import { graphiqlHapi } from 'graphql-server-hapi';
import { runHttpQuery } from 'graphql-server-core';

import api    from './core/api';
import log    from './core/log';
import auth   from './core/auth';
import config from './core/config';
import schema from './core/schema';
import handleError from './core/error';


const server = new hapi.Server();

server.register({
  register: log
});

server.connection({
  port: config.server.port,
});

server.register({
  register: auth
});

if (config.server.env === 'development') {
  server.register({
    register: graphiqlHapi,
    options: {
      path: '/graphiql',
      graphiqlOptions: {
        endpointURL: '/graphql',
      }
    }
  });
}

server.route({
  method: ['GET', 'POST'],
  path: '/graphql',
  handler: async (request, reply) => {
    try {
      let gqlResponse = await runHttpQuery([request], {
        method: request.method.toUpperCase(),
        query: request.method === 'post' ? request.payload : request.query,
        options: (request) => ({
          schema,
          context: {
            request,
            Api: api
          },
          debug: config.server.env !== 'production'
        }),
      });

      if ((/401 - You must be authenticated/).test(gqlResponse)) {
        return reply(gqlResponse).code(401);
      } else {
        return reply(gqlResponse);
      }
    } catch (error) {
      return handleError(error, reply);
    }
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }

  server.log('Server running at:', server.info.uri);
});
