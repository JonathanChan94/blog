const jwt = require('jsonwebtoken');
const env = require('../../env');

module.exports = async (ctx, next) => {
  let token = ctx.cookies.get('token');
  if (token) {
    try {
      const decoded = await jwt.verify(token, env.secret);
      await next();
    } catch(e) {
      ctx.response.type = 'json';
      ctx.cookies.set('token', '', {
        maxAge: 0
      });
      ctx.response.body = {
        code: 1000,
        reason: 'token失效，请重新登录'
      }
    }
  } else {
    ctx.response.type = 'json';
    ctx.response.body = {
      code: 1000,
      reason: '登录失效，请重新登录'
    }
  }
}
