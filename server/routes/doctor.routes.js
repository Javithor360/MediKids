import express from "express";
import { active_patients, get_info, get_appointments, get_patient_appointment_with_specific_doctor, get_responsible_info, get_patient_medical_record, get_patient_vaccines, get_medical_prescriptions, get_appointment_requests, get_responsibles, accept_appointment_request, decline_appointment_request, get_appointments_history, get_doctors, get_patients, get_announcements, end_medical_appointment } from "../controllers/doctor.js";
// import { auth_midd } from "../middlewares/auth_middleware.js";

const router_doctor = express.Router();

// POST ROUTES
router_doctor.route("/get_info").post(/* [auth_midd],*/ get_info);
router_doctor.route("/active_patients").post(active_patients);
router_doctor.route("/get_appointments").post(get_appointments);
router_doctor.route("/get_patient_appointment_with_specific_doctor").post(get_patient_appointment_with_specific_doctor);
router_doctor.route("/get_responsible_info").post(get_responsible_info);
router_doctor.route("/get_patient_medical_record").post(get_patient_medical_record);
router_doctor.route("/get_patient_vaccines").post(get_patient_vaccines);
router_doctor.route("/get_medical_prescriptions").post(get_medical_prescriptions);
router_doctor.route("/get_appointment_requests").post(get_appointment_requests);
router_doctor.route("/get_responsibles").post(get_responsibles);
router_doctor.route("/accept_appointment_request").post(accept_appointment_request);
router_doctor.route("/decline_appointment_request").post(decline_appointment_request);
router_doctor.route("/get_appointments_history").post(get_appointments_history);
router_doctor.route("/get_doctors").post(get_doctors);
router_doctor.route("/get_patients").post(get_patients);
router_doctor.route("/get_announcements").post(get_announcements);
router_doctor.route("/end_medical_appointment").post(end_medical_appointment);

export default router_doctor;
