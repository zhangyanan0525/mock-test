const express = require('express');
const app = express();
const path = require('path');
const webpack = require('webpack')
const proxy = require('http-proxy-middleware')
const webpackConfig = require('./webpack.config.js')
const compiler = webpack(webpackConfig)

app.use('/static', express.static('/static'))
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
app.use('/**', proxy(function (pathname, req) {
  return String(pathname).startsWith('/api');
}, {
    target: 'http://rap2api.taobao.org',
    changeOrigin: true,
    pathRewrite: function (path, req) {
      return path.replace('/api', '/app/mock/5962/GET/api')
    }
  })
);


app.use(hotMiddleware)
app.use(devMiddleware)

app.listen(1111);