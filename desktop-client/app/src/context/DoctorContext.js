import { createContext, useContext, useState } from "react";
import {
  getDoctorInfo,
  getActivePatients,
  getAllApointments,
  newMedicalRecordEntry,
  getPatientAppointmentWithDoctor,
  getResponsibleInfo
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

  const [nextAppointment, setNextAppointment] = useState({});
  const [responsibleInfo, setResponsibleInfo] = useState({});
  
  const PrivateConfig = {
    header: {
      "Content-Type": "application/json",
    },
  };

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
            (appointment) => appointment.Patient_id === patient.id
          )
        )
      );

      setOldPatients(
        actPats.data.body.filter(
          (patient) =>
            !allApo.data.body.some(
              (appointment) => appointment.Patient_id === patient.id
            )
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const CreateMedicalRecordEntry = async (data) => {
    try {
      return await newMedicalRecordEntry({
        height: data.height,
        weight: data.weight,
        temperature: data.temperature,
        notes: data.notes,
        Patient_id: data.Patient_id
      }, PrivateConfig);
    } catch (error) {
      console.log(error)
    }
  }

  const EndMedicalAppointment = async (medicalRecord, medicalPrescript, scheAppoint) => {
    try {
      CreateMedicalRecordEntry(medicalRecord);
    } catch (error) {
      console.log(error)
    }
  }

  const PatientAppointmentWithDoctor = async (Patient_id, Doctor_id) => {
    try {
      const res = await getPatientAppointmentWithDoctor({ Patient_id, Doctor_id}, PrivateConfig);
      setNextAppointment(res.data.body[0]);
    } catch (error) {
      console.log(error)
    }
  }

  const ResponsibleInformation = async (Responsible_id) => {
    try {
      const res = await getResponsibleInfo(Responsible_id, PrivateConfig);
      setResponsibleInfo(res.data.body[0]);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <dashContext.Provider
      value={{
        Info,
        setInfo,
        activePatients,
        setActivePatients,
        oldPatients,
        setOldPatients,
        appointments,
        setAppointments,
        nextAppointment,
        setNextAppointment,
        responsibleInfo,
        setResponsibleInfo,
        DoctorInfoQuery,
        ActivePatientsQuery,
        AppointmentsQuery,
        PatientsClassificator,
        CreateMedicalRecordEntry,
        EndMedicalAppointment,
        PatientAppointmentWithDoctor,
        ResponsibleInformation
      }}
    >
      {children}
    </dashContext.Provider>
  );
};
