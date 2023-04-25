import { createContext, useContext } from "react";
import { getActivePatientsEx } from "../api/queries";

const doctorContext = createContext();

export const useDash = () => {
  const Context = useContext(doctorContext);
  return Context;
};
