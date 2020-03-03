const msgModel = require('../models/newMsg');

const getMsg = async (ctx, next) => {
  const type = ['pv', 'comment', 'like'];
  let res = {};
  for (let i = 0; i < type.length; i++) {
    let data = await msgModel.getMsg({
      type: type[i]
    });
    res[type[i]] = data;
  }
  ctx.type = 'json';
  ctx.body = {
    code: 0,
    res: res
  };
}

const addMsg = async (ctx, next) => {
  const content = {
    type: ctx.request.body.type,
    name: ctx.request.body.name,
    say: ctx.request.body.say,
    title: ctx.request.body.title,
    content: ctx.request.body.content,
    ip: ctx.request.body.ip,
    date: Date.now()
  }
  const data = await msgModel.addMsg(content);
  if (data) {
    ctx.type = 'json';
    ctx.body = {
      code: 0,
      res: data
    }
  } else {
    ctx.type = 'json';
    ctx.body = {
      code: 100,
      reason: '出错啦'
    }
  }
}

const removeMsg = async (ctx, next) => {
  const content = {
    type: ctx.request.body.type
  };
  const res = await msgModel.removeMsg(content);
  ctx.type = 'json';
  ctx.body = {
    code: 0,
    res: res
  }
}

module.exports = {
  getMsg,
  removeMsg
}