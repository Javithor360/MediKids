import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components";

import { AuthValidate, FirstLoginValidation, OutAuthValidate } from "./routers";

import {
  IndexPage,
  // Error404,
  Inbox,
  MainAgenda,
  ActivePatients,
  MedicalRecords,
  PatientsDetails,
  MedicalAppoinment,
  LoginPage,
  AppointmentRequests,
  AppointmentRequestsDetails
} from "./pages";

import { AuthProvider } from "./context/AuthContext";
import { DoctorProvider } from "./context/DoctorContext";

import './libs/i18n';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DoctorProvider>
          <Routes>
            {/* Login */}
            <Route
              path="/login"
              element={
                <OutAuthValidate>
                  <LoginPage />
                </OutAuthValidate>
              }
            />

            {/* Método de validación de sesión "funcional", se explorarán más opciones */}
            <Route
              path="/"
              element={
                <AuthValidate>
                  <Layout />
                </AuthValidate>
              }
            >
                <Route path="/" element={<Navigate to="/index" replace />} />
                <Route path="*" element={<Navigate to="/index" replace />} />
                <Route path="/index" element={<IndexPage />} />
                <Route path="/inbox" element={<Inbox />} />

                {/* Páginas referentes a la agenda */}
                <Route path="/agenda/calendar" element={<MainAgenda />} />
                <Route path="/agenda/appointment_requests" element={<AppointmentRequests/>}/>
                <Route path="/agenda/appointment_requests/details" element={<AppointmentRequestsDetails />} />
                {/* Páginas referentes al control de pacientes */}
                <Route path="/patients/active" element={<ActivePatients />} />
                <Route
                  path="/patients/active/details"
                  element={<PatientsDetails />}
                />
                <Route path="/patients/records" element={<MedicalRecords />} />
                <Route
                  path="/patients/active/details/appoinment"
                  element={<MedicalAppoinment />}
                />
            </Route>
          </Routes>
        </DoctorProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
