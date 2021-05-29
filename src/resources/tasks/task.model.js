const { v4: uuid } = require('uuid');

/** Class representing a task. */
class Task {
    /**
     * Create a task.
     * @param {String} id - The id value.
     * @param {String} title - The title value.
     * @param {Number} order - The order value.
     * @param {String} description - The description value.
     * @param {String} userId - The userId value.
     * @param {String} boardId - The boardId value.
     * @param {String} columnId - The columnId value.
     */
  constructor({
    id = uuid(),
    title = 'TASK',
    order = 0,
    description = 'description',
    userId = 'userId',
    boardId = 'boardId',
    columnId = 'columnId'
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

    /**
    * Returns a task with all data.
    * @param {Task} task - An object containing id, title, order, description, userId, boardId and columnId data.
    * @return {Task} A Task object.
  */
  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
