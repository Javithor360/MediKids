import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components";
import { IndexPage, Error404 } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="/index" replace />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/index" element={<IndexPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
