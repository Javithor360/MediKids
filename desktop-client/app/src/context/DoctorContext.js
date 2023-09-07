import { createContext, useContext, useEffect, useState } from "react";
import {
  getDoctorInfo,
  getActivePatients,
  getAllApointments,
  getPatientAppointmentWithDoctor,
  getResponsibleInfo,
  getPatientMedicalRecords,
  getPatientVaccines,
  getPatientMedicalPrescription,
  appointmentRequests,
  getResponsibles,
  acceptAppointment,
  declineAppointment,
  appointmentsHistory,
  getDoctors,
  getPatients,
  getAnnouncements,
  endMedicalAppointment,
} from "../api/queries";

const dashContext = createContext();

export const useDash = () => {
  const Context = useContext(dashContext);
  return Context;
};

export const DoctorProvider = ({ children }) => {
  const [Info, setInfo] = useState({});

  const [assignedPatients, setAssignedPatients] = useState([]);
  const [activePatients, setActivePatients] = useState([]);
  const [oldPatients, setOldPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [appointmentRequest, setAppointmentRequest] = useState([]);
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const [nextAppointment, setNextAppointment] = useState({});
  const [responsibleInfo, setResponsibleInfo] = useState({});
  const [responsibles, setResponsibles] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [vaccines, setVaccines] = useState({});
  const [medicalPrescriptions, setMedicalPrescriptions] = useState([]);

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const [errorMessage, setErrorMessage] = useState([""]);

  const PrivateConfig = {
    header: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    console.log(nextAppointment)
  }, [nextAppointment])

  const DoctorInfoQuery = async (Doctor_id) => {
    try {
      const query = await getDoctorInfo(Doctor_id, PrivateConfig);
      setInfo(query.data.body);
    } catch (error) {
      console.log(error);
    }
  };

  const ActivePatientsQuery = async (Doctor_id) => {
    try {
      const res = await getActivePatients(Doctor_id, PrivateConfig);
      setAssignedPatients(res.data.body);
    } catch (error) {
      console.log(error);
    }
  };

  const AppointmentsQuery = async (Doctor_id) => {
    try {
      const res = await getAllApointments(Doctor_id, PrivateConfig);
      setAppointments(res.data.body);
    } catch (error) {
      console.log(error);
    }
  };

  const PatientsClassificator = async (Doctor_id) => {
    try {
      const actPats = await getActivePatients(Doctor_id, PrivateConfig);
      const allApo = await getAllApointments(Doctor_id, PrivateConfig);
      setActivePatients(
        actPats.data.body.filter((patient) =>
          allApo.data.body.some(
            (appointment) =>
              appointment.Patient_id === patient.id &&
              appointment.State !== 1 &&
              appointment.State !== 4
          )
        )
      );

      setOldPatients(
        actPats.data.body.filter((patient) =>
          allApo.data.body.some(
            (appointment) =>
              appointment.Patient_id === patient.id &&
              (appointment.State === 1 || appointment.State === 4) &&
              appointment.Date !== null &&
              appointment.Hour !== null
          )
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const EndMedicalAppointment = async (
    Doctor_id,
    Patient_id,
    Responsible_id,
    Appointment_id,
    medicalRecord,
    medicalPrescript,
    scheAppoint,
    togglesParams
  ) => {
    try {
      const new_prescriptions = medicalPrescript.new_prescriptions.map((m) => {
        const { hasSelectedYes, ...rest } = m;
        return rest;
      });

      await endMedicalAppointment(
        {
          Doctor_id,
          Patient_id,
          Responsible_id,
          Appointment_id,
          medical_record: {
            height: medicalRecord.height,
            weight: medicalRecord.weight,
            temperature: medicalRecord.temperature,
            notes: medicalRecord.notes,
            HtmlNotes: medicalRecord.HtmlNotes,
          },
          medical_prescription: {
            new_prescriptions,
            edited_prescriptions: medicalPrescript.edited_prescriptions,
          },
          medical_appointment: {
            Description: scheAppoint.Description,
            Date: scheAppoint.Date,
            Hour: scheAppoint.Hour,
          },
          toggles: {
            addPrescriptions: togglesParams.addPrescriptions,
            editPrescriptions: togglesParams.editPrescriptions,
            scheduleAppointment: togglesParams.scheduleAppointment,
          },
        },
        PrivateConfig
      );
      setErrorMessage([]);
    } catch (error) {
      console.log(error)
      if (error.response.data.error) { //! VALIDAR SI EL ERROR ES DEL ERRORHANDLER U OTRO
        const entries = error.response.data.error.split(",");
        setErrorMessage((prevData) => [...prevData, ...entries]);
      }
      console.error(error);
    }
  };

  const PatientAppointmentWithDoctor = async (Patient_id, Doctor_id) => {
    try {
      const res = await getPatientAppointmentWithDoctor(
        { Patient_id, Doctor_id },
        PrivateConfig
      );
      setNextAppointment(res.data.body[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const ResponsibleInformation = async (Responsible_id) => {
    try {
      const res = await getResponsibleInfo(Responsible_id, PrivateConfig);
      setResponsibleInfo(res.data.body[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const PatientMedicalRecords = async (Patient_id) => {
    try {
      const res = await getPatientMedicalRecords(Patient_id, PrivateConfig);
      setMedicalRecords(res.data.body);
    } catch (error) {
      console.log(error);
    }
  };

  const PatientVaccines = async (Patient_id) => {
    try {
      const res = await getPatientVaccines(Patient_id, PrivateConfig);
      setVaccines(res.data.body);
    } catch (error) {
      console.log(error);
    }
  };

  const PatientMedicalPrescriptions = async (Patient_id) => {
    try {
      const res = await getPatientMedicalPrescription(
        Patient_id,
        PrivateConfig
      );
      setMedicalPrescriptions(res.data.body);
    } catch (error) {
      console.log(error);
    }
  };

  const DoctorAppointmentRequests = async (Doctor_id) => {
    try {
      const res = await appointmentRequests({ Doctor_id }, PrivateConfig);
      setAppointmentRequest(res.data.body);
    } catch (error) {
      console.log(error);
    }
  };

  const ResponsiblesInfo = async () => {
    try {
      const res = await getResponsibles(PrivateConfig);
      setResponsibles(res.data.body);
    } catch (error) {
      console.log(error);
    }
  };

  const AcceptAppointmentRequest = async (data) => {
    try {
      await acceptAppointment(data, PrivateConfig);
    } catch (error) {
      console.log(error);
    }
  };

  const DeclineAppointmentRequest = async (id) => {
    try {
      await declineAppointment(id, PrivateConfig);
    } catch (error) {
      console.log(error);
    }
  };

  const AppointmentsHistory = async (Patient_id) => {
    try {
      const res = await appointmentsHistory({ Patient_id }, PrivateConfig);
      setAppointmentHistory(res.data.body);
    } catch (error) {
      console.log(error);
    }
  };

  const AllDoctors = async () => {
    try {
      const res = await getDoctors(PrivateConfig);
      setDoctors(res.data.body);
    } catch (error) {
      console.log(error);
    }
  };

  const GetAllPatients = async () => {
    try {
      const res = await getPatients(PrivateConfig);
      setPatients(res.data.body);
    } catch (error) {
      console.log(error)
    }
  }

  const GetAnnouncements = async (Doctor_id) => {
    try {
      const res = await getAnnouncements(Doctor_id, PrivateConfig);
      setAnnouncements(res.data.body.reverse());
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <dashContext.Provider
      value={{
        Info,
        setInfo,
        assignedPatients,
        setAssignedPatients,
        activePatients,
        setActivePatients,
        oldPatients,
        setOldPatients,
        appointments,
        setAppointments,
        appointmentRequest,
        setAppointmentRequest,
        nextAppointment,
        setNextAppointment,
        appointmentHistory,
        setAppointmentHistory,
        announcements,
        setAnnouncements,
        responsibleInfo,
        setResponsibleInfo,
        responsibles,
        setResponsibles,
        medicalRecords,
        setMedicalRecords,
        vaccines,
        setVaccines,
        medicalPrescriptions,
        setMedicalPrescriptions,
        doctors,
        setDoctors,
        patients,
        setPatients,
        errorMessage,
        setErrorMessage,
        DoctorInfoQuery,
        ActivePatientsQuery,
        AppointmentsQuery,
        PatientsClassificator,
        EndMedicalAppointment,
        PatientAppointmentWithDoctor,
        ResponsibleInformation,
        PatientMedicalRecords,
        PatientVaccines,
        PatientMedicalPrescriptions,
        DoctorAppointmentRequests,
        ResponsiblesInfo,
        AcceptAppointmentRequest,
        DeclineAppointmentRequest,
        AppointmentsHistory,
        AllDoctors,
        GetAllPatients,
        GetAnnouncements
      }}
    >
      {children}
    </dashContext.Provider>
  );
};
