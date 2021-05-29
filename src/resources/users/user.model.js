const { v4: uuid } = require('uuid');

/** Class representing a user. */
class User {
    /**
     * Create a user.
     * @param {String} id - The id value.
     * @param {String} name - The name value.
     * @param {String} login - The login value.
     * @param {String} password - The password value.
     */
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

    /**
    * Returns a user with all data.
    * @param {User} board - An object containing id, name and login data.
    * @return {User} A User object.
  */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
