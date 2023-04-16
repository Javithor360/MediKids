import express from 'express';
import router_login from './routes/login.js';

const app = express();

// EXPRESS CONFIGS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HEADERS CONFIGS
app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// ROUTES CONFIGS
app.use('/api/auth', router_login);

app.use('/', (req, res, next) => {
  res.status(404).json({res: 'page not found'})
});

export default app;