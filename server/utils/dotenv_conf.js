// CONFIG ENVIRONMENT VARIABLES
import {config as dotenv_conf} from 'dotenv';
dotenv_conf();

const p_e = process.env;

export const config_env = {
  PORT: p_e.PORT,
  HOST: p_e.HOST,
  USER: p_e.USER,
  PASS: p_e.PASS,
  PORT_DB: p_e.PORT_DB,
  DATABASE: p_e.DATABASE,
  JWT_SECRET: p_e.JWT_SECRET,
  JWT_SECRET_ALTERNATIVE: p_e.JWT_SECRET_ALTERNATIVE,
  JWT_EXPIRE: p_e.JWT_EXPIRE,
  EMAIL_HOST: p_e.EMAIL_HOST,
  EMAIL_PORT: p_e.EMAIL_PORT,
  EMAIL_USERNAME: p_e.EMAIL_USERNAME,
  EMAIL_PASSWORD: p_e.EMAIL_PASSWORD,
  EMAIL_FROM: p_e.EMAIL_FROM,
}