import ProfileController from './controller';

const resolver = {
  Query: {
    profile(root, query, context) {
      const profileController = new ProfileController(context);

      return profileController.get(query);
    }
  },

  User: {
    async profile(root, _query, context) {
      const profileController = new ProfileController(context);

      const result = await profileController.get({ username: root.username });

      return result.profile;
    }
  },

  Mutation: {
    followUser(root, args, context ) {
      const profileController = new ProfileController(context);

      return profileController.follow(args);
    },
    unfollowUser(root, args, context ) {
      const profileController = new ProfileController(context);

      return profileController.unfollow(args);
    }
  }
};

export default resolver;

