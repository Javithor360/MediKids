import { pool } from "../utils/db.js";

import ErrorResponse from "../utils/error_message.js";
import { patientCode } from "../utils/functions.js";

// ! @route POST api/doctor/get-info
// ! @desc Get all doctor personal information
// ! @access private

const get_info = async (req, res, next) => {
  try {
    const { Doctor_id } = req.body;

    if (!Doctor_id) {
      return next(new ErrorResponse("No ID was provided", 400, "error"));
    }

    const [query_check] = await pool.query(
      "SELECT * FROM doctors WHERE id = ?",
      [Doctor_id]
    );

    if (query_check.length != 1) {
      return next(
        new ErrorResponse(
          "Provided ID doesn't match with any existing doctor",
          400,
          "error"
        )
      );
    }

    return res.status(200).json({ success: true, body: query_check[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

// ! @route POST api/doctor/active_patients
// ! @desc Get all active patients for the doctor
// ! @access public

const active_patients = async (req, res, next) => {
  try {
    // We use the doctor's id to do the relaiion
    const { Doctor_id } = req.body;

    // We check if a doctor was provided
    if (!Doctor_id) {
      return res
        .status(500)
        .json({ message: "You must provide every field with a value" });
    }

    // We check if the doctor exists
    const [query_check] = await pool.query(
      "SELECT * FROM doctors WHERE id = ?",
      [Doctor_id]
    );

    if (query_check.length != 1) {
      return res.status(500).json({
        success: false,
        message: "Provided doctor doesn't exist",
      });
    }

    const [patients_info] = await pool.query(
      `SELECT * FROM patient WHERE id IN (SELECT Patient_id FROM patients_monitoring WHERE Doctor_id = ?)`,
      [Doctor_id]
    );

    return res.status(200).json({ success: true, body: patients_info });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

// ! @route POST api/doctor/get_appointments
// ! @desc Get all appointments
// ! @access private

const get_appointments = async (req, res, next) => {
  try {
    // We use the doctor's id to do the relation
    const { Doctor_id } = req.body;

    // We check if a doctor was provided
    if (!Doctor_id) {
      return res
        .status(500)
        .json({ message: "You must provide every field with a value" });
    }

    // We check if the doctor exists
    const [query_check] = await pool.query(
      "SELECT * FROM doctors WHERE id = ?",
      [Doctor_id]
    );

    if (query_check.length != 1) {
      return res.status(500).json({
        success: false,
        message: "Provided doctor doesn't exist",
      });
    }

    const [appointments_info] = await pool.query(
      `SELECT * FROM medical_appointment WHERE Doctor_id = ?`,
      [Doctor_id]
    );

    return res.status(200).json({ success: true, body: appointments_info });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

// ! @route POST api/doctor/new_medical_record_entry
// ! @desc Adds a new medical record entry
// ! @access private

const new_medical_record_entry = async (req, res, next) => {
  try {
    const { height, weight, temperature, notes, Patient_id } = req.body;

    if (!height || !weight || !temperature || !notes || !Patient_id) {
      return res
        .status(500)
        .json({ message: "You must provide every field with a value" });
    }

    if(height <= 0) return next(new ErrorResponse("La altura proporcionada no es válida", 400, "error"));

    if(weight <= 0) return next(new ErrorResponse("El peso proporcionada no es válido", 400, "error"));

    if(temperature <= 0) return next(new ErrorResponse("La temperatura proporcionada no es válida", 400, "error"));

    // if(notes === "") return next(new ErrorResponse("", 400, "error"));

    await pool.query("INSERT INTO medical_history SET ?", {
      Medical_History_Code: patientCode(),
      Date_Time: new Date(),
      Diagnosis: notes,
      Weight: weight,
      Height: height,
      Temperature: temperature,
      Patient_id
    });

    return res.status(200).json({ success: true, message: `Medical record for patient #${Patient_id} was successfully inserted` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export {
  get_info,
  active_patients,
  get_appointments,
  new_medical_record_entry,
};
