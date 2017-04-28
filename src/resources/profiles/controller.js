class ProfileController {
  constructor(context) {
    this.request = context.request;
    this.API = new context.Api({
      endpoint: 'profiles/{username}',
      replaces: [{ key: 'username', value: 'username '}]
    });
    this.authToken = context.request.auth.token;
  }

  get(username) {
    return this.API.get(username, { token: this.authToken, replaces: username });
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

