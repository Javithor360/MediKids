import express from 'express';
import { create_immunization_record, get_all_immunization_record, get_email_to_verify, get_immunization_record, get_medical_prescriptions, get_patient, get_patients, get_responsible, upload_pf_responsible } from '../controllers/responsible.js';
import { upload } from '../utils/multer.config.js';
import { auth_midd } from '../middlewares/auth_middleware.js';

//\\ CREATING ROUTER
const router_responsible = express.Router();

//>> POST ROUTES
//! Get the user who will verify him email
router_responsible.route('/get_email_to_verify').post(get_email_to_verify)

//! Get the Responsible user
router_responsible.route('/get_responsible').post(get_responsible);

//! Get the Patients of the responsible.
router_responsible.route('/get_patients').post(get_patients);

//! Get a patient individually.
router_responsible.route('/get_patient').post(get_patient);

//! Upload Perfil Photo
router_responsible.route('/upload_pf_responsible').post(upload.single('image'), upload_pf_responsible);

//! Get the Immunization Record of the Patient of the Responsible
router_responsible.route('/get_immunization_record').post(get_immunization_record);

//! Create the Immunization Record of the patient of the Responsible.
router_responsible.route('/create_immunization_record').post(create_immunization_record);

//! Get the medical prescription of the patient of the user.
router_responsible.route('/get_medical_prescriptions').post([auth_midd], get_medical_prescriptions)

//>> GET ROUTES
//! Get ALL Immunization Records.
router_responsible.route('/get_all_immunization_record').get(get_all_immunization_record);

export default router_responsible;