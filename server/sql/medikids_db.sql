CREATE SCHEMA IF NOT EXISTS medikids_db DEFAULT CHARACTER SET utf8 ;

USE medikids_db;

DROP DATABASE medikids_db;

CREATE TABLE IF NOT EXISTS medikids_db . Responsible (
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

CREATE TABLE IF NOT EXISTS medikids_db . Patient (
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
	FOREIGN KEY(Responsible_id) REFERENCES medikids_db . Responsible(id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS medikids_db . Calendar (
	id INT NOT NULL AUTO_INCREMENT,
	Event_Name VARCHAR(45) NOT NULL,
	Event_Date DATE NOT NULL,
	Start_Time TIME NOT NULL,
	End_Time TIME NOT NULL,
	Description VARCHAR(150) NOT NULL,
	Responsible_id INT NOT NULL,
	PRIMARY KEY (id),
	UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
	FOREIGN KEY(Responsible_id) REFERENCES medikids_db . Responsible(id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS medikids_db . Medical_History (
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
	FOREIGN KEY(Patient_id) REFERENCES medikids_db . Patient(id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS medikids_db . Medical_Prescription (
	id INT NOT NULL AUTO_INCREMENT,
	Medical_Prescription_Code VARCHAR(45) NOT NULL,
	Date_Time DATETIME NOT NULL,
	Description MEDIUMTEXT NOT NULL,
	Patient_id INT NOT NULL,
	PRIMARY KEY (id),
	UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
	FOREIGN KEY(Patient_id) REFERENCES medikids_db . Patient(id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);


CREATE TABLE IF NOT EXISTS medikids_db . Medical_Recipe (
	id INT NOT NULL AUTO_INCREMENT,
	Name VARCHAR(45) NOT NULL,
	Starting_Date DATE NOT NULL,
	Finishing_Date DATE NOT NULL,
	Dose VARCHAR(45) NOT NULL,
	Time_Dose INT NOT NULL,
	Medical_Prescription_id INT NOT NULL,
	PRIMARY KEY (id),
	UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
	FOREIGN KEY(Medical_Prescription_id) REFERENCES medikids_db . Medical_Prescription(id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS medikids_db . Specialties (
	id INT NOT NULL AUTO_INCREMENT,
	Name VARCHAR(45) NOT NULL,
	PRIMARY KEY (id),
	UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE
);

CREATE TABLE IF NOT EXISTS medikids_db . Doctors (
	id INT NOT NULL AUTO_INCREMENT,
	First_Names VARCHAR(45) NOT NULL,
	Last_Names VARCHAR(45) NOT NULL,
	User VARCHAR(45) NOT NULL,
	Email VARCHAR(100) NOT NULL,
	Password VARCHAR(100) NOT NULL,
	Profile_Photo VARCHAR(100) NOT NULL,
	Speciality_id INT NOT NULL,
	PRIMARY KEY (id),
	UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
	FOREIGN KEY(Speciality_id) REFERENCES medikids_db . Specialties(id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS medikids_db . Notices (
	id INT NOT NULL AUTO_INCREMENT,
	Description  LONGTEXT NOT NULL,
	Date_Time DATETIME NOT NULL,
	Doctor_id INT NOT NULL, 
	PRIMARY KEY (id),
	UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
	FOREIGN KEY(Doctor_id) REFERENCES medikids_db . Doctors(id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS medikids_db . Medical_Appointment (
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

CREATE TABLE IF NOT EXISTS medikids_db . Responsible_Appointment_Detail (
	id INT NOT NULL AUTO_INCREMENT,
	Responsible_id INT NOT NULL,
	Appointment_id INT NOT NULL,
	PRIMARY KEY (id),
	UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
	FOREIGN KEY(Responsible_id) REFERENCES medikids_db . Responsible(id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
	FOREIGN KEY(Appointment_id) REFERENCES medikids_db . Medical_Appointment(id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS medikids_db . Doctor_Appointment_Detail (
	id INT NOT NULL AUTO_INCREMENT,
	Doctor_id INT NOT NULL,
	Appointment_id INT NOT NULL,
	PRIMARY KEY (id),
	UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
	FOREIGN KEY(Doctor_id) REFERENCES medikids_db . Doctors(id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
	FOREIGN KEY(Appointment_id) REFERENCES medikids_db . Medical_Appointment(id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS medikids_db . patients_monitoring (
	id INT NOT NULL AUTO_INCREMENT,
	Doctor_id INT NOT NULL,
	Patient_id INT NOT NULL,
	PRIMARY KEY (id),
	UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
	FOREIGN KEY(Doctor_id) REFERENCES medikids_db . Doctors(id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
	FOREIGN KEY(Patient_id) REFERENCES medikids_db . Patient(id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS medikids_db . patient_vaccines (
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