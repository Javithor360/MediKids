import axios from "axios";

//! Localhost Direction of the server.
const localhost = '172.20.10.8';

//! Get the information about the Responsible.
//@access public
export const getResponsible = async (Email) => {
  return await axios.post(`http://${localhost}:5005/api/auth/get_responsible`, {Email}, {headers: {'Content-Type': 'application/json'}});
}

//! Upload the Perfil Photo of the Responsible.
//@access public
export const uploadPFResponsible = async (FormData) => {
  return await axios.post(`http://${localhost}:5005/api/auth/upload_pf_responsible`, FormData, {headers: {'Content-Type': 'multipart/form-data'}});
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