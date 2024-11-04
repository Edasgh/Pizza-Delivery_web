const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const userModel= mongoose.Schema(
    {
        name :{type:String, required : true,maxlength:60},
        email :{type : String , required : true, unique:true},
        password : {type:String, required:true,minlength:8},
        address:{type:String,required:true,maxlength:200},
        isAdmin:{type:Boolean,default:false}
    },
    {timestamps : true}
)


userModel.methods.matchPassword = async function (enteredPW) {
    return await bcrypt.compare(enteredPW, this.password);
  };
  
  userModel.pre("save", async function (next) {
    if (!this.isModified) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  const User = mongoose.model("User", userModel);
  
  module.exports = User;
