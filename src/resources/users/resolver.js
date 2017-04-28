import UserController from './controller';

const resolver = {
  Query: {
    me(root, _args, context) {
      const userController = new UserController(context);

      return userController.get();
    }
  },
  Mutation: {
    createUser(root, { input }, context) {
      const userController = new UserController(context);

      return userController.create(input);
    },
    updateUser(root, { changes }, context) {
      const userController = new UserController(context);

      return userController.update(changes);
    },
    login(root, credentials, context) {
      const userController = new UserController(context);

      return userController.login(credentials);
    }
  }
};

export default resolver;
