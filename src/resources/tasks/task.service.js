const tasksRepo = require('./task.memory.repository');

/**
 * Returns all existing tasks in particular board.
 * @param {String} boardId - Board id
 * @returns {Array.<object>} all tasks in particular board.
 */
const getAll = boardId => tasksRepo.getAll(boardId);

/**
 * Retrieves a task by board id and task id.
 * @param {String} boardId - Board id
 * @param {String} taskId - Task id
 * @returns {Task} Task object.
 */
const get = (boardId, taskId) => tasksRepo.get(boardId, taskId);

/**
 * Inserts a new task into particular board into tasks repo.
 * @param {String} boardId - Board id
 * @param {Task.<string>} Task object.
 * @returns {Task.<string>} newly created Task object.
 */
const create = (boardId, task) => tasksRepo.create(boardId, task);

/**
 * Updates a task with a specific id in a particular board.
 * @param {String} boardId - Board id
 * @param {String} taskId - Task id
 * @param {Task} Task - Taskd object with new values.
 * @returns {Task} updated Task object.
 */
const update = (boardId, taskId, task) => tasksRepo.update(boardId, taskId, task);

/**
 * Deletes a task with a specific id in a particular board.
 * @param {String} boardId - Board id
 * @param {String} taskId - Task id
 * @returns {Task} Task object that was removed.
 */
const remove = (boardId, taskId) => tasksRepo.remove(boardId, taskId);

module.exports = { getAll, get, create, update, remove };
