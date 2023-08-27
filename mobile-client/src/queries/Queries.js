import axios from "axios";
import ip from "../ip";

//! Localhost Direction of the server.
const localhost = ip();

//\\ const of headers
const headers_public = { headers: {'Content-Type': 'application/json'} }

const get_private_headers = (jwtToken) => {
  return { headers: {"Content-Type": "application/json", "x-auth-token": jwtToken} }
}

//! Get the information about the Responsible.
//@access public
export const getResponsible = async (Email) => {
  return await axios.post(`http://${localhost}:5005/api/responsible/get_responsible`, {Email}, headers_public);
}

//! Upload the Perfil Photo of the Responsible.
//@access public
export const uploadPFResponsible = async (FormData) => {
  return await axios.post(`http://${localhost}:5005/api/responsible/upload_pf_responsible`, FormData, {headers: {'Content-Type': 'multipart/form-data'}});
}

//! Upload the Perfil Photo of the Patient.
//@access public
export const uploadPFPatient = async (jwtToken, FormData) => {
  return await axios.post(`http://${localhost}:5005/api/responsible/upload_pf_patient`, FormData, {headers: {'Content-Type': 'multipart/form-data', "x-auth-token": jwtToken}});
}

//! Register a Responsible user.
//@access public
export const registerResponsible = async (First_Names, Last_Names, Email, Password, ConfPass, DUI, Birthdate, Phone) => {
  return await axios.post(`http://${localhost}:5005/api/auth/register`, {First_Names, Last_Names, Email, Password, ConfPass, DUI, Birthdate, Phone}, headers_public);
}

//! Verify the Email Code of the Responsible.
//@access public
export const verifyCodeResponsible = async (verify_code, Email) => {
  return await axios.post(`http://${localhost}:5005/api/auth/verify_email`, {verify_code, Email}, headers_public);
}

//! Logging a user.
//@access public
export const loginResponsible = async (Email, Password) => {
  return await axios.post(`http://${localhost}:5005/api/auth/login`, {Email, Password}, headers_public);
}

//! Forgot Password query
//@access public
export const ForgotPassQuery = async (Email) => {
  return await axios.post(`http://${localhost}:5005/api/auth/forgot_password`, {Email}, headers_public);
}

//! Check reset password code.
//@access public
export const CheckresetPassCode = async (verifyCode) => {
  return await axios.post(`http://${localhost}:5005/api/auth/check_reset_code`, {reset_pass_code: verifyCode}, headers_public);
}

//! Reset the password.
//@access public
export const ResetPasswordQuery = async (Password, ConfPass, Email) => {
  return await axios.post(`http://${localhost}:5005/api/auth/reset_password`, {Password, ConfPass, Email}, headers_public);
}

//! Register the patients of the user.
//@access public
export const RegisterPatientsQuery = async (Email, First_Names, Last_Names, Blood_Type, Gender, Weight, Height, Selected_Date) => {
  return await axios.post(`http://${localhost}:5005/api/auth/register_patients`, {Email, First_Names, Last_Names, Blood_Type, Gender, Weight, Height, Selected_Date}, headers_public);
}

//! Get the patients of the Responsible.
//@access public
export const getPatients = async (Email) => {
  return await axios.post(`http://${localhost}:5005/api/responsible/get_patients`, { Email }, headers_public);
}

//! Get only one patient of the Responsible.
//@access public
export const getPatient = async (PatientId) => {
  return await axios.post(`http://${localhost}:5005/api/responsible/get_patient`, { PatientId }, headers_public);
}

//! Get the Immunization Record of the Patient of the Responsible.
//@access public
export const getImmunizationRecord = async (Patient_id) => {
  return await axios.post(`http://${localhost}:5005/api/responsible/get_immunization_record`, {Patient_id}, headers_public);
}

//! get ALL immunization records
//@access public
export const getAllImmunizationRecords = async () => {
  return await axios.get(`http://${localhost}:5005/api/responsible/get_all_immunization_record`, headers_public);
}

//! Create the Immunization Record.
//@access public
export const createImmunizationRecord = async (Patient_id, isChecked) => {
  return await axios.post(`http://${localhost}:5005/api/responsible/create_immunization_record`, {Patient_id, PatientVaccines: isChecked}, headers_public);
}

//! Get the Medical Records of the Responsible
//@access Private
export const getMedicalRecords = async (jwtToken, Patient_id) => {
  return await axios.post(`http://${localhost}:5005/api/appointment/get_medical_records`, {Patient_id}, get_private_headers(jwtToken))
}

//! Create the request appointment for the Patient.
//@access Private
export const requestMedicalAppointment = async (jwtToken, Patient_Code, Doctor_id, Week, Description) => {
  return await axios.post(`http://${localhost}:5005/api/appointment/request_medical_appointment`, {Patient_Code, Doctor_id, Week, Description}, get_private_headers(jwtToken));
}

//! Get the appointments of the Patient.
//@access Private
export const getMedicalAppointments = async (jwtToken, Patient_Code) => {
  return await axios.post(`http://${localhost}:5005/api/appointment/get_medical_appointments`, {Patient_Code}, get_private_headers(jwtToken));
}

//! Get the prescriptions of the patient.
//@access Private
export const getMedicalPrescriptions = async (jwtToken, Patient_id) => {
  return await axios.post(`http://${localhost}:5005/api/responsible/get_medical_prescriptions`, {Patient_id}, get_private_headers(jwtToken));
}