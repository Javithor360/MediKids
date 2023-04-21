import express from 'express';
import { register, login, verify_email, get_email_to_verify, get_responsible, forgot_password, check_reset_token, reset_password } from '../controllers/auth.js';
import { auth_midd } from '../middlewares/auth_middleware.js';

// CREATING ROUTER
const router_login = express.Router();

// POST ROUTES 
//! Register of the Responsible
router_login.route('/register').post(register);

//! Login of the Responsible
router_login.route('/login').post(login);

//! Verify the email of the responsible
router_login.route('/verify_email').post(verify_email);

//! Get the user who will verify him email
router_login.route('/get_email_to_verify').post(get_email_to_verify)

//! Get the Responsible user
router_login.route('/get_responsible').post(get_responsible);

//! send the code for reset the password
router_login.route('/forgot_password').post(forgot_password);

//! check if the token to reset the password its still valid
router_login.route('/check_reset_token').post(check_reset_token);

//! reset the password
router_login.route('/reset_password').post(reset_password);

// GET ROUTES
router_login.route('/private').get([auth_midd], (req, res, next) => {
  res.status(200).json({success: true, token: req.auth_token});
})


export default router_login;