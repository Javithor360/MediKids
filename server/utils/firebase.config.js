import { config_env } from './dotenv_conf.js';

export default {
  firebaseConfig: {
    apiKey: config_env.API_KEY,
    authDomain: config_env.AUTH_DOMAIN,
    projectId: config_env.PROJECT_ID,
    databaseURL: config_env.FIRESTORE_DB_URL,
    storageBucket: config_env.STORAGE_BUCKET,
    messagingSenderId: config_env.MESSAGING_SENDER_ID,
    appId: config_env.APP_ID,
    measurementId: config_env.MEASUREMENT_ID,
  },
}