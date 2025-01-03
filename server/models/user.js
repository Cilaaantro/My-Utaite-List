const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
  email:{
    type: String,
    unique:[true,'Email has already been used.'],
    required:[true,'Please provide an email'],
    lowercase:true,
    immutable:true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email'
    ]
  },
  username:{
    type: String,
    unique:[true, 'Username has already been taken.'],
    required:[true,'Please provide an username']
  },
  password:{
    type: String,
    required:[true, 'Please provide an password']
  },
  date:{
    type:Date,
    default:()=>Date.now()
  },
  likedUtaites:{
    type:[],
    default:[]
  }
})


userSchema.statics.createNewUser=async function (email,username,password){
  return await this.create({email:email,username:username,password:password});
};
userSchema.statics.getUserByEmail=async function(email){
  return (await this.find({email:email}))[0];
}
userSchema.statics.deleteUser=async function(id){
  return await this.findByIdAndDelete(id);
}
userSchema.methods.setName=async function(newUserName){
  this.username=newUserName;
  await this.save();
}

module.exports=mongoose.model('User',userSchema);