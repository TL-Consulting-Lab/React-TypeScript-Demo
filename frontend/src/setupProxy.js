const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy API requests to backend server
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
      logLevel: 'debug',
      onProxyReq: (proxyReq, req, res) => {
        console.log(`[Proxy] ${req.method} ${req.path} -> http://localhost:5000${req.path}`);
      },
      onProxyRes: (proxyRes, req, res) => {
        console.log(`[Proxy] Response ${proxyRes.statusCode} for ${req.path}`);
      },
      onError: (err, req, res) => {
        console.error('[Proxy] Error:', err.message);
        res.status(500).json({ 
          error: 'Proxy error',
          message: err.message,
          backend: 'http://localhost:5000'
        });
      }
    })
  );
};
