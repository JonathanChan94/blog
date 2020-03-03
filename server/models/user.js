const db = require('../db');

const getUserByName = async (name) => {
  return await db.user.findOne(name);
}

const addUser = async (content) => {
  return await db.user.create(content);
}

module.exports = {
  getUserByName,
  addUser
}