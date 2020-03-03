const path = require('path');
const rimraf = require('rimraf');
const webpack = require('webpack');
const clientConfig = require('./webpack.client');
const serverConfig = require('./webpack.server');

rimraf(path.resolve(__dirname, '../dist'), (err) => {
  if (err) throw err;
  console.log(' dist is cleaned');

  clientConfig.mode = 'production';
  serverConfig.mode = 'production';
  const clientCompiler = webpack(clientConfig);
  const serverCompiler = webpack(serverConfig);

  new Promise((resolve, reject) => {
    clientCompiler.run((err, stats) => {
      if (err) throw err;
  
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n');
  
      if (stats.hasErrors()) {
        console.log('  Build failed with errors.\n');
        process.exit(1);
      }
      console.log(' Client Build complete.\n');
      resolve();
    })
  }).then(() => {
    serverCompiler.run((err, stats) => {
      if (err) throw err;
  
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n');
  
      if (stats.hasErrors()) {
        console.log('  Build failed with errors.\n');
        process.exit(1);
      }
      console.log(' Server Build complete.\n');
    })
  }).catch((err) => {
    console.log(err);
  })
})