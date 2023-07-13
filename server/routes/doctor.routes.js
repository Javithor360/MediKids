import express from "express";
import { active_patients, get_info, get_appointments } from "../controllers/doctor.js";
// import { auth_midd } from "../middlewares/auth_middleware.js";

const router_doctor = express.Router();

// POST ROUTES
router_doctor.route("/get_info").post(/* [auth_midd],*/ get_info);
router_doctor.route("/active_patients").post(active_patients);
router_doctor.route("/get_appointments").post(get_appointments);

export default router_doctor;
