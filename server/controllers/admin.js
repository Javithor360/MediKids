import bcrypt from "bcryptjs";
import { pool } from "../utils/db.js";
import { create_code, send_verify_web_page } from "../utils/functions.js";

// ! @route POST api/admin/new_doctor
// ! @desc Simple doctor account register
// ! @access public (temporaly)

const create_doctor = async (req, res, next) => {
  try {
    // Getting requested data
    const { First_Names, Last_Names, User, Email, Password, Speciality_id } =
      req.body;

    // Checking possible empty values
    if (
      !First_Names ||
      !Last_Names ||
      !User ||
      !Email ||
      !Password ||
      !Speciality_id
    ) {
      return res
        .status(500)
        .json({ message: "You must provide every field with a value" });
    }

    // Checking if there's no other doctor with same email or user
    const [query_check] = await pool.query(
      "SELECT * FROM doctors WHERE Email = ? OR User = ?",
      [Email, User]
    );

    if (query_check.length != 0) {
      return res.status(500).json({
        success: false,
        message: "Some of the values provided are already in use",
      });
    }

    // Extra validation related to valid values

    // Password (extracted from auth.js)
    // if (!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(Password)) {
    //   return res
    //     .status(500)
    //     .json({ success: false, message: "Contrasña invalido" });
    // }

    // Email
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        Email
      )
    ) {
      return res
        .status(500)
        .json({ success: false, message: "Email invalido" });
    }

    // Defining default pfp
    const Profile_Photo = "NULL";

    // Specialty
    if (!/^[123]$/.test(Speciality_id)) {
      return res
        .status(500)
        .json({ success: false, message: "Invalid specialty id" });
    }

    // Hash Password
    const HashedPw = await bcrypt.hash(Password, 12);

    // Once everything seems to be OK, save the fields
    await pool.query("INSERT INTO doctors SET ?", {
      First_Names,
      Last_Names,
      User,
      Email,
      Password: HashedPw,
      Profile_Photo,
      Speciality_id,
    });

    return res
      .status(200)
      .json({ success: true, message: "New doctor has been created" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// ! @route POST api/admin/new_patient
// ! @desc Complex patient register
// ! @access public (temporaly)

const create_patient = async (req, res, next) => {
  try {
    // Getting requested data
    const {
      First_Names,
      Last_Names,
      Birthdate,
      Gender,
      Blood_Type,
      Weight,
      Height,
      Responsible_id,
    } = req.body;

    // Checking possible empty values
    if (
      !First_Names ||
      !Last_Names ||
      !Birthdate ||
      !Gender ||
      !Blood_Type ||
      !Weight ||
      !Height ||
      !Responsible_id
    ) {
      return res
        .status(500)
        .json({ message: "You must provide every field with a value" });
    }

    // Checking if there's no other patient with the same data
    // const [query_check] = await pool.query(
    //   "SELECT * FROM patients WHERE Email = ? OR User = ?",
    //   [Email, User]
    // );
    // if (query_check.length != 0) {
    //   return res.status(500).json({
    //     success: false,
    //     message: "Some of the values provided are already in use",
    //   });
    // }

    // Extra validation related to valid values

    // Age
    const BD = new Date(Birthdate);
    const ActualDate = new Date();
    if (ActualDate.getFullYear() - 18 > BD.getFullYear()) {
      return res
        .status(500)
        .json({ success: false, message: "Age isn't valid" });
    }
    const Age = ActualDate.getFullYear() - BD.getFullYear();

    // Gender
    const genders = ["Male", "Female"];
    // if (!genders.includes(Gender)) {
    //   return res.status(500).json({
    //     success: false,
    //     message: "Provided gender is not a valid gender.",
    //   });
    // }

    // Blood type
    const blood_types = ["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"];
    if (!blood_types.includes(Blood_Type)) {
      return res
        .status(500)
        .json({ success: false, message: "Blood type isn't valid" });
    }

    // WEIGHT MUST BE IN KILOGRAMS
    // HEIGHT MUST BE IN METERS

    const Profile_Photo_Url = "NULL";
    const Patient_Code = create_code();
    const Medical_History_Code = "NULL";

    await pool.query("INSERT INTO patient SET ?", {
      First_Names,
      Last_Names,
      Birthdate,
      Age,
      Gender,
      Blood_Type,
      Weight,
      Height,
      Responsible_id,
      Profile_Photo_Url,
      Patient_Code,
      Medical_History_Code,
    });

    return res
      .status(200)
      .json({ success: true, message: "New patient has been created" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// ! @route POST api/admin/assign_patient
// ! @desc Get all patients active from a doctor
// ! @access public (temporaly)

const doctor_assign_patient = async (req, res, next) => {
  try {
    // Getting requested data
    const { Doctor_id, Patient_id } = req.body;

    // Checking possible empty values
    if (!Doctor_id || !Patient_id) {
      return res
        .status(500)
        .json({ message: "You must provide every field with a value" });
    }

    // Checking if the patient it's not already assigned to the same doctor
    const [query_check] = await pool.query(
      "SELECT * FROM active_patients WHERE Doctor_id = ? AND Patient_id = ?",
      [Doctor_id, Patient_id]
    );

    if (query_check.length != 0) {
      return res.status(500).json({
        success: false,
        message: "This patient is already assigned to this doctor",
      });
    }

    await pool.query("INSERT INTO active_patients SET ?", {
      Doctor_id,
      Patient_id,
    });

    return res.status(200).json({
      success: true,
      message: `Patient #${Patient_id} in the system was assigned to Doctor's ID ${Doctor_id}`,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// ! @route POST api/admin/create_appointment
// ! @desc Create a new appointment
// ! @access public (temporaly)

const create_appointment = async (req, res, next) => {
  try {
    const { Doctor_id, Responsible_id, Patient_id, Description, Date, Hour } =
      req.body;

    // checking the data
    if (
      !Doctor_id ||
      !Responsible_id ||
      !Patient_id ||
      !Description ||
      !Date ||
      !Hour
    ) {
      return res
        .status(500)
        .json({ message: "You must provide every field with a value" });
    }

    // Checking if appointment already exists
    const [query_check] = await pool.query(
      "SELECT * FROM medical_appointment WHERE Doctor_id = ? AND Responsible_id = ? AND Patient_id = ? AND Date = ? AND Hour = ?",
      [Doctor_id, Responsible_id, Patient_id, Date, Hour]
    );

    if (query_check.length != 0) {
      return res
        .status(500)
        .json({ success: false, message: "This date is already programmed" });
    }

    await pool.query("INSERT INTO medical_appointment SET ?", {
      Doctor_id,
      Responsible_id,
      Patient_id,
      Description,
      Date,
      Hour,
    });

    return res.status(200).json({
      success: true,
      message: `Appointment for Doctor with ID #${Doctor_id} has been created`,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// ! @route POST api/admin/send_web_email
// ! @desc SEND THE EMAIL IN THE WEB.
// ! @access public

const send_web_email = async (req, res, next) => {
  try {
    const {Email, Message} = req.body;

    send_verify_web_page(Message, Email, res);

    return res.status(200).json({success: true});
  } catch (error) {
    return res.status(500).json({error})
  }
}


export { create_doctor, create_patient, doctor_assign_patient, create_appointment, send_web_email };
