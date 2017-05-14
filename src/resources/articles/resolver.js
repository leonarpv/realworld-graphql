import ArticleController from './controller';

const resolver = {
  Query: {
    articles(root, paging, context) {
      const articleController = new ArticleController(context);

      return articleController.getAllByCursor(paging);
    },
    article(root, { slug }, context) {
      const articleController = new ArticleController(context);

      return articleController.getBySlug(slug);
    },
    feed(root, paging, context) {
      const articleController = new ArticleController(context);

      return articleController.getFeed(paging);
    }
  },
  Mutation: {
    createArticle(root, { input }, context) {
      const articleController = new ArticleController(context);

      return articleController.create(input);
    },
    updateArticle(root, args, context) {
      const articleController = new ArticleController(context);

      return articleController.update(args);
    },
    deleteArticle(root, { slug }, context) {
      const articleController = new ArticleController(context);

      return articleController.destroy(slug);
    }
  }
};

export default resolver;

