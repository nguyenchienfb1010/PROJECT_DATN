const userSchema = require("../model/user.model");

async function updateUser(req, res) {
  try {
      let user = await userSchema
      .findOne({
        email: req.user.email,
      })
      .exec();
      console.log("user",user)
      if(req.body.name){
        user.name = req.body.name;
      }
      if(req.body.phoneNumber){
        user.phoneNumber = req.body.phoneNumber
      }
      if(req.body.address){
        user.address = req.body.address
      }
      await userSchema(user).save()
      return res.status(200).json(true)
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: error
    })
  }
}

async function deleteUser(req,res){
  try {
    const user = await userSchema
      .findOne({
        email: req.user.email,
      })

      console.log(user)
      if(user){
        await userSchema.deleteOne({
          _id: user._id
        })
        return res.status(200).json(true)
      }

      return res.status(400).json(false)
  } catch (error) {
    return res.status(400).json({message: 'Error in delete user'})
  }
}


module.exports ={
  updateUser,
  deleteUser
}