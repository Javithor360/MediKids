import express from 'express';
import { signup, login } from '../controllers/auth.js';
import { auth_midd } from '../middlewares/auth_middleware.js';

// CREATING ROUTER
const router_login = express.Router();

// POST ROUTES 
router_login.route('/signup').post(signup);
router_login.route('/login').post(login);
// GET ROUTES
router_login.route('/private').get([auth_midd], (req, res, next) => {
  res.status(200).json({success: true, token: req.auth_token});
})

// router_login.get('/public', (req, res, next) => {
//     res.status(200).json({ message: "here is your public resource" });
// });

export default router_login;