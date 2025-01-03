const express=require('express');
const router=express.Router();
const {authenticateUser,authenticateUserDeletion}=require('../middleware/auth.js');
const {addNewUser,getUser,deleteUser,setUsername}=require('../controllers/user.js');

router.route('/signin').post(addNewUser);
router.route('/login').get(authenticateUser,getUser);
router.route('/user').delete(authenticateUserDeletion,deleteUser).put(authenticateUser,setUsername);

module.exports=router;