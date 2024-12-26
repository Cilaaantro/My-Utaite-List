const express=require('express');
const router=express.Router();
const {authenticateUser}=require('../middleware/auth.js');
const {addNewUser,getUser}=require('../controllers/user.js');

router.route('/signin').post(addNewUser);
router.route('/login').get(authenticateUser,getUser);


module.exports=router;