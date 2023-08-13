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
    const {Patient_id} = req.params;

    //? SELECT THE MEDICAL RECORDS FROM THE DATABASE.
    const [Medical_Records] = await pool.query('SELECT * FROM medical_records WHERE Patient_id = ?', [Patient_id]);

    return res.status(200).json({success: true, medical_records: Medical_Records});
  } catch (error) {
    return res.status(500).json({ error });
  }
}

// ! @route POST api/appointment/request_medical_appointment
// ! @desc Get the records of the Responsible.
// ! @access PRIVATE
const request_medical_appointment = async (req, res, next) => {
  try {
    const { Patient_id, Doctor_id, Weeks, Description } = req.params;
    const Responsible_id = req.auth_token.user.id;

    //? GET THE WEEKS FROM THE STRING.
    const dividedWeeks = Weeks.split(' ');
    const startWeek = dividedWeeks[0];
    const finalWeek = dividedWeeks[dividedWeeks.length - 1];

    //? CREATE THE OBJECT OF WEEKS
    const weekObj = { startWeek, finalWeek }

    //? SET THE APPOINTMENT IN THE DATABASE.
    await pool.query('INSERT INTO medical_appointment SET ?', {Doctor_id, Responsible_id, Patient_id, State: 1, Weeks: JSON.stringify(weekObj), Description, Date: null, Hour: null})

    return res.status(200).json({success: true});
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export {
  get_medical_records,
  request_medical_appointment
}