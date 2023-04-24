import axios from "axios";

export const getActivePatientsEx = async (PrivateConfig) => {
  return await axios.get("http://localhost:5005/api/doctor/active_patients", {
    Doctor_id: 1,
  });
};
