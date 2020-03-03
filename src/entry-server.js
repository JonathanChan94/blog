import createApp from './app';

export default context => {
  return new Promise((resolve, reject) => {
    const {
      url,
      token
    } = context;
    const {
      app,
      router,
      store
    } = createApp(token);

    router.push(url);

    router.onReady(() => {
      const matched = router.getMatchedComponents();
      if (!matched.length) {
        reject({
          code: 404
        })
      }

      Promise.all(matched.map(comp => {
        if (comp.asyncData) {
          return comp.asyncData({
            store,
            route: router.currentRoute
          });
        }
      })).then(() => {
        context.state = store.state;
        resolve(app);
      }).catch(reject);
    }, reject)
  })
}