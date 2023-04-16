import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {pool} from '../utils/db.js';
import { config } from '../utils/dotenv_conf.js';

const signup = async (req, res, next) => {
  try {
    const {Email, Password, Name} = req.body;
    
    // CHECKING EMPTY VALUES
    if (!Email || !Password || !Name) {
      return res.status(500).json({message: 'Valores Vacios'});
    }

    // CHECKING IF VALUES ALREADY EXIST
    const [query_check] = await pool.query('SELECT * FROM user WHERE Email = ?', [Email]);
    if (query_check.length != 0) {
      return res.status(500).json({message: 'Valores en uso'});
    } 

    // HASH PASSWORD
    const HashedPass = await bcrypt.hash(Password, 12);

    // SAVE FIELDS
    await pool.query('INSERT INTO user SET ?', {Name, Email ,Password: HashedPass});
    
    return res.status(200).json({message: 'Registrado correctamente'})
  } catch (error) {
    return res.status(500).json({error});
  }
}

const login = async (req, res, next) => {
  try {
    const {Email, Password} = req.body;

    // CHECKING EMPTY VALUES
    if (!Email || !Password) {
      return res.status(500).json({message: 'Valores Vacios'});
    }

    // CHECKING IF USER EXIST
    const [query_user] = await pool.query('SELECT * FROM user WHERE Email = ? ', [Email]);
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
      }
    }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRE })

    return res.status(200).json({success: true, token});
  } catch (error) {
    return res.status(500).json({error});
  }
}

export {signup, login};