import path from 'path';
import glob from 'glob';
import { merge } from 'lodash';

const baseDir = __dirname.indexOf('build') !== -1 ? 'build' : 'src';
const pattern = `${baseDir}/resources/**/resolver.js`;

let resolvers = [];

glob.sync(pattern).forEach((file) => {
  let root = path.join(__dirname, '..', '..', file);

  resolvers.push(require(root).default);
});

export default merge.apply(this, resolvers);

