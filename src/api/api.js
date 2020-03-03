import request from '../utils/request';

function searchArticles(data) {
  return request.get('/articles/search', data);
}

function getArticles(data) {
  return request.get('/articles/all', data);
}

function getAllArticles(data) {
  return request.get('/articles/getall', data);
}

function getArticlesNum(data) {
  return request.get('/articles/num', data);
}

function getArchive() {
  return request.get('/articles/archive');
}

function getArticle(id) {
  return request.get(`/articles/one/${id}`);
}

function getArticleTotal(id) {
  return request.get(`/articles/getone/${id}`);
}

function getPrevNextArticle(id) {
  return request.get('/articles/prevnext', id);
}

function getTags() {
  return request.get('/articles/tags');
}

function addArticle(data) {
  return request.post('/articles/add', data);
}

function login(data) {
  return request.post('/login', data);
}

function register(data) {
  return request.post('/register', data);
}

function updateArticle(data) {
  return request.patch('/articles/update', data);
}

function editArticle(data) {
  return request.patch('/articles/edit', data);
}

function getMsg() {
  return request.get('/msg/all');
}

function removeMsg(data) {
  return request.delete('/msg/delete', data)
}

export {
  searchArticles,
  getArticles,
  getArticlesNum,
  getArchive,
  getArticle,
  getArticleTotal,
  getPrevNextArticle,
  getTags,
  addArticle,
  login,
  register,
  getAllArticles,
  updateArticle,
  editArticle,
  getMsg,
  removeMsg
};