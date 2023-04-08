import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components";
import {
  IndexPage,
  Error404,
  Inbox,
  MainAgenda,
  ActivePatients,
  MedicalRecords,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="/index" replace />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/index" element={<IndexPage />} />
          <Route path="/inbox" element={<Inbox />} />

          {/* Páginas referentes a la agenda */}
          <Route path="/agenda" element={<MainAgenda />} />

          {/* Páginas referentes al control de pacientes */}
          <Route path="/patients/active" element={<ActivePatients />} />
          <Route path="/patients/records" element={<MedicalRecords />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;