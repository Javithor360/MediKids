
//>> IMPORT MODULES
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid';
import fs from 'fs';

//>> IMPORT CONFIGS & FUNCTIONS
import {pool} from '../utils/db.js';
import { create_code, create_jwt, create_reset_token, send_forgot_pass_email, send_verify_code_email } from '../utils/functions.js';
import firebaseConfig from '../utils/firebase.config.js';

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
      return res.status(500).json({success: false, message: 'Valores Vacios'});
    }
    //>>2 - CHECK IF DUI EXISTS
    //! EL DUI ES DE 9 DIGITOS 
    // 12345678-9

    //2.5 - CHECK THE PASSWORD WITH THE CONFIRMATION PASSWORD.
    if(Password != ConfPass){
      return res.status(500).json({success: false, message: 'Las contraseñas no coinciden'})
    }

    //3 - CHECKING IF VALUES ALREADY EXIST
    const [query_check] = await pool.query('SELECT * FROM responsible WHERE DUI = ?', [DUI]);
    if (query_check.length != 0) {
      return res.status(500).json({success: false, message: 'Valores en uso'});
    } 

    //4 - CHECK VALID VALUES
    // Number Phone
    if (!/\D*\(?(\d{3})?\)?\D*(\d{4})\D*(\d{4})/.test(Phone)) {
      return res.status(500).json({success: false, message: 'Telefono invalido'});
    }
    // Email
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(Email)) {
      return res.status(500).json({success: false, message: 'Email invalido'});
    }
    // Password
    if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[,;.:-_{\[\]}`*+~¨´¡¿'?\=\)(/&%$#"!°|¬])\S{8,30}$/.test(Password)){
      return res.status(500).json({success: false, message: 'Contrasña invalido'});
    }
    // Age
    const ActualDate = new Date();
    if ((ActualDate.getFullYear() - 18) < BD.getFullYear()) {
      return res.status(500).json({success: false, message: 'Edad Invalida'});
    }

    // GET USER AGE
    const Age = ActualDate.getFullYear() - BD.getFullYear();

    // HASH PASSWORD
    const HashedPass = await bcrypt.hash(Password, 12);

    // GET DEFAULT PERFIL PHOTO FRON FIREBASE
    const storageRef = ref(storage, `perfil_photos/default.png`);
    const P_F = await getDownloadURL(storageRef);

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
      return res.status(500).json({success: false, message: 'Valores Vacios'});
    }

    // CHECKING IF USER EXISTS
    const [query_user] = await pool.query('SELECT * FROM responsible WHERE Email = ? ', [Email]);
    if (query_user.length == 0) {
      return res.status(500).json({success: false, message: 'Este Email no ha sido registrado'});
    }

    // CHECKING THE PASSWORD
    if (!await bcrypt.compare(Password,  query_user[0].Password)) {
      return res.status(500).json({success: false, message: 'Contraseña Incorrecta'});
    }

    // CHECK IF THE EMAIL IT HAS BEEN VALIDATED
    if (query_user[0].Email_Verify_code != null) {
      return res.status(500).json({success: false, message: 'Email no verificado'});
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
      return res.status(500).json({success: false, message: 'Valor sin ingresar'});
    }

    // CHECK IF EMAIL HAS ALREADY VERIFIED
    const [query_check_ve_co] = await pool.query('SELECT * FROM Responsible WHERE Email = ? ', [Email]);
    if (query_check_ve_co[0].Email_Verify_code == null) {
      return res.status(500).json({success: false, message: 'Email ya vericado'});
    }

    // GET THE USER WITH THE VERIFY CODE TO VALIDATE IT AT ONCE
    const [query_user] = await pool.query('SELECT * FROM Responsible WHERE Email = ? AND Email_Verify_code = ?', [Email, verify_code]);
    if (query_user.length == 0) {
      return res.status(500).json({success: false, message: 'Codigo Incorrecto'});
    }

    // UPDATE THE USER SETTING THE VERIFY CODE IN NULL
    await pool.query('UPDATE Responsible SET Email_Verify_code = NULL WHERE Email = ?', [Email]);

    return res.status(200).json({success: true});
  } catch (error) {
    return res.status(500).json({error});
  }
}

//! @route POST api/auth/get_email_to_verify
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

//! @route POST api/auth/get_responsible
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

//! @route POST api/auth/forgot_password
//! @desc Send the token to reset the password
//! @access Public
const forgot_password = async (req, res, next) => {
  try {
    const { Email } = req.body;

    // VERIFY EMPTY VALUES
    if (!Email) {
      return res.status(500).json({success: false, message: 'Valores Vacios'});
    }

    // QUERY TO GET THE USER
    const [query_user] = await pool.query('SELECT * FROM responsible WHERE Email = ?', [Email]);
    // VALIDATIONS
    if (query_user.length == 0) {
      return res.status(500).json({success: false, message: 'Email no registrado'});
    }
    if (query_user[0].Email_Verify_code != null) {
      return res.status(500).json({success: false, message: 'Email no verificado'});
    }

    // GET THE TOKENS
    const forgot_pass_tokens = create_reset_token();

    // UPDATE FIELDS IN THE DB
    await pool.query('UPDATE Responsible SET Reset_Pass_Token = ?, Reset_Pass_Expire = ? WHERE Email = ?', [forgot_pass_tokens.db_reset_token, new Date(forgot_pass_tokens.db_reset_expire), Email]);

    // SEND EMAIL WITH THE TOKEN IN URL (CHANGE)
    send_forgot_pass_email(forgot_pass_tokens.reset_pass_token, Email, res);

    return res.status(200).json({success: true, message: 'Email Enviado Correctamente'});
  } catch (error) {
    return res.status(500).json({error});
  }
}

//! @route POST api/auth/check_reset_token
//! @desc check if the token keep meeting with the parameters to reset the password
//! @access Private!!
const check_reset_token = async (req, res, next) => {
  try {
    // const reset_pass_token  = req.params.reset_pass_token;
    const {reset_pass_token} = req.body;

    // CHECK IF THE TOKEN EXISTS
    if (!reset_pass_token) {
      return res.status(500).json({success: false, message: 'No hay token de reseteo'});
    }

    // CREATE MATCH TOKEN
    const token_to_match = crypto.createHash('sha256').update(reset_pass_token).digest('hex');
    // GET DATE OF NOW
    const date_now = new Date();

    // GET THE USER WITH THE EMAIL
    const [query_user] = await pool.query('SELECT * FROM Responsible WHERE Reset_Pass_Token = ? AND Reset_Pass_Expire > ?', [token_to_match, date_now]);
    if (query_user.length == 0) {
      return res.status(500).json({success: false, message: 'Token Invalido'});
    }

    return res.status(200).json({success: true, data: query_user[0]});
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
    const {Password, Email} = req.body;

    // CHECK EMPTY VALUES
    if (!Password) {
      return res.status(500).json({success: false, message: 'Valor de contraseña vacia'});
    }

    // CHECK IF THE PASSWORD IS THE SAME WITH THE OLD ONE;
    const [query_user] = await pool.query('SELECT * FROM Responsible WHERE Email = ?', [Email]);
    if (await bcrypt.compare(Password, query_user[0].Password)) {
      return res.status(500).json({success: false, message: 'Contraseña no puede ser igual a la anterior'});
    }

    // CHECK THE PASSWORD
    if (!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(Password)) {
      return res.status(500).json({success: false, message: 'La contraseña no es valda'});
    }

    // ENCRYPT THE PASSWORD:
    const HashedPass = await bcrypt.hash(Password, 12);

    // SAVE THE FIELDS IN THE DB
    await pool.query('UPDATE Responsible SET Reset_Pass_Token = NULL, Reset_Pass_Expire = NULL, Password = ? WHERE Email = ?', [HashedPass, Email]);

    res.status(201).json({success: true, message: 'contraseña reestablecida correctamente'});
  } catch (error) {
    return res.status(500).json({error});
  }
}

//! @route POST api/auth/upload_photo
//! @desc Reset the password and set null the tokens.
//! @access Private!!
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


export {
  register, 
  login, 
  verify_email, 
  get_email_to_verify, 
  get_responsible, 
  forgot_password,
  check_reset_token,
  reset_password,
  upload_pf_responsible
};