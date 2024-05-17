import axios from "axios";

//! host Direction of the server.
// const host = 'https://medikids-server.uc.r.appspot.com';
const host = 'http://192.168.1.6:5005'

//\\ const of headers
const headers_public = { headers: {'Content-Type': 'application/json'} }

const get_private_headers = (jwtToken) => {
  return { headers: {"Content-Type": "application/json", "x-auth-token": jwtToken} }
}

//! Get the information about the Responsible.
//@access public
export const getResponsible = async (Email) => {
  return await axios.post(`${host}/api/responsible/get_responsible`, {Email}, headers_public);
}

//! Upload the Perfil Photo of the Responsible.
//@access public
export const uploadPFResponsible = async (FileName, Email) => {
  return await axios.post(`${host}/api/responsible/upload_pf_responsible`, {FileName, Email}, headers_public);
}

//! Upload the Perfil Photo of the Patient.
//@access public
export const uploadPFPatient = async (jwtToken, Patient_id, FileName) => {
  return await axios.post(`${host}/api/responsible/upload_pf_patient`, { Patient_id, FileName }, get_private_headers(jwtToken));
}

//! Register a Responsible user.
//@access public
export const registerResponsible = async (First_Names, Last_Names, Email, Password, ConfPass, DUI, Birthdate, Phone) => {
  return await axios.post(`${host}/api/auth/register`, {First_Names, Last_Names, Email, Password, ConfPass, DUI, Birthdate, Phone}, headers_public);
}

//! Verify the Email Code of the Responsible.
//@access public
export const verifyCodeResponsible = async (verify_code, Email) => {
  return await axios.post(`${host}/api/auth/verify_email`, {verify_code, Email}, headers_public);
}

//! Logging a user.
//@access public
export const loginResponsible = async (Email, Password) => {
  return await axios.post(`${host}/api/auth/login`, {Email, Password}, headers_public);
}

//! Forgot Password query
//@access public
export const ForgotPassQuery = async (Email) => {
  return await axios.post(`${host}/api/auth/forgot_password`, {Email}, headers_public);
}

//! Check reset password code.
//@access public
export const CheckresetPassCode = async (verifyCode) => {
  return await axios.post(`${host}/api/auth/check_reset_code`, {reset_pass_code: verifyCode}, headers_public);
}

//! Reset the password.
//@access public
export const ResetPasswordQuery = async (Password, ConfPass, Email) => {
  return await axios.post(`${host}/api/auth/reset_password`, {Password, ConfPass, Email}, headers_public);
}

//! Register the patients of the user.
//@access public
export const RegisterPatientsQuery = async (Email, First_Names, Last_Names, Blood_Type, Gender, Weight, Height, Selected_Date) => {
  return await axios.post(`${host}/api/auth/register_patients`, {Email, First_Names, Last_Names, Blood_Type, Gender, Weight, Height, Selected_Date}, headers_public);
}

//! Get the patients of the Responsible.
//@access public
export const getPatients = async (Email) => {
  return await axios.post(`${host}/api/responsible/get_patients`, { Email }, headers_public);
}

//! Get only one patient of the Responsible.
//@access public
export const getPatient = async (PatientId) => {
  return await axios.post(`${host}/api/responsible/get_patient`, { PatientId }, headers_public);
}

//! Get the Immunization Record of the Patient of the Responsible.
//@access public
export const getImmunizationRecord = async (Patient_id) => {
  return await axios.post(`${host}/api/responsible/get_immunization_record`, {Patient_id}, headers_public);
}

//! get ALL immunization records
//@access public
export const getAllImmunizationRecords = async () => {
  return await axios.get(`${host}/api/responsible/get_all_immunization_record`, headers_public);
}

//! Create the Immunization Record.
//@access public
export const createImmunizationRecord = async (Patient_id, isChecked) => {
  return await axios.post(`${host}/api/responsible/create_immunization_record`, {Patient_id, PatientVaccines: isChecked}, headers_public);
}

//! Get the Medical Records of the Responsible
//@access Private
export const getMedicalRecords = async (jwtToken, Patient_id) => {
  return await axios.post(`${host}/api/appointment/get_medical_records`, {Patient_id}, get_private_headers(jwtToken))
}

//! Create the request appointment for the Patient.
//@access Private
export const requestMedicalAppointment = async (jwtToken, Patient_Code, Doctor_id, Week, Description) => {
  return await axios.post(`${host}/api/appointment/request_medical_appointment`, {Patient_Code, Doctor_id, Week, Description}, get_private_headers(jwtToken));
}

//! Get the appointments of the Patient.
//@access Private
export const getMedicalAppointments = async (jwtToken, Patient_Code, Hour) => {
  return await axios.post(`${host}/api/appointment/get_medical_appointments`, {Patient_Code, Hour}, get_private_headers(jwtToken));
}

//! Get the prescriptions of the patient.
//@access Private
export const getMedicalPrescriptions = async (jwtToken, Patient_id) => {
  return await axios.post(`${host}/api/responsible/get_medical_prescriptions`, {Patient_id}, get_private_headers(jwtToken));
}

//! Get a single medical appointment of the Patient.
//@access Private
export const getSingleMedicalAppmt = async (jwtToken, Appointment_id) => {
  return await axios.post(`${host}/api/appointment/get_single_medical_appmt`, {Appointment_id}, get_private_headers(jwtToken));
}

//! Get a single medical appointment record of the Patient.
//@access Private
export const getSingleMedicalAppmtRecord = async (jwtToken, Record_Code) => {
  return await axios.post(`${host}/api/appointment/get_single_medical_appmt_record`, {Record_Code}, get_private_headers(jwtToken));
}

//! Get the medicines asigned in a single appointment for the Patient.
//@access Private
export const getMedicinesAppmtResult = async (jwtToken, Record_Code) => {
  return await axios.post(`${host}/api/appointment/get_medicines_appmt_result`, {Record_Code}, get_private_headers(jwtToken));
}

//! Get the Events in an array of the Patient.
//@access Private
export const getCalendarEvents = async (jwtToken, Patient_id) => {
  return await axios.post(`${host}/api/responsible/get_calendar_events`, {Patient_id}, get_private_headers(jwtToken));
}

//! Get the Notifications of the patient
//@access Private
export const getNotifications = async (jwtToken, Patient_id) => {
  return await axios.post(`${host}/api/responsible/get_notifications`, {Patient_id}, get_private_headers(jwtToken));
}

//! Delete the Notifications of the patient
//@access Private
export const deleteNotification = async (jwtToken, Notification_id, Type) => {
  return await axios.post(`${host}/api/responsible/delete_notification`, {Notification_id, Type}, get_private_headers(jwtToken));
}