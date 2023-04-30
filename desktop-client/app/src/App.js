import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components";
import {
  IndexPage,
  // Error404,
  Inbox,
  MainAgenda,
  ActivePatients,
  MedicalRecords,
  PatientsDetails,
  MedicalAppoinment,
} from "./pages";
import { DoctorProvider } from "./context/DoctorContext";

function App() {
  return (
    <BrowserRouter>
      <DoctorProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Navigate to="/index" replace />} />
            <Route path="*" element={<Navigate to="/index" replace />} />
            <Route path="/index" element={<IndexPage />} />
            <Route path="/inbox" element={<Inbox />} />

            {/* Páginas referentes a la agenda */}
            <Route path="/agenda" element={<MainAgenda />} />

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
    </BrowserRouter>
  );
}

export default App;
