import * as boardsRepo from './board.memory.repository';

import {IBoard} from '../../types/interfaces';

/**
 * Returns all existing boards.
 * @returns {Array.<object>} all boards.
 */
const getAll = (): Promise<Array<IBoard>> => boardsRepo.getAll();

/**
 * Retrieves a board by id.
 * @param {String} id - Board id
 * @returns {Board} Board object.
 */
const get = (id: string): Promise<IBoard> => boardsRepo.get(id);

/**
 * Inserts a new board into boards repo.
 * @param {Board.<string>} board object.
 * @returns {Board.<string>} newly created Board object.
 */
const create = (board: IBoard): Promise<IBoard> => boardsRepo.create(board);

/**
 * Updates a board with a specific id.
 * @param {String} id - Board id
 * @param {Board} board - Board object with new values.
 * @returns {Board} updated Board object.
 */
const update = async (id: string, board: IBoard): Promise<IBoard> => boardsRepo.update(id, board);

/**
 * Deletes a board with a specific id.
 * @param {String} id - Board id
 * @returns {Board} Board object that was removed.
 */
const remove = (id: string): Promise<IBoard> => boardsRepo.remove(id);

const _ = {
    getAll,
    get,
    create,
    update,
    remove
  }

  export = _;
