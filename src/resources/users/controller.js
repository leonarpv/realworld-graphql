import Controller from '../../core/base-controller';

class UserController extends Controller {
  constructor(context) {
    super(context);

    this.resource = 'user';
    this._setupAPI({ endpoint: 'user'});
  }

  login(user) {
    return this.API.create(user, { endpoint: 'users/login' });
  }

  create(user) {
    return this.API.create(user, { endpoint: 'users' });
  }
}

export default UserController;
