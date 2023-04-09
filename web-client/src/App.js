import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

import { HomePage } from './pages'
import { Doc1 } from "./pages"
import { Doc2 } from "./pages";
import { Doc3 } from "./pages";
function App() {
  return (
    <>
      <BrowserRouter>
        	<Routes>
          		<Route>
            	    <Route path="/" element={<Navigate to="/index" replace />} />
                  <Route path="/index" element={<HomePage />} />
                  <Route path="/otorrinolaringologo" element={<Doc1 />} />
                  <Route path="/gastroenterología" element={<Doc2 />} />
                  <Route path="/neumologia" element={<Doc3 />} />
          		</Route>
        	</Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
