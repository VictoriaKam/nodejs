const DB = require('../../common/inMemoryDb');

/**
 * Represents all existing boards.
 * @async
 * @returns {Array.<object>} all boards.
 */
const getAll = async () => DB.getAllBoards();

/**
 * Retrieves a board by id.
 * @async
 * @param {String} id - Board id
 * @returns {Board} Board object.
 * @throws {NotFoundError} When the board is not found.
 */
const get = async id => {
  const board = await DB.getBoard(id);

  if (!board) {
    throw new Error(`Board with id ${id} was not found.`);
  }

  return board;
};

/**
 * Inserts a new board into DB.
 * @async
 * @param {Board.<string>} Board object.
 * @returns {Board.<string>} newly created Board object.
 */
const create = async board => DB.createBoard(board);

/**
 * Updates a board with a specific id.
 * @async
 * @param {String} id - Board id
 * @param {Board} Board - Board object with new values.
 * @returns {Board} updated Board object.
 */
const update = async (id, board) => DB.updateBoard(id, board);

/**
 * Deletes a board with a specific id.
 * @async
 * @param {String} id - Board id
 * @returns {Board} Board object that was removed.
 */
const remove = async id => DB.removeBoard(id);

module.exports = { getAll,  get, create, update, remove };
