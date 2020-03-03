const devMiddleware = require('webpack-dev-middleware');

module.exports = (compiler, opts = {}, callback) => {
  const middleware = devMiddleware(compiler, opts);
  const devServer = async (ctx, next) => {
    if (ctx.req.url === '/') {
      return next()
    } else {
      await middleware(ctx.req, {
        end: (content) => {
          ctx.body = content
        },
        setHeader: (...args) => {
          ctx.set.apply(ctx, args)
        }
      }, next)
    }
  }
  devServer.fileSystem = middleware.fileSystem
  return devServer
}