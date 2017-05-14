import _ from 'lodash';

class Controller {
  constructor(context) {
    this.context = context;
    this.request = context.request;
    this.authToken = context.request.auth.token;
  }

  _setupAPI (options) {
    this.endpoint = options.endpoint;
    this.API = new this.context.Api(options);
  }

  _toBase64(value) {
    value = typeof value !== 'string' ? value.toString() : value;

    return Buffer.from(value).toString('base64');
  }

  _fromBase64(value) {
    return Buffer.from(value, 'base64').toString();
  }

  _getCountForCursor(results) {
    return results.count;
  }

  _getPageInfoForCursor(edges, { first=0, after }, count) {
    return {
      startCursor: _.chain(edges).first().get('cursor').value(),
      endCursor: _.chain(edges).last().get('cursor').value(),
      hasNextPage: edges.length >= first,
      hasPreviousPage: after ? edges.length <= first : false
    };
  }

  _getEdgesForCursor(results) {
    return _.map(results, (result, index) => ({ cursor: this._toBase64(index), node: result }))
  }

  _prepareCursor (results, paging) {
    console.log('LOL', results);
    const edges = this._getEdgesForCursor(results);
    const count = this._getCountForCursor(results);
    const pageInfo = this._getPageInfoForCursor(edges, paging, count);

    return {
      count,
      pageInfo,
      edges
    };
  }

  async getAllByCursor(paging, options={ endpoint: this.endpoint }) {
    const {
      first,
      after,
      authoredBy,
      favoritedBy,
      withTag
    } = paging;

    const query = {
      author: authoredBy,
      favorited: favoritedBy,
      tag: withTag,
      limit: first,
      offset: after ? this._fromBase64(after) : null
    };

    const results = await this.API.get(query, { token: this.authToken, ...options });

    return this._prepareCursor(results, paging);
  }

  get(query, options={ endpoint: this.endpoint }) {
    return this.API.get(query, { token: this.authToken, ...options });
  }

  create(body, options={ endpoint: this.endpoint }) {
    return this.API.create({ [this.resource]: body }, { token: this.authToken, ...options });
  }

  update(body, options={ endpoint: this.endpoint }) {
    return this.API.update({ [this.resource]: body }, { token: this.authToken, ...options });
  }

  async destroy(id, options={ endpoint: `${this.endpoint}/${id}` }) {
    try {
      await this.API.delete(null, { token: this.authToken, ...options });

      return { success: true };
    } catch (e) {
      throw e;
    }
  }
}

export default Controller;
