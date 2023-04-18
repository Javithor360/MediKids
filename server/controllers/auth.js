import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {pool} from '../utils/db.js';
import { config_env } from '../utils/dotenv_conf.js';
import { create_code, send_verify_code_email } from '../utils/functions.js';

const register = async (req, res, next) => {
  try {
    const {First_Names, Last_Names, Email, Password, DUI, Birthdate, Phone} = req.body;
    const BD = new Date(Birthdate);

    //1 - CHECKING EMPTY VALUES
    if (!First_Names || !Last_Names || !Email || !Password || !DUI || !Birthdate || !Phone) {
      return res.status(500).json({message: 'Valores Vacios'});
    }
    //>>2 - CHECK IF DUI EXISTS
      //! EL DUI ES DE 9 DIGITOS 
      // 12345678-9

    //3 - CHECKING IF VALUES ALREADY EXIST
    const [query_check] = await pool.query('SELECT * FROM responsible WHERE DUI = ?', [DUI]);
    if (query_check.length != 0) {
      return res.status(500).json({message: 'Valores en uso'});
    } 

    //4 - CHECK VALID VALUES
    // Number Phone
    if (!/\D*\(?(\d{3})?\)?\D*(\d{4})\D*(\d{4})/.test(Phone)) {
      return res.status(500).json({message: 'Telefono invalido'});
    }
    // Email
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(Email)) {
      return res.status(500).json({message: 'Email invalido'});
    }
    // Password
    if(!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(Password)){
      return res.status(500).json({message: 'Contrasña invalido'});
    }
    // Age
    const ActualDate = new Date();
    if ((ActualDate.getFullYear() - 18) < BD.getFullYear()) {
      return res.status(500).json({message: 'Edad Invalida'});
    }

    // GET USER AGE
    const Age = ActualDate.getFullYear() - BD.getFullYear();

    // HASH PASSWORD
    const HashedPass = await bcrypt.hash(Password, 12);

    // DEFAULT PF
    const P_F = '';

    // CREATE EMAIL VERIFY CODE
    const verify_code = create_code();

    // SAVE FIELDS
    await pool.query('INSERT INTO responsible SET ?', {First_Names, Last_Names, Email, Password: HashedPass, DUI, Birthdate: BD, Age, Phone, Profile_Photo: P_F, Reset_Pass_Token: null, Email_Verify_Code: verify_code });

    // SEND EMAIL
    send_verify_code_email(verify_code, Email, res);

    return res.status(200).json({Email})
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: error});
  }
}

const login = async (req, res, next) => {
  try {
    const {Email, Password} = req.body;

    // CHECKING EMPTY VALUES
    if (!Email || !Password) {
      return res.status(500).json({message: 'Valores Vacios'});
    }

    // CHECKING IF USER EXISTS
    const [query_user] = await pool.query('SELECT * FROM responsible WHERE Email = ? ', [Email]);
    if (query_user.length == 0) {
      return res.status(500).json({message: 'Este Email no ha sido registrado'});
    }

    // CHECKING THE PASSWORD
    if (!await bcrypt.compare(Password,  query_user[0].Password)) {
      return res.status(500).json({message: 'Contraseña Incorrecta'});
    }

    // CREATE JWT TOKEN
    const token = jwt.sign({
      user:{
        id: query_user[0].Id,
        Email: query_user[0].Email,
        DUI: query_user[0].DUI
      }
    }, config_env.JWT_SECRET, { expiresIn: config_env.JWT_EXPIRE })

    return res.status(200).json({success: true, token});
  } catch (error) {
    return res.status(500).json({error});
  }
}

const verify_email = async (req, res, next) => {
  try {
    const { verify_code, Email } = req.body;


  } catch (error) {
    return res.status(500).json({error});
  }
}

const get_email_verified = async (req, res, next) => {
  try {
    const { Email } = req.body;

    const query_user = await pool.query('SELECT * FROM responsible WHERE Email = ?', [Email]);

    return res.status(200).json({Responsible_user: query_user[0]});
  } catch (error) {
    return res.status(500).json({error});
  }
}

export {register, login, verify_email, get_email_verified};