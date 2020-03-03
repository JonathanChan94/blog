const db = require('../db');

const searchArticles = async (search) => {
  const condition = {
    show: true,
    $or: [
      {
        title: {$regex: search, $options: '$i'}
      },
      {
        tags: {$regex: search, $options: '$i'}
      }
    ]
  }
  const data = await db.article.find(condition, 'articleId title date').sort({'_id': -1});
  return data;
}

const getArticles = async (pageSize, page, condition) => {
  const data = await db.article.find(condition, 'articleId title date tags introduction').sort({ '_id': -1 }).limit(pageSize).skip(pageSize * (page - 1));
  return data;
}

const getAllArticles = async (pageSize, page) => {
  const data = await db.article.find({}, 'articleId title date tags pv likeNum commentNum show').sort({ '_id': -1 }).limit(pageSize).skip(pageSize * (page - 1));
  return data;
}

const getArticle = async (condition) => {
  const data = await db.article.findOne(condition, {introMd: 0, contentMd: 0});
  return data;
}

const getArticleTotal = async (condition) => {
  const data = await db.article.findOne(condition);
  return data;
}

const getPrevNextArticle = async (id) => {
  const next = await db.article.find({show: true, articleId: {'$lt': id}}, 'articleId title').sort({_id: -1}).limit(1);
  const prev = await db.article.find({show: true, articleId: {'$gt': id}}, 'articleId title').limit(1);
  return {
    prev: prev,
    next: next
  };
}

const updateArticlePv = async (condition) => {
  const data = await db.article.findOneAndUpdate(condition, {$inc: {'pv': 1}});
  return data;
}

const getArticlesNum = async (condition) => {
  const data = await db.article.countDocuments(condition);
  return data;
}

const getArticlesArchive = async (condition) => {
  const data = await db.article.find(condition, 'articleId title date').sort({ '_id': -1 });
  return data;
}

const getTags = async (condition) => {
  const tags = await db.article.find(condition).distinct('tags');
  let data = [];
  for (let i = 0; i < tags.length; i++) {
    let count = await db.article.countDocuments({tags: tags[i], show: true});
    data.push({
      tag: tags[i],
      num: count
    });
  }
  return data;
}

const addArticle = async (content) => {
  return await db.article.create(content);
}

const updateArticle = async (condition, data) => {
  return await db.article.findOneAndUpdate(condition, data);
}

module.exports = {
  searchArticles,
  getArticles,
  getArticlesNum,
  getArticlesArchive,
  getArticle,
  getArticleTotal,
  getPrevNextArticle,
  getTags,
  updateArticlePv,
  addArticle,
  getAllArticles,
  updateArticle
}
