import { makeExecutableSchema } from 'graphql-tools';

import config from './config';

import typeDefs from '../../data/schema.graphql';
import resolvers from '../resources/resolver';

let logger;

if (config.server.env !== 'production') {
  logger = { log: (e) => console.log(e) };
}

export default makeExecutableSchema({
  typeDefs,
  /*eslint no-console: 0*/
  logger,
  resolvers
});

