import _ from 'lodash';

import Controller from '../../core/base-controller';

class ArticleController extends Controller {
  constructor(context) {
    super(context);

    this.resource = 'article';

    this._setupAPI({
      endpoint: 'articles'
    });
  }

  _getEdgesForCursor(results) {
    return _.map(results.articles, (article, index) => ({ cursor: this._toBase64(index), node: article }))
  }

  _getCountForCursor(results) {
    return results.articlesCount;
  }

  async getBySlug(slug) {
    this._setupAPI({
      endpoint: 'articles',
      replaces: [{ key: 'slug', value: 'slug' }]
    });

    const result = await super.get(null, {
      endpoint: 'articles/{slug}',
      replaces: { slug }
    });

    return result.article;
  }

  getFeed(paging) {
    return super.getAllByCursor(paging, {
      endpoint: 'articles/feed'
    });
  }

  update({ slug, changes }) {
    return super.update(changes, { endpoint: `articles/${slug}`});
  }

}

export default ArticleController;
