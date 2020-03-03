const fs = require('fs');
const path = require('path');
const koa = require('koa');
const koaRouter = require('koa-router');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const { createBundleRenderer } = require('vue-server-renderer');
const resolve = file => path.resolve(__dirname, file);

const articleRouter = require('./server/routes/article');
const userRouter = require('./server/routes/user');

const app = new koa();
const router = koaRouter();

const isProd = process.env.NODE_ENV === 'production';

function createRenderer (bundle, options) {
  return createBundleRenderer(
    bundle,
    Object.assign(options, {
      runInNewContext: false
    })
  )
}

let renderer;
let readyPromise;
const templatePath = resolve('./dist/index.template.html');
if (isProd) {
  const template = fs.readFileSync(templatePath, 'utf-8');
  const bundle = require('./dist/vue-ssr-server-bundle.json');
  const clientManifest = require('./dist/vue-ssr-client-manifest.json');

  renderer = createRenderer(bundle, {
    template,
    clientManifest
  })
} else {
  readyPromise = require('./build/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options);
    }
  )
}


async function render (ctx, next) {
  ctx.type = 'text/html';

  const handleError = (err) => {
    if (err.url) {
      ctx.redirect(err.url);
    } else if (err.code === 404) {
      ctx.status = 404;
      ctx.body = '404 | Page Not Found';
    } else {
      ctx.status = 500;
      ctx.body = '500 | Internal Server Error';
      console.error(`error during render : ${ctx.req.url}`)
      console.error(err.stack)
    }
  }

  const context = {
    title: 'Vue Blog',
    url: ctx.req.url,
    token: ctx.cookies.get('token')
  }

  try {
    const html = await renderer.renderToString(context);
    ctx.body = html;
  } catch(err) {
    return handleError(err);
  }

  // renderer.renderToString(context, (err, html) => {
  //   if (err) {
  //     return handleError(err)
  //   }
  //   ctx.body = html;
  // })
}

app.use(bodyParser());

app.use(static(path.resolve(__dirname, './dist')));

app.use(async (ctx, next) => {
  try {
    await next()
  } catch(err) {
    ctx.type = 'json';
    ctx.body = {
      code: 100,
      reason: '全局捕获到出错啦'
    };
  }
})

app.use(articleRouter.routes()).use(articleRouter.allowedMethods());
app.use(userRouter.routes()).use(userRouter.allowedMethods());

router.get('*', async (ctx, next) => {
  if (isProd) {
    await render(ctx, next);
  } else {
    await readyPromise;
    await render(ctx, next);
  }
})

app.use(router.routes()) // 将路由规则挂载到Koa上。
app.use(router.allowedMethods())

app.listen(8000, () => {
  console.log('server is listening at port 8000');
});
