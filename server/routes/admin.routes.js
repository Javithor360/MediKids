import express from "express";
import { create_doctor, create_patient, doctor_assign_patient, create_appointment } from "../controllers/admin.js";

// CREATING ADMIN ROUTER
const router_admin = express.Router();

// [POST] ROUTES
router_admin.route("/new_doctor").post(create_doctor);
router_admin.route("/new_patient").post(create_patient);
router_admin.route("/assign_patient").post(doctor_assign_patient);
router_admin.route("/create_appointment").post(create_appointment);

export default router_admin;
