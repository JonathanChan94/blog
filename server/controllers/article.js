const article = require('../models/article');
const newMsg = require('../models/newMsg');
const axios = require('axios');
const env = require('../../env');

// 搜索文章
const searchArticles = async (ctx, next) => {
  let search = ctx.query.search;
  const data = await article.searchArticles(search);
  if (data) {
    ctx.type = 'json';
    ctx.body = {
      code: 0,
      res: data,
      reason: 'success'
    }
  } else {
    ctx.type = 'json';
    ctx.body = {
      code: 100,
      reason: '出错啦'
    }
  }
}

// 获取文章
const getArticles = async (ctx, next) => {
  let pageSize = ctx.query.pageSize ? parseInt(ctx.query.pageSize) : 3;
  let page = ctx.query.page ? parseInt(ctx.query.page) : 1;
  let condition = ctx.query.tag ? {
    show: true,
    tags: ctx.query.tag
  } : {
    show: true
  };
  ctx.type = 'json';
  const res = await article.getArticles(pageSize, page, condition);
  if (res && res.length > 0) {
    ctx.body = {
      code: 0,
      res: res,
      reason: 'success'
    };
  } else if (res && ctx.query.tag && res.length === 0) {
    ctx.body = {
      code: 404,
      reason: `无${ctx.query.tag}相关的文章`
    };
  } else {
    ctx.body = {
      code: 100,
      reason: '出错啦'
    };
  }
}

// 管理员查看所有文章
const getAllArticles = async (ctx, next) => {
  let pageSize = ctx.query.pageSize ? parseInt(ctx.query.pageSize) : 10;
  let page = ctx.query.page ? parseInt(ctx.query.page) : 1;
  ctx.type = 'json';
  const res = await article.getAllArticles(pageSize, page);
  if (res) {
    ctx.body = {
      code: 0,
      res: res,
      reason: 'success'
    };
  } else {
    ctx.body = {
      code: 100,
      reason: '出错啦'
    };
  }
}

// 获取文章数量
const getArticlesNum = async (ctx, next) => {
  let condition = ctx.query.tag ? {
    show: true,
    tags: ctx.query.tag
  } : {
    show: true
  };
  const number = await article.getArticlesNum(condition);
  ctx.type = 'json';
  ctx.body = {
    code: 0,
    res: {
      num: number
    },
    reason: 'success'
  }
}

// 获取所有文章
const getArticlesArchive = async (ctx, next) => {
  let condition = {
    show: true
  };
  ctx.type = 'json';
  try {
    const res = await article.getArticlesArchive(condition);
    ctx.body = {
      code: 0,
      res: res,
      reason: 'success'
    }
  } catch (e) {
    ctx.body = {
      code: 100,
      reason: '出错啦'
    }
  }
}

// 获取特定文章内容
const getArticle = async (ctx, next) => {
  let id = Number(ctx.params.id);
  ctx.type = 'json';
  if (isNaN(id)) {
    return ctx.body = {
      code: 404,
      reason: '无此文章'
    }
  }
  let condition = {
    articleId: id,
    show: true
  };
  const res = await article.getArticle(condition);
  if (res) {
    ctx.body = {
      code: 0,
      res: res,
      reason: 'success'
    }
    article.updateArticlePv(condition);
    let ipAddress = ctx.request.ip;
    let ip = ipAddress.indexOf('::ffff:') !== -1 ? ipAddress.substring(7) : ipAddress;
    axios.get(`http://apis.juhe.cn/ip/ipNew?ip=${ip}&key=${env.juheKey}`).then(response => {
      if (response.data.resultcode === '200') {
        newMsg.addMsg({
          type: 'pv',
          content: response.data.result.City + '的用户访问了文章：' + res.title,
          ip: ip
        })
      }
    }).catch(() => {});
  } else {
    ctx.body = {
      code: 404,
      reason: '无此文章'
    }
  }
}

// 管理员编辑文章时获取文章内容
const adminGetArticle = async (ctx, next) => {
  let id = Number(ctx.params.id);
  ctx.type = 'json';
  if (isNaN(id)) {
    return ctx.body = {
      code: 404,
      reason: '无此文章'
    }
  }
  let condition = {
    articleId: id,
    show: true
  };
  const res = await article.getArticleTotal(condition);
  if (res) {
    ctx.body = {
      code: 0,
      res: res,
      reason: 'success'
    }
  } else {
    ctx.body = {
      code: 404,
      reason: '无此文章'
    }
  }
}

// 获取前一篇下一篇文章
const getPrevNextArticle = async (ctx, next) => {
  let id = ctx.query.articleId;
  const data = await article.getPrevNextArticle(id);
  if (data) {
    ctx.type = 'json';
    ctx.body = {
      code: 0,
      res: data,
      reason: 'success'
    }
  } else {
    ctx.type = 'json';
    ctx.body = {
      code: 100,
      reason: '出错啦'
    }
  }
}

// 获取标签列表
const getTags = async (ctx, next) => {
  let condition = {
    show: true
  };
  ctx.type = 'json';
  const res = await article.getTags(condition);
  if (res) {
    ctx.body = {
      code: 0,
      res: res,
      reason: 'success'
    }
  } else {
    ctx.body = {
      code: 100,
      reason: '出错啦'
    }
  }
}

// 新增文章
const addArticle = async (ctx, next) => {
  let data = {
    title: ctx.request.body.title,
    tags: ctx.request.body.tags,
    date: parseInt(ctx.request.body.date),
    introMd: ctx.request.body.introMd,
    introduction: ctx.request.body.introduction,
    contentMd: ctx.request.body.contentMd,
    content: ctx.request.body.content,
    original: true,
    show: true,
    commentNum: 0,
    likeNum: 0,
    pv: 0
  };
  const res = await article.addArticle(data);
  ctx.type = 'json';
  if (res) {
    ctx.body = {
      code: 0,
      res: res,
      reason: 'success'
    }
  } else {
    ctx.body = {
      code: 100,
      reason: '出错啦'
    }
  }
}

// 更新文章是否显示
const updateArticle = async (ctx, next) => {
  let condition = {
    articleId: ctx.request.body.articleId
  };
  let data = {
    show: ctx.request.body.show
  };
  ctx.type = 'json';
  const res = await article.updateArticle(condition, data);
  if (res) {
    ctx.body = {
      code: 0,
      res: res,
      reason: 'success'
    }
  } else {
    ctx.body = {
      code: 100,
      reason: '出错啦'
    }
  }
}

// 更新文章
const editArticle = async (ctx, next) => {
  let condition = {
    articleId: ctx.request.body.articleId
  };
  let data = {
    title: ctx.request.body.title,
    tags: ctx.request.body.tags,
    date: parseInt(ctx.request.body.date),
    introMd: ctx.request.body.introMd,
    introduction: ctx.request.body.introduction,
    contentMd: ctx.request.body.contentMd,
    content: ctx.request.body.content,
  };
  const res = await article.updateArticle(condition, data);
  if (res) {
    ctx.body = {
      code: 0,
      res: res,
      reason: 'success'
    }
  } else {
    ctx.body = {
      code: 100,
      reason: '出错啦'
    }
  }
}

module.exports = {
  searchArticles,
  getArticles,
  getArticlesNum,
  getArticlesArchive,
  getArticle,
  adminGetArticle,
  getPrevNextArticle,
  getTags,
  addArticle,
  getAllArticles,
  updateArticle,
  editArticle
}