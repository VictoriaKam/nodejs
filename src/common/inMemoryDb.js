const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');

const DB = {
  Users: [],
  Boards: [],
  Tasks: []
}

DB.Users.push(new User(), new User(), new User());

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
  const userIndex = DB.Users.indexOf(user);
  DB.Users.splice(userIndex,1);
  return user;
}

DB.Boards.push(new Board(), new Board(), new Board());

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
  const boardIndex = DB.Boards.indexOf(board);
  DB.Boards.splice(boardIndex,1);
  return board;
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
  removeBoard
};
