import mysql from "mysql2";

import { config_env } from "../utils/dotenv_conf.js";

const db = mysql.createConnection({
  host: config_env.HOST,
  user: config_env.USER,
  password: config_env.PASS,
});

console.log("[DB] Creating connection to delete the main schema...");

db.connect(() => {
  console.log("[DB] Connection successfully established, starting schema process...");
  try {
    db.query(
      `DROP DATABASE IF EXISTS ${config_env.DATABASE};`
    );
    console.log(`[DB] Schema "${config_env.DATABASE}" has been dropped!`);
    db.end();
  } catch (error) {
    console.log(
      `[DB] AN ERROR OCCURRED WHILE DROPPING SCHEMA "${config_env.DATABASE}"\n${error}`
    );
    db.end();
  }
});
