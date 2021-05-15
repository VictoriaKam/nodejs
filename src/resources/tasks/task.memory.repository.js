const DB = require('../../common/inMemoryDb');

const getAll = async boardId => {
  const tasks = await DB.getAllTasks(boardId);
  if (!tasks || tasks.length === 0) {
    throw new Error(`Tasks for Board with id ${boardId} were not found.`);
  }

  return tasks;
};

const get = async (boardId, taskId) => {
  const task = await DB.getTask(boardId, taskId);
  if (!task) {
    throw new Error(`Task with id ${taskId} in Board with id ${boardId} was not found.`);
  }

  return task;
};

const create = async (boardId, task) => DB.createTask(boardId, task);

const update = async (boardId, taskId, task) => {
  const updatedTask = await DB.updateTask(boardId, taskId, task);
  if (!updatedTask) {
    throw new Error(`Task with id ${taskId} for Board with id ${boardId} was not found.`);
  }

  return updatedTask;
}

const remove = async (boardId, taskId) => {
  const removedTask = await  DB.removeTask(boardId, taskId);;
  if (!removedTask) {
    throw new Error(`Task with id ${taskId} for Board with id ${boardId} was not found.`);
  }

  return removedTask;
}

module.exports = { getAll, get, create, update, remove };
