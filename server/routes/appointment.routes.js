import express from "express";
import {get_medical_records} from '../controllers/appointment.js'
import { auth_midd } from '../middlewares/auth_middleware.js';

// CREATING THE APPOINTMENTS ROUTER
const router_appointment = express.Router();

//>> POST ROUTES
router_appointment.route('/get_medical_records').post([auth_midd], get_medical_records)

export default router_appointment;