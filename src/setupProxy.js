const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://rtmis.akvotest.org",
      changeOrigin: true,
    })
  );
  app.use(
    "/akvo-flow-web-api",
    createProxyMiddleware({
      target: "https://tech-consultancy.akvo.org",
      changeOrigin: true,
    })
  );
};
