
//>> IMPORT MODULES
import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { differenceInHours, differenceInMinutes, differenceInMonths } from 'date-fns';

//>> IMPORT CONFIGS & FUNCTIONS 
import {pool} from '../utils/db.js';
// import { create_code, create_jwt, create_reset_code, patientCode, send_forgot_pass_email, send_verify_code_email } from '../utils/functions.js';
import firebaseConfig from '../utils/firebase.config.js';

//? Startup Firebase configuration.
initializeApp(firebaseConfig.firebaseConfig);

//? Setup Firebase Storage.
const storage = getStorage();

//* Get the specialties of the doctor
const getSpecialty = (d_i) => {
  switch (d_i) {
    case 1:
      return 'Otorrinolaringología';
    case 2:
      return 'Neumología';
    case 3:
      return 'Gastroenterología'
  }
}

//! @route POST api/responsible/get_email_to_verify
//! @desc Get the email of the responsible who has not still verified it
//! @access Public
const get_email_to_verify = async (req, res, next) => {
  try {
    const { Email } = req.body;

    // QUERY TO GET THE USER
    const [query_user] = await pool.query('SELECT * FROM responsible WHERE Email = ? AND Email_Verify_code != ""', [Email]);
    if (query_user.length == 0) {
      return res.status(500).json({sucess: false, message: {es: 'Email verificado', en: 'Email verified'}});
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
    const [getRespId] = await pool.query('SELECT id FROM responsible WHERE Email = ?', [Email]);

    // GET THE PATIENTS OF THE RESPONSIBLE.
    const [p_update] = await pool.query('SELECT * FROM patient WHERE Responsible_id = ?', [getRespId[0].id])

    // UPDATE AGE
    p_update.forEach(async (element) => {
      let newAge = new Date().getFullYear() - new Date(element.Birthdate).getFullYear();
      if (differenceInMonths(new Date(), new Date(element.Birthdate)) < 12) {
        await pool.query('UPDATE patient SET Age = ? WHERE id = ?', [0, element.id]);
      } else {
        await pool.query('UPDATE patient SET Age = ? WHERE id = ?', [newAge, element.id]);
      }
    });

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
    const {Email, FileName} = req.body;

    //? Reference to the storage to get the url of the image.
    const storageRef = ref(storage, `perfil_photos/${FileName}`);
  
    //? Get the url from the snapshot.
    const url = await getDownloadURL(storageRef);

    //! Save in the database;
    await pool.query('UPDATE responsible SET Profile_Photo_Url = ?, Profile_Photo_Name = ? WHERE Email = ?', [url, FileName, Email]);

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

//! @route POST api/responsible/get_medical_prescriptions
//! @desc Get the medical prescription of the patient of the responsible.
//! @access Private
const get_medical_prescriptions = async (req, res, next) => {
  try {
    const { Patient_id } = req.body;

    const [PatientPrescriptions] = await pool.query('SELECT * FROM medical_prescription WHERE Patient_id = ? AND Finishing_Dose_Date > CURDATE()', [Patient_id]);
    
    return res.status(200).json({success: true, Prescriptions: PatientPrescriptions})
  } catch (error) {
    return res.status(500).json({error});
  }
}

//! @route POST api/responsible/upload_pf_patient
//! @desc Change the patient perfil photo
//! @access Private
const upload_pf_patient = async (req, res, next) => {
  try {
    const {Patient_id, FileName} = req.body;

    //? Reference to the storage to get the url of the image.
    const storageRef = ref(storage, `patient_pf/${FileName}`);
  
    //? Get the url from the snapshot.
    const url = await getDownloadURL(storageRef);

    //! Save in the database;
    await pool.query('UPDATE Patient SET Profile_Photo_Url = ?, Profile_Photo_Name = ? WHERE id = ?', [url, FileName, Patient_id]);

    return res.status(200).json({success: true, url, FileName});
  } catch (error) {
    return res.status(500).json({error});
  }
}

//! @route POST api/responsible/get_calendar_events
//! @desc Get the events of a patient from the database.
//! @access Private
const get_calendar_events = async (req, res, next) => {
  try {
    const {Patient_id} = req.body;

    const EventsAppmt = [];
    const EventsMedic = [];

    //? HOW ARRAY'S WILL LOOKS
    /*
      -> General values: { Event_Name: '', Starting_Event_Date: 2023-08-29, Description: '' }
      -> Appointment Values: { End_Event_Date: null, Start_Time: 21:00:00, Dose_int: null, Dose_String: null }
      -> Medicine values: { End_Event_Date: 2023-08-30, Start_Time: null, Dose_int: 2, Dose_String: '2 veces al dia' }
      const Events = [
        {
          Event_Name: '', Starting_Event_Date: 2023-08-29, End_Event_Date: 2023-08-30,
          Start_Time: 21:00:00, Description: '',
          Dose_int: 2, Dose_String: '2 veces al dia',
        }
      ]
    */

    const getAppmtSpecialty = (v) => {
      switch (v) {
        case 1:
            return 'Otorrinolaringologia';
        case 2:
            return 'Neumologia';
        case 3:
            return 'Gastroenterologia';
      }
    }
    
    const getDateTime = (date, time) => {
      let HoursSQL = time.split(':');
      let appointment_hour = new Date(date);

      appointment_hour.setHours(HoursSQL[0]);
      appointment_hour.setMinutes(HoursSQL[1]);
      appointment_hour.setSeconds(HoursSQL[2]);

      return appointment_hour;
    }

    const getAppmtDescription = (State) => {
      switch (State) {
        case 0:
          return 'Cita Medica programada';
        case 2:
          return 'Cita Medica Confirmada';
        case 3:
          return 'Cita medica En este momento';
        case 4:
          return 'Cita medica pasada';
      }
    }

    //\\ Get and validate the appointments events
    const [appointments] = await pool.query('SELECT * FROM medical_appointment WHERE Patient_id = ? AND State <> 4', [Patient_id]);
    if (appointments.length != 0) {
      appointments.map((appmt) => {
        let EventObj = {};
        if (appmt.State != 1) {
          EventObj.Event_Name = `Cita - ${getAppmtSpecialty(appmt.Doctor_id)}`;
          EventObj.Starting_Event_Date = getDateTime(appmt.Date, appmt.Hour);
          EventObj.End_Event_Date = null;
          EventObj.Description = getAppmtDescription(appmt.State);
          EventObj.Start_Time = getDateTime(appmt.Date, appmt.Hour);
          EventObj.Dose_int = null
          EventObj.Dose_String = null;
          EventsAppmt.push(EventObj);
        }
      })
    }

    //\\ Get and validate the Medicines evers
    const [Prescriptions] = await pool.query('SELECT * FROM medical_prescription WHERE Patient_id = ?',[Patient_id]);
    if (Prescriptions.length != 0) {
      Prescriptions.map((presc) => {
        let EventObj = {};
        EventObj.Event_Name = `Medicamento - ${presc.Medicine_Name}`;
        EventObj.Starting_Event_Date = new Date(presc.Starting_Dose_Date);
        EventObj.End_Event_Date = new Date(presc.Finishing_Dose_Date);
        EventObj.Description = `Recordatorio de tomar: "${presc.Medicine_Name}"`;
        EventObj.Start_Time = null;
        EventObj.Dose_int = presc.Time_Dose;
        EventObj.Dose_String = presc.Dose;
        EventsMedic.push(EventObj);
      })
    }

    return res.status(200).json({success: true, EventsAppmt, EventsMedic});
  } catch (error) {
    return res.status(500).json({error});
  }
}

//! @route POST api/responsible/get_notifications
//! @desc Get the notifications for a single patient.
//! @access Private
/*
    * TYPE OF NOTIFICATIONS
    \ 1 - Appointment accepted
    \ 2 - Appointment rejected
    \ 3 - Appointment reminder (1:30h before)
    \ 4 - Appointment starting
    \ 5 - Appointment finished
    ? NEGATIVE VALUES MEANS DELETED
*/
const get_notifications = async (req, res, next) => {
  try {
    const {Patient_id} = req.body;
    //! BOTH KIND OF NOTIS
    let ActualNotis = [];
    let PassedNotis = [];

    //! GET ALL NOTIFICATIONS
    const [validating_notis] = await pool.query('SELECT * FROM notifications WHERE Patient_id = ?', [Patient_id]);

    //>> GET DELETED NOTIS
    const deleted_notis = validating_notis.filter(el => el.Type < 0);

    //\\ CREATE 3 AND 4 NOTIFICATION TYPE.
    const [appmts] = await pool.query('SELECT * FROM medical_appointment WHERE patient_id = ?', [Patient_id])
    appmts.map(async (appmt_el, i) => {
      if ( appmt_el.State == 2 || appmt_el.State == 3 ) {
        let HoursSQL = appmt_el.Hour.split(':');
        let appointment_hour = new Date(appmt_el.Date);

        appointment_hour.setHours(HoursSQL[0]);
        appointment_hour.setMinutes(HoursSQL[1]);
        appointment_hour.setSeconds(HoursSQL[2]);

        const ExistDeletedType3 = deleted_notis.filter(el => el.Type == -3);
        const ExistDeletedType4 = deleted_notis.filter(el => el.Type == -4);
        
        const ExistType3 = validating_notis.filter(el => el.Type == 3);
        const ExistType4 = validating_notis.filter(el => el.Type == 4);

        //? TYPE 3;
        //>> FIRST CASE
        if (ExistDeletedType3.length != 0) {
          let createNoti3 = false;
          const notExist = ExistType3.filter(el => {return el.Element_id == appmt_el.id && el.Type == 3});
          ExistDeletedType3.map(async (d_3) => {
            if (d_3.Element_id != appmt_el.id && notExist.length == 0) {
              if (!createNoti3) {

                if(differenceInMinutes(appointment_hour, new Date()) <= 90 && differenceInMinutes(appointment_hour, new Date()) >= 0){
                  await pool.query('INSERT INTO notifications SET ?', { Patient_id, Doctor_id: appmt_el.Doctor_id, Title: getSpecialty(appmt_el.Doctor_id), DateTime: new Date(), Type: 3, Element_id: appmt_el.id })
                  createNoti3 = true;
                }
              }

            }
          })
        } 
        //>> SECOND CASE
        else if (ExistType3.length != 0) {
          let createNoti3 = false;
          const notExist = ExistType3.filter(el => {return el.Element_id == appmt_el.id && el.Type == 3});
          ExistType3.map(async (e_3) => {
            if ( e_3.Element_id != appmt_el.id && notExist.length == 0 ) {
              if (!createNoti3){

                if(differenceInMinutes(appointment_hour, new Date()) <= 90 && differenceInMinutes(appointment_hour, new Date()) >= 0){
                  await pool.query('INSERT INTO notifications SET ?', { Patient_id, Doctor_id: appmt_el.Doctor_id, Title: getSpecialty(appmt_el.Doctor_id), DateTime: new Date(), Type: 3, Element_id: appmt_el.id })
                  createNoti3 = true;
                }

              }
            }
          })
        }
        //>> THIRD CASE
        else {
          if(differenceInMinutes(appointment_hour, new Date()) <= 90 && differenceInMinutes(appointment_hour, new Date()) >= 0){
            await pool.query('INSERT INTO notifications SET ?', { Patient_id, Doctor_id: appmt_el.Doctor_id, Title: getSpecialty(appmt_el.Doctor_id), DateTime: new Date(), Type: 3, Element_id: appmt_el.id })
          }
        }



        //? TYPE 4;
        //>> FIRST CASE
        if (ExistDeletedType4.length != 0) {
          let createNoti4 = false;
          const notExist = ExistType4.filter(el => {return el.Element_id == appmt_el.id && el.Type == 4});
          ExistDeletedType4.map(async (d_4) => {
            if (d_4.Element_id != appmt_el.id && notExist.length == 0) {
              if (!createNoti4) {

                if(differenceInMinutes(appointment_hour, new Date()) <= 0){
                  await pool.query('INSERT INTO notifications SET ?', { Patient_id, Doctor_id: appmt_el.Doctor_id, Title: getSpecialty(appmt_el.Doctor_id), DateTime: new Date(), Type: 4, Element_id: appmt_el.id })
                  createNoti4 = true;
                }
              }

            }
          })
        } 
        //>> SECOND CASE
        else if (ExistType4.length != 0) {
          let createNoti4 = false;
          const notExist = ExistType4.filter(el => {return el.Element_id == appmt_el.id && el.Type == 4});
          ExistType4.map(async (e_4) => {
            if ( e_4.Element_id != appmt_el.id && notExist.length == 0 ) {
              if (!createNoti4){

                if(differenceInMinutes(appointment_hour, new Date()) <= 0){
                  await pool.query('INSERT INTO notifications SET ?', { Patient_id, Doctor_id: appmt_el.Doctor_id, Title: getSpecialty(appmt_el.Doctor_id), DateTime: new Date(), Type: 4, Element_id: appmt_el.id })
                  createNoti4 = true;
                }

              }
            }
          })
        }
        //>> THIRD CASE
        else {
          if(differenceInMinutes(appointment_hour, new Date()) <= 0){
            await pool.query('INSERT INTO notifications SET ?', { Patient_id, Doctor_id: appmt_el.Doctor_id, Title: getSpecialty(appmt_el.Doctor_id), DateTime: new Date(), Type: 4, Element_id: appmt_el.id })
          }
        }
      }
    })

    //! GET ALL NOTIFICATIONS
    const [notis] = await pool.query('SELECT * FROM notifications WHERE Patient_id = ? AND Type > 0', [Patient_id]);

    //! SEPARATE NOTIS
    notis.map((el, i) => {
      if (differenceInHours(new Date(), new Date(el.DateTime)) >= 24) {
        PassedNotis.push(el)
      } else {
        ActualNotis.push(el);
      }
    })
    
    return res.status(200).json({success: true, ActualNotis, PassedNotis});
  } catch (error) {
    return res.status(500).json({error});
  }
}

//! @route POST api/responsible/delete_notification
//! @desc Delete a single notification for a single patient.
//! @access Private
const delete_notification = async (req, res, next) => {
  try {
    const { Notification_id, Type } = req.body;
    const getNegativeType = -Type;

    await pool.query('UPDATE notifications SET Type = ? WHERE id = ?', [getNegativeType, Notification_id])

    return res.status(200).json({ success: true });
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
  create_immunization_record,
  get_medical_prescriptions,
  upload_pf_patient,
  get_calendar_events,
  get_notifications,
  delete_notification
}