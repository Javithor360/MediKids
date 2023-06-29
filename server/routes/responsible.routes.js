import express from 'express';
import { auth_midd } from '../middlewares/auth_middleware.js';
import { get_email_to_verify, get_patients, get_responsible, upload_pf_responsible } from '../controllers/responsible.js';
import { upload } from '../utils/multer.config.js';


//\\ CREATING ROUTER

const router_responsible = express.Router();

//! Get the user who will verify him email
router_responsible.route('/get_email_to_verify').post(get_email_to_verify)

//! Get the Responsible user
router_responsible.route('/get_responsible').post(get_responsible);

//! Get the Patients of the responsible.
router_responsible.route('/get_patients').post(get_patients);

//! Upload Perfil Photo
router_responsible.route('/upload_pf_responsible').post(upload.single('image'), upload_pf_responsible);

export default router_responsible;