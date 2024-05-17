import express from "express";
import router_login from "./routes/login.routes.js";
import router_admin from "./routes/admin.routes.js";
import router_doctor from "./routes/doctor.routes.js";
import router_responsible from "./routes/responsible.routes.js";
import MiddlewareError from "./middlewares/error_middleware.js"
import router_appointment from "./routes/appointment.routes.js";
import cors from 'cors';

const app = express();

// EXPRESS CONFIGS
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HEADERS CONFIGS
app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// ROUTES CONFIGS
app.use("/api/auth", router_login);
app.use("/api/admin", router_admin);
app.use("/api/doctor", router_doctor);
app.use("/api/responsible", router_responsible);
app.use("/api/appointment", router_appointment);

// ERROR MIDDLEWARE
app.use(MiddlewareError);

// DEFAULT ROUTE (Err 404)
app.use("/", (req, res, next) => {
  res.status(404).json({ res: "page not found" });
});

export default app;
