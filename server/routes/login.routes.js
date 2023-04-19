import express from 'express';
import { register, login, verify_email, get_email_to_verify, get_responsible, forgot_password, check_reset_token } from '../controllers/auth.js';
import { auth_midd } from '../middlewares/auth_middleware.js';

// CREATING ROUTER
const router_login = express.Router();

// POST ROUTES 
router_login.route('/register').post(register);
router_login.route('/login').post(login);
router_login.route('/verify_email').post(verify_email);
router_login.route('/get_email_to_verify').post(get_email_to_verify)
router_login.route('/get_responsible').post(get_responsible);
router_login.route('/forgot_password').post(forgot_password);
router_login.route('/check_reset_token').post(check_reset_token);

// GET ROUTES
router_login.route('/private').get([auth_midd], (req, res, next) => {
  res.status(200).json({success: true, token: req.auth_token});
})

// router_login.get('/public', (req, res, next) => {
//     res.status(200).json({ message: "here is your public resource" });
// });

export default router_login;