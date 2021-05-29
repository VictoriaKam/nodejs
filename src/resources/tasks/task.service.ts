import * as tasksRepo from './task.memory.repository';

import {ITask} from '../../types/interfaces';

/**
 * Returns all existing tasks in particular board.
 * @param {String} boardId - Board id
 * @returns {Array.<object>} all tasks in particular board.
 */
const getAll = (boardId: string): Promise<Array<ITask>> => tasksRepo.getAll(boardId);

/**
 * Retrieves a task by board id and task id.
 * @param {String} boardId - Board id
 * @param {String} taskId - Task id
 * @returns {Task} Task object.
 */
const get = (boardId: string, taskId: string): Promise<ITask> => tasksRepo.get(boardId, taskId);

/**
 * Inserts a new task into particular board into tasks repo.
 * @param {String} boardId - Board id
 * @param {Task.<string>} Task object.
 * @returns {Task.<string>} newly created Task object.
 */
const create = (boardId: string, task: ITask): Promise<ITask> => tasksRepo.create(boardId, task);

/**
 * Updates a task with a specific id in a particular board.
 * @param {String} boardId - Board id
 * @param {String} taskId - Task id
 * @param {Task} Task - Taskd object with new values.
 * @returns {Task} updated Task object.
 */
const update = (boardId: string, taskId: string, task: ITask): Promise<ITask> => tasksRepo.update(boardId, taskId, task);

/**
 * Deletes a task with a specific id in a particular board.
 * @param {String} boardId - Board id
 * @param {String} taskId - Task id
 * @returns {Task} Task object that was removed.
 */
const remove = (boardId: string, taskId: string): Promise<ITask> => tasksRepo.remove(boardId, taskId);

const _ = {
    getAll,
    get,
    create,
    update,
    remove
  }

  export = _;
