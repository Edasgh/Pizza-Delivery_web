const async_handler = require("express-async-handler");

const User = require("../models/Usermodel");



const verifyEmail=async_handler(async(req,res,next)=>{
    const {email}=req.body;
    const userExists=await User.findOne({email:email});
    req.user=await userExists;
    if(userExists){
        next();
    }else{
        throw new Error("An unknown error occurred!");
    }
})


module.exports = verifyEmail;