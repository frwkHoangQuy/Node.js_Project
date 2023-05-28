const courses = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');
class SitesControllers {
  home(req, res) {
    courses
      .find()
      .then(courses => {
        res.render('home', {
          courses: multipleMongooseToObject(courses)
        });
      })
      .catch(error => { });
  }
  search(req, res) {
    res.render('search');
  }
}
module.exports = new SitesControllers();
