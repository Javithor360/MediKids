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
    const [Medical_Records] = await pool.query('SELECT id, Medical_History_Code, Date_Time, Weight, Height, Temperature, Patient_id, Doctor_id, Diagnosis_Mobile, Prescriptions_Names FROM medical_records WHERE Patient_id = ?', [Patient_id]);

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

    //? Found the patient_id with the patient_code.
    const [Patient_id] = await pool.query('SELECT id FROM patient WHERE Patient_Code = ?', [Patient_Code]);

    //? Check if the patient is already assigned to the doctor
    const [query_check] = await pool.query('SELECT * FROM patients_monitoring WHERE Doctor_id = ? AND Patient_id = ?', [Patient_id[0].id, Doctor_id]);

    if(query_check.length === 0) {
      await pool.query('INSERT INTO patients_monitoring SET ?', { Doctor_id, Patient_id: Patient_id[0].id });
    }

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
      if(el.State == 2 || el.State == 0){
        let HoursSQL = el.Hour.split(':');
        let appointment_hour = new Date(el.Date);

        appointment_hour.setHours(HoursSQL[0]);
        appointment_hour.setMinutes(HoursSQL[1]);
        appointment_hour.setSeconds(HoursSQL[2]);

        const msDif = appointment_hour - CurrentTime;
        const minDif = msDif / (1000 * 60);

        if(minDif <= 90){
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

// ! @route POST api/appointment/get_single_medical_appmt
// ! @desc Get the list of medical appointments of the patient.
// ! @access PRIVATE
const get_single_medical_appmt = async (req, res, next) => {
  try {
    const {Appointment_id} = req.body;

    const [Appointment] = await pool.query('SELECT * FROM medical_appointment WHERE id = ?', [Appointment_id])

    let M_H_C = null;
    //? GET THE MEDICAL RECORD CODE.
    if (Appointment[0].State == 4){
      const [Medical_Record] = await pool.query('SELECT * FROM medical_records WHERE Medical_Appointment_id = ?', [Appointment[0].id])
      M_H_C = Medical_Record[0].Medical_History_Code;
    }
    
    return res.status(200).json({success: true, Appointment, Record_Code: M_H_C});
  } catch (error) {
    return res.status(500).json({ error });
  }
}


// ! @route POST api/appointment/get_single_medical_appmt_record
// ! @desc Get a single appointment record.
// ! @access PRIVATE
const get_single_medical_appmt_record = async (req, res, next) => {
  try {
    const {Record_Code} = req.body;

    const [Single_Appmt_rcd] = await pool.query('SELECT * FROM medical_records WHERE Medical_History_Code = ?', [Record_Code])

    return res.status(200).json({success: true, appointment_record: Single_Appmt_rcd});
  } catch (error) {
    return res.status(500).json({ error });
  }
}

// ! @route POST api/appointment/get_medicines_appmt_result
// ! @desc Get the medicines asigned to the patient
// ! @access PRIVATE
const get_medicines_appmt_result = async (req, res, next) => {
  try {
    const {Record_Code} = req.body;

    const [Single_Appmt_rcd] = await pool.query('SELECT * FROM medical_records WHERE Medical_History_Code = ?', [Record_Code])

    let Medicines = [];
    const Obj_Medicines_Names = JSON.parse(Single_Appmt_rcd[0].Prescriptions_Names);
    for (let i = 0; i < Object.keys(Obj_Medicines_Names).length; i++) {
      let [result] = await pool.query('SELECT * FROM medical_prescription WHERE Medicine_Name = ?', [Obj_Medicines_Names[i]])
      Medicines.push(result[0]);
    }
    
    return res.status(200).json({success: true, Medicines});
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export {
  get_medical_records,
  request_medical_appointment,
  get_medical_appointments,
  get_single_medical_appmt,
  get_single_medical_appmt_record,
  get_medicines_appmt_result
}