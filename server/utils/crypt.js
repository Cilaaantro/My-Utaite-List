const bcrypt =require('bcrypt');
const password='goon123';

const hashPassword=async (password)=>{
  const hash=await bcrypt.hash(password,10);
  return hash;

}

const verifyPassword= async (password,cryptedPassword)=>{
  const match= await bcrypt.compare(password,cryptedPassword);
  return match;
}


module.exports={hashPassword,verifyPassword};