import User = require('../resources/users/user.model');
import Board = require('../resources/boards/board.model');
import Task = require('../resources/tasks/task.model');
import {IDB, IUser, IBoard, ITask} from '../types/interfaces';

/** Database imitation. */
const DB: IDB = {
  Users: [],
  Boards: [],
  Tasks: [],
  /**
     * Remove tasks if tasks' board was removed.
     * @param {Board} object - An object containing id, title and columns keys.
     * @return {void}
     */
  removeTasksOfRemovedBoard: board => {
    if (board) {
      DB.Tasks.filter(task => task && task.boardId === board.id).forEach(
        task => (DB.Tasks.splice(DB.Tasks.indexOf(task),1))
      );
    }
  },
    /**
     * Make tasks equal to null if user assigned to these tasks was removed.
     * @param {User} object - An object containing id, name, login and password keys.
     * @return {void}
     */
  updateTaskForDeletedUser: user => {
    if (user) {
      DB.Tasks = DB.Tasks.map(task =>
        task.userId === user.id ? { ...task, userId: null } : { ...task }
      );
    }
  }
}

const newUser1: IUser = new User();
const newUser2: IUser = new User();
const newUser3: IUser = new User();
DB.Users.push(newUser1, newUser2, newUser3);

/**
 * Represents all existing users.
 * @async
 * @returns {Array.<object>} all users.
 */
const getAllUsers = async (): Promise<Array<IUser>> => DB.Users.slice(0);

/**
 * Retrieves a user by id.
 * @async
 * @param {String} id - User id
 * @returns {User} User object.
 */
const getUser = async (id: string): Promise<IUser> => DB.Users.filter(el => el.id === id)[0];

/**
 * Inserts a new user into DB.
 * @async
 * @param {User.<string>} User object.
 * @returns {User.<string>} newly created User object.
 */
const createUser = async (user: IUser): Promise<IUser> => {
  DB.Users.push(user);
  return user;
};

/**
 * Updates a user with a specific id.
 * @async
 * @param {String} id - User id
 * @param {User} User - User object with new values.
 * @returns {User} updated User object.
 */
const updateUser = async (id: string, user: IUser): Promise<IUser> => {
  const userOld = DB.Users.filter(el => el.id === id)[0];
  const userIndex = DB.Users.indexOf(userOld);
  DB.Users[userIndex].login = user.login;
  DB.Users[userIndex].password = user.password;
  DB.Users[userIndex].name = user.name
  return DB.Users[userIndex];
}

/**
 * Deletes a user with a specific id.
 * @async
 * @param {String} id - User id
 * @returns {User} User object that was removed.
 */
const removeUser = async (id: string): Promise<IUser> => {
  const user = DB.Users.filter(el => el.id === id)[0];
  DB.updateTaskForDeletedUser(user);
  const userIndex = DB.Users.indexOf(user);
  DB.Users.splice(userIndex,1);
  return user;
}

const newBoard: IBoard = new Board();
DB.Boards.push(newBoard);

/**
 * Represents all existing boards.
 * @async
 * @returns {Array.<object>} all boards.
 */
const getAllBoards = async (): Promise<Array<IBoard>> => DB.Boards.slice(0);

/**
 * Retrieves a board by id.
 * @async
 * @param {String} id - Board id
 * @returns {Board} Board object.
 */
const getBoard = async (id: string): Promise<IBoard> => DB.Boards.filter(el => el.id === id)[0];

/**
 * Inserts a new board into DB.
 * @async
 * @param {Board.<string>} Board object.
 * @returns {Board.<string>} newly created Board object.
 */
const createBoard = async (board: IBoard): Promise<IBoard> => {
  DB.Boards.push(board);
  return board;
};

/**
 * Updates a board with a specific id.
 * @async
 * @param {String} id - Board id
 * @param {Board} Board - Board object with new values.
 * @returns {Board} updated Board object.
 */
const updateBoard = async (id: string, board: IBoard): Promise<IBoard> => {
  const boardOld = DB.Boards.filter(el => el.id === id)[0];
  const boardIndex = DB.Boards.indexOf(boardOld);
  DB.Boards[boardIndex].title = board.title;
  DB.Boards[boardIndex].columns = board.columns;
  return DB.Boards[boardIndex];
}

/**
 * Deletes a board with a specific id.
 * @async
 * @param {String} id - Board id
 * @returns {Board} Board object that was removed.
 */
const removeBoard = async (id: string): Promise<IBoard> => {
  const board = DB.Boards.filter(el => el.id === id)[0];
  DB.removeTasksOfRemovedBoard(board);
  const boardIndex = DB.Boards.indexOf(board);
  DB.Boards.splice(boardIndex,1);
  return board;
}

DB.Tasks.push(
  new Task({ boardId: newBoard.id, userId: newUser1.id }),
  new Task({ boardId: newBoard.id, userId: newUser2.id })
);

/**
 * Represents all existing tasks in particular board.
 * @async
 * @param {String} boardId - Board id
 * @returns {Array.<object>} all tasks in particular board.
 */
const getAllTasks = async (boardId: string): Promise<Array<ITask>> => DB.Tasks.filter(el => el.boardId === boardId);

/**
 * Retrieves a task by board id and task id.
 * @async
 * @param {String} boardId - Board id
 * @param {String} taskId - Task id
 * @returns {Task} Task object.
 */
const getTask = async (boardId: string, taskId: string): Promise<ITask> =>
  DB.Tasks
  .filter(el => el.boardId === boardId)
  .filter(task => task.id === taskId)[0];

/**
 * Inserts a new task into particular board into DB.
 * @async
 * @param {String} boardId - Board id
 * @param {Task.<string>} Task object.
 * @returns {Task.<string>} newly created Task object.
 */
const createTask = async (boardId: string, task: ITask): Promise<ITask> => {
  DB.Tasks.push(task);
  return task;
};

/**
 * Updates a task with a specific id in a particular board.
 * @async
 * @param {String} boardId - Board id
 * @param {String} taskId - Task id
 * @param {Task} Task - Taskd object with new values.
 * @returns {Task} updated Task object.
 */
const updateTask = async (boardId: string, taskId: string, task: ITask): Promise<ITask> => {
  const taskOld = DB.Tasks.filter(el => el.boardId === boardId).filter(elTask => elTask.id === taskId)[0];
  const taskIndex = DB.Tasks.indexOf(taskOld);
  if (DB.Tasks[taskIndex]) {
    DB.Tasks[taskIndex].title = task.title;
    DB.Tasks[taskIndex].order = task.order;
    DB.Tasks[taskIndex].description = task.description;
    DB.Tasks[taskIndex].userId = task.userId;
    DB.Tasks[taskIndex].boardId = task.boardId;
    DB.Tasks[taskIndex].columnId = task.columnId;
  };
  return DB.Tasks[taskIndex];
}

/**
 * Deletes a task with a specific id in a particular board.
 * @async
 * @param {String} boardId - Board id
 * @param {String} taskId - Task id
 * @returns {Task} Task object that was removed.
 */
const removeTask = async (boardId: string, taskId: string): Promise<ITask> => {
  const task = DB.Tasks.filter(el => el.boardId === boardId).filter(elTask => elTask.id === taskId)[0];
  const taskIndex = DB.Tasks.indexOf(task);
  DB.Tasks.splice(taskIndex,1);
  return task;
}

const _ = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  removeBoard,
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  removeTask
}

export = _;
