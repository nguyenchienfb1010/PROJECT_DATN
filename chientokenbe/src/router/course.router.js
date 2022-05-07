const { Router } = require("express");
const courseRouter = Router();
const { authenticate } = require("../middleware/authuticate.middlerware");
const { addCourse,getAllCourse,getCourse} = require('./../controller/course.controller')
courseRouter.post('/course',authenticate,addCourse)
courseRouter.get('/courses',authenticate,getAllCourse)
courseRouter.get('/course/:_id',authenticate,getCourse)



module.exports = courseRouter