import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

import { HomePage } from './pages'

function App() {
  return (
    <>
      <BrowserRouter>
        	<Routes>
          		<Route>
            	    <Route path="/" element={<Navigate to="/index" replace />} />
                  <Route path="/index" element={<HomePage />} />
          		</Route>
        	</Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
