import {createPool} from 'mysql2/promise';
import { config_env } from './dotenv_conf.js';

export const pool = createPool({
    host: config_env.HOST,
    user: config_env.USER,
    password: config_env.PASS,
    port: config_env.PORT_DB,
    database: config_env.DATABASE,
})