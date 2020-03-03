const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const env = require('../../env');

const login = async (ctx, next) => {
  const user = await userModel.getUserByName({
    name: ctx.request.body.name
  });
  ctx.type = 'json';
  if (user) {
    if (bcrypt.compareSync(ctx.request.body.password, user.password)) {
      var token = jwt.sign({ name: user.name }, env.secret, {
        expiresIn: 60 * 60
      })
      ctx.cookies.set('token', token, {maxAge: 1000 * 60 * 60, httpOnly: false});
      ctx.body = {
        code: 0,
        reason: '登录成功',
        token: token
      }
    } else {
      ctx.body = {
        code: 102,
        reason: '密码有误'
      }
    }
  } else {
    ctx.body = {
      code: 101,
      reason: '用户不存在'
    }
  }
}

const register = async (ctx, next) => {
  var psw = bcrypt.hashSync(ctx.request.body.password, salt);
  const user = await userModel.addUser({
    name: ctx.request.body.name,
    password: psw
  });
  ctx.type = 'json';
  if (user) {
    ctx.body = {
      code: 0,
      reason: '注册成功'
    }
  } else {
    ctx.body = {
      code: 110,
      reason: '注册失败'
    }
  }
}

module.exports = {
  login,
  register
}