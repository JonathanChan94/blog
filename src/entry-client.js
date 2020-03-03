import Vue from 'vue';
import createApp from './app';
import Cookie from 'js-cookie';
import bus from './utils/bus';

Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const {
      asyncData
    } = this.$options;
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(res => {
        next();
      }).catch(err => {
        next();
      })
    } else {
      next()
    }
  }
})

const {
  app,
  router,
  store
} = createApp(Cookie.get('token'));

bus.$on('toLogin', () => {
  router.push('/login');
})

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {

  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    let diffed = false;
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    });

    if (!activated.length) {
      return next();
    }

    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({
          store,
          route: to
        });
      }
    })).then(next).catch(next);
  })

  if (window.__INITIAL_STATE__) {
    app.$mount('#app');
  } else {
    app.$mount('#de-app');
  }
})