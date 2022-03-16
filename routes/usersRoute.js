const express = require("express");
const multer = require('multer');
const userRouter = express.Router();
const userController = require('../controllers/userRegister')
const profileSetting = require('../controllers/profileSetting')
//const {uploadUsersPhoto} = require('../controllers/userImageUpload');
const authController = require('../controllers/authController')

//SignUp api call
userRouter.post('/Register-User',userController.validateUserInput,userController.registerUser);
userRouter.post('/Login-User',authController.login);

//get all users
userRouter.get('/',authController.protect,userController.getAllUsers);

//View-Profile api call
userRouter.get('/:id',authController.protect,profileSetting.getUser);

//Modify Distance api call
userRouter.patch('/Modify-Distance/:id',profileSetting.updateRange);

//User Profile update
userRouter.patch('/Update-Profile-Name',authController.protect,profileSetting.updateProfile);

//Update profile image
//userRouter.patch('/Update-Profile-Image',uploadUsersPhoto,profileSetting.updateProfileImage)

module.exports = userRouter;

