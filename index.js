const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
const port = process.env.PORT || 8080;

// Pagination middleware
server.use((req, res, next) => {
    const { page, limit } = req.query;
    if (page && limit) {
      const data = router.db
        .get('rooms')
        .slice((page - 1) * limit, page * limit)
        .value();
      const count = router.db.get('rooms').size().value(); // Get total count
      res.jsonp({ data, count });
    } else {
      next();
    }
  });
  

server.use(router);
server.listen(port);
