import mysql from "mysql2";

import { config_env } from "../utils/dotenv_conf.js";

const db = mysql.createConnection({
  host: config_env.HOST,
  user: config_env.USER,
  password: config_env.PASS,
});
console.log("[DB] Creating connection to create the main schema...");
  
db.connect(() => {
  console.log("[DB] Connection successfully established, starting schema process.");
  try {
    db.query(
      `CREATE SCHEMA IF NOT EXISTS ${config_env.DATABASE} DEFAULT CHARACTER SET utf8 ;`
    );
    console.log(`[DB] Schema "${config_env.DATABASE}" created!`);
    db.end();
  } catch (error) {
    console.log(
      `[DB] AN ERROR OCCURRED WHILE CREATING SCHEMA "${config_env.DATABASE}"\n${error}`
    );
    db.end();
  }
});