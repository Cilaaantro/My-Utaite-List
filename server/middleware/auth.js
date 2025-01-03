const { StatusCodes } = require('http-status-codes');
const User =require('../models/user.js');
const {verifyPassword}=require('../utils/crypt.js');
const { STATES } = require('mongoose');

const authenticateUser=async (req,res,next)=>{
  const{email,password}=req.body;
  const user=await User.getUserByEmail(email);
  if(!user)
    return res.status(StatusCodes.NOT_FOUND).json({success:false,error:`Email doesn't exist`});
  const passwordMatch=await verifyPassword(password,user.password);
  if(!passwordMatch)
    return res.status(StatusCodes.UNAUTHORIZED).json({success:false,error:`Incorrect Password`});
  res.locals.user=user;
  next();
}

const authenticateUserDeletion=async (req,res, next)=>{
  const {id,email,username,password}=req.body;
  const user=await User.getUserByEmail(email);
  if(!user)
    return res.status(StatusCodes.NOT_FOUND).json({success:false,error:'User does not exist'});
  const passwordMatch=await verifyPassword(password,user.password);
  if(!(user.id===id&&user.email===email&&user.username===username))
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false,error:'Sorry! Something wrong happened. Please refresh the page and try again'});
  if(!passwordMatch)
    return res.status(StatusCodes.UNAUTHORIZED).json({sucess:false,error:'Inccorect Password'});
  next();
}
module.exports={authenticateUser,authenticateUserDeletion};