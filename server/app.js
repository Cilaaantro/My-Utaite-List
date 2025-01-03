const express = require('express');
const app=express();
const userRouter=require('./routes/user.js');
const {connectDB}=require('./config/dbConnect.js');
//parse from data
app.use(express.urlencoded({extended:false}));
//pare json
app.use(express.json());
//routes
app.use('/api',userRouter);


app.listen(5000,()=>{
  connectDB();
  console.log('server is listening on port 5000');
});

