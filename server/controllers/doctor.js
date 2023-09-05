import { pool } from "../utils/db.js";

import ErrorResponse from "../utils/error_message.js";
import { patientCode } from "../utils/functions.js";

// ! @route POST api/doctor/get-info
// ! @desc Get all doctor personal information
// ! @access private

const getSpecialty = (d_i) => {
  switch (d_i) {
    case 1:
      return "Otorrinolaringología";
    case 2:
      return "Neumología";
    case 3:
      return "Gastroenterología";
  }
};

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
    const { id, ChosenDate, Hour, Patient_id, Doctor_id } = req.body;

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
      Doctor_id,
      Title: getSpecialty(Doctor_id),
      DateTime: new Date(),
      Type: 1,
      Element_id: id,
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
    const { id, Patient_id, Doctor_id } = req.body;

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
      Title: getSpecialty(Doctor_id),
      DateTime: new Date(),
      Type: 2,
      Element_id: id,
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

// ! @route POST api/doctor/end_medical_appointment
// ! @desc Handles all the data put during the appointment process
// ! @access private

const end_medical_appointment = async (req, res, next) => {
  try {
    const {
      Doctor_id,
      Patient_id,
      Responsible_id,
      Appointment_id,
      medical_record,
      medical_prescription,
      medical_appointment,
      toggles,
    } = req.body;
    let errorMessages = [];

    if (
      !Doctor_id ||
      !Patient_id ||
      !Responsible_id ||
      !Appointment_id ||
      !medical_record ||
      !medical_record.height ||
      !medical_record.weight ||
      !medical_record.temperature ||
      !medical_record.notes ||
      !medical_record.HtmlNotes ||
      !medical_prescription ||
      // !medical_prescription.new_prescriptions ||
      // !medical_prescription.edited_prescriptions ||
      !medical_appointment ||
      !toggles
    ) {
      return res.status(400).json({
        success: false,
        message:
          "You must provide every field data from medical record, medical prescription, medical appointment and the other basic fields.",
      });
    }

    /*
      ? GENERAL QUERY VALIDATIONS
    */
    const [patient_check] = await pool.query(
      "SELECT * FROM patient WHERE id = ?",
      [Patient_id]
    );

    if (patient_check.length != 1) {
      return res.status(400).json({
        success: false,
        message: "Provided patient does not exist",
      });
    }

    const [doctor_check] = await pool.query(
      "SELECT * FROM doctors WHERE id = ?",
      [Doctor_id]
    );

    if (doctor_check.length != 1) {
      return res.status(400).json({
        success: false,
        message: "Provided doctor does not exist",
      });
    }

    const [responsible_check] = await pool.query(
      "SELECT * FROM responsible WHERE id = ?",
      [Responsible_id]
    );

    if (responsible_check.length != 1) {
      return res.status(400).json({
        success: false,
        message: "Provided responsible does not exist",
      });
    }

    const [appointment_check] = await pool.query(
      "SELECT * FROM medical_appointment WHERE id = ?",
      [Appointment_id]
    );

    if (appointment_check.length != 1) {
      return res.status(400).json({
        success: false,
        message: "Provided appointment does not exist",
      });
    }

    /*
      ? MEDICAL RECORD VALIDATION
      ? AND EXTRA FIELD DEFINITION
    */
    if (medical_record.height <= 0 || medical_record.height > 2.1) {
      errorMessages.push(
        "En el registro de expediente: El valor de la altura ingresada no es un valor realista"
      );
    }

    if (medical_record.weight <= 0 || medical_record.weight > 500) {
      errorMessages.push(
        "En el registro de expediente: El valor del peso ingresado no es un valor realista"
      );
    }

    if (medical_record.temperature <= 0 || medical_record.temperature > 45) {
      errorMessages.push(
        "En el registro de expediente: El valor de la temperatura ingresada no es un valor realista"
      );
    }

    if (medical_record.notes.length < 75) {
      errorMessages.push(
        "En el registro de expediente: La longitud del campo de anotaciones no es lo suficientemente extensa como para dejar registro de la consulta "
      );
    }

    /*
      ? ADD MEDICAL PRESCRIPTIONS VALIDATIONS
      ? AND EXTRA INFORMATION DEFINITION
    */
    if (toggles.addPrescriptions) {
      medical_prescription.new_prescriptions.map((np, i) => {
        if (
          new Date() >
          (new Date(np.data.Finishing_Dose_Date) ||
            new Date(np.data.Starting_Dose_Date))
        ) {
          errorMessages.push(
            `En la asignación de nueva receta médica: El ${
              i + 1
            }° medicamento no puede tener fechas de inicio y finalización de dosis menores a la fecha actual.`
          );
        }

        if (
          new Date(np.data.Starting_Dose_Date) >
          new Date(np.data.Finishing_Dose_Date)
        ) {
          errorMessages.push(
            `En la asignación de nueva receta médica: El ${
              i + 1
            }° medicamento no puede tener una fecha de inicio de dosis mayor a la fecha de finalización de dosis.`
          );
        }

        if (
          !/^[^0-9!@#$%^&*()_+<>?:"{}|~`[\]]{1,5}[a-zA-Z0-9\s]{0,45}$/.test(
            np.data.Medicine_Name
          )
        ) {
          errorMessages.push(
            `En la asignación de nueva receta médica: El nombre del ${
              i + 1
            }° medicamento no debe ser muy extenso y tampoco debe contener caracteres especiales`
          );
        }

        if (!/.{10,}/.test(np.data.Instructions)) {
          errorMessages.push(
            `En la asignación de nueva receta médica: Las instrucciones del ${
              i + 1
            }° deben ser más especificas`
          );
        }

        if (!/.{10,}/.test(np.data.Description)) {
          errorMessages.push(
            `En la asignación de nueva receta médica: La descripción del ${
              i + 1
            }° medicamento debe estar más detallada`
          );
        }

        if (!/^.{10,45}$/.test(np.data.Dose)) {
          errorMessages.push(
            `En la asignación de nueva receta médica: La explicación de la dosis del ${
              i + 1
            }° medicamento debe ser breve pero concisa`
          );
        }

        if (np.data.Time_Dose > 9) {
          errorMessages.push(
            `En la asignación de nueva receta médica: El ${
              i + 1
            }° medicamento no tener una cantidad de dosis por día tan elevada.`
          );
        }
      });
    }

    /*
        ? EDIT EXISTING MEDICAL PRESCRIPTION
        ? VALIDATIONS AND DATA INSERTION
    */
    if (toggles.editPrescriptions) {
      medical_prescription.edited_prescriptions.map((ep, i) => {
        if (
          new Date() >
          (new Date(ep.Finishing_Dose_Date) || new Date(ep.Starting_Dose_Date))
        ) {
          errorMessages.push(
            `En la edición de receta médica: El ${
              i + 1
            }° medicamento no puede tener fechas de inicio y finalización de dosis menores a la fecha actual.`
          );
        }

        if (
          new Date(ep.Starting_Dose_Date) > new Date(ep.Finishing_Dose_Date)
        ) {
          errorMessages.push(
            `En la edición de receta médica: El ${
              i + 1
            }° medicamento no puede tener una fecha de inicio de dosis mayor a la fecha de finalización de dosis.`
          );
        }

        if (
          !/^[^0-9!@#$%^&*()_+<>?:"{}|~`[\]]{1,5}[a-zA-Z0-9\s]{0,45}$/.test(
            ep.Medicine_Name
          )
        ) {
          errorMessages.push(
            `En la edición de receta médica: El nombre del ${
              i + 1
            }° medicamento no debe ser muy extenso y tampoco debe contener caracteres especiales`
          );
        }

        if (!/.{10,}/.test(ep.Instructions)) {
          errorMessages.push(
            `En la edición de receta médica: Las instrucciones del ${
              i + 1
            }° deben ser más especificas`
          );
        }

        if (!/.{10,}/.test(ep.Description)) {
          errorMessages.push(
            `En la edición de receta médica: La descripción del ${
              i + 1
            }° medicamento debe estar más detallada`
          );
        }

        if (!/^.{10,45}$/.test(ep.Dose)) {
          errorMessages.push(
            `En la edición de receta médica: La explicación de la dosis del ${
              i + 1
            }° medicamento debe ser breve pero concisa`
          );
        }

        if (ep.Time_Dose > 9) {
          errorMessages.push(
            `En la edición de receta médica: El ${
              i + 1
            }° medicamento no tener una cantidad de dosis por día tan elevada.`
          );
        }
      });
    }

    /*
      ? SCHEDULE NEW APPOINTMENT VALIDATIONS
      ? AND EXTRA INFORMATION
    */
    if (toggles.scheduleAppointment) {
      const [scheduleAppointment_check] = await pool.query(
        "SELECT * FROM medical_appointment WHERE Patient_id = ? AND Doctor_id = ? AND Responsible_id = ? AND State IN (?, ?, ?)",
        [Patient_id, Doctor_id, Responsible_id, 0, 1, 2]
      );

      if (scheduleAppointment_check.length > 0) {
        errorMessages.push(
          `En la programación de consulta médica: Parece ser que este paciente ya tiene otra cita programada.`
        );
      }
      if (medical_appointment.Description.length < 20) {
        errorMessages.push(
          `En la programación de consulta médica: El motivo de la cita debe estar más detallado.`
        );
      }

      if (
        new Date(medical_appointment.Date).getFullYear() >
        new Date().getFullYear() + 2
      ) {
        errorMessages.push(
          `En la programación de consulta médica: El año de la cita no debe excederse de los 2 años al año actual.`
        );
      }
    }


    //? ERROR HANDLER VALIDATOR
    if (errorMessages.length > 0) {
      next(new ErrorResponse(errorMessages, 400, "error"));
      return;
    } else {
      let Prescriptions_Names_Add = [];
      let Prescriptions_Names_Obj = {};
      
      //* NEW MEDICAL PRESCRIPTION FINAL QUERY *//
      if(toggles.addPrescriptions) {
        medical_prescription.new_prescriptions.map(async (np) => {
          const patient_code = patientCode();
          Prescriptions_Names_Add.push(np.data.Medicine_Name);
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
      }

      if (Prescriptions_Names_Add.length !== 0) {
        Prescriptions_Names_Add.forEach((element, i) => {
          Prescriptions_Names_Obj[i] = element;
        });
      }
      let Prescriptions_Names_Final = JSON.stringify(Prescriptions_Names_Obj);

      //* MEDICAL RECORD FINAL QUERY *//
      await pool.query("INSERT INTO medical_records SET ?", {
        Medical_History_Code: patientCode(),
        Patient_id,
        Doctor_id,
        Medical_Appointment_id: Appointment_id,
        Date_Time: new Date(),
        Diagnosis_Mobile: medical_record.notes,
        Diagnosis: medical_record.HtmlNotes.HtmlNotes,
        Weight: medical_record.weight,
        Height: medical_record.height,
        Temperature: medical_record.temperature,
        Prescriptions_Names: Prescriptions_Names_Final,
      });


      //* EDIT MEDICAL PRESCRIPTION FINAL QUERY *//
      if(toggles.editPrescriptions) {
        medical_prescription.edited_prescriptions.map(async (ep) => {
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
      }

      //* SCHEDULE APPOINTMENT FINAL QUERY *//
      if(toggles.scheduleAppointment) {
        await pool.query("INSERT INTO medical_appointment SET ?", {
          Doctor_id,
          Responsible_id,
          Patient_id,
          State: 0,
          Description: medical_appointment.Description,
          Date: medical_appointment.Date,
          Hour: medical_appointment.Hour,
        });
      }

      //* UPDATE APPOINTMENT STATUS WHEN ALL IS CONFIRMED QUERY *//
      await pool.query(
        "UPDATE medical_appointment SET State = ? WHERE id = ?",
        [4, Appointment_id]
      );

      //* SEND NOTIFICATION TO PATIENT *//
      await pool.query("INSERT INTO notifications SET ?", {
        Doctor_id,
        Patient_id,
        Title: getSpecialty(Doctor_id),
        DateTime: new Date(),
        Type: 5,
        Element_id: Appointment_id,
      });
    }

    return res
      .status(200)
      .json({
        success: true,
        message: `Medical appointment ${Appointment_id} has been closed successfully.`,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export {
  get_info,
  active_patients,
  get_appointments,
  get_patient_appointment_with_specific_doctor,
  get_responsible_info,
  get_patient_medical_record,
  get_patient_vaccines,
  get_medical_prescriptions,
  get_appointment_requests,
  get_responsibles,
  accept_appointment_request,
  decline_appointment_request,
  get_appointments_history,
  get_doctors,
  end_medical_appointment,
};
