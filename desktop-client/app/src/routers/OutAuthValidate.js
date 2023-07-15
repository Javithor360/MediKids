import { Navigate } from "react-router-dom";

export const OutAuthValidate = ({ children }) => {
  if (localStorage.getItem("userSession")) {
    return <Navigate to="/index" replace />;
  }

  return children;
};
