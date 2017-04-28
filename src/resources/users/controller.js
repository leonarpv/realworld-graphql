class UserController {
  constructor(context) {
    this.request = context.request;
    this.API = new context.Api({ endpoint: 'user'});
    this.authToken = context.request.auth.token;
  }

  get() {
    return this.API.get(null, { token: this.authToken });
  }

  login(user) {
    return this.API.create({ user }, { endpoint: 'users/login' });
  }

  create(user) {
    return this.API.create({ user }, { endpoint: 'users' });
  }

  update(user) {
    return this.API.update({ user }, { token: this.authToken });
  }
}

export default UserController;
