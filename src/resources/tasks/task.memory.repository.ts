import { getRepository } from 'typeorm';

import { Task } from '../../entities/task.model';

const getAll = async (boardId: string): Promise<Array<Task> | never> => {
  const tasksRepository = getRepository(Task);
  const tasks = await tasksRepository.find({ where: { boardId } })
  if (!tasks || tasks.length === 0) {
    throw new Error(`Tasks for Board with id ${boardId} were not found.`);
  }

  return tasks;
};

const get = async (boardId: string, id: string): Promise<Task | never> => {
  const tasksRepository = getRepository(Task);
  const task = await tasksRepository.findOne({ where: { boardId, id } });
  if (!task) {
    throw new Error(`Task with id ${id} in Board with id ${boardId} was not found.`);
  }

  return task;
};

const create = async (boardId: string, task: Task): Promise<Task> => {
  const tasksRepository = getRepository(Task);
  const newTask = tasksRepository.create(task);
  newTask.boardId = boardId;
  const savedTask = await tasksRepository.save(newTask);
  return savedTask;
}

const update = async (boardId: string, id: string, task: Task): Promise<Task | never> => {
  const tasksRepository = getRepository(Task);
  const res = await tasksRepository.findOne({ where: { boardId, id } });
  if (!res) {
    throw new Error(`Task with id ${id} in Board with id ${boardId} was not found.`);
  }

  const newTask = task;
  newTask.boardId = boardId;

  const updatedTask = await tasksRepository.save({
    ...res,
    ...newTask
  });

  return updatedTask;
}

const remove = async (boardId: string, id: string): Promise<string | never> => {
  const tasksRepository = getRepository(Task);
  const deletionRes = await tasksRepository.delete(id);
  if (!deletionRes.affected) {
    throw new Error(`Task with id ${id} for Board with id ${boardId} was not found.`);
  }

  return `The task with id ${id} was deleted.`;
}

const _ = {
  getAll,
  get,
  create,
  update,
  remove
}

export = _;
