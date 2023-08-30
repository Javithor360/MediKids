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
	Patient_id INT NOT NULL,
	Event_Name VARCHAR(45) NOT NULL,
	Starting_Event_Date DATETIME NOT NULL,
	End_Event_Date DATETIME,
	Start_Time TIME,
	End_Time TIME,
	Description VARCHAR(150) NOT NULL,
	-- Medicine values
	Dose_int INT,
	Dose_String VARCHAR(100),
	PRIMARY KEY (id),
	UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
	FOREIGN KEY(Patient_id) REFERENCES medikids_db . Patient(id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS medikids_db . Medical_Records (
	id INT NOT NULL AUTO_INCREMENT,
	Patient_id INT NOT NULL,
	Doctor_id INT NOT NULL,
	Medical_Appointment_id INT,
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
	FOREIGN KEY(Patient_id) REFERENCES medikids_db . Patient(id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS medikids_db . Medical_Prescription (
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
	FOREIGN KEY(Patient_id) REFERENCES medikids_db . Patient(id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS medikids_db . Doctors (
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

CREATE TABLE IF NOT EXISTS medikids_db . Notices (
	id INT NOT NULL AUTO_INCREMENT,
	Description LONGTEXT NOT NULL,
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
	State INT NOT NULL,
	Week VARCHAR(100),
	Description VARCHAR(150),
	Date DATE,
	Hour TIME,
	PRIMARY KEY (id),
	UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE
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

CREATE TABLE IF NOT EXISTS medikids_db . documents_dui (
	id INT NOT NULL AUTO_INCREMENT,
	DUI INT NOT NULL,
	First_Names VARCHAR(255) NOT NULL,
	Last_Names VARCHAR(255) NOT NULL,
	PRIMARY KEY (id),
	UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE
)