import express from "express";
import { active_patients, get_info, get_appointments, new_medical_record_entry, get_patient_appointment_with_specific_doctor, get_responsible_info, get_patient_medical_record, get_patient_vaccines, set_medical_prescription, edit_medical_prescription, get_medical_prescriptions, schedule_appointment, update_appointment_state, get_appointment_requests, get_responsibles, accept_appointment_request, decline_appointment_request, get_appointments_history, get_doctors } from "../controllers/doctor.js";
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
router_doctor.route("/get_patient_vaccines").post(get_patient_vaccines);
router_doctor.route("/set_medical_prescription").post(set_medical_prescription);
router_doctor.route("/get_medical_prescriptions").post(get_medical_prescriptions);
router_doctor.route("/edit_medical_prescription").post(edit_medical_prescription);
router_doctor.route("/schedule_appointment").post(schedule_appointment);
router_doctor.route("/update_appointment_state").post(update_appointment_state);
router_doctor.route("/get_appointment_requests").post(get_appointment_requests);
router_doctor.route("/get_responsibles").post(get_responsibles);
router_doctor.route("/accept_appointment_request").post(accept_appointment_request);
router_doctor.route("/decline_appointment_request").post(decline_appointment_request);
router_doctor.route("/get_appointments_history").post(get_appointments_history);
router_doctor.route("/get_doctors").post(get_doctors);

export default router_doctor;
