const usersRepo = require('./user.memory.repository');

/**
 * Returs all existing users.
 * @returns {Array.<object>} all users.
 */
const getAll = () => usersRepo.getAll();

/**
 * Retrieves a user by id.
 * @param {String} id - User id
 * @returns {User} User object.
 */
const get = id => usersRepo.get(id);

/**
 * Inserts a new user into users repo.
 * @param {User.<string>} User object.
 * @returns {User.<string>} newly created User object.
 */
const create = user => usersRepo.create(user);

/**
 * Updates a user with a specific id.
 * @param {String} id - User id
 * @param {User} User - User object with new values.
 * @returns {User} updated User object.
 */
const update = (id, user) => usersRepo.update(id, user);

/**
 * Deletes a user with a specific id.
 * @param {String} id - User id
 * @returns {User} User object that was removed.
 */
const remove = id => usersRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
