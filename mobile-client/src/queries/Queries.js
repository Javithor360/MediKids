import axios from "axios";

//! Localhost Direction of the server.
const localhost = '192.168.0.4';

//\\ const of headers
const headers_public = { headers: {'Content-Type': 'application/json'} }

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

//! Get the Immunization Record of the Patient of the Responsible.
//@access public
export const getImmunizationRecord = async (Patient_id) => {
  return await axios.post(`http://${localhost}:5005/api/responsible/get_immunization_record`, {Patient_id}, headers_public);
}