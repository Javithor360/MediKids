import {createPool} from 'mysql2/promise';
import { config_env } from './dotenv_conf.js';

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 12345,
    port: 3306,
    database: 'medikids_db',
})