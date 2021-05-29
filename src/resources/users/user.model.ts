import { v4 as uuid } from 'uuid';

import {IUser} from '../../types/interfaces';

/** Class representing a user. */
class User implements IUser {
    /**
     * Create a user.
     * @param {String} id - The id value.
     * @param {String} name - The name value.
     * @param {String} login - The login value.
     * @param {String} password - The password value.
     */
   id: string;

   name: string;

   login: string;

   password: string;

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
  static toResponse(user: IUser): { id?: string, name: string, login: string } {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export = User;
