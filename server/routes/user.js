const Router = require('koa-router');
const user = require('../controllers/user');
const newMsg = require('../controllers/newMsg');
const isLogin = require('./isLogin');

const router = new Router();

router.post('/login', user.login);
// router.post('/register', user.register);

// 登录后的接口
router.get('/msg/all', isLogin, newMsg.getMsg);
router.delete('/msg/delete', isLogin, newMsg.removeMsg);

module.exports = router;