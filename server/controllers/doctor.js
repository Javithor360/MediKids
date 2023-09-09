import { differenceInDays, differenceInMinutes } from "date-fns";
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

    let [appointments_info] = await pool.query(
      `SELECT * FROM medical_appointment WHERE Doctor_id = ?`,
      [Doctor_id]
    );

    let updated_appointments = [];
    let expired_appointments = [];
    let final_appointments = [];

    // UPDATES APPOINTMENTS STATE IF DATE AND HOUR ARE THE SAME
    appointments_info.map((obj) => {
      if(obj.Date && obj.Hour) {
        const givenDate = new Date(obj.Date);
        const giveHour = obj.Hour.split(":");
        const nDate = new Date(givenDate.getFullYear(), givenDate.getMonth(), givenDate.getDate(), parseInt(giveHour[0]), parseInt(giveHour[1]), parseInt(giveHour[2]))
        if((obj.State === 0 || obj.State === 2) && differenceInMinutes(new Date(), nDate) <= 180 && differenceInDays(new Date(), nDate) === 0) {
          updated_appointments.push(obj);
        }
      }
    })

    if(updated_appointments.length > 0) {
      updated_appointments.map(async (obj) => {
        await pool.query("UPDATE medical_appointment SET State = ? WHERE id = ?", [3, obj.id])
      })
      [appointments_info] = await pool.query(
        `SELECT * FROM medical_appointment WHERE Doctor_id = ?`,
        [Doctor_id]
      );
    }

    // DELETES ALL APPOINTMENTS THAT WERE NOT ATTENDED AFTER 5H OF WAITING
    appointments_info.map((obj) => {
      if(obj.Date && obj.Hour) {
        const givenDate = new Date(obj.Date);
        const giveHour = obj.Hour.split(":");
        const nDate = new Date(givenDate.getFullYear(), givenDate.getMonth(), givenDate.getDate(), parseInt(giveHour[0]), parseInt(giveHour[1]), parseInt(giveHour[2]))
        if ((obj.State === 2 || obj.State === 3) && (differenceInMinutes(new Date(), nDate) >= 300)) {
          expired_appointments.push(obj);
        }
      }
    });

    if (expired_appointments.length > 0) {
      expired_appointments.map(async (obj) => {
        const [checkE_A] = await pool.query('SELECT * FROM medical_appointment');
        const existDeleted = checkE_A.filter((el) => el.id == obj.id);
        if(existDeleted.length != 0) {
          await pool.query("DELETE FROM medical_appointment WHERE id = ?", [
            obj.id,
          ]);

          await pool.query("INSERT INTO notifications SET ?", {
            Doctor_id: obj.Doctor_id,
            Patient_id: obj.Patient_id,
            Title: getSpecialty(obj.Doctor_id),
            DateTime: new Date(),
            Type: 6,
            Element_id: obj.id,
          });
        }

      })
    }
    const [newM_A] = await pool.query('SELECT * FROM medical_appointment');

    return res.status(200).json({ success: true, body: newM_A });
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
      "SELECT * FROM medical_appointment WHERE Doctor_id = ? AND Patient_id = ? AND State IN (?, ?, ?)",
      [Doctor_id, Patient_id, 0, 2, 3]
    );

    // let nearest_appointment = appointment_info.reduce((prev, act) => {
    //   let difPrev = Math.abs(new Date() - new Date(prev.Date));
    //   let difAct = Math.abs(new Date() - new Date(act.Date));

    //   return difAct < difPrev ? act : prev;
    // })

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
      Doctor_id,
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

// ! @route POST api/doctor/get_patients
// ! @desc Gets all patients
// ! @access private

const get_patients = async (req, res, next) => {
  try {
    const [patients] = await pool.query("SELECT * FROM patient");

    return res.status(200).json({ success: true, body: patients });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

// ! @route POST api/doctor/get_announcements
// ! @desc Gets all doctor's announcements
// ! @access private

const get_announcements = async (req, res, next) => {
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

    const [announcements_info] = await pool.query(
      `SELECT * FROM notices WHERE Doctor_id = ?`,
      [Doctor_id]
    );

    return res.status(200).json({ success: true, body: announcements_info });
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
        error: "Tal parece que el paciente de esta cita no existe",
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
        error: "Tal parece que el doctor encargado de esta cita no existe",
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
        error: "Tal parece que el adulto responsable del paciente no existe",
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
        error: "Tal parece que la cita actual no existe",
      });
    }

    /*
      ? MEDICAL RECORD VALIDATION
      ? AND EXTRA FIELD DEFINITION
    */
    if (medical_record.height <= 0 || medical_record.height > 2.1) {
      errorMessages.push(
        `<p><span class="text-red-500">En el registro de expediente: </span><span class="text-[#707070]"> El valor de la <i class="font-semibold">'altura'</i> ingresada no es un valor realista.</span></p>`
      );
    }

    if (medical_record.weight <= 0 || medical_record.weight > 500) {
      errorMessages.push(
        `<p><span class="text-red-500">En el registro de expediente: </span><span class="text-[#707070]"> El valor del <i class="font-semibold">'peso'</i> ingresada no es un valor realista.</span></p>`
      );
    }

    if (medical_record.temperature <= 30 || medical_record.temperature > 45) {
      errorMessages.push(
        `<p><span class="text-red-500">En el registro de expediente: </span><span class="text-[#707070]"> El valor de la <i class="font-semibold">'temperatura'</i> ingresada no es un valor realista.</span></p>`
      );
    }

    if (medical_record.notes.length < 75) {
      errorMessages.push(
        `<p><span class="text-red-500">En el registro de expediente: </span><span class="text-[#707070]"> La <i class="font-semibold">'longitud del campo de anotaciones'</i> no es lo suficientemente extensa como para dejar registro de la consulta</span></p>`
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
            `<p><span class="text-red-500">En la asignación de nueva receta médica: </span><span class="text-[#707070]"> El <i class="font-semibold">'${
              i + 1
            }° medicamento'</i> no puede tener fechas de inicio y finalización de dosis menores a la fecha actual.</span></p>`
          );
        }

        if (
          new Date(np.data.Starting_Dose_Date) >
          new Date(np.data.Finishing_Dose_Date)
        ) {
          errorMessages.push(
            `<p><span class="text-red-500">En la asignación de nueva receta médica: </span><span class="text-[#707070]"> El <i class="font-semibold">'${
              i + 1
            }° medicamento'</i> no puede tener una fecha de inicio de dosis mayor a la fecha de finalización de dosis.</span></p>`
          );
        }

        if (
          !/^[^0-9!@#$%^&*()_+<>?:"{}|~`[\]]{1,5}[a-zA-Z0-9\s]{0,45}$/.test(
            np.data.Medicine_Name
          )
        ) {
          errorMessages.push(
            `<p><span class="text-red-500">En la asignación de nueva receta médica: </span><span class="text-[#707070]"> El nombre del <i class="font-semibold">'${
              i + 1
            }° medicamento'</i> no debe ser muy extenso y tampoco debe contener caracteres especiales</span></p>`
          );
        }

        if (!/.{10,}/.test(np.data.Instructions)) {
          errorMessages.push(
            `<p><span class="text-red-500">En la asignación de nueva receta médica: </span><span class="text-[#707070]"> Las instrucciones del <i class="font-semibold">'${
              i + 1
            }° medicamento'</i> deben ser detalladas</span></p>`
          );
        }

        if (!/.{10,}/.test(np.data.Description)) {
          errorMessages.push(
            `<p><span class="text-red-500">En la asignación de nueva receta médica: </span><span class="text-[#707070]"> La descripción del <i class="font-semibold">'${
              i + 1
            }° medicamento'</i> debe estar más detallada</span></p>`
          );
        }

        if (!/^.{10,45}$/.test(np.data.Dose)) {
          errorMessages.push(
            `<p><span class="text-red-500">En la asignación de nueva receta médica: </span><span class="text-[#707070]"> La explicación de la dosis del <i class="font-semibold">'${
              i + 1
            }° medicamento'</i> debe ser breve pero concisa</span></p>`
          );
        }

        if (np.data.Time_Dose > 9) {
          errorMessages.push(
            `<p><span class="text-red-500">En la asignación de nueva receta médica: </span><span class="text-[#707070]"> El <i class="font-semibold">'${
              i + 1
            }° medicamento'</i> no debe tener una cantidad de dosis por día tan elevada.</span></p>`
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
            `<p><span class="text-red-500">En la edición de receta médica: </span><span class="text-[#707070]"> El <i class="font-semibold">'${
              i + 1
            }° medicamento'</i> no puede tener fechas de inicio y finalización de dosis menores a la fecha actual.</span></p>`
          );
        }

        if (
          new Date(ep.Starting_Dose_Date) > new Date(ep.Finishing_Dose_Date)
        ) {
          errorMessages.push(
            `<p><span class="text-red-500">En la edición de receta médica: </span><span class="text-[#707070]"> El <i class="font-semibold">'${
              i + 1
            }° medicamento'</i> no puede tener una fecha de inicio de dosis mayor a la fecha de finalización de dosis.</span></p>`
          );
        }

        if (
          !/^[^0-9!@#$%^&*()_+<>?:"{}|~`[\]]{1,5}[a-zA-Z0-9\s]{0,45}$/.test(
            ep.Medicine_Name
          )
        ) {
          errorMessages.push(
            `<p><span class="text-red-500">En la edición de receta médica: </span><span class="text-[#707070]"> El nombre del <i class="font-semibold">'${
              i + 1
            }° medicamento'</i> no debe ser muy extenso y tampoco debe contener caracteres especiales</span></p>`
          );
        }

        if (!/.{10,}/.test(ep.Instructions)) {
          errorMessages.push(
            `<p><span class="text-red-500">En la edición de receta médica: </span><span class="text-[#707070]"> Las instrucciones del <i class="font-semibold">'${
              i + 1
            }° medicamento'</i> deben ser más especificas</span></p>`
          );
        }

        if (!/.{10,}/.test(ep.Description)) {
          errorMessages.push(
            `<p><span class="text-red-500">En la edición de receta médica: </span><span class="text-[#707070]"> La descripción del <i class="font-semibold">'${
              i + 1
            }° medicamento'</i> debe estar más detallada</span></p>`
          );
        }

        if (!/^.{10,45}$/.test(ep.Dose)) {
          errorMessages.push(
            `<p><span class="text-red-500">En la edición de receta médica: </span><span class="text-[#707070]"> La explicación de la dosis del <i class="font-semibold">'${
              i + 1
            }° medicamento'</i> debe ser breve pero concisa</span></p>`
          );
        }

        if (ep.Time_Dose > 9) {
          errorMessages.push(
            `<p><span class="text-red-500">En la edición de receta médica: </span><span class="text-[#707070]"> El <i class="font-semibold">'${
              i + 1
            }° medicamento'</i> no debe tener una cantidad de dosis por día tan elevada.</span></p>`
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
          `<p><span class="text-red-500">En la programación de consulta médica: </span><span class="text-[#707070]"> Parece ser que este paciente <i class="font-semibold">ya tiene otra cita programada.</i></span></p>`
        );
      }

      if (
        medical_appointment.Description.length < 20 ||
        medical_appointment.Description.length > 150
      ) {
        errorMessages.push(
          `<p><span class="text-red-500">En la programación de consulta médica: </span><span class="text-[#707070]"> El motivo de la cita debe tener <i class="font-semibold">mínimo 20 y máximo 150 letras.</i></span></p>`
        );
      }

      if (
        new Date(medical_appointment.Date).getFullYear() >
        new Date().getFullYear() + 2
      ) {
        errorMessages.push(
          `<p><span class="text-red-500">En la programación de consulta médica: </span><span class="text-[#707070]"> El año de la cita <i class="font-semibold">no debe excederse de los 2 años al año actual.</i></span></p>`
        );
      }
    }

    //? ERROR HANDLER VALIDATOR
    if (errorMessages.length > 0) {
      return next(new ErrorResponse(errorMessages, 400, "error"));
    } else {
      let Prescriptions_Names_Add = [];
      let Prescriptions_Names_Obj = {};

      //* NEW MEDICAL PRESCRIPTION FINAL QUERY *//
      if (toggles.addPrescriptions) {
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
      if (toggles.editPrescriptions) {
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
      if (toggles.scheduleAppointment) {
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

    return res.status(200).json({
      success: true,
      message: `Medical appointment ${Appointment_id} has been closed successfully.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
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
  get_patients,
  get_announcements,
  end_medical_appointment,
};
