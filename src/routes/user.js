const express = require('express');
const router = express.Router();
const CourseController = require('../app/controllers/CoursesController');
router.get('/Mycourses/:id/edit', CourseController.edit);
router.put('/Mycourses/:id/update', CourseController.update);
router.use('/Mycourses/:id/softdelete', CourseController.softdelete);
router.use('/Mycourses/restore/:id/restored',CourseController.restored);
router.use('/Mycourses/restoreselected',CourseController.restoreselected);
router.post('/Mycourses/deleteselected',CourseController.deleteselected);
router.use('/Mycourses/create', CourseController.create);
router.post('/Mycourses/store', CourseController.store);
router.use('/Mycourses/restore',CourseController.restore);
router.use('/Mycourses/:slug', CourseController.show);
router.use('/Mycourses', CourseController.courseslist)
router.use('/Profile', CourseController.profile)
module.exports = router;
