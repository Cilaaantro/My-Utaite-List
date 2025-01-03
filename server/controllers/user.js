const User=require("../models/user.js")
const { StatusCodes } = require('http-status-codes');
const {hashedpassword,verifyPassword, hashPassword}=require('../utils/crypt.js');

const addNewUser=async (req,res)=>{
  const{username,email,password}=req.body;
  if(password.length<8)
    return res.status(StatusCodes.BAD_REQUEST).json({success:false,error:'Password needs to be at least 8 characters long'});
  const hashedPassword=await hashPassword(password);
  try{
    await User.createNewUser(email,username,hashedPassword);
    res.status(StatusCodes.CREATED).json({success:true,email:email,username:username,password:password});
  }catch(e){
    console.log(e);
    res.status(StatusCodes.BAD_REQUEST).json({success:false, error:e.message});
  }
}


const getUser=async(req,res)=>{
  res.status(StatusCodes.OK).json({success:true,user:res.locals.user});
}

const deleteUser=async (req,res)=>{
  const {id}=req.body;
  await User.deleteUser(id);
  res.status(StatusCodes.OK).json({success:true,message:'User was successfuly deleted'});
}
const setUsername=(req,res)=>{
  const {username}=req.body;
  res.locals.user.setName(username);
  res.status(StatusCodes.OK).json({sucess:true,message:'Name change was sucessful'});
  
}
module.exports={addNewUser,getUser,deleteUser,setUsername};