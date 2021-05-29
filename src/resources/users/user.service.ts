import * as usersRepo from './user.memory.repository';

import {IUser} from '../../types/interfaces';

/**
 * Returs all existing users.
 * @returns {Array.<object>} all users.
 */
const getAll = (): Promise<Array<IUser>> => usersRepo.getAll();

/**
 * Retrieves a user by id.
 * @param {String} id - User id
 * @returns {User} User object.
 */
const get = (id: string): Promise<IUser> => usersRepo.get(id);

/**
 * Inserts a new user into users repo.
 * @param {User.<string>} User object.
 * @returns {User.<string>} newly created User object.
 */
const create = (user: IUser): Promise<IUser> => usersRepo.create(user);

/**
 * Updates a user with a specific id.
 * @param {String} id - User id
 * @param {User} User - User object with new values.
 * @returns {User} updated User object.
 */
const update = (id: string, user?: IUser): Promise<IUser> => usersRepo.update(id, user);

/**
 * Deletes a user with a specific id.
 * @param {String} id - User id
 * @returns {User} User object that was removed.
 */
const remove = (id: string): Promise<IUser> => usersRepo.remove(id);

const _ = {
    getAll,
    get,
    create,
    update,
    remove
  }

  export = _;
