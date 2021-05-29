import {ITask} from '../../types/interfaces';

import * as DB from '../../common/inMemoryDb';

/**
 * Represents all existing tasks in particular board.
 * @async
 * @param {String} boardId - Board id
 * @returns {Array.<object>} all tasks in particular board.
 */
const getAll = async (boardId: string): Promise<Array<ITask> | never> => {
  const tasks = await DB.getAllTasks(boardId);
  if (!tasks || tasks.length === 0) {
    throw new Error(`Tasks for Board with id ${boardId} were not found.`);
  }

  return tasks;
};

/**
 * Retrieves a task by board id and task id.
 * @async
 * @param {String} boardId - Board id
 * @param {String} taskId - Task id
 * @throws {NotFoundError} When the task is not found.
 * @returns {Task} Task object.
 */
const get = async (boardId: string, taskId: string): Promise<ITask | never> => {
  const task = await DB.getTask(boardId, taskId);
  if (!task) {
    throw new Error(`Task with id ${taskId} in Board with id ${boardId} was not found.`);
  }

  return task;
};

/**
 * Inserts a new task into particular board into DB.
 * @async
 * @param {String} boardId - Board id
 * @param {Task.<string>} Task object.
 * @returns {Task.<string>} newly created Task object.
 */
const create = async (boardId: string, task: ITask): Promise<ITask> => DB.createTask(boardId, task);

/**
 * Updates a task with a specific id in a particular board.
 * @async
 * @param {String} boardId - Board id
 * @param {String} taskId - Task id
 * @param {Task} Task - Taskd object with new values.
 * @returns {Task} updated Task object.
 */
const update = async (boardId: string, taskId: string, task: ITask): Promise<ITask | never> => {
  const updatedTask = await DB.updateTask(boardId, taskId, task);
  if (!updatedTask) {
    throw new Error(`Task with id ${taskId} for Board with id ${boardId} was not found.`);
  }

  return updatedTask;
}

/**
 * Deletes a task with a specific id in a particular board.
 * @async
 * @param {String} boardId - Board id
 * @param {String} taskId - Task id
 * @returns {Task} Task object that was removed.
 */
const remove = async (boardId: string, taskId: string): Promise<ITask | never> => {
  const removedTask = await  DB.removeTask(boardId, taskId);;
  if (!removedTask) {
    throw new Error(`Task with id ${taskId} for Board with id ${boardId} was not found.`);
  }

  return removedTask;
}

const _ = {
  getAll,
  get,
  create,
  update,
  remove
}

export = _;
