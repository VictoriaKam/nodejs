const DB = require('../../common/inMemoryDb');

/**
 * Represents all existing users.
 * @async
 * @returns {Array.<object>} all users.
 */
const getAll = async () => DB.getAllUsers();

/**
 * Retrieves a user by id.
 * @async
 * @param {String} id - User id
 * @returns {User} User object.
 */
const get = async id => {
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
const create = async user => DB.createUser(user);

/**
 * Updates a user with a specific id.
 * @async
 * @param {String} id - User id
 * @param {User} User - User object with new values.
 * @returns {User} updated User object.
 */
const update = async (id, user) => DB.updateUser(id, user);

/**
 * Deletes a user with a specific id.
 * @async
 * @param {String} id - User id
 * @returns {User} User object that was removed.
 */
const remove = async id => DB.removeUser(id);

module.exports = { getAll, get, create, update, remove };
