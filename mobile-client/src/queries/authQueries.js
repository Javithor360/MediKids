import axios from "axios";

//! Localhost Direction of the server.
const localhost = '192.168.0.11';

//! Get the information about the Responsible.
//@access public
export const getResponsible = async (Email) => {
  return await axios.post(`http://${localhost}:5005/api/responsible/get_responsible`, {Email}, {headers: {'Content-Type': 'application/json'}});
}

//! Upload the Perfil Photo of the Responsible.
//@access public
export const uploadPFResponsible = async (FormData) => {
  return await axios.post(`http://${localhost}:5005/api/responsible/upload_pf_responsible`, FormData, {headers: {'Content-Type': 'multipart/form-data'}});
}

//! Register a Responsible user.
//@access public
export const registerResponsible = async (First_Names, Last_Names, Email, Password, ConfPass, DUI, Birthdate, Phone) => {
  return await axios.post(`http://${localhost}:5005/api/auth/register`, {First_Names, Last_Names, Email, Password, ConfPass, DUI, Birthdate, Phone}, {headers: {'Content-Type': 'application/json'}});
}

//! Verify the Email Code of the Responsible.
//@access public
export const verifyCodeResponsible = async (verify_code, Email) => {
  return await axios.post(`http://${localhost}:5005/api/auth/verify_email`, {verify_code, Email}, {headers: {'Content-Type': 'application/json'}});
}

//! Logging a user.
//@access public
export const loginResponsible = async (Email, Password) => {
  return await axios.post(`http://${localhost}:5005/api/auth/login`, {Email, Password}, {headers: {'Content-Type': 'application/json'}});
}

//! Forgot Password query
//@access public
export const ForgotPassQuery = async (Email) => {
  return await axios.post(`http://${localhost}:5005/api/auth/forgot_password`, {Email}, {headers: {'Content-Type': 'application/json'}});
}

//! Check reset password code.
//@access public
export const CheckresetPassCode = async (verifyCode) => {
  return await axios.post(`http://${localhost}:5005/api/auth/check_reset_code`, {reset_pass_code: verifyCode}, {headers: {'Content-Type': 'application/json'}});
}

//! Reset the password.
//@access public
export const ResetPasswordQuery = async (Password, ConfPass, Email) => {
  return await axios.post(`http://${localhost}:5005/api/auth/reset_password`, {Password, ConfPass, Email}, {headers: {'Content-Type': 'application/json'}});
}

//! Register the patients of the user.
//@access public
export const RegisterPatientsQuery = async (Email, First_Names, Last_Names, Blood_Type, Gender, Weight, Height, Selected_Date) => {
  return await axios.post(`http://${localhost}:5005/api/auth/register_patients`, {Email, First_Names, Last_Names, Blood_Type, Gender, Weight, Height, Selected_Date}, {headers: {'Content-Type': 'application/json'}});
}