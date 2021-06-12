import {IUser} from '../../types/interfaces';

import * as DB from '../../common/inMemoryDb';

/**
 * Represents all existing users.
 * @async
 * @returns {Array.<object>} all users.
 */
const getAll = async (): Promise<Array<IUser>> => DB.getAllUsers();

/**
 * Retrieves a user by id.
 * @async
 * @param {String} id - User id
 * @returns {User} User object.
 */
const get = async (id: string): Promise<IUser | never> => {
  const user = await DB.getUser(id);

  if (!user) {
    throw new Error(`The user with id ${id} was not found.`);
  }

  return user;
};

/**
 * Inserts a new user into DB.
 * @async
 * @param {User.<string>} User object.
 * @returns {User.<string>} newly created User object.
 */
const create = async (user: IUser): Promise<IUser> => DB.createUser(user);

/**
 * Updates a user with a specific id.
 * @async
 * @param {String} id - User id
 * @param {User} User - User object with new values.
 * @returns {User} updated User object.
 */
const update = async (id: string, user: IUser): Promise<IUser> => DB.updateUser(id, user);

/**
 * Deletes a user with a specific id.
 * @async
 * @param {String} id - User id
 * @returns {User} User object that was removed.
 */
const remove = async (id: string): Promise<IUser> => DB.removeUser(id);

const _ = {
  getAll,
  get,
  create,
  update,
  remove
}

export = _;
