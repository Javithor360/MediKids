
//>> IMPORT MODULES
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

//>> IMPORT CONFIGS & FUNCTIONS
import {pool} from '../utils/db.js';
import { create_code, create_jwt, create_reset_code, patientCode, send_forgot_pass_email, send_verify_code_email } from '../utils/functions.js';
import firebaseConfig from '../utils/firebase.config.js';
import ErrorResponse from "../utils/error_message.js";

//? Startup Firebase configuration.
initializeApp(firebaseConfig.firebaseConfig);

//? Setup Firebase Storage.
const storage = getStorage();

//! @route POST api/auth/register
//! @desc Responsible Register.
//! @access public
const register = async (req, res, next) => {
  try {
    const {First_Names, Last_Names, Email, Password, ConfPass, DUI, Birthdate, Phone} = req.body;
    const BD = new Date(Birthdate);

    //1 - CHECKING EMPTY VALUES
    if (!First_Names || !Last_Names || !Email || !Password || !DUI || !Birthdate || !Phone) {
      return res.status(500).json({success: false, message: {es: 'Campos sin completar.', en : 'Missing fields.'}});
    }

    // VALIDATE STRING INPUTS.
    if (!/^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s]+$/.test(First_Names)){ return res.status(500).json({success: false, message: {es: 'Nombres no validos.', en: 'Invalid first names.'}}) }
    if (First_Names.length < 2 || First_Names.length > 50) { return res.status(500).json({success: false, message: {es: 'Nombres no validos.', en: 'Invalid first names.'}}) }
    if (!/^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s]+$/.test(Last_Names)){ return res.status(500).json({success: false, message: {es: 'Apellidos no validos.', en: 'Invalid last names.'}}) }
    if (Last_Names.length < 3 || Last_Names.length > 50) { return res.status(500).json({success: false, message: {es: 'Apellidos no validos.', en: 'Invalid last names.'}}) }
    
    //>>2 - VALIDATE THE DUI
    const [AllDuis] = await pool.query('SELECT * FROM documents_dui');
    console.log(AllDuis);
    let existDui = false;
    AllDuis.map((el) => { if (el.DUI == DUI) existDui = true; });
    if (!existDui) {
      return res.status(500).json({success: false, message: {es: 'DUI invalido.', en: 'Invalid DUI.'}});
    }

    //3 - CHECKING IF VALUES ALREADY EXIST
    const [query_check] = await pool.query('SELECT * FROM responsible WHERE DUI = ? OR Email = ?', [DUI, Email]);
    if (query_check.length != 0) {
      return res.status(500).json({success: false, message: {es: 'Responsable ya registrado.', en: 'Responsible already registered.'}});
    } 

    //\\ 4 - CHECK VALID VALUES
    // Number Phone
    if (!/^(?!.*(\d)(?:-?\1){3})([67]\d{3}-\d{4})$/.test(Phone)) {
      return res.status(500).json({success: false, message: {es: 'Número celular invalido.', en: 'Invalid phone number.'}});
    }
    // Email
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(Email)) {
      return res.status(500).json({success: false, message: {es: 'Email invalido', en: 'Invalid Email'}});
    }
    // CHECK THE PASSWORD WITH THE CONFIRMATION PASSWORD.
    if(Password != ConfPass){
      return res.status(500).json({success: false, message: {es: 'Las contraseñas no coinciden.', en: 'The passwords do not match.'}})
    }
    // Password
    if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(Password)){
      return res.status(500).json({success: false, message: {es: 'Contraseña invalida: debe de tener \nminimo 8 caracteres y uno especial.', en: 'Invalid Password: must be at least 8 characters \nlong and include one special character.'}});
    }
    // Age
    const ActualDate = new Date();
    if ((ActualDate.getFullYear() - 18) < BD.getFullYear()) {
      return res.status(500).json({success: false, message: {es: 'Edad invalida.', en: 'Invalid age.'}});
    }

    // GET USER AGE
    const Age = ActualDate.getFullYear() - BD.getFullYear();

    // HASH PASSWORD
    const HashedPass = await bcrypt.hash(Password, 12);

    // GET DEFAULT PERFIL PHOTO FRON FIREBASE
    // const storageRef = ref(storage, `perfil_photos/default.png`);
    // const P_F = await getDownloadURL(storageRef);
    const P_F = 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg';

    // CREATE EMAIL VERIFY CODE
    const verify_code = create_code();

    // SAVE FIELDS
    await pool.query('INSERT INTO responsible SET ?', {First_Names, Last_Names, Email, Password: HashedPass, DUI, Birthdate: BD, Age, Phone, Profile_Photo_Url: P_F, Profile_Photo_Name: null , Reset_Pass_Token: null, Reset_Pass_Expire: null, Email_Verify_Code: verify_code });

    // SEND EMAIL
    send_verify_code_email(verify_code, Email, res);

    return res.status(200).json({success: true, Email})
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: error});
  }
}

//! @route POST api/auth/login
//! @desc Responsible login.
//! @access public
const login = async (req, res, next) => {
  try {
    const {Email, Password} = req.body;

    // CHECKING EMPTY VALUES
    if (!Email || !Password) {
      return res.status(500).json({success: false, message: {es: 'Campos sin completar.', en : 'Missing fields.'}});
    }

    // CHECKING IF USER EXISTS
    const [query_user] = await pool.query('SELECT * FROM responsible WHERE Email = ? ', [Email]);
    if (query_user.length == 0) {
      return res.status(500).json({success: false, message: {es: 'Este Email no ha sido registrado.', en: 'This email has not been registered.'}});
    }

    // CHECKING THE PASSWORD
    if (!await bcrypt.compare(Password, query_user[0].Password)) {
      return res.status(500).json({success: false, message: {es: 'Contraseña Incorrecta.', en: 'Incorrect Password.'}});
    }

    // CHECK IF THE EMAIL IT HAS BEEN VALIDATED
    if (query_user[0].Email_Verify_code != null) {
      return res.status(500).json({success: false, message: {es: 'Email no verificado.', en: 'Email not verified.'}, warning: true});
    }

    // CREATE JWT TOKEN
    const token = create_jwt(query_user);

    return res.status(200).json({success: true, token, User: query_user[0]});
  } catch (error) {
    return res.status(500).json({error});
  }
}

//! @route POST api/auth/verify_email
//! @desc Verify the email of the responsible
//! @access Public
const verify_email = async (req, res, next) => {
  try {
    const { verify_code, Email } = req.body;

    // VALIDATE EMPYT VALUES
    if (!verify_code ||!Email) {
      return res.status(500).json({success: false, message: {es: 'Campo sin completar.', en : 'Missing field.'}});
    }

    // CHECK IF EMAIL HAS ALREADY VERIFIED
    const [query_check_ve_co] = await pool.query('SELECT * FROM Responsible WHERE Email = ? ', [Email]);
    if (query_check_ve_co[0].Email_Verify_code == null) {
      return res.status(500).json({success: false, message: {es: 'Email ya vericado.', en: 'Email already verified.'}});
    }

    // GET THE USER WITH THE VERIFY CODE TO VALIDATE IT AT ONCE
    const [query_user] = await pool.query('SELECT * FROM Responsible WHERE Email = ? AND Email_Verify_code = ?', [Email, verify_code]);
    if (query_user.length == 0) {
      return res.status(500).json({success: false, message: {es: 'Código Incorrecto.', en: 'Incorrect Code.'}});
    }

    // UPDATE THE USER SETTING THE VERIFY CODE IN NULL
    await pool.query('UPDATE Responsible SET Email_Verify_code = NULL WHERE Email = ?', [Email]);

    return res.status(200).json({success: true});
  } catch (error) {
    return res.status(500).json({error});
  }
}

//! @route POST api/auth/forgot_password
//! @desc Send the token to reset the password
//! @access Public
const forgot_password = async (req, res, next) => {
  try {
    const { Email } = req.body;

    // VERIFY EMPTY VALUES
    if (!Email) {
      return res.status(500).json({success: false, message: {es: 'Campos sin completar.', en : 'Missing fields.'}});
    }

    // QUERY TO GET THE USER
    const [query_user] = await pool.query('SELECT * FROM responsible WHERE Email = ?', [Email]);
    // VALIDATIONS
    if (query_user.length == 0) {
      return res.status(500).json({success: false, message: {es: 'Email no registrado.', en : 'Email not registered.'}});
    }
    if (query_user[0].Email_Verify_code != null) {
      return res.status(500).json({success: false, message: {es: 'Email no verificado.', en : 'Email not verified.'}});
    }

    // GET THE TOKENS
    const forgot_pass_tokens = create_reset_code();

    // UPDATE FIELDS IN THE DB
    await pool.query('UPDATE Responsible SET Reset_Pass_Token = ?, Reset_Pass_Expire = ? WHERE Email = ?', [forgot_pass_tokens.db_reset_token, new Date(forgot_pass_tokens.db_reset_expire), Email]);

    // SEND EMAIL WITH THE TOKEN IN URL (CHANGE)
    send_forgot_pass_email(forgot_pass_tokens.reset_pass_code, Email, res);

    return res.status(200).json({success: true, message: {es: 'Email Enviado Correctamente.', en: 'Email Sent Successfully.'}});
  } catch (error) {
    return res.status(500).json({error});
  }
}

//! @route POST api/auth/check_reset_code
//! @desc check if the code keep meeting with the parameters to reset the password
//! @access Private!!
const check_reset_code = async (req, res, next) => {
  try {
    const {reset_pass_code} = req.body;

    // CHECK IF THE TOKEN EXISTS
    if (!reset_pass_code) {
      return res.status(500).json({success: false, message: {es: 'No hay código de reseteo.', en: 'There is no reset code.'}});
    }

    // CREATE MATCH CODE WITH THE TOKEN IN THE DB.
    const code_to_match = crypto.createHash('sha256').update(reset_pass_code).digest('hex');
    // GET DATE OF NOW
    const date_now = new Date();

    // GET THE USER WITH THE EMAIL
    const [query_user] = await pool.query('SELECT * FROM Responsible WHERE Reset_Pass_Token = ? AND Reset_Pass_Expire > ?', [code_to_match, date_now]);
    if (query_user.length == 0) {
      return res.status(500).json({success: false, message: {es: 'Código Invalido.', en: 'Invalid Code.'}});
    }

    return res.status(200).json({success: true, data: 'Código Verificado Correctamente'});
  } catch (error) {
    return res.status(500).json({error});
  }
}

//! @route POST api/auth/reset_password
//! @desc Reset the password and set null the tokens.
//! @access Private!!
const reset_password = async (req, res, next) => {
  try {
    // const reset_pass_token  = req.params.reset_pass_token;
    const {Password, ConfPass, Email} = req.body;

    // CHECK EMPTY VALUES
    if (!Password && !ConfPass) {
      return res.status(500).json({success: false, message: {es: 'Campos sin completar.', en : 'Missing fields.'}});
    }

    // CHECK IF THE PASSWOIRD IS THE SAME
    if(Password != ConfPass) {
      return res.status(500).json({success: false, message: {es: 'Las contraseñas no coinciden.', en: 'The passwords do not match.'}});
    }

    // CHECK IF THE PASSWORD IS THE SAME WITH THE OLD ONE;
    const [query_user] = await pool.query('SELECT * FROM Responsible WHERE Email = ?', [Email]);
    if (await bcrypt.compare(Password, query_user[0].Password)) {
      return res.status(500).json({success: false, message: {es: 'Contraseña no puede ser igual \na la anterior', en: 'The password cannot be the same \nas the previous one.'}});
    }

    // CHECK THE PASSWORD
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(Password)) {
      return res.status(500).json({success: false, message: {es: 'La contraseña no es valda.', en: 'Invalid password.'}});
    }

    // ENCRYPT THE PASSWORD:
    const HashedPass = await bcrypt.hash(Password, 12);

    // SAVE THE FIELDS IN THE DB
    await pool.query('UPDATE Responsible SET Reset_Pass_Token = NULL, Reset_Pass_Expire = NULL, Password = ? WHERE Email = ?', [HashedPass, Email]);

    res.status(201).json({success: true, message: 'Contraseña reestablecida correctamente'});
  } catch (error) {
    return res.status(500).json({error});
  }
}

//! @route POST api/auth/register_patients
//! @desc Add the patients corresponding to the specified User.
//! @access public
const register_patients = async (req, res, next) => {
  try {
    const {Email, First_Names, Last_Names, Blood_Type, Gender, Weight, Height, Selected_Date} = req.body;

    // CHECK EMPTY VALUES
    if (!Email || !First_Names || !Last_Names || !Blood_Type || Gender == undefined || !Weight || !Height || !Selected_Date) {
      return res.status(500).json({success: false, message: {es: 'Campos sin completar.', en : 'Missing fields.'}});
    }

    // VALIDATE STRING INPUTS.
    if (!/^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s]+$/.test(First_Names)){ return res.status(500).json({success: false, message: {es: 'Nombres no validos.', en: 'Invalid first names.'}}) }
    if (First_Names.length < 2 || First_Names.length > 50) { return res.status(500).json({success: false, message: {es: 'Nombres no validos.', en: 'Invalid first names.'}}) }
    if (!/^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s]+$/.test(Last_Names)){ return res.status(500).json({success: false, message: {es: 'Apellidos no validos.', en: 'Invalid last names.'}}) }
    if (Last_Names.length < 3 || Last_Names.length > 50) { return res.status(500).json({success: false, message: {es: 'Apellidos no validos.', en: 'Invalid last names.'}}) }

    // CHECK IF THE PATIENT IS ALREADY REGISTERED
    const [check_query] = await pool.query('SELECT * FROM patient WHERE First_Names = ?', [First_Names]);
    if (check_query.length != 0) {
      return res.status(500).json({success: false, message: {es: 'Paciente ya registrado.', en: 'Patient already registered.'}});
    }

    // CHECK REAL VALUES
    if (Weight < 10 || Weight > 180) {
      return res.status(500).json({success: false, message: {es: 'Ingresar valores reales (Peso).', en: 'Enter real values (Weight).'}});
    }
    if (Height < 0.60 || Height > 1.90) {
      return res.status(500).json({success: false, message: {es: 'Ingresar valores reales (Altura).', en: 'Enter real values (Height).'}});
    }


    // CHECK THE AGE OF THE PATIENT AND GET IT.
    const BD = new Date(Selected_Date);
    const ActualDate = new Date();

    if (ActualDate.getFullYear() - 18 > BD.getFullYear()) {
      return res.status(500).json({success: false, message: {es: "La edad no es valida.", en: 'The age is not valid.'} });
    }
    const Age = ActualDate.getFullYear() - BD.getFullYear();

    if (BD > ActualDate) {
      return res.status(500).json({success: false, message: {es: "La edad no es valida.", en: 'The age is not valid.'} });
    }

    // GET THE USER TO LINK HIM TO THE PATIENT.
    const [responsible] = await pool.query('SELECT * FROM responsible WHERE Email = ?', [Email]);

    // GET THE PATIENT_CODE.
    const Patient_Code = patientCode();

    // GET DEFAULT PERFIL PHOTO FRON FIREBASE
    // const storageRef = ref(storage, `perfil_photos/default.png`);
    // const P_F = await getDownloadURL(storageRef);
    const P_F = 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'

    await pool.query('INSERT INTO patient SET ?', {First_Names, Last_Names, Birthdate: BD, Age, Gender, Blood_Type, Weight, Height, Responsible_id: responsible[0].id, Patient_Code, Medical_History_Code: null, Profile_Photo_Url: P_F, Profile_Photo_Name: null});

    return res.status(200).json({success: true, Patient_Code});
  } catch (error) {
    return res.status(500).json({error});
  }
}

//! @route POST api/auth/doctor_login
//! @desc Doctor's Login
//! @access public?
const doctor_login = async (req, res, next) => {
  try {
    const { User, Password } = req.body;

    // CHECKING POSSIBLE EMPTY VALUES
    if (!User || !Password) {
      return next(new ErrorResponse("Los campos solicitados están incompletos", 400, "error"))
    }

    // CHECKING IF USER EXISTS
    const [query_user] = await pool.query('SELECT * FROM doctors WHERE User = ?', [User]);
    if(query_user.length == 0) {
      return next(new ErrorResponse("El usuario ingresado no es válido", 400, "error"))
    }

    // PASSWORD CHECK
    if(!await bcrypt.compare(Password, query_user[0].Password)) {
      return next(new ErrorResponse("Contraseña incorrecta", 400, "error"))
    }

    // JWT CREATION
    const token = create_jwt(query_user);

    return res.status(200).json({success: true, User: query_user[0], token});
  } catch (error) {
    return res.status(500).json({error});
  }
}

export {
  register,
  login,
  verify_email,
  forgot_password,
  check_reset_code,
  reset_password,
  register_patients,
  doctor_login,
};