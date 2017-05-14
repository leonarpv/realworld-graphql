import Controller from '../../core/base-controller';

class ProfileController extends Controller {
  constructor(context) {
    super(context);

    this.resource = 'profile';

    this._setupAPI({
      endpoint: 'profiles/{username}',
      replaces: [{ key: 'username', value: 'username '}]
    });
  }

  get(username) {
    return super.get(null, { replaces: username });
  }

  follow(username) {
    return this.API.create(null, {
      token: this.authToken,
      replaces: username,
      endpoint: 'profiles/{username}/follow'
    });
  }

  unfollow(username) {
    return this.API.delete(null, {
      token: this.authToken,
      replaces: username,
      endpoint: 'profiles/{username}/follow'
    });
  }
}

export default ProfileController;

