import axios from "axios";

//! Localhost Direction of the server.
const localhost = '192.168.0.9';

//! Get the information about the Responsible.
//@access public
export const getResponsible = async (Email) => {
  return await axios.post(`http://${localhost}:5005/api/auth/get_responsible`, {Email}, {headers: {'Content-Type': 'application/json'}});
}

//! Upload the Perfil Photo of the Responsible.
//@access private
export const uploadPFResponsible = async (FormData) => {
  return await axios.post(`http://${localhost}:5005/api/auth/upload_pf_responsible`, FormData, {headers: {'Content-Type': 'multipart/form-data'}});
}