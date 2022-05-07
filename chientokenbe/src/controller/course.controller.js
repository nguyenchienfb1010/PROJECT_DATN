const CourseSchema = require("../model/course.model");
const userSchema = require("../model/user.model");

//addn course
async function addCourse(req, res) {
  try {
    const user = await userSchema
      .findOne({
        email: req.user.email,
      })
      .exec();
    if (user === undefined) {
      return res.status(400).json({ message: "user is invalid" });
    }
    const course = {
      coach_Name: user.email,
      price: "300",
      des: "balabal",
      img: "https://wels.open.ac.uk/sites/wels.open.ac.uk/files/images/Coaching-Others-to-Coach-702x400.jpg",
      category: "yoga",
      lession: [
        {
          video: 'tasdas'
        }
      ]
    };
    const newCourse = CourseSchema(course);
    await newCourse.save();
    return res.status(200).json(true);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "error" });
  }
}
//get all Course  
async function getAllCourse(req, res) {
  try {
    const user = await userSchema
      .findOne({
        email: req.user.email,
      })
      .exec();
    if (user === undefined) {
      return res.status(400).json({ message: "user is invalid" });
    }
    const counterCourse = await CourseSchema.countDocuments();
    const locations = await CourseSchema.find().exec();
    const totolCount = counterCourse;
    const data = {
      Totolcount: totolCount,
      course: locations,
    };
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "error" });
  }
}
async function getCourse(req, res) {
  try {
    const user = await userSchema
      .findOne({
        email: req.user.email,
      })
      .exec();
    if (user === undefined) {
      return res.status(400).json({ message: "user is invalid" });
    }
    const courseID = req.params._id;
    console.log(courseID)
    const Course = await CourseSchema.findOne({ _id: courseID }).exec();
    if (!Course) {
      return res.status(400).json({ message: "Location is invalid" });
    }
    return res.status(200).json(Course)
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "error" });
  }
}

module.exports = {
  addCourse,
  getAllCourse,
  getCourse
};
