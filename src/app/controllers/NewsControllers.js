const Course = require('../models/Course');
class NewsController {
  index(req, res) {
    res.render('news');
  }
  show(req, res) {
    res.send('New Detail !!!!');
  }
}
module.exports = new NewsController();
