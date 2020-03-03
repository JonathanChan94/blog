const Router = require('koa-router');
const article = require('../controllers/article');
const isLogin = require('./isLogin');

const router = new Router();

router.get('/articles/search', article.searchArticles);
router.get('/articles/all', article.getArticles);
router.get('/articles/one/:id', article.getArticle);
router.get('/articles/prevnext', article.getPrevNextArticle);
router.get('/articles/num', article.getArticlesNum);
router.get('/articles/archive', article.getArticlesArchive);
router.get('/articles/tags', article.getTags);

// 登录后才能访问的接口
router.post('/articles/add', isLogin, article.addArticle);
router.get('/articles/getall', isLogin, article.getAllArticles);
router.patch('/articles/update', isLogin, article.updateArticle);
router.get('/articles/getone/:id', isLogin, article.adminGetArticle);
router.patch('/articles/edit', isLogin, article.editArticle);

module.exports = router;