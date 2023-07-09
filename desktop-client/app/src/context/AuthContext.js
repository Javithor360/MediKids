import { createContext, useContext, useState } from "react";
import { login } from "../api/queries";

// Creating context
const authContext = createContext();

// Creating context's hook
export const useAuth = () => {
  const Context = useContext(authContext);
  return Context;
};

// Context's funcstions
export const AuthProvider = ({ children }) => {
  const PrivateConfig = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const [Error, setError] = useState("");
  const [Success, setSuccess] = useState("");
  const [Chargin, setChargin] = useState(false);

  const [User, setUser] = useState("");
  const [Password, setPassword] = useState("");

  const DoctorLogin = async (User, Password) => {
    try {
        return await login(User, Password, PrivateConfig);
    } catch (error) {
        setError(error.response.data.error);
    }
  }

  return (
    <authContext.Provider
      value={{
        PrivateConfig,
        Error,
        setError,
        Success,
        setSuccess,
        Chargin,
        setChargin,
        User,
        setUser,
        Password,
        setPassword,
        DoctorLogin
      }}
    >
      {children}
    </authContext.Provider>
  );
};
