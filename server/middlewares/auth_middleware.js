import jwt from "jsonwebtoken";
import { config_env } from "../utils/dotenv_conf.js";

export const auth_midd = (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    
    // CHECK IF THE TOKEN DOESNT EXIST
    if (!token) {
      return res.status(401).json({success: false, message: 'No hay token'});
    }

    // DECODIFIED TOKEN
    const decoded = jwt.verify(token, config_env.JWT_SECRET);

    // SENDING TOKEN IN REQ STATEMENT.
    req.auth_token = decoded;

    // PASSING TO THE NEXT FUNCT
    next();
  } catch (error) {
    return res.status(401).json({success: false, message: 'Token Invalido'});
  }
}