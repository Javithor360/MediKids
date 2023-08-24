import express from "express";
import {get_medical_appointments, get_medical_records, request_medical_appointment} from '../controllers/appointment.js'
import { auth_midd } from '../middlewares/auth_middleware.js';
import { pool } from "../utils/db.js";

// CREATING THE APPOINTMENTS ROUTER
const router_appointment = express.Router();

//>> POST ROUTES

//! Get the medical records of the patient.
router_appointment.route('/get_medical_records').post([auth_midd], get_medical_records);

//! Create the request of a medical appointment.
router_appointment.route('/request_medical_appointment').post([auth_midd], request_medical_appointment);

//! Get the medical appointments of one user.
router_appointment.route('/get_medical_appointments').post([auth_midd], get_medical_appointments);

router_appointment.route('/change_appointment_state_test').post(async (req, res, next) => {
  try {
    const {State, fechant} = req.body;
    const Fecha = new Date(fechant);

    const hora = Fecha.toLocaleTimeString().split(' ');

    await pool.query('UPDATE medical_appointment SET Week = null, State = 2, Date = ?, Hour = ? WHERE id = 1', [Fecha, hora[0]])

    return res.status(200).json({success: true});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
})

export default router_appointment;