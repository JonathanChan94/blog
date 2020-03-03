const db = require('../db');

const addMsg = async (content) => {
  let data = Object.assign(content, {
    date: Date.now()
  })
  return await db.newMsg.create(data);
}

const getMsg = async (content) => {
  return await db.newMsg.find(content);
}

const removeMsg = async (content) => {
  return await db.newMsg.remove(content);
}

module.exports = {
  addMsg,
  getMsg,
  removeMsg
}