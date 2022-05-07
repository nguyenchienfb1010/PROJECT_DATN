const { Router } = require("express");
const { updateUser, deleteUser } = require("../controller/user.controller");
const { authenticate } = require("../middleware/authuticate.middlerware");
const userRouter = Router();

userRouter.post("/user", authenticate, updateUser);
userRouter.delete("/user", authenticate, deleteUser);

module.exports = userRouter;
