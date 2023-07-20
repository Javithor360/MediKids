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
      CREATE TABLE IF NOT EXISTS ${config_env.DATABASE} . Responsible (
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
      CREATE TABLE IF NOT EXISTS ${config_env.DATABASE} . Patient (
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
          FOREIGN KEY(Responsible_id) REFERENCES ${config_env.DATABASE} . Responsible(id)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION
      );
    `);
    console.log(
      `[DB] ${config_env.DATABASE}'s "Patient" table successfully created...`
    );
  
    // CALENDAR TABLE
    db.query(`
      CREATE TABLE IF NOT EXISTS ${config_env.DATABASE} . Calendar (
          id INT NOT NULL AUTO_INCREMENT,
          Event_Name VARCHAR(45) NOT NULL,
          Event_Date DATE NOT NULL,
          Start_Time TIME NOT NULL,
          End_Time TIME NOT NULL,
          Description VARCHAR(150) NOT NULL,
          Responsible_id INT NOT NULL,
          PRIMARY KEY (id),
          UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
          FOREIGN KEY(Responsible_id) REFERENCES ${config_env.DATABASE} . Responsible(id)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION
      );
    `);
    console.log(
      `[DB] ${config_env.DATABASE}'s "Calendar" table successfully created...`
    );
  
    // MEDICAL HISTORY TABLE
    db.query(`
      CREATE TABLE IF NOT EXISTS ${config_env.DATABASE} . Medical_History (
          id INT NOT NULL AUTO_INCREMENT,
          Medical_History_Code VARCHAR(45) NOT NULL,
          Date_Time DATETIME NOT NULL,
          Diagnosis LONGTEXT NOT NULL,
          Weight FLOAT NOT NULL,
          Height FLOAT NOT NULL,
          Temperature  FLOAT NOT NULL,
          Patient_id INT NOT NULL,
          PRIMARY KEY (id),
          UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
          FOREIGN KEY(Patient_id) REFERENCES ${config_env.DATABASE} . Patient(id)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION
      );
    `);
    console.log(
      `[DB] ${config_env.DATABASE}'s "Medical_History" table successfully created...`
    );
  
    // MEDICAL PRESCRIPTION TABLE
    db.query(`
      CREATE TABLE IF NOT EXISTS ${config_env.DATABASE} . Medical_Prescription (
          id INT NOT NULL AUTO_INCREMENT,
          Medical_Prescription_Code VARCHAR(45) NOT NULL,
          Date_Time DATETIME NOT NULL,
          Description MEDIUMTEXT NOT NULL,
          Patient_id INT NOT NULL,
          PRIMARY KEY (id),
          UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
          FOREIGN KEY(Patient_id) REFERENCES ${config_env.DATABASE} . Patient(id)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION
      );
    `);
    console.log(
      `[DB] ${config_env.DATABASE}'s "Medical_Prescription" table successfully created...`
    );
  
    // MEDICAL RECIPE TABLE
    db.query(`
      CREATE TABLE IF NOT EXISTS ${config_env.DATABASE} . Medical_Recipe (
          id INT NOT NULL AUTO_INCREMENT,
          Name VARCHAR(45) NOT NULL,
          Starting_Date DATE NOT NULL,
          Finishing_Date DATE NOT NULL,
          Dose VARCHAR(45) NOT NULL,
          Time_Dose INT NOT NULL,
          Medical_Prescription_id INT NOT NULL,
          PRIMARY KEY (id),
          UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
          FOREIGN KEY(Medical_Prescription_id) REFERENCES ${config_env.DATABASE} . Medical_Prescription(id)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION
      );
    `);
    console.log(
      `[DB] ${config_env.DATABASE}'s "Medical_Recipe" table successfully created...`
    );
  
    // SPECIALTIES TABLE
    db.query(`
      CREATE TABLE IF NOT EXISTS ${config_env.DATABASE} . Specialties (
          id INT NOT NULL AUTO_INCREMENT,
          Name VARCHAR(45) NOT NULL,
          PRIMARY KEY (id),
          UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE
      );
    `);
    console.log(
      `[DB] ${config_env.DATABASE}'s "Specialties" table successfully created...`
    );
  
    // DOCTORS TABLE
    db.query(`
      CREATE TABLE IF NOT EXISTS ${config_env.DATABASE} . Doctors (
          id INT NOT NULL AUTO_INCREMENT,
          First_Names VARCHAR(45) NOT NULL,
          Last_Names VARCHAR(45) NOT NULL,
          User VARCHAR(45) NOT NULL,
          Email VARCHAR(100) NOT NULL,
          Password VARCHAR(100) NOT NULL,
          Profile_Photo VARCHAR(200) NOT NULL,
          Speciality_id INT NOT NULL,
          PRIMARY KEY (id),
          UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
          FOREIGN KEY(Speciality_id) REFERENCES ${config_env.DATABASE} . Specialties(id)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION
      );
    `);
    console.log(
      `[DB] ${config_env.DATABASE}'s "Doctors" table successfully created...`
    );
  
    // NOTICES TABLE
    db.query(`
      CREATE TABLE IF NOT EXISTS ${config_env.DATABASE} . Notices (
          id INT NOT NULL AUTO_INCREMENT,
          Description  LONGTEXT NOT NULL,
          Date_Time DATETIME NOT NULL,
          Doctor_id INT NOT NULL, 
          PRIMARY KEY (id),
          UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
          FOREIGN KEY(Doctor_id) REFERENCES ${config_env.DATABASE} . Doctors(id)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION
      );
    `);
    console.log(
      `[DB] ${config_env.DATABASE}'s "Notices" table successfully created...`
    );
  
    // MEDICAL APPOINTMENT TABLE
    db.query(`
      CREATE TABLE IF NOT EXISTS ${config_env.DATABASE} . Medical_Appointment (
          id INT NOT NULL AUTO_INCREMENT,
          Doctor_id INT NOT NULL,
          Responsible_id INT NOT NULL,
          Patient_id INT NOT NULL,
          Description VARCHAR(150) NOT NULL,
          Date DATE NOT NULL,
          Hour TIME NOT NULL,
          PRIMARY KEY (id),
          UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE
      );
    `);
    console.log(
      `[DB] ${config_env.DATABASE}'s "Medical_Appointment" table successfully created...`
    );
  
    // RESPONSIBLE APPOINTMENT DETAIL TABLE
    db.query(`
      CREATE TABLE IF NOT EXISTS ${config_env.DATABASE} . Responsible_Appointment_Detail (
          id INT NOT NULL AUTO_INCREMENT,
          Responsible_id INT NOT NULL,
          Appointment_id INT NOT NULL,
          PRIMARY KEY (id),
          UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
          FOREIGN KEY(Responsible_id) REFERENCES ${config_env.DATABASE} . Responsible(id)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION,
          FOREIGN KEY(Appointment_id) REFERENCES ${config_env.DATABASE} . Medical_Appointment(id)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION
      );
    `);
    console.log(
      `[DB] ${config_env.DATABASE}'s "Responsible_Appointment_Detail" table successfully created...`
    );
  
    // DOCTOR APPOINTMENT DETAIL TABLE
    db.query(`
      CREATE TABLE IF NOT EXISTS ${config_env.DATABASE} . Doctor_Appointment_Detail (
          id INT NOT NULL AUTO_INCREMENT,
          Doctor_id INT NOT NULL,
          Appointment_id INT NOT NULL,
          PRIMARY KEY (id),
          UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
          FOREIGN KEY(Doctor_id) REFERENCES ${config_env.DATABASE} . Doctors(id)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION,
          FOREIGN KEY(Appointment_id) REFERENCES ${config_env.DATABASE} . Medical_Appointment(id)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION
      );
    `);
    console.log(
      `[DB] ${config_env.DATABASE}'s "Doctor_Appointment_Detail" table successfully created...`
    );
  
    // PATIENTS MONITORING TABLE
    db.query(`
      CREATE TABLE IF NOT EXISTS ${config_env.DATABASE} . patients_monitoring (
          id INT NOT NULL AUTO_INCREMENT,
          Doctor_id INT NOT NULL,
          Patient_id INT NOT NULL,
          PRIMARY KEY (id),
          UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
          FOREIGN KEY(Doctor_id) REFERENCES ${config_env.DATABASE} . Doctors(id)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION,
          FOREIGN KEY(Patient_id) REFERENCES ${config_env.DATABASE} . Patient(id)
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
          FOREIGN KEY(Patient_id) REFERENCES ${config_env.DATABASE} . Patient(id)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION
      );
    `);
    console.log(
      `[DB] ${config_env.DATABASE}'s "patient_vaccines" table successfully created...`
    );
  
    console.log(`[DB] TABLES COMMAND FINISHED, ALL TABLES HAVE BEEN CREATED!`);
    db.end();
  } catch (error) {
    console.log(error);
    db.end();
  }
});