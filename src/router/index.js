import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Home from '../front/home.vue';
const Search = () => import(/* webpackChunkName: "search" */ '../front/search.vue');
const Article = () => import(/* webpackChunkName: "article" */ '../front/article.vue');
const Archive = () => import(/* webpackChunkName: "archive" */ '../front/archive.vue');
const Tags = () => import(/* webpackChunkName: "tags" */ '../front/tags.vue');
const About = () => import(/* webpackChunkName: "About" */ '../front/about.vue');
const Err404 = () => import(/* webpackChunkName: "404" */ '../front/404.vue');

const Login = () => import(/* webpackChunkName: "login" */ '../admin/login.vue');
const Layout = () => import(/* webpackChunkName: "layout" */ '../admin/layout.vue');
const AdminHome = () => import(/* webpackChunkName: "adminHome" */ '../admin/home.vue');
const AdminArticle = () => import(/* webpackChunkName: "adminArticle" */ '../admin/article.vue');
const AdminAdd = () => import(/* webpackChunkName: "adminAdd" */ '../admin/add.vue');
const AdminEdit = () => import(/* webpackChunkName: "adminEdit" */ '../admin/edit.vue');

export default function createRouter (token) {
  const router = new Router({
    mode: 'history',
    routes: [
      {
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/home/page/:page',
        name: 'HomePage',
        component: Home
      },
      {
        path: '/search/:content',
        name: 'Search',
        component: Search
      },
      {
        path: '/article/:id',
        name: 'Article',
        component: Article
      },
      {
        path: '/archive',
        name: 'Archive',
        component: Archive
      },
      {
        path: '/tags',
        name: 'Tags',
        component: Tags
      },
      {
        path: '/tags/:tag',
        name: 'TagsArticle',
        component: Home
      },
      {
        path: '/tags/:tag/page/:page',
        name: 'TagsArticlePage',
        component: Home
      },
      {
        path: '/about',
        name: 'About',
        component: About
      },
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/admin',
        component: Layout,
        meta: { requireAuth: true },
        children: [
          {
            path: 'home',
            name: 'AdminHome',
            component: AdminHome
          },
          {
            path: 'article',
            name: 'AdminArticle',
            component: AdminArticle
          },
          {
            path: 'add',
            name: 'AdminAdd',
            component: AdminAdd
          },
          {
            path: 'edit/:id',
            name: 'AdminEdit',
            component: AdminEdit
          }
        ]
      },
      {
        path: '/404',
        name: 'Err404',
        component: Err404
      },
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: '*',
        redirect: '/404'
      }
    ],
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
  })

  router.beforeEach((to, from, next) => {
    let getToken = token || router.app.$options.store.getters.token;
    if (to.matched.some(r => r.meta.requireAuth) && !getToken) {
      next('/login');
    } else {
      next();
    }
  })

  return router;
}