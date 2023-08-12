
//>> IMPORT MODULES
import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid';
import fs from 'fs';

//>> IMPORT CONFIGS & FUNCTIONS 
import {pool} from '../utils/db.js';
// import { create_code, create_jwt, create_reset_code, patientCode, send_forgot_pass_email, send_verify_code_email } from '../utils/functions.js';
import firebaseConfig from '../utils/firebase.config.js';

//? Startup Firebase configuration.
initializeApp(firebaseConfig.firebaseConfig);

//? Setup Firebase Storage.
const storage = getStorage();

//! @route POST api/responsible/get_email_to_verify
//! @desc Get the email of the responsible who has not still verified it
//! @access Public
const get_email_to_verify = async (req, res, next) => {
  try {
    const { Email } = req.body;

    // QUERY TO GET THE USER
    const [query_user] = await pool.query('SELECT * FROM responsible WHERE Email = ? AND Email_Verify_code != ""', [Email]);
    if (query_user.length == 0) {
      return res.status(500).json({sucess: false, message: 'Email verificado'});
    }
    // SEND THE USER TO THE FRONT.
    return res.status(200).json({Responsible_user: query_user[0]});
  } catch (error) {
    return res.status(500).json({error});
  }
}

//! @route POST api/responsible/get_responsible
//! @desc Get the user to know if already registered
//! @access Public
const get_responsible = async (req, res, next) => {
  try {
    const { Email } = req.body;

    // QUERY TO GET THE USER
    const [query_user] = await pool.query('SELECT * FROM responsible WHERE Email = ?', [Email]);
    if (query_user.length == 0) {
      return res.status(500).json({sucess: false, message: 'Email no registrado'});
    }

    // SEND THE USER TO THE FRONT.
    return res.status(200).json({Responsible_user: query_user[0]});
  } catch (error) {
    return res.status(500).json({error});
  }
}

//! @route POST api/responsible/get_patients
//! @desc Get the user to know if already registered
//! @access Public
const get_patients = async (req, res) => {
  try {
    const { Email } = req.body;

    // GET THE ID OF THE RESPONSIBLE
    const [getRespId] = await pool.query('SELECT id FROM responsible WHERE Email = ?', [Email])

    // GET THE PATIENTS OF THE RESPONSIBLE.
    const [getPatients] = await pool.query('SELECT * FROM patient WHERE Responsible_id = ?', [getRespId[0].id])

    return res.status(200).json({success: true, patients: getPatients});
  } catch (error) {
    return res.status(500).json({error});
  }
}

//! @route POST api/responsible/get_patient
//! @desc Get only one patient
//! @access Public
const get_patient = async (req, res) => {
  try {
    const {PatientId} = req.body;

    // GET THE PATIENT INDIVIDUALLY.
    const [patient] = await pool.query('SELECT * FROM patient WHERE id = ?', [PatientId]);

    return res.status(200).json({success: true, patient });
  } catch (error) {
    return res.status(500).json({error});
  }
}

//! @route POST api/responsible/upload_photo
//! @desc Reset the password and set null the tokens.
//! @access Public
const upload_pf_responsible = async (req, res, next) => {
  try {
    const {Email} = req.body;

    //? Set name of the foto.
    const name = v4();

    //? Reference to the storage where the photo will be upload.
    const storageRef = ref(storage, `perfil_photos/${name}`);
    
    //? Create the config for the upload.
    const metadata = {contentType: req.file.mimetype};

    //? Get the buffer of the image;
    const buffer = fs.readFileSync(req.file.path);
    
    //? Upload the image.
    await uploadBytesResumable(storageRef, buffer, metadata);

    //? Get the url from the snapshot.
    const url = await getDownloadURL(storageRef);

    //! Save in the database;
    await pool.query('UPDATE Responsible SET Profile_Photo_Url = ?, Profile_Photo_Name = ? WHERE Email = ?', [url, name, Email]);

    //>> Delete File fron upload directory.
    fs.unlink(req.file.path, (err) => {if (err) throw err});

    return res.status(200).json({success: true, url});
  } catch (error) {
    return res.status(500).json({error});
  }
}

//! @route POST api/responsible/get_immunization_record
//! @desc Get the information of the immunization record of the Patient.
//! @access Public
const get_immunization_record = async (req, res, next) => {
  try {
    const {Patient_id} = req.body;

    // CREATE THE VARIABLE TO SEND THE PATIENT VACCINES.
    let PV;

    // GET THE PATIENT VACCINES RECORD.
    if (Patient_id != null) {
      const [PatientVaccines] = await pool.query('SELECT * FROM patient_vaccines WHERE Patient_id = ?', [Patient_id]);
      PV = PatientVaccines;
    } else {
      PV = null;
    }

    return res.status(200).json({success: true, immunization_record: PV});
  } catch (error) {
    return res.status(500).json({error});
  }
}

//! @route POST api/responsible/get_all_immunization_record
//! @desc Get the information of ALL immunization records.
//! @access Public
const get_all_immunization_record = async (req, res, next) => {
  try {
    const [PatientVaccines] = await pool.query('SELECT * FROM patient_vaccines');
  
    return res.status(200).json({success: true, PatientVaccines: PatientVaccines});
  } catch (error) {
    return res.status(500).json({error});
  }
}

//! @route POST api/responsible/create_immunization_record
//! @desc Set the immunization record for the specified Patient.
//! @access Public
const create_immunization_record = async (req, res, next) => {
  try {
    const {Patient_id, PatientVaccines} = req.body;

    // SET THE VACCINES INTO THE TABLE OF THE DB.
    await pool.query('INSERT INTO patient_vaccines SET ?', {Vaccine_Hepatitis_A: PatientVaccines.hepatitis, Vaccine_BGC: PatientVaccines.bgc, Vaccine_Poliomielitis: PatientVaccines.poliomielitis, Vaccine_Pentavalente: PatientVaccines.pentavalente, Vaccine_Rotavirus: PatientVaccines.rotavirus, Vaccine_Neumococo: PatientVaccines.neumococo, Vaccine_DPT: PatientVaccines.dtp, Vaccine_Polio_Oral: PatientVaccines.polio, Vaccine_Antitetanica: PatientVaccines.antitetanica, Vaccine_Triple_Viral_SPR: PatientVaccines.spr, Patient_id})

    return res.status(200).json({success: true});
  } catch (error) {
    return res.status(500).json({error});
  }
}

export {
  get_email_to_verify,
  get_responsible,
  get_patients,
  get_patient,
  upload_pf_responsible,
  get_immunization_record,
  get_all_immunization_record,
  create_immunization_record
}