const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('./flureeConfig.json')

module.exports = function(app) {
  app.use(
    '/fdb',
    createProxyMiddleware({
      target: `${config.ip}:${config.port}`,
      changeOrigin: true,
    })
  );
};