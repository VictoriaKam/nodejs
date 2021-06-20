import { getRepository } from 'typeorm';

import { Board } from '../../entities/board.model';
import { Columns } from '../../entities/columns.model';
import { Task } from '../../entities/task.model';

const getAll = async (): Promise<Array<Board>> => {
  const boardsRepository = getRepository(Board);
  return boardsRepository.find({ relations: ["columns"] })
}

const get = async (id: string): Promise<Board | never> => {
  const boardsRepository = getRepository(Board);
  const res = await boardsRepository.findOne(id, { relations: ["columns"] });

  if (!res) {
    throw new Error(`Board with id ${id} was not found.`);
  }

  return res;
};

const create = async (board: Board): Promise<Board> => {
  const columnsRepository = getRepository(Columns);
  const newColumns = columnsRepository.create(board.columns);
  await columnsRepository.save(newColumns);

  const boardsRepository = getRepository(Board);
  const newBoard = boardsRepository.create(board);
  newBoard.columns = newColumns;
  const savedBoard = await boardsRepository.save(newBoard);
  return savedBoard;
};

const update = async (id: string, board: Board): Promise<Board> => {
  const boardsRepository = getRepository(Board);
  const res = await boardsRepository.findOne(id, { relations: ["columns"] });

  if (!res) {
    throw new Error(`Board with id ${id} was not found.`);
  }

  const columnsRepository = getRepository(Columns);
  const updatedColumns = await columnsRepository.save([
    ...board.columns
  ]);

  const newBoard = board;
  newBoard.columns = updatedColumns;

  const updatedBoard = await boardsRepository.save({
    ...res,
    ...newBoard
  });

  return updatedBoard;
}

const remove = async (id: string): Promise<string> => {
  const boardsRepository = getRepository(Board);
  const res = await boardsRepository.findOne(id, { relations: ["columns"] });

  const columnsRepository = getRepository(Columns);
  await columnsRepository.remove(res.columns);

  const deletionRes = await boardsRepository.delete(id);

  const tasksRepository = getRepository(Task);
  const tasks = await tasksRepository.find({ where: { boardId: id } });
  await tasksRepository.remove(tasks);

  if (!deletionRes.affected) {
    throw new Error(`The board with id ${id} was not found.`);
  }
  return `The board with id ${id} was deleted.`;
}

const _ = {
  getAll,
  get,
  create,
  update,
  remove
}

export = _;
