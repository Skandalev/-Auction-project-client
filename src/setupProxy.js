const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://kind-puce-pig-sari.cyclic.app',
      changeOrigin: true,
    })
  );
};