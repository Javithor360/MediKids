import express from "express";
import { active_patients } from "../controllers/doctor.js";

const router_doctor = express.Router();

// [GET] ROUTES
router_doctor.route("/active_patients").post(active_patients);

export default router_doctor;
