import Vue from 'vue';
import Vuex from 'vuex';
import * as api from '../api/api';

Vue.use(Vuex);

export default function createStore () {
  const store = new Vuex.Store({
    state: {
      token: '',
      articles: [],
      num: 0,
      pageSize: 5,
      searchRes: [],
      archive: [],
      html: '',
      title: '',
      date: '',
      tags: []
    },
    getters: {
      token: state => state.token,
      articles: state => state.articles,
      num: state => state.num,
      pageSize: state => state.pageSize,
      searchRes: state => state.searchRes,
      archive: state => state.archive,
      html: state => state.html,
      title: state => state.title,
      date: state => state.date,
      tags: state => state.tags
    },
    mutations: {
      SET_TOKEN (state, token) {
        state.token = token;
      },
      SET_ARTICLES (state, articles) {
        state.articles = articles;
      },
      SET_NUM (state, num) {
        state.num = num;
      },
      SET_SEARCHRES (state, searchRes) {
        state.searchRes = searchRes;
      },
      SET_ARCHIVE (state, archive) {
        state.archive = archive;
      },
      SET_ARTICLE (state, article) {
        state.html = article.content;
        state.title = article.title;
        state.date = article.date;
        state.tags = article.tags;
      },
      SET_TAGS (state, tags) {
        state.tags = tags;
      }
    },
    actions: {
      searchArticles ({commit}, data) {
        return new Promise((resolve, reject) => {
          api.searchArticles(data).then(res => {
            if (res.code === 0) {
              commit('SET_SEARCHRES', res.res);
              resolve(res);
            } else {
              reject(res);
            }
          }).catch(reject);
        })
      },
      getArticles ({commit, state}, data) {
        return new Promise((resolve, reject) => {
          let content = {
            page: data.page || 1,
            pageSize: data.pageSize || state.pageSize,
            tag: data.tag || null
          };
          api.getArticles(content).then(res => {
            if (res.code === 0) {
              commit('SET_ARTICLES', res.res);
              resolve(res);
            } else {
              reject(res);
            }
          }).catch(err => {
            reject();
          })
        })
      },
      getArticlesNum ({commit}, data) {
        return new Promise((resolve, reject) => {
          let content = data.tag ? {tag: data.tag} : {};
          api.getArticlesNum(content).then(res => {
            if (res.code === 0) {
              commit('SET_NUM', res.res.num);
              resolve(res);
            } else {
              reject(res);
            }
          }).catch(err => {
            reject();
          })
        })
      },
      getArchive ({commit}) {
        return new Promise((resolve, reject) => {
          api.getArchive().then(res => {
            if (res.code === 0) {
              commit('SET_ARCHIVE', res.res);
              resolve(res);
            } else {
              reject(res);
            }
          }).catch(() => {
            reject();
          })
        })
      },
      getArticle ({commit}, id) {
        return new Promise((resolve, reject) => {
          api.getArticle(id).then(res => {
            if (res.code === 0) {
              commit('SET_ARTICLE', res.res);
              resolve(res);
            } else {
              reject(res);
            }
          }).catch(err => {
            reject(err);
          })
        })
      },
      getArticleTotal ({commit}, id) {
        return new Promise((resolve, reject) => {
          api.getArticleTotal(id).then(res => {
            if (res.code === 0) {
              resolve(res);
            } else {
              reject(res);
            }
          }).catch(err => {
            reject(err);
          })
        })
      },
      getPrevNextArticle ({commit}, id) {
        return new Promise((resolve, reject) => {
          api.getPrevNextArticle(id).then(res => {
            if (res.code === 0) {
              resolve(res);
            } else {
              reject(res);
            }
          }).catch(reject);
        })
      },
      getTags ({commit}) {
        return new Promise((resolve, reject) => {
          api.getTags().then(res => {
            if (res.code === 0) {
              commit('SET_TAGS', res.res);
              resolve(res);
            } else {
              reject(res);
            }
          }).catch(err => {
            reject();
          })
        })
      },
      login ({commit}, data) {
        return new Promise((resolve, reject) => {
          api.login(data).then(res => {
            if (res.code === 0) {
              commit('SET_TOKEN', res.token);
              resolve(res);
            } else {
              reject(res);
            }
          }).catch(reject);
        })
      },
      register ({commit}, data) {
        return new Promise((resolve, reject) => {
          api.register(data).then(res => {
            if (res.code === 0) {
              resolve(res);
            } else {
              reject(res);
            }
          }).catch(reject);
        })
      },
      addArticle ({commit}, data) {
        return new Promise((resolve, reject) => {
          api.addArticle(data).then(res => {
            if (res.code === 0) {
              resolve(res);
            } else {
              reject(res);
            }
          }).catch(reject);
        })
      },
      getAllArticles ({commit}, data) {
        return new Promise((resolve, reject) => {
          api.getAllArticles(data).then(res => {
            if (res.code === 0) {
              resolve(res);
            } else {
              reject(res);
            }
          }).catch(reject);
        })
      },
      updateArticle ({commit}, data) {
        return new Promise((resolve, reject) => {
          api.updateArticle(data).then(res => {
            if (res.code === 0) {
              resolve(res);
            } else {
              reject(res);
            }
          }).catch(reject);
        })
      },
      editArticle ({commit}, data) {
        return new Promise((resolve, reject) => {
          api.editArticle(data).then(res => {
            if (res.code === 0) {
              resolve(res);
            } else {
              reject(res);
            }
          }).catch(reject);
        })
      },
      getMsg ({commit}) {
        return new Promise((resolve, reject) => {
          api.getMsg().then(res => {
            if (res.code === 0) {
              resolve(res);
            } else {
              reject(res);
            }
          }).catch(reject);
        })
      },
      removeMsg ({commit}, data) {
        return new Promise((resolve, reject) => {
          api.removeMsg(data).then(res => {
            if (res.code === 0) {
              resolve(res);
            } else {
              reject(res);
            }
          }).catch(reject);
        })
      }
    }
  });
  return store;
}