// CONFIG ENVIRONMENT VARIABLES
import {config as dotenv_conf} from 'dotenv';
dotenv_conf();

export const config = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASS: process.env.PASS,
  PORT_DB: process.env.PORT_DB,
  DATABASE: process.env.DATABASE,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_SECRET_ALTERNATIVE: process.env.JWT_SECRET_ALTERNATIVE,
  JWT_EXPIRE: process.env.JWT_EXPIRE
}