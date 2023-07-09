import { createContext, useContext, useState } from "react";
import { getDoctorInfo, getActivePatientsEx } from "../api/queries";

const dashContext = createContext();

export const useDash = () => {
  const Context = useContext(dashContext);
  return Context;
};

export const DoctorProvider = ({ children }) => {
  const [Info, setInfo] = useState({});
  const [activePatients, setActivePatients] = useState([]);

  const PrivateConfig = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const DoctorInfoQuery = async (Doctor_id) => {
    try {
      const query = await getDoctorInfo(Doctor_id, PrivateConfig);
      setInfo(query.data.body);
    } catch (error) {
      console.log(error);
    }
  };

  const ActivePatientsQuery = async (Doctor_id) => {
    try {
      const res = await getActivePatientsEx(Doctor_id, PrivateConfig);
      setActivePatients(res.data.body);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <dashContext.Provider
      value={{
        Info,
        setInfo,
        activePatients,
        setActivePatients,
        DoctorInfoQuery,
        ActivePatientsQuery,
      }}
    >
      {children}
    </dashContext.Provider>
  );
};
