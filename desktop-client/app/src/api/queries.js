import axios from "axios";

const host = 'http://localhost:5005';
// const host = 'https://medikids-server.uc.r.appspot.com'

export const login = async (User, Password, PrivateConfig) => {
  return await axios.post(
    `${host}/api/auth/doctor_login`,
    { User, Password },
    PrivateConfig
  );
};

export const getDoctorInfo = async (Doctor_id, PrivateConfig) => {
  return await axios.post(
    `${host}/api/doctor/get_info`,
    { Doctor_id },
    PrivateConfig
  );
};

export const getActivePatients = async (Doctor_id, PrivateConfig) => {
  return await axios.post(
    `${host}/api/doctor/active_patients`,
    { Doctor_id },
    PrivateConfig
  );
};

export const getAllApointments = async (Doctor_id, PrivateConfig) => {
  return await axios.post(
    `${host}/api/doctor/get_appointments`,
    { Doctor_id },
    PrivateConfig
  );
};

export const getPatientAppointmentWithDoctor = async (data, PrivateConfig) => {
  return await axios.post(
    `${host}/api/doctor/get_patient_appointment_with_specific_doctor`,
    data,
    PrivateConfig
  );
};

export const getResponsibleInfo = async (Responsible_id, PrivateConfig) => {
  return await axios.post(
    `${host}/api/doctor/get_responsible_info`,
    { Responsible_id },
    PrivateConfig
  );
};

export const getPatientMedicalRecords = async (Patient_id, PrivateConfig) => {
  return await axios.post(
    `${host}/api/doctor/get_patient_medical_record`,
    { Patient_id },
    PrivateConfig
  );
};

export const getPatientVaccines = async (Patient_id, PrivateConfig) => {
  return await axios.post(
    `${host}/api/doctor/get_patient_vaccines`,
    { Patient_id },
    PrivateConfig
  );
};

export const getPatientMedicalPrescription = async (
  Patient_id,
  PrivateConfig
) => {
  return await axios.post(
    `${host}/api/doctor/get_medical_prescriptions`,
    { Patient_id },
    PrivateConfig
  );
};

export const appointmentRequests = async (data, PrivateConfig) => {
  return await axios.post(
    `${host}/api/doctor/get_appointment_requests`,
    data,
    PrivateConfig
  );
};

export const getResponsibles = async (PrivateConfig) => {
  return await axios.post(
    `${host}/api/doctor/get_responsibles`,
    {},
    PrivateConfig
  );
};

export const acceptAppointment = async (data, PrivateConfig) => {
  return await axios.post(
    `${host}/api/doctor/accept_appointment_request`,
    data,
    PrivateConfig
  );
};

export const declineAppointment = async (id, PrivateConfig) => {
  return await axios.post(
    `${host}/api/doctor/decline_appointment_request`,
    id,
    PrivateConfig
  );
};

export const appointmentsHistory = async (Patient_id, PrivateConfig) => {
  return await axios.post(
    `${host}/api/doctor/get_appointments_history`,
    Patient_id,
    PrivateConfig
  );
};

export const getDoctors = async (PrivateConfig) => {
  return await axios.post(
    `${host}/api/doctor/get_doctors`,
    {},
    PrivateConfig
  );
};

export const getPatients = async (PrivateConfig) => {
  return await axios.post(
    `${host}/api/doctor/get_patients`,
    {},
    PrivateConfig
  );
};

export const getAnnouncements = async (Doctor_id, PrivateConfig) => {
  return await axios.post(
    `${host}/api/doctor/get_announcements`,
    { Doctor_id },
    PrivateConfig
  );
};

export const endMedicalAppointment = async (data, PrivateConfig) => {
  return await axios.post(
    `${host}/api/doctor/end_medical_appointment`,
    data,
    PrivateConfig
  );
};

