import { pool } from "../utils/db.js";

//>> ======================== <<
//>>        IMPORTANT:        <<
/*
  ? Estados de la cita medica.
  * 0 = Programada
  * 1 = Solicitada
  * 2 = confirmada
  * 3 = Ejecutandose
  * 4 = Terminada
*/
//>> ======================== <<

// ! @route POST api/appointment/get_medical_records
// ! @desc Get the records of the Responsible.
// ! @access PRIVATE
const get_medical_records = async (req, res, next) => {
  try {
    const {Patient_id} = req.body;

    //? SELECT THE MEDICAL RECORDS FROM THE DATABASE.
    const [Medical_Records] = await pool.query('SELECT id, Medical_History_Code, Date_Time, Weight, Height, Temperature, Patient_id, Doctor_id, Diagnosis_Mobile,Prescriptions_Names FROM medical_records WHERE Patient_id = ?', [Patient_id]);

    return res.status(200).json({success: true, medical_records: Medical_Records});
  } catch (error) {
    return res.status(500).json({ error });
  }
}

// ! @route POST api/appointment/request_medical_appointment
// ! @desc Create the request of the medical appointment.
// ! @access PRIVATE
const request_medical_appointment = async (req, res, next) => {
  try {
    const { Patient_Code, Doctor_id, Week, Description } = req.body;
    const Responsible_id = req.auth_token.user.id;

    // console.log(Patient_Code, Doctor_id, , Description, Responsible_id);
    //? Found the patient_id with the patient_code.
    const [Patient_id] = await pool.query('SELECT id FROM patient WHERE Patient_Code = ?', [Patient_Code]);

    //? GET THE WEEK FROM THE STRING.
    const dividedWeek = Week.split(' ');
    const startDay = dividedWeek[0];
    const finalDay = dividedWeek[dividedWeek.length - 1];

    //? CREATE THE OBJECT OF WEEK
    const weekObj = { startDay, finalDay }

    //? SET THE APPOINTMENT IN THE DATABASE.
    await pool.query('INSERT INTO medical_appointment SET ?', {Doctor_id, Responsible_id, Patient_id: Patient_id[0].id, State: 1, Week: JSON.stringify(weekObj), Description, Date: null, Hour: null})

    return res.status(200).json({success: true});
  } catch (error) {
    return res.status(500).json({ error });
  }
}

// ! @route POST api/appointment/get_medical_appointments
// ! @desc Get the list of medical appointments of the patient.
// ! @access PRIVATE
const get_medical_appointments = async (req, res, next) => {
  try {
    const {Patient_Code, Hour} = req.body;

    const CurrentTime = new Date(Hour);

    //? Found the patient_id with the patient_code.
    const [Patient_id] = await pool.query('SELECT id FROM patient WHERE Patient_Code = ?', [Patient_Code]);

    //? Get the list of medical appointments.
    const [medical_appointments] = await pool.query('SELECT * FROM medical_appointment WHERE Patient_id = ?', [Patient_id[0].id]);

    medical_appointments.forEach(async (el) => {
      if(el.State == 2){
        let HoursSQL = el.Hour.split(':');
        let appointment_hour = new Date(el.Date);

        appointment_hour.setHours(HoursSQL[0]);
        appointment_hour.setMinutes(HoursSQL[1]);
        appointment_hour.setSeconds(HoursSQL[2]);

        const msDif = appointment_hour - CurrentTime;
        const minDif = msDif / (1000 * 60);

        if(minDif < 60){
          await pool.query('UPDATE medical_appointment SET State = 3 WHERE id = ?',[el.id]);
        }
      }
    })

    //? Get the list of medical appointments.
    const [m_a] = await pool.query('SELECT * FROM medical_appointment WHERE Patient_id = ?', [Patient_id[0].id]);

    return res.status(200).json({success: true, medical_appointments: m_a});
  } catch (error) {
    return res.status(500).json({ error });
  }
}


export {
  get_medical_records,
  request_medical_appointment,
  get_medical_appointments
}