import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

import { HomePage, DownloadApp, DrFlores } from './pages'

function App() {
  return (
    <>
      <BrowserRouter>
        	<Routes>
          		<Route>
            	    <Route path="/" element={<Navigate to="/index" replace />} />
                  <Route path="/index" element={<HomePage />} />
                  <Route path="/download-app" element={<DownloadApp />} />
                  <Route path="/dr-flores" element={<DrFlores />} />
          		</Route>
        	</Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
