const boardsRepo = require('./board.memory.repository');

/**
 * Returns all existing boards.
 * @returns {Array.<object>} all boards.
 */
const getAll = () => boardsRepo.getAll();

/**
 * Retrieves a board by id.
 * @param {String} id - Board id
 * @returns {Board} Board object.
 */
const get = id => boardsRepo.get(id);

/**
 * Inserts a new board into boards repo.
 * @param {Board.<string>} board object.
 * @returns {Board.<string>} newly created Board object.
 */
const create = board => boardsRepo.create(board);

/**
 * Updates a board with a specific id.
 * @param {String} id - Board id
 * @param {Board} board - Board object with new values.
 * @returns {Board} updated Board object.
 */
const update = (id, board) => boardsRepo.update(id, board);

/**
 * Deletes a board with a specific id.
 * @param {String} id - Board id
 * @returns {Board} Board object that was removed.
 */
const remove = id => boardsRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
