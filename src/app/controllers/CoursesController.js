const express = require('express');
const course = require('../models/Course');
const courses = require('../models/Course');
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose');
const countDeletedCourses = require('../../util/countDeletedCourses')
const Course = require('../models/Course');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
var slugify = require('slugify')
class CourseController {
  profile(req, res, next) {
    res.render("user/profile");
  }
  courseslist(req, res, next) {
    const query1 = courses.find({ deleted: "null" });
    const query2 = courses.find({ deleted: "true" });
    Promise.all([query1, query2])
      .then(([courses1, courses2]) => {
        res.locals.courses = multipleMongooseToObject(courses1);
        res.locals.count = countDeletedCourses(courses2);
        res.render("user/Courses/Courseslist");
      })
      .catch(next);
  }
  show(req, res, next) {
    course.findOne({ slug: req.params.slug })
      .then(course => {
        res.render('user/Courses/show', { course: mongooseToObject(course) });
      })
      .catch(next);
  }
  create(req, res, next) {
    res.render('user/Courses/create');
  }
  store(req, res, next) {
    const newCourse = new Course({
      name: req.body.name,
      description: req.body.description,
      image: req.body.videoid,
      videoid: req.body.videoid,
      level: req.body.level,
      slug: slugify(req.body.name + " " + req.body.description, {
        replacement: '-'
      }),
      deleted: "null",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    newCourse.save()
      .then(res.render('user/Courses/store')).catch(next);
  }
  edit(req, res, next) {
    if (mongoose.isValidObjectId(req.params.id)) {
      course.findOne({ _id: req.params.id })
        .then(course => {
          res.render('user/courses/edit', { course: mongooseToObject(course) });
        })
        .catch(next);
    }
    else {
      res.json({ error: "error" });
    }
  }
  update(req, res, next) {
    const courseId = req.params.id;
    const updateData = req.body;
    updateData.image = req.body.videoid;
    course.findByIdAndUpdate(courseId, updateData, { new: true })
      .then(
        res.render('user/Courses/update')
      )
      .catch(next);
  }
  softdelete(req, res, next) {
    course.findOneAndUpdate({ _id: req.params.id }, { deleted: "true" })
      .then(() => res.render("user/Courses/delete"))
      .catch(next);
  }
  restore(req, res, next) {
    courses.find({ deleted: "true" })
      .then(courses => {
        res.render("user/Courses/restore", {
          courses: multipleMongooseToObject(courses)
        });
      })
      .catch(next);
  }
  restored(req, res, next) {
    course.findOneAndUpdate({ _id: req.params.id }, { deleted: "null" })
      .then(() => res.render("user/Courses/restored"))
      .catch(next);
  }
  async restoreselected(req, res, next) {
    const idList = req.body;
    if (!Array.isArray(idList)) {
      return res.status(400).json("Bad request")
    }
    const validIds = idList.filter((id) => ObjectId.isValid(id));

    await courses.updateMany(
      {
        "_id": {
          $in: validIds
        }
      },
      { $set: { deleted: "null" } }
    )
      .then((response) => res.status(200).json(response))
      .catch(next);
  }
  destroy(req, res, next) {
    course.deleteOne({ _id: req.body.id })
      .then(() => res.render("Courses/delete"))
      .catch(next);
  }
  async deleteselected(req, res, next) {
    const idList = req.body;
    const validIds = idList.filter((id) => ObjectId.isValid(id));

    await courses.updateMany(
      {
        "_id": {
          $in: validIds
        }
      },
      { $set: { deleted: "true" } }
    )
      .then((response) => res.status(200).json(response))
      .catch(next);
  }

}
module.exports = new CourseController();
