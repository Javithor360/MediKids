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

    if (height <= 0)
      return next(
        new ErrorResponse("La altura proporcionada no es válida", 400, "error")
      );

    if (weight <= 0)
      return next(
        new ErrorResponse("El peso proporcionada no es válido", 400, "error")
      );

    if (temperature <= 0)
      return next(
        new ErrorResponse(
          "La temperatura proporcionada no es válida",
          400,
          "error"
        )
      );

    // if(notes === "") return next(new ErrorResponse("", 400, "error"));

    await pool.query("INSERT INTO medical_records SET ?", {
      Medical_History_Code: patientCode(),
      Date_Time: new Date(),
      Diagnosis: notes,
      Weight: weight,
      Height: height,
      Temperature: temperature,
      Patient_id,
    });

    return res.status(200).json({
      success: true,
      message: `Medical record for patient #${Patient_id} was successfully inserted`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

// ! @route POST api/doctor/get_patient_appointment_with_specific_doctor
// ! @desc Get the patient's appointment with a specific doctor
// ! @access private

const get_patient_appointment_with_specific_doctor = async (req, res, next) => {
  try {
    const { Patient_id, Doctor_id } = req.body;

    if (!Patient_id || !Doctor_id) {
      return res
        .status(500)
        .json({ message: "You must provide every field with a value" });
    }

    const [doctor_check] = await pool.query(
      "SELECT * FROM doctors WHERE id = ?",
      [Doctor_id]
    );
    if (doctor_check.length != 1) {
      return res.status(500).json({
        success: false,
        message: "Provided doctor doesn't exist",
      });
    }

    const [patient_check] = await pool.query(
      "SELECT * FROM patient WHERE id = ?",
      [Patient_id]
    );
    if (patient_check.length != 1) {
      return res.status(500).json({
        success: false,
        message: "Provided patient doesn't exist",
      });
    }

    const [appointment_info] = await pool.query(
      "SELECT * FROM medical_appointment WHERE Doctor_id = ? AND Patient_id = ?",
      [Doctor_id, Patient_id]
    );

    return res.status(200).json({ success: true, body: appointment_info });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

// ! @route POST api/doctor/get_responsible_info
// ! @desc Gets the patient's responsible information
// ! @access private

const get_responsible_info = async (req, res, next) => {
  try {
    const { Responsible_id } = req.body;

    if (!Responsible_id) {
      return res
        .status(500)
        .json({ message: "You must provide every field with a value" });
    }

    const [resp_check] = await pool.query(
      "SELECT * FROM responsible WHERE id = ?",
      [Responsible_id]
    );
    if (resp_check.length != 1) {
      return res.status(500).json({
        success: false,
        message: "Provided responsible doesn't exist",
      });
    }

    return res.status(200).json({ success: true, body: resp_check });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

// ! @route POST api/doctor/get_patient_medical_record
// ! @desc Gets the patient's medical records
// ! @access private

const get_patient_medical_record = async (req, res, next) => {
  try {
    const { Patient_id } = req.body;

    if (!Patient_id) {
      return res
        .status(500)
        .json({ message: "You must provide every field with a value" });
    }

    const [query_check] = await pool.query(
      "SELECT * FROM medical_records WHERE Patient_id = ?",
      [Patient_id]
    );

    // NOT NEEDED YET
    // if(query_check.length != 1) {
    //   return res.status(500).json({
    //     success: false,
    //     message: "This patient has not medical record yet"
    //   })
    // }

    return res.status(200).json({ success: true, body: query_check });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

// ! @route POST api/doctor/set_medical_prescription
// ! @desc Stablish a new prescription for a patient
// ! @access private

const set_medical_prescription = async (req, res, next) => {
  try {
    // missing Starting_Dose_Date & Medical_Prescription_Code
    const {
      Medicine_Name,
      Instructions,
      Description,
      Starting_Dose_Date,
      Finishing_Dose_Date,
      Dose,
      Patient_id,
      Time_Dose,
    } = req.body;

    if (
      !Medicine_Name ||
      !Instructions ||
      !Description ||
      !Starting_Dose_Date ||
      !Finishing_Dose_Date ||
      !Dose ||
      !Patient_id ||
      !Time_Dose
    ) {
      return res.status(500).json({
        success: false,
        message: "You must provide every field with a value",
      });
    }

    if (new Date() > (new Date(Finishing_Dose_Date) || new Date(Starting_Dose_Date))) {
      return res.status(500).json({
        success: false,
        message: "Dose dates can not be higher than the actual date.",
      });
    }

    const [patient_check] = await pool.query(
      "SELECT * FROM patient WHERE id =",
      [Patient_id]
    );

    if (!patient_check.length != 1) {
      return res.status(500).json({
        success: false,
        message: "Provided patient does not exist",
      });
    }

    await pool.query("INSERT INTO medical_prescription SET ?", {
      Medical_Prescription_Code: patientCode(),
      Medicine_Name,
      Instructions,
      Description,
      Created_Date: new Date(),
      Starting_Dose_Date,
      Finishing_Dose_Date,
      Dose,
      Patient_id,
      Time_Dose,
    })

    return res.status(200).json({ success: true, message: `A new medical prescription has been added to the patient with id ${Patient_id}` });
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
  get_patient_appointment_with_specific_doctor,
  get_responsible_info,
  get_patient_medical_record,
  set_medical_prescription,
};
