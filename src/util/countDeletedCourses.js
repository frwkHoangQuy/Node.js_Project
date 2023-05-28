module.exports = function countDeletedCourses(courses) {
  let deletedCourse = 0;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].deleted === "true") {
      deletedCourse++;
    }
  }
  return deletedCourse;
};
