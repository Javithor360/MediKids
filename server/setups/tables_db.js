import mysql from "mysql2";

import { config_env } from "../utils/dotenv_conf.js";

const db = mysql.createConnection({
  host: config_env.HOST,
  user: config_env.USER,
  password: config_env.PASS,
});

console.log("[DB] Creating connection to start creating tables...");
db.connect(() => {
  db.query(`USE ${config_env.DATABASE}`);

  console.log("[DB] Connection established, starting tables process...");
  try {
    // RESPONSIBLE TABLE
    db.query(`
      CREATE TABLE IF NOT EXISTS ${config_env.DATABASE} . responsible (
          id INT NOT NULL AUTO_INCREMENT,
          First_Names VARCHAR(45) NOT NULL,
          Last_Names VARCHAR(45) NOT NULL,
          Email VARCHAR(100) NOT NULL,
          Password VARCHAR(100) NOT NULL,
          DUI VARCHAR(45) NOT NULL,
          Birthdate DATE NOT NULL,
          Age INT NOT NULL,
          Phone VARCHAR(45) NOT NULL,
          Profile_Photo_Url VARCHAR(200) NOT NULL,
          Profile_Photo_Name VARCHAR(200),
          Reset_Pass_Token VARCHAR(200),
          Reset_Pass_Expire DATETIME,
          Email_Verify_code VARCHAR(45),
          PRIMARY KEY (id),
          UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE
      );
      `);
    console.log(
      `[DB] ${config_env.DATABASE}'s "Responsible" table successfully created...`
    );
  
    // PATIENT TABLE
    db.query(`
      CREATE TABLE IF NOT EXISTS ${config_env.DATABASE} . patient (
          id INT NOT NULL AUTO_INCREMENT,
          First_Names VARCHAR(45) NOT NULL,
          Last_Names VARCHAR(45) NOT NULL,
          Birthdate DATE NOT NULL,
          Age INT NOT NULL,
          Gender BOOLEAN NOT NULL,
          Blood_Type VARCHAR(45) NOT NULL,
          Weight FLOAT NOT NULL,
          Height FLOAT NOT NULL,
          Responsible_id INT NOT NULL,
          Patient_Code VARCHAR(45) NOT NULL,
          Medical_History_Code VARCHAR(45),
          Profile_Photo_Url VARCHAR(200) NOT NULL,
          Profile_Photo_Name VARCHAR(200),
          PRIMARY KEY (id),
          UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
          FOREIGN KEY(Responsible_id) REFERENCES medikids_db . responsible(id)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION
      );
    `);
    console.log(
      `[DB] ${config_env.DATABASE}'s "Patient" table successfully created...`
    );

    // MEDICAL HISTORY TABLE
    db.query(`
      CREATE TABLE IF NOT EXISTS ${config_env.DATABASE} . medical_records (
          id INT NOT NULL AUTO_INCREMENT,
          Patient_id INT NOT NULL,
          Doctor_id INT NOT NULL,
          Medical_Appointment_id INT NOT NULL,
          Medical_History_Code VARCHAR(45) NOT NULL,
          Date_Time DATETIME NOT NULL,
          Diagnosis LONGTEXT NOT NULL,
          Diagnosis_Mobile TEXT NOT NULL,
          Weight FLOAT NOT NULL,
          Height FLOAT NOT NULL,
          Temperature FLOAT NOT NULL,
          Prescriptions_Names VARCHAR(150),
          PRIMARY KEY (id),
          UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
          FOREIGN KEY(Patient_id) REFERENCES medikids_db . patient(id)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION
      );
    `);
    console.log(
      `[DB] ${config_env.DATABASE}'s "Medical_History" table successfully created...`
    );
  
    // MEDICAL PRESCRIPTION TABLE
    db.query(`
      CREATE TABLE IF NOT EXISTS medikids_db . medical_prescription (
        id INT NOT NULL AUTO_INCREMENT,
        Medical_Prescription_Code VARCHAR(45) NOT NULL,
        Patient_id INT NOT NULL,
        Doctor_id INT NOT NULL,
        Medicine_Name VARCHAR(100) NOT NULL,
        Instructions MEDIUMTEXT NOT NULL,
        Description MEDIUMTEXT NOT NULL,
        Created_Date DATETIME NOT NULL,
        Starting_Dose_Date DATE NOT NULL,
        Finishing_Dose_Date DATE NOT NULL,
        Dose VARCHAR(45) NOT NULL,
        Time_Dose INT NOT NULL,
        PRIMARY KEY (id),
        UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
        FOREIGN KEY(Patient_id) REFERENCES medikids_db . patient(id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
      );
    `);
    console.log(
      `[DB] ${config_env.DATABASE}'s "Medical_Prescription" table successfully created...`
    );
  
    // DOCTORS TABLE
    db.query(`
      CREATE TABLE IF NOT EXISTS ${config_env.DATABASE} . doctors (
          id INT NOT NULL AUTO_INCREMENT,
          First_Names VARCHAR(45) NOT NULL,
          Last_Names VARCHAR(45) NOT NULL,
          User VARCHAR(45) NOT NULL,
          Email VARCHAR(100) NOT NULL,
          Password VARCHAR(100) NOT NULL,
          Profile_Photo VARCHAR(200) NOT NULL,
          Speciality_id INT NOT NULL,
          PRIMARY KEY (id),
          UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE
      );
    `);
    console.log(
      `[DB] ${config_env.DATABASE}'s "Doctors" table successfully created...`
    );
  
    // NOTICES TABLE
    db.query(`
      CREATE TABLE IF NOT EXISTS ${config_env.DATABASE} . notices (
          id INT NOT NULL AUTO_INCREMENT,
          Description LONGTEXT NOT NULL,
          Date_Time DATETIME NOT NULL,
          Doctor_id INT NOT NULL,
          PRIMARY KEY (id),
          UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
          FOREIGN KEY(Doctor_id) REFERENCES medikids_db . doctors(id)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION
      );
    `);
    console.log(
      `[DB] ${config_env.DATABASE}'s "Notices" table successfully created...`
    );
  
    // MEDICAL APPOINTMENT TABLE
    db.query(`
      CREATE TABLE IF NOT EXISTS ${config_env.DATABASE} . medical_appointment (
          id INT NOT NULL AUTO_INCREMENT,
          Doctor_id INT NOT NULL,
          Responsible_id INT NOT NULL,
          Patient_id INT NOT NULL,
          State INT NOT NULL,
          Week VARCHAR(100),
          Description VARCHAR(150),
          Date DATE,
          Hour TIME,
          PRIMARY KEY (id),
          UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE
      );
    `);
    console.log(
      `[DB] ${config_env.DATABASE}'s "Medical_Appointment" table successfully created...`
    );
  
    // PATIENTS MONITORING TABLE
    db.query(`
      CREATE TABLE IF NOT EXISTS ${config_env.DATABASE} . patients_monitoring (
          id INT NOT NULL AUTO_INCREMENT,
          Doctor_id INT NOT NULL,
          Patient_id INT NOT NULL,
          PRIMARY KEY (id),
          UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
          FOREIGN KEY(Doctor_id) REFERENCES medikids_db . doctors(id)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION,
          FOREIGN KEY(Patient_id) REFERENCES medikids_db . patient(id)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION
      );
    `);
    console.log(
      `[DB] ${config_env.DATABASE}'s "patients_monitoring" table successfully created...`
    );
  
    // PATIENT VACCTINES TABLE
    db.query(`
      CREATE TABLE IF NOT EXISTS ${config_env.DATABASE} . patient_vaccines (
          id INT NOT NULL AUTO_INCREMENT,
          Vaccine_Hepatitis_A BOOLEAN NOT NULL,
          Vaccine_BGC BOOLEAN NOT NULL,
          Vaccine_Poliomielitis BOOLEAN NOT NULL,
          Vaccine_Pentavalente BOOLEAN NOT NULL,
          Vaccine_Rotavirus BOOLEAN NOT NULL,
          Vaccine_Neumococo BOOLEAN NOT NULL,
          Vaccine_DPT BOOLEAN NOT NULL,
          Vaccine_Polio_Oral BOOLEAN NOT NULL,
          Vaccine_Antitetanica BOOLEAN NOT NULL,
          Vaccine_Triple_Viral_SPR BOOLEAN NOT NULL,
          Patient_id INT NOT NULL,
          PRIMARY KEY (id),
          UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
          FOREIGN KEY(Patient_id) REFERENCES medikids_db . Patient(id)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION
      );
    `);
    console.log(
      `[DB] ${config_env.DATABASE}'s "patient_vaccines" table successfully created...`
    );

    // PATIENT VACCTINES TABLE
    db.query(`
      CREATE TABLE IF NOT EXISTS ${config_env.DATABASE} . documents_dui (
        id INT NOT NULL AUTO_INCREMENT,
        DUI VARCHAR(50) NOT NULL,
        PRIMARY KEY (id),
        UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE
      );
    `);
    console.log(
      `[DB] ${config_env.DATABASE}'s "documents_dui" table successfully created...`
    );

    // PATIENT NOTIFICATIONS TABLE
    db.query(`
      CREATE TABLE IF NOT EXISTS medikids_db . notifications (
          id INT NOT NULL AUTO_INCREMENT,
          Patient_id INT NOT NULL,
          Title VARCHAR(100) NOT NULL,
          DateTime DATETIME NOT NULL,
          Type INT NOT NULL,
          Description VARCHAR(255) NOT NULL,
          PRIMARY KEY (id),
          UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
          FOREIGN KEY(Patient_id) REFERENCES medikids_db . patient(id)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION
    )
    `)
  
    console.log(`[DB] TABLES COMMAND FINISHED, ALL TABLES HAVE BEEN CREATED!`);
    db.end();
  } catch (error) {
    console.log(error);
    db.end();
  }
});