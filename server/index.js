// ENVIRONMENT VARIABLES
import {config_env} from './utils/dotenv_conf.js'

// IMPORT EXPRESS CONFIGS
import app from './app.js';

// RUNNING SERVER
app.listen(process.env.PORT, () => {
  console.log(`SERVER CONNECTED TO THE PORT: ${config_env.PORT}`);
});