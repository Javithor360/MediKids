import axios from "axios";

export const getActivePatientsEx = async (Doctor_id) => {
  return await axios.post(`http://localhost:5005/api/doctor/active_patients`, {
    Doctor_id,
  });
};
