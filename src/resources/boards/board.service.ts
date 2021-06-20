import * as boardsRepo from './board.memory.repository';
import { Board } from '../../entities/board.model'

const getAll = (): Promise<Array<Board>> => boardsRepo.getAll();

const get = (id: string): Promise<Board> => boardsRepo.get(id);

const create = (board: Board): Promise<Board> => boardsRepo.create(board);

const update = async (id: string, board: Board): Promise<Board> => boardsRepo.update(id, board);

const remove = (id: string): Promise<string> => boardsRepo.remove(id);

const _ = {
    getAll,
    get,
    create,
    update,
    remove
  }

  export = _;
