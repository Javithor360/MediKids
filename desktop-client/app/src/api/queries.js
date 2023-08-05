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

export const getActivePatients = async (Doctor_id, PrivateConfig) => {
  return await axios.post(
    `http://localhost:5005/api/doctor/active_patients`,
    { Doctor_id },
    PrivateConfig
  );
};

export const getAllApointments = async (Doctor_id, PrivateConfig) => {
  return await axios.post(
    `http://localhost:5005/api/doctor/get_appointments`,
    { Doctor_id },
    PrivateConfig
  );
};

export const newMedicalRecordEntry = async (data, PrivateConfig) => {
  return await axios.post(
    `http://localhost:5005/api/doctor/new_medical_record_entry`,
    data,
    PrivateConfig
  );
};

export const getPatientAppointmentWithDoctor = async (data, PrivateConfig) => {
  return await axios.post(
    `http://localhost:5005/api/doctor/get_patient_appointment_with_specific_doctor`,
    data,
    PrivateConfig
  );
};

export const getResponsibleInfo = async (Responsible_id, PrivateConfig) => {
  return await axios.post(
    `http://localhost:5005/api/doctor/get_responsible_info`,
    { Responsible_id },
    PrivateConfig
  );
}