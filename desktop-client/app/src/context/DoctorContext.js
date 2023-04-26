import { createContext, useContext, useState } from "react";
import { getActivePatientsEx } from "../api/queries";

const dashContext = createContext();

export const useDash = () => {
  const Context = useContext(dashContext);
  return Context;
};

export const DoctorProvider = ({ children }) => {
  const [activePatients, setActivePatients] = useState([]);
  // const PrivateConfig = (Token) => {
  //   return {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-auth-token": Token,
  //     },
  //   };
  // };

  const ActivePatientsQuery = async (id) => {
    try {
      const res = await getActivePatientsEx(id);
      setActivePatients(res.data.body);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <dashContext.Provider
      value={{ activePatients, setActivePatients, ActivePatientsQuery }}
    >
      {children}
    </dashContext.Provider>
  );
};
