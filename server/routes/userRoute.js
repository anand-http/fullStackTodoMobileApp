import express from 'express';
import { getMyProfile, login, logout, register, updatePassword,
     updateProfile,forgotPassword, verify, resetPassword } from '../controllers/userController.js';
import isAuthenticated from '../middleware/auth.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/verify').post(isAuthenticated,verify);
router.route('/login').post(login);

router.route('/logout').get(isAuthenticated,logout);

router.route('/myprofile').get(isAuthenticated,getMyProfile);

router.route('/updateprofile').put(isAuthenticated,updateProfile)
router.route('/updatepassword').put(isAuthenticated,updatePassword)

router.route('/forgotpassword').post(forgotPassword);

router.route('/resetpassword').put(resetPassword);


export default router;