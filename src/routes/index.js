const newsRouter = require('./news');
const sitesRouter = require('./sites');
const userRouter = require('./user');
function route(app) {
  app.use('/news', newsRouter);
  app.use('/user', userRouter);
  app.use('/', sitesRouter);
}
module.exports = route;
