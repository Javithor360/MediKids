import { createContext, useContext, useState } from "react";
import {
  getDoctorInfo,
  getActivePatients,
  getAllApointments,
  newMedicalRecordEntry,
  getPatientAppointmentWithDoctor,
  getResponsibleInfo,
  getPatientMedicalRecords,
  getPatientMedicalPrescription,
  setPatientMedicalPrescription,
  editPatientMedicalPrescription,
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
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [medicalPrescriptions, setMedicalPrescriptions] = useState([]);

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

  const CreateMedicalRecordEntry = async (data, arr_press) => {
    try {
      return await newMedicalRecordEntry(
        {
          Patient_id: data.Patient_id,
          Doctor_id: data.Doctor_id,
          // AÑADIR EL ID DEL "APPOINTMENT" QUE SE ESTÁ ATENDIENDO -> URGENTEE
          height: data.height,
          weight: data.weight,
          temperature: data.temperature,
          notes: data.notes,
          HtmlNotes: data.HtmlNotes,
          Array_Prescriptions: arr_press,
        },
        PrivateConfig
      );
    } catch (error) {
      console.log(error);
    }
  };

  const EndMedicalAppointment = async (
    medicalRecord,
    medicalPrescript,
    scheAppoint
  ) => {
    try {
      CreateMedicalRecordEntry(medicalRecord, [
        "res.data.Array_Prescriptions",
        "res.data.Array_Prescriptions",
      ]);
      AddMedicalPrescription(medicalPrescript);
      EditMedicalPrescription(medicalPrescript);
      // No entendí para que sirven o como se obtienen los datos del Array_Prescriptions
      // const res = await AddMedicalPrescription(medicalPrescript);
      // CreateMedicalRecordEntry(medicalRecord, res.data.Array_Prescriptions);
    } catch (error) {
      console.log(error);
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

  const AddMedicalPrescription = async (body) => {
    try {
      if (
        body.medicalPrescript.new_prescriptions.length > 0 &&
        body.medicalPrescript.new_prescriptions[0].hasSelectedYes === true
      ) {
        const new_prescriptions = body.medicalPrescript.new_prescriptions.map(
          (m) => {
            const { hasSelectedYes, ...rest } = m;
            return rest;
          }
        );
        return await setPatientMedicalPrescription(
          {
            Patient_id: body.medicalPrescript.Patient_id,
            Doctor_id: body.medicalPrescript.Doctor_id,
            new_prescriptions: new_prescriptions,
          },
          PrivateConfig
        );
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const EditMedicalPrescription = async (body) => {
    try {
      if (body.medicalPrescript.edited_prescriptions.length > 0) {
        await editPatientMedicalPrescription({
          Patient_id: body.medicalPrescript.Patient_id,
          Doctor_id: body.medicalPrescript.Doctor_id,
          edited_prescriptions: body.medicalPrescript.edited_prescriptions,
        });
      }
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
        medicalRecords,
        setMedicalRecords,
        medicalPrescriptions,
        setMedicalPrescriptions,
        DoctorInfoQuery,
        ActivePatientsQuery,
        AppointmentsQuery,
        PatientsClassificator,
        CreateMedicalRecordEntry,
        EndMedicalAppointment,
        PatientAppointmentWithDoctor,
        ResponsibleInformation,
        PatientMedicalRecords,
        PatientMedicalPrescriptions,
        AddMedicalPrescription,
        EditMedicalPrescription
      }}
    >
      {children}
    </dashContext.Provider>
  );
};
