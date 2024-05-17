import express from 'express';
import { register, login, verify_email, forgot_password, reset_password, check_reset_code, register_patients, doctor_login } from '../controllers/auth.js';
import { auth_midd } from '../middlewares/auth_middleware.js';

//\\ CREATING ROUTER
const router_login = express.Router();

// POST ROUTES 
//! Register of the Responsible
router_login.route('/register').post(register);

//! Login of the Responsible
router_login.route('/login').post(login);

//! Verify the email of the responsible
router_login.route('/verify_email').post(verify_email);

//! send the code for reset the password
router_login.route('/forgot_password').post(forgot_password);

//! check if the token to reset the password its still valid
router_login.route('/check_reset_code').post(check_reset_code);

//! reset the password
router_login.route('/reset_password').post(reset_password);

//! Register the pacient of the user.
router_login.route('/register_patients').post(register_patients);

//! Doctor's Login
router_login.route('/doctor_login').post(doctor_login);

// GET ROUTES
router_login.route('/private').get([auth_midd], (req, res, next) => {
  res.status(200).json({success: true, token: req.auth_token});
})


export default router_login;