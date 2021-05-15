const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const DB = {
  Users: [],
  Boards: [],
  Tasks: [],
  removeTasksOfRemovedBoard: board => {
    if (board) {
      DB.Tasks.filter(task => task && task.boardId === board.id).forEach(
        task => (DB.Tasks.splice(DB.Tasks.indexOf(task),1))
      );
    }
  },
  updateTaskForDeletedUser: user => {
    if (user) {
      DB.Tasks = DB.Tasks.map(task =>
        task.userId === user.id ? { ...task, userId: null } : { ...task }
      );
    }
  }
}

const newUser1 = new User();
const newUser2 = new User();
const newUser3 = new User();
DB.Users.push(newUser1, newUser2, newUser3);

const getAllUsers = async () => DB.Users.slice(0);

const getUser = async id => DB.Users.filter(el => el.id === id)[0];

const createUser = async user => {
  DB.Users.push(user);
  return user;
};

const updateUser = async (id, user) => {
  const userOld = DB.Users.filter(el => el.id === id)[0];
  const userIndex = DB.Users.indexOf(userOld);
  DB.Users[userIndex].login = user.login;
  DB.Users[userIndex].password = user.password;
  DB.Users[userIndex].name = user.name
  return DB.Users[userIndex];
}

const removeUser = async id => {
  const user = DB.Users.filter(el => el.id === id)[0];
  DB.updateTaskForDeletedUser(user);
  const userIndex = DB.Users.indexOf(user);
  DB.Users.splice(userIndex,1);
  return user;
}

const newBoard = new Board();
DB.Boards.push(newBoard);

const getAllBoards = async () => DB.Boards.slice(0);

const getBoard = async id => DB.Boards.filter(el => el.id === id)[0];

const createBoard = async board => {
  DB.Boards.push(board);
  return board;
};

const updateBoard = async (id, board) => {
  const boardOld = DB.Boards.filter(el => el.id === id)[0];
  const boardIndex = DB.Boards.indexOf(boardOld);
  DB.Boards[boardIndex].title = board.title;
  DB.Boards[boardIndex].columns = board.columns;
  return DB.Boards[boardIndex];
}

const removeBoard = async id => {
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

const getAllTasks = async boardId => DB.Tasks.filter(el => el.boardId === boardId);

const getTask = async (boardId, taskId) =>
  DB.Tasks
  .filter(el => el.boardId === boardId)
  .filter(task => task.id === taskId)[0];

const createTask = async (boardId, task) => {
  DB.Tasks.push(task);
  return task;
};

const updateTask = async (boardId, taskId, task) => {
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

const removeTask = async (boardId, taskId) => {
  const task = DB.Tasks.filter(el => el.boardId === boardId).filter(elTask => elTask.id === taskId)[0];
  const taskIndex = DB.Tasks.indexOf(task);
  DB.Tasks.splice(taskIndex,1);
  return task;
}

module.exports = {
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
};
