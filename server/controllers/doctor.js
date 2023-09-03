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
    const {
      height,
      weight,
      temperature,
      notes,
      HtmlNotes,
      Patient_id,
      Doctor_id,
      Medical_Appointment_id,
      Array_Prescriptions,
    } = req.body;

    if (
      !height ||
      !weight ||
      !temperature ||
      !notes ||
      !HtmlNotes ||
      !Patient_id ||
      !Doctor_id ||
      !Medical_Appointment_id
    ) {
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

    let Prescriptions_Names = {};
    if (Array_Prescriptions != null) {
      Array_Prescriptions.forEach((element, i) => {
        Prescriptions_Names[i] = element;
      });
    }
    Prescriptions_Names = JSON.stringify(Prescriptions_Names);

    await pool.query("INSERT INTO medical_records SET ?", {
      Medical_History_Code: patientCode(),
      Patient_id,
      Doctor_id,
      Medical_Appointment_id,
      Date_Time: new Date(),
      Diagnosis_Mobile: notes,
      Diagnosis: HtmlNotes.HtmlNotes,
      Weight: weight,
      Height: height,
      Temperature: temperature,
      Prescriptions_Names,
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

// ! @route POST api/doctor/get_patient_vaccines
// ! @desc Gets the patient's vaccines
// ! @access private

const get_patient_vaccines = async (req, res, next) => {
  try {
    const { Patient_id } = req.body;

    if (!Patient_id) {
      return res
        .status(500)
        .json({ message: "You must provide every field with a value" });
    }

    const [query_check] = await pool.query(
      "SELECT * FROM patient_vaccines WHERE Patient_id = ?",
      [Patient_id]
    );

    if (query_check.length === 0) {
      return res.status(500).json({
        success: false,
        message: "This patient does not exists",
      });
    }

    return res.status(200).json({ success: true, body: query_check[0] });
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
    const { Patient_id, Doctor_id, new_prescriptions } = req.body;
    let Array_Prescriptions_Names = [];

    if (!Patient_id || !Doctor_id || !new_prescriptions) {
      return res.status(500).json({
        success: false,
        message: "You must provide every field with a value",
      });
    }

    const [patient_check] = await pool.query(
      "SELECT * FROM patient WHERE id = ?",
      [Patient_id]
    );

    if (patient_check.length != 1) {
      return res.status(500).json({
        success: false,
        message: "Provided patient does not exist",
      });
    }

    const [doctor_check] = await pool.query(
      "SELECT * FROM doctors WHERE id = ?",
      [Doctor_id]
    );

    if (doctor_check.length != 1) {
      return res.status(500).json({
        success: false,
        message: "Provided doctor does not exist",
      });
    }

    // NEW PRESCRIPTIONS VALIDATIONS
    new_prescriptions.map((np, i) => {
      if (
        new Date() >
        (new Date(np.Finishing_Dose_Date) || new Date(np.Starting_Dose_Date))
      ) {
        return res.status(500).json({
          success: false,
          message: `Dose dates on new medicine #${
            i + 1
          } can not be lower than the actual date.`,
        });
      }
    });

    new_prescriptions.map(async (np) => {
      const patient_code = patientCode();
      Array_Prescriptions_Names.push(np.data.Medicine_Name);
      await pool.query(`INSERT INTO medical_prescription SET ?`, {
        Medical_Prescription_Code: patient_code,
        Patient_id,
        Doctor_id,
        Medicine_Name: np.data.Medicine_Name,
        Instructions: np.data.Instructions,
        Description: np.data.Description,
        Created_Date: new Date(),
        Starting_Dose_Date: new Date(np.data.Starting_Dose_Date),
        Finishing_Dose_Date: new Date(np.data.Finishing_Dose_Date),
        Dose: np.data.Dose,
        Time_Dose: np.data.Time_Dose,
      });
    });

    return res.status(200).json({
      success: true,
      body: `Medical prescription for patient #${Patient_id} has been updated. ${new_prescriptions.length} new medicines were added`,
      Array_Prescriptions: Array_Prescriptions_Names,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

// ! @route POST api/doctor/edit_medical_prescription
// ! @desc Edits an existing medical prescription
// ! @access private

const edit_medical_prescription = async (req, res, next) => {
  try {
    const { Patient_id, Doctor_id, edited_prescriptions } = req.body;

    if (!Patient_id || !Doctor_id || !edited_prescriptions) {
      return res.status(500).json({
        success: false,
        message: "You must provide every field with a value",
      });
    }

    const [patient_check] = await pool.query(
      "SELECT * FROM patient WHERE id = ?",
      [Patient_id]
    );

    if (patient_check.length != 1) {
      return res.status(500).json({
        success: false,
        message: "Provided patient does not exist",
      });
    }

    const [doctor_check] = await pool.query(
      "SELECT * FROM doctors WHERE id = ?",
      [Doctor_id]
    );

    if (doctor_check.length != 1) {
      return res.status(500).json({
        success: false,
        message: "Provided doctor does not exist",
      });
    }

    // EDITED PRESCRIPTIONS VALIDATIONS
    edited_prescriptions.map((ep, i) => {
      if (
        new Date() >
        (new Date(ep.Finishing_Dose_Date) || new Date(ep.Starting_Dose_Date))
      ) {
        return res.status(500).json({
          success: false,
          message: `Dose dates on new medicine #${
            i + 1
          } can not be lower than the actual date.`,
        });
      }
    });

    edited_prescriptions.map(async (ep) => {
      await pool.query(
        `UPDATE medical_prescription SET Medicine_Name = ?, Instructions = ?, Description = ?, Starting_Dose_Date = ?, Finishing_Dose_Date = ?, Dose = ?, Time_Dose = ? WHERE Medical_Prescription_Code = ?`,
        [
          ep.Medicine_Name,
          ep.Instructions,
          ep.Description,
          new Date(ep.Starting_Dose_Date),
          new Date(ep.Finishing_Dose_Date),
          ep.Dose,
          ep.Time_Dose,
          ep.Medical_Prescription_Code,
        ]
      );
    });

    return res.status(200).json({
      success: true,
      message: `${edited_prescriptions.length} prescriptions were edited`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

// ! @route POST api/doctor/get_medical_prescription
// ! @desc Obtains all the patient's prescriptions
// ! @access private

const get_medical_prescriptions = async (req, res, next) => {
  try {
    const { Patient_id } = req.body;

    if (!Patient_id) {
      return res
        .status(500)
        .json({ message: "You must provide every field with a value" });
    }

    const [query_check] = await pool.query(
      "SELECT * FROM medical_prescription WHERE Patient_id = ?",
      [Patient_id]
    );

    // NOT NEEDED YET
    // if(query_check.length != 1) {
    //   return res.status(500).json({
    //     success: false,
    //     message: "This patient has not medical prescriptions yet"
    //   })
    // }
    return res.status(200).json({ success: true, body: query_check });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

// ! @route POST api/doctor/schedule_appointment
// ! @desc Creates a new appointment forced by the doctor
// ! @access private

const schedule_appointment = async (req, res, next) => {
  try {
    const { Doctor_id, Responsible_id, Patient_id, Description, Date, Hour } =
      req.body;

    if (
      !Doctor_id ||
      !Responsible_id ||
      !Patient_id ||
      !Description ||
      !Date ||
      !Hour
    ) {
      return res
        .status(500)
        .json({ message: "You must provide every field with a value" });
    }

    const [patient_check] = await pool.query(
      "SELECT * FROM patient WHERE id = ?",
      [Patient_id]
    );

    if (patient_check.length != 1) {
      return res.status(500).json({
        success: false,
        message: "Provided patient does not exist",
      });
    }

    const [responsible_check] = await pool.query(
      "SELECT * FROM responsible WHERE id = ?",
      [Responsible_id]
    );

    if (responsible_check.length != 1) {
      return res.status(500).json({
        success: false,
        message: "Provided responsible does not exist",
      });
    }

    const [doctor_check] = await pool.query(
      "SELECT * FROM doctors WHERE id = ?",
      [Doctor_id]
    );

    if (doctor_check.length != 1) {
      return res.status(500).json({
        success: false,
        message: "Provided doctor does not exist",
      });
    }

    // Checking if appointment already exists
    // const [query_check] = await pool.query(
    //   "SELECT * FROM medical_appointment WHERE Doctor_id = ? AND Responsible_id = ? AND Patient_id = ? AND State = ?",
    //   [Doctor_id, Responsible_id, Patient_id]
    // );

    // if (query_check.length != 0) {
    //   return res.status(500).json({
    //     success: false,
    //     message: `It seems like there is an already scheduled appointment with the doctor #${Doctor_id} and patient #${Patient_id}`,
    //   });
    // }

    const new_appointment = await pool.query(
      "INSERT INTO medical_appointment SET ?",
      {
        Doctor_id,
        Responsible_id,
        Patient_id,
        State: 0,
        Description,
        Date,
        Hour,
      }
    );

    return res.status(200).json({ success: true, body: new_appointment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

// ! @route POST api/doctor/update_appointment_state
// ! @desc Edits an existing appointment's state
// ! @access private

const update_appointment_state = async (req, res, next) => {
  try {
    const { id, State } = req.body;

    if (!id || !State) {
      return res
        .status(500)
        .json({ message: "You must provide every field with a value" });
    }

    const [query_check] = await pool.query(
      "SELECT * FROM medical_appointment WHERE id = ?",
      [id]
    );

    if (query_check.length === 0) {
      return res.status(500).json({
        success: false,
        message: `Selected appointment does not exist`,
      });
    }

    const edited_appointment = await pool.query(
      "UPDATE medical_appointment SET State = ? WHERE id = ?",
      [State, id]
    );

    return res.status(200).json({ success: true, body: edited_appointment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

// ! @route POST api/doctor/get_appointment_requests
// ! @desc Gets all pending appointment requests from a selected doctor
// ! @access private

const get_appointment_requests = async (req, res, next) => {
  try {
    const { Doctor_id } = req.body;

    if (!Doctor_id) {
      return res
        .status(500)
        .json({ message: "You must provide every field with a value" });
    }

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
      `SELECT * FROM medical_appointment WHERE Doctor_id = ? AND State = ?`,
      [Doctor_id, 1]
    );

    return res.status(200).json({ success: true, body: appointments_info });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

// ! @route POST api/doctor/get_responsibles
// ! @desc Gets all responsibles information
// ! @access private

const get_responsibles = async (req, res, next) => {
  try {
    const [responsibles] = await pool.query("SELECT * FROM responsible");

    return res.status(200).json({ success: true, body: responsibles });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

// ! @route POST api/doctor/accept_appointment_request
// ! @desc Accepts an appointment request
// ! @access private

const accept_appointment_request = async (req, res, next) => {
  try {
    const { id, ChosenDate, Hour, Patient_id } = req.body;

    if (!id || !ChosenDate || !Hour) {
      return res
        .status(500)
        .json({ message: "You must provide every field with a value" });
    }

    const [query_check] = await pool.query(
      "SELECT * FROM medical_appointment WHERE id = ?",
      [id]
    );

    if (query_check.length != 1) {
      return res.status(500).json({
        success: false,
        message: "Provided appointment id does not exist",
      });
    }

    await pool.query(
      "UPDATE medical_appointment SET Date = ?, Hour = ?, State = ? WHERE id = ?",
      [ChosenDate, Hour, 2, id]
    );

    await pool.query("INSERT INTO notifications SET ?", {
      Patient_id,
      Title: "Cita Confirmada",
      DateTime: new Date(),
      Type: 1,
      Description: "Tu cita ha sido confirmada",
    });

    return res
      .status(200)
      .json({ success: true, message: `Appointment #${id} has been accepted` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

// ! @route POST api/doctor/decline_appointment_request
// ! @desc Declines an appointment request
// ! @access private

const decline_appointment_request = async (req, res, next) => {
  try {
    const { id, Patient_id } = req.body;

    if (!id) {
      return res
        .status(500)
        .json({ message: "You must provide every field with a value" });
    }

    const [query_check] = await pool.query(
      "SELECT * FROM medical_appointment WHERE id = ?",
      [id]
    );

    if (query_check.length != 1) {
      return res.status(500).json({
        success: false,
        message: "Provided appointment id does not exist",
      });
    }

    await pool.query("DELETE FROM medical_appointment WHERE id = ?", [id]);

    //! ADD NOTIFICATION.
    await pool.query("INSERT INTO notifications SET ?", {
      Patient_id,
      Title: "Cita rechazada",
      DateTime: new Date(),
      Type: 2,
      Description: "Tu cita ha sido rechazada",
    });

    return res.status(200).json({
      success: true,
      message: `Appointment #${id} has been declined and deleted`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

// ! @route POST api/doctor/get_appointments_history
// ! @desc Gets all patient's appointments
// ! @access private

const get_appointments_history = async (req, res, next) => {
  try {
    const { Patient_id } = req.body;

    if (!Patient_id) {
      return res
        .status(500)
        .json({ message: "You must provide every field with a value" });
    }

    const [query_check] = await pool.query(
      "SELECT * FROM patient WHERE id = ?",
      [Patient_id]
    );

    if (query_check.length != 1) {
      return res.status(500).json({
        success: false,
        message: "Provided patient does not exist",
      });
    }

    const [appointments_history] = await pool.query(
      "SELECT * FROM medical_appointment WHERE Patient_id = ? AND State IN (?, ?, ?)",
      [Patient_id, 0, 2, 4]
    );
    return res.status(200).json({ success: true, body: appointments_history });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

// ! @route POST api/doctor/get_doctors
// ! @desc Gets all doctors
// ! @access private

const get_doctors = async (req, res, next) => {
  try {
    const [doctors] = await pool.query("SELECT * FROM doctors");

    return res.status(200).json({ success: true, body: doctors });
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
  get_patient_vaccines,
  set_medical_prescription,
  edit_medical_prescription,
  get_medical_prescriptions,
  schedule_appointment,
  update_appointment_state,
  get_appointment_requests,
  get_responsibles,
  accept_appointment_request,
  decline_appointment_request,
  get_appointments_history,
  get_doctors,
};
