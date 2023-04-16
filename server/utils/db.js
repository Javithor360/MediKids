import {createPool} from 'mysql2/promise';
import { config } from './dotenv_conf.js';

export const pool = createPool({
    host: config.HOST,
    user: config.USER,
    password: config.PASS,
    port: config.PORT_DB,
    database: config.DATABASE,
})