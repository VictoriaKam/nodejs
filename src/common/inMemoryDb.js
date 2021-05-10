const User = require('../resources/users/user.model');

const DB = [];

DB.push(new User(), new User(), new User());

const getAllUsers = async () => DB.slice(0);

const getUser = async id => DB.filter(el => el.id === id)[0];

const createUser = async user => {
  DB.push(user);
  return user;
};

const updateUser = async (id, user) => {
  const userOld = DB.filter(el => el.id === id)[0];
  const userIndex = DB.indexOf(userOld);
  DB[userIndex].login = user.login;
  DB[userIndex].password = user.password;
  DB[userIndex].name = user.name
  return DB[userIndex];
}

const removeUser = async id => {
  const user = DB.filter(el => el.id === id)[0];
  const userIndex = DB.indexOf(user);
  DB.splice(userIndex,1);
  return user;
}

module.exports = { getAllUsers, getUser, createUser, updateUser, removeUser };
