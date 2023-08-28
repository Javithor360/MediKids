import express from "express";
import { active_patients, get_info, get_appointments, new_medical_record_entry, get_patient_appointment_with_specific_doctor, get_responsible_info, get_patient_medical_record, set_medical_prescription, edit_medical_prescription, get_medical_prescriptions } from "../controllers/doctor.js";
// import { auth_midd } from "../middlewares/auth_middleware.js";

const router_doctor = express.Router();

// POST ROUTES
router_doctor.route("/get_info").post(/* [auth_midd],*/ get_info);
router_doctor.route("/active_patients").post(active_patients);
router_doctor.route("/get_appointments").post(get_appointments);
router_doctor.route("/new_medical_record_entry").post(new_medical_record_entry);
router_doctor.route("/get_patient_appointment_with_specific_doctor").post(get_patient_appointment_with_specific_doctor);
router_doctor.route("/get_responsible_info").post(get_responsible_info);
router_doctor.route("/get_patient_medical_record").post(get_patient_medical_record);
router_doctor.route("/set_medical_prescription").post(set_medical_prescription);
router_doctor.route("/get_medical_prescriptions").post(get_medical_prescriptions);
router_doctor.route("/edit_medical_prescription").post(edit_medical_prescription);

export default router_doctor;
