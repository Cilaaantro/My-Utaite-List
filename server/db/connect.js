const mongoose=require("mongoose");
//const User=require('../models/user.js');
require("dotenv").config({path:__dirname+'/../.env'});
function connectDB(){
  return mongoose.connect(`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_CLUSTER}.dt9ie.mongodb.net/${process.env.DATABASE_ACCOUNTS}`);
}

//connectDB();


module.exports={connectDB};
