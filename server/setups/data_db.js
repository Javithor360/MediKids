import mysql from "mysql2";

import bcrypt from "bcryptjs";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { patientCode } from "../utils/functions.js";
import { config_env } from "../utils/dotenv_conf.js";
import firebaseConfig from "../utils/firebase.config.js";

const db = mysql.createConnection({
  host: config_env.HOST,
  user: config_env.USER,
  password: config_env.PASS,
});
console.log("[DB] Creating connection to start data insertion...");

// initializeApp(firebaseConfig.firebaseConfig);
// const storage = getStorage();
// const storageRef = ref(storage, `perfil_photos/default.png`);
const P_F = 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
const responsibles = [
  {
    First_Names: "Alvin Josué",
    Last_Names: "Meléndez Serrano",
    Email: "alvinm@gmail.com",
    Password: await bcrypt.hash("medikids", 12),
    DUI: "12345678-9",
    Birthdate: "1976-11-09",
    Age: 46,
    Phone: "7650-7572",
    Profile_Photo_Url: P_F,
    Profile_Photo_Name: null,
    Reset_Pass_Token: null,
    Reset_Pass_Expire: null,
    Email_Verify_Code: 123456,
  },
  {
    First_Names: "Elvis Wilfredo",
    Last_Names: "Romero Juárez",
    Email: "elvisr@gmail.com",
    Password: await bcrypt.hash("medikids", 12),
    DUI: "12345678-8",
    Birthdate: "1992-06-23",
    Age: 32,
    Phone: "6321-6571",
    Profile_Photo_Url: P_F,
    Profile_Photo_Name: null,
    Reset_Pass_Token: null,
    Reset_Pass_Expire: null,
    Email_Verify_Code: 123456,
  },
  {
    First_Names: "Jaime Gael",
    Last_Names: "Sánchez Mónico",
    Email: "jaimes@gmail.com",
    Password: await bcrypt.hash("medikids", 12),
    DUI: "12345678-7",
    Birthdate: "2000-01-01",
    Age: 23,
    Phone: "55555555",
    Profile_Photo_Url: P_F,
    Profile_Photo_Name: null,
    Reset_Pass_Token: null,
    Reset_Pass_Expire: null,
    Email_Verify_Code: 123456,
  },
  {
    First_Names: "Óscar Mateo",
    Last_Names: "Elías López",
    Email: "oscare@gmail.com",
    Password: await bcrypt.hash("medikids", 12),
    DUI: "12345678-6",
    Birthdate: "1990-01-02",
    Age: 33,
    Phone: "44444444",
    Profile_Photo_Url: P_F,
    Profile_Photo_Name: null,
    Reset_Pass_Token: null,
    Reset_Pass_Expire: null,
    Email_Verify_Code: 123456,
  },
  {
    First_Names: "Kevin Edenilson",
    Last_Names: "Menéndez Zepeda",
    Email: "kevinm@gmail.com",
    Password: await bcrypt.hash("medikids", 12),
    DUI: "12345678-5",
    Birthdate: "1980-05-04",
    Age: 43,
    Phone: "33333333",
    Profile_Photo_Url: P_F,
    Profile_Photo_Name: null,
    Reset_Pass_Token: null,
    Reset_Pass_Expire: null,
    Email_Verify_Code: 123456,
  },
];

const patients = [
  {
    First_Names: "Eleazar Hazael",
    Last_Names: "Amaya Sánchez",
    Birthdate: "2010-04-16",
    Age: 13,
    Gender: true,
    Blood_Type: "A+",
    Weight: "67.2",
    Height: "1.75",
    Responsible_id: 1,
    Patient_Code: patientCode(),
    Medical_History_Code: null,
    Profile_Photo_Url: P_F,
    Profile_Photo_Name: null,
  },
  {
    First_Names: "Carlos Marcelo",
    Last_Names: "Cruz Menjívar",
    Birthdate: "2006-08-21",
    Age: 16,
    Gender: true,
    Blood_Type: "O-",
    Weight: "50.2",
    Height: "1.78",
    Responsible_id: 1,
    Patient_Code: patientCode(),
    Medical_History_Code: null,
    Profile_Photo_Url: P_F,
    Profile_Photo_Name: null,
  },
  {
    First_Names: "Martín Eduardo",
    Last_Names: "Carbajal Torres",
    Birthdate: "2016-01-15",
    Age: 7,
    Gender: true,
    Blood_Type: "A-",
    Weight: "45.2",
    Height: "1.45",
    Responsible_id: 1,
    Patient_Code: patientCode(),
    Medical_History_Code: null,
    Profile_Photo_Url: P_F,
    Profile_Photo_Name: null,
  },
  {
    First_Names: "Óscar Emmanuel",
    Last_Names: "Arce Pineda",
    Birthdate: "2012-06-12",
    Age: 11,
    Gender: false,
    Blood_Type: "O+",
    Weight: "45.9",
    Height: "1.65",
    Responsible_id: 2,
    Patient_Code: patientCode(),
    Medical_History_Code: null,
    Profile_Photo_Url: P_F,
    Profile_Photo_Name: null,
  },
  {
    First_Names: "Víctor Rafael",
    Last_Names: "Cornejo García",
    Birthdate: "2009-11-12",
    Age: 14,
    Gender: true,
    Blood_Type: "A+",
    Weight: "89.2",
    Height: "1.79",
    Responsible_id: 2,
    Patient_Code: patientCode(),
    Medical_History_Code: null,
    Profile_Photo_Url: P_F,
    Profile_Photo_Name: null,
  },
  {
    First_Names: "Lucy Fabiola",
    Last_Names: "Guerra Carranza",
    Birthdate: "2005-11-26",
    Age: 17,
    Gender: false,
    Blood_Type: "A-",
    Weight: "64.2",
    Height: "1.76",
    Responsible_id: 2,
    Patient_Code: patientCode(),
    Medical_History_Code: null,
    Profile_Photo_Url: P_F,
    Profile_Photo_Name: null,
  },
  {
    First_Names: "Samuel Fernando",
    Last_Names: "Mendoza Mejía",
    Birthdate: "2011-05-26",
    Age: 12,
    Gender: true,
    Blood_Type: "B+",
    Weight: "67.4",
    Height: "1.65",
    Responsible_id: 3,
    Patient_Code: patientCode(),
    Medical_History_Code: null,
    Profile_Photo_Url: P_F,
    Profile_Photo_Name: null,
  },
  {
    First_Names: "Joshue Enrique",
    Last_Names: "Tejada Navarro",
    Birthdate: "2015-03-02",
    Age: 8,
    Gender: true,
    Blood_Type: "B-",
    Weight: "64.2",
    Height: "1.43",
    Responsible_id: 3,
    Patient_Code: patientCode(),
    Medical_History_Code: null,
    Profile_Photo_Url: P_F,
    Profile_Photo_Name: null,
  },
  {
    First_Names: "Karen Lourdes",
    Last_Names: "Mancía Lara",
    Birthdate: "2007-12-11",
    Age: 15,
    Gender: false,
    Blood_Type: "AB-",
    Weight: "70.2",
    Height: "1.71",
    Responsible_id: 4,
    Patient_Code: patientCode(),
    Medical_History_Code: null,
    Profile_Photo_Url: P_F,
    Profile_Photo_Name: null,
  },
  {
    First_Names: "Daniela Alejandra",
    Last_Names: "Vásquez Guerra",
    Birthdate: "2020-09-16",
    Age: 2,
    Gender: false,
    Blood_Type: "B+",
    Weight: "15.2",
    Height: "1.10",
    Responsible_id: 4,
    Patient_Code: patientCode(),
    Medical_History_Code: null,
    Profile_Photo_Url: P_F,
    Profile_Photo_Name: null,
  },
  {
    First_Names: "Alex Fernando",
    Last_Names: "Carrillo Alarcón",
    Birthdate: "2010-11-23",
    Age: 12,
    Gender: true,
    Blood_Type: "A+",
    Weight: "57.2",
    Height: "1.67",
    Responsible_id: 5,
    Patient_Code: patientCode(),
    Medical_History_Code: null,
    Profile_Photo_Url: P_F,
    Profile_Photo_Name: null,
  },
];

// Specialties id's:
// 1 - Otorrinonaringolgia
// 2 - Neumologia
// 3 - Gastroenterologia

const doctors = [
  {
    First_Names: "Esteban Enrique",
    Last_Names: "Gúzman Flores",
    User: "doc001",
    Email: "esteban@medikids.com",
    Password: await bcrypt.hash("12345", 12),
    // Profile_Photo: await getDownloadURL(storageRef),
    Profile_Photo: P_F,
    Speciality_id: 1,
  },
  {
    First_Names: "Adrian Ernesto",
    Last_Names: "Flores Romero",
    User: "doc002",
    Email: "adrian@medikids.com",
    Password: await bcrypt.hash("12345", 12),
    Profile_Photo: P_F,
    Speciality_id: 2,
  },
  {
    First_Names: "Fatima Lucia",
    Last_Names: "Garza Méndez",
    User: "doc003",
    Email: "fatima@medikids.com",
    Password: await bcrypt.hash("12345", 12),
    Profile_Photo: P_F,
    Speciality_id: 3,
  },
];

const assigned_patients = [
  {
    Doctor_id: 1,
    Patient_id: 1,
  },
  {
    Doctor_id: 1,
    Patient_id: 2,
  },
  {
    Doctor_id: 1,
    Patient_id: 3,
  },
  {
    Doctor_id: 1,
    Patient_id: 10,
  },
  {
    Doctor_id: 2,
    Patient_id: 4,
  },
  {
    Doctor_id: 2,
    Patient_id: 5,
  },
  {
    Doctor_id: 2,
    Patient_id: 6,
  },
  {
    Doctor_id: 2,
    Patient_id: 11,
  },
  {
    Doctor_id: 3,
    Patient_id: 7,
  },
  {
    Doctor_id: 3,
    Patient_id: 8,
  },
  {
    Doctor_id: 3,
    Patient_id: 9,
  },
];

const appointments = [
  {
    Doctor_id: 1,
    Responsible_id: 1,
    Patient_id: 1,
    State: 2,
    Week: "Segunda semana de agosto",
    Description: "Chequeo mensual",
    Date: "2023-09-23",
    Hour: "13:00:00",
  },
  {
    Doctor_id: 1,
    Responsible_id: 1,
    Patient_id: 2,
    State: 2,
    Week: "Segunda semana de agosto",
    Description: "Chequeo mensual",
    Date: "2023-08-26",
    Hour: "15:00:00",
  },
  {
    Doctor_id: 2,
    Responsible_id: 2,
    Patient_id: 4,
    State: 2,
    Week: "Segunda semana de agosto",
    Description: "Chequeo mensual",
    Date: "2023-08-01",
    Hour: "08:00:00",
  },
  {
    Doctor_id: 2,
    Responsible_id: 2,
    Patient_id: 5,
    State: 2,
    Week: "Segunda semana de agosto",
    Description: "Chequeo mensual",
    Date: "2023-10-23",
    Hour: "09:00:00",
  },
  {
    Doctor_id: 2,
    Responsible_id: 2,
    Patient_id: 6,
    State: 2,
    Week: "Segunda semana de agosto",
    Description: "Chequeo mensual",
    Date: "2023-08-16",
    Hour: "10:00:00",
  },
  {
    Doctor_id: 3,
    Responsible_id: 3,
    Patient_id: 8,
    State: 2,
    Week: "Segunda semana de agosto",
    Description: "Chequeo mensual",
    Date: "2013-11-11",
    Hour: "15:00:00",
  },
  {
    Doctor_id: 3,
    Responsible_id: 4,
    Patient_id: 9,
    State: 2,
    Week: "Segunda semana de agosto",
    Description: "Chequeo mensual",
    Date: "2023-10-11",
    Hour: "12:00:00",
  },
];

db.connect(() => {
  db.query(`USE ${config_env.DATABASE}`);

  console.log(`[DB] Connection successfully established, starting data insertion process...`);
  try {

    // // CREATING RESPONSIBLES
    // console.log(`[DB] - Inserting into "responsible" -`);
    // for (let i = 0; i < responsibles.length; i++) {
    //   db.query(`INSERT INTO responsible SET ? `, {
    //     First_Names: responsibles[i].First_Names,
    //     Last_Names: responsibles[i].Last_Names,
    //     Email: responsibles[i].Email,
    //     Password: responsibles[i].Password,
    //     DUI: responsibles[i].DUI,
    //     Birthdate: responsibles[i].Birthdate,
    //     Age: responsibles[i].Age,
    //     Phone: responsibles[i].Phone,
    //     Profile_Photo_Url: responsibles[i].Profile_Photo_Url,
    //     Profile_Photo_Name: responsibles[i].Profile_Photo_Name,
    //     Reset_Pass_Token: responsibles[i].Reset_Pass_Token,
    //     Reset_Pass_Expire: responsibles[i].Reset_Pass_Expire,
    //     Email_Verify_Code: responsibles[i].Email_Verify_Code,
    //   });
    //   console.log(
    //     `[DB] Patient ${responsibles[i].First_Names} ${responsibles[i].Last_Names} has been created...`
    //   );
    // }

    // // CREATING PATIENTS AND ASSINGNING THEM TO THEIR RESPONSIBLES
    // console.log(`[DB] - Inserting into "patient" -`);
    // for (let i = 0; i < patients.length; i++) {
    //   db.query(`INSERT INTO patient SET ? `, {
    //     First_Names: patients[i].First_Names,
    //     Last_Names: patients[i].Last_Names,
    //     Birthdate: patients[i].Birthdate,
    //     Age: patients[i].Age,
    //     Gender: patients[i].Gender,
    //     Blood_Type: patients[i].Blood_Type,
    //     Weight: patients[i].Weight,
    //     Height: patients[i].Height,
    //     Responsible_id: patients[i].Responsible_id,
    //     Patient_Code: patients[i].Patient_Code,
    //     Medical_History_Code: patients[i].Medical_History_Code,
    //     Profile_Photo_Url: patients[i].Profile_Photo_Url,
    //     Profile_Photo_Name: patients[i].Profile_Photo_Name,
    //   });
    //   console.log(
    //     `[DB] Patient ${patients[i].First_Names} ${patients[i].Last_Names} has been created...`
    //   );
    // }

    // CREATING DOCTORS
    console.log(`[DB] - Inserting into "doctors" -`);
    for (let i = 0; i < doctors.length; i++) {
      db.query(`INSERT INTO doctors SET ? `, {
        First_Names: doctors[i].First_Names,
        Last_Names: doctors[i].Last_Names,
        User: doctors[i].User,
        Email: doctors[i].Email,
        Password: doctors[i].Password,
        Profile_Photo: doctors[i].Profile_Photo,
        Speciality_id: doctors[i].Speciality_id,
      });
      console.log(
        `[DB] Doctor ${doctors[i].First_Names} ${doctors[i].Last_Names} has been created...`
      );
    }

    // // ASIGNNING PATIENTS TO DOCTOR
    // console.log(`[DB] - Inserting into "patients_monitoring" -`);
    // for (let i = 0; i < assigned_patients.length; i++) {
    //   db.query(`INSERT INTO patients_monitoring SET ? `, {
    //     Doctor_id: assigned_patients[i].Doctor_id,
    //     Patient_id: assigned_patients[i].Patient_id,
    //   });
    //   console.log(
    //     `[DB] Patient #${assigned_patients[i].Patient_id} has been assigned to doctor #${assigned_patients[i].Doctor_id}...`
    //   );
    // }

    // CREATING APPOINTMENTS
    // console.log(`[DB] - Inserting into "medical_appointment" -`);
    // for (let i = 0; i < appointments.length; i++) {
    //   db.query(`INSERT INTO medical_appointment SET ? `, {
    //     Doctor_id: appointments[i].Doctor_id,
    //     Responsible_id: appointments[i].Responsible_id,
    //     Patient_id: appointments[i].Patient_id,
    //     State: appointments[i].State,
    //     Week: appointments[i].Week,
    //     Description: appointments[i].Description,
    //     Date: appointments[i].Date,
    //     Hour: appointments[i].Hour,
    //   });
    //   console.log(`[DB] Appointment #${i + 1} has been created...`);

    // }
    console.log(`[DB] ALL DATA HAS BEEN INSERTED INTO THEIR RESPECTIVE TABLES!`)
    db.end();
  } catch (error) {
    console.log(error);
    db.end();
  }
});
