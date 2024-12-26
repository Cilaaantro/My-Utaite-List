const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost/testdb");
const userSchema=new mongoose.Schema({
  name:String,
  age:Number
})
const User=mongoose.model('User',userSchema);

const user=new User({name:'hieu',age:32});
user.save().then(()=>console.log('added'));