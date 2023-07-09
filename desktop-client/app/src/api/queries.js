import axios from "axios";

export const login = async (User, Password, PrivateConfig) => {
  return await axios.post(
    `http://localhost:5005/api/auth/doctor_login`,
    { User, Password },
    PrivateConfig
  );
};

export const getDoctorInfo = async (Doctor_id, PrivateConfig) => {
  return await axios.post(
    `http://localhost:5005/api/doctor/get_info`,
    { Doctor_id },
    PrivateConfig
  );
};

export const getActivePatientsEx = async (Doctor_id, PrivateConfig) => {
  return await axios.post(
    `http://localhost:5005/api/doctor/active_patients`,
    { Doctor_id },
    PrivateConfig
  );
};
