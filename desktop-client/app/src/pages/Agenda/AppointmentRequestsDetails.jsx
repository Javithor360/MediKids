import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { VscLoading } from "react-icons/vsc";
import BarLoader from "react-spinners/BarLoader";
import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineWarning } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiCalendar2Fill, RiTimeFill } from "react-icons/ri";

import Modal from "../../components/Modal";
import TimeSlider from "../Patients/PatientsComponents/TimeSlider";
import { useDash } from "../../context/DoctorContext";
import { CalendarPicker } from "../Patients/PatientsComponents/CalendarPicker";
import { getPatientAge } from "../../utils/Functions";

export const AppointmentRequestsDetails = () => {
  const [chargin, setChargin] = useState(false);
  const [screenChargin, setScreenChargin] = useState(false);
  const [declinedntAppmt, setDeclinedntAppmt] = useState(null);

  let navigate = useNavigate();
  const location = useLocation();
  const restrictedDays = true;
  const { appointment, patient, responsible } = location.state || {};
  const [noShowBtn, setNoShowBtn] = useState(null);
  const { AcceptAppointmentRequest, DeclineAppointmentRequest } = useDash();

  const [date, setDate] = useState(null);
  const [hour, setHour] = useState(null);

  const [active, setActive] = useState(false);
  const [activeError, setActiveError] = useState(false);
  const [isDenied, setIsDenied] = useState();

  const initialDate = JSON.parse(appointment.Week).startDay;
  const endDate = JSON.parse(appointment.Week).finalDay;
  const formattedInitialDate = initialDate.split("/").reverse().join("-")
  const formattedEndDate = endDate.split("/").reverse().join("-")
  
  const initialDateObj = new Date(`${formattedInitialDate}T00:00:00`);
  const endDateObj = new Date(`${formattedEndDate}T00:00:00`);

  const toggle = () => {
    setActive(!active);
  };

  const toggleError = () => {
    setActiveError(!activeError);
  };

  const handleClick = () => {
    try {
      if (!date || !hour) {
        toggleError();
      } else {
        toggle();
        setIsDenied(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmation = async () => {
    try {
      await AcceptAppointmentRequest({
        id: appointment.id,
        ChosenDate: new Date(date).toISOString().split("T")[0],
        Hour: hour,
        Patient_id: patient.id,
        Doctor_id: JSON.parse(localStorage.getItem('userSession')).id
      });
      setDeclinedntAppmt(true);
      setChargin(true)
      setTimeout(() => {
        toggle();
        setScreenChargin(true);
        setTimeout(() => {
          navigate(-1);
        }, 3000);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecline = async () => {
    try {
      await DeclineAppointmentRequest({
        id: appointment.id,
        Patient_id: patient.id,
        Doctor_id: JSON.parse(localStorage.getItem('userSession')).id
      });
      setDeclinedntAppmt(false)
      setChargin(true)
      setTimeout(() => {
        toggle();
        setScreenChargin(true);
        setTimeout(() => {
          navigate(-1);
        }, 3000);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleChangeData=(noShowBtn)=>{
    setNoShowBtn(noShowBtn);
  }
  return (
    <>
      {
        screenChargin === true ?
          <div className="h-full w-full flex flex-col gap-4 items-center justify-center">
            {
              declinedntAppmt ?
              <img className="w-[15%] h-auto" src={require('../../assets/icons/acepted.png')} alt="" />
              : 
              <img className="w-[15%] h-auto" src={require('../../assets/icons/denied.png')} alt="" />
            }
            <p className="text-[#707070] text-[1.1rem] font-semibold">La cita ha sido {declinedntAppmt ? <span>aceptada</span> : <span>rechazada</span>}</p>
            <BarLoader color="#707070" />
          </div>
          :
          <>
            <div className="w-fit border-b-[0.1875rem] border-b-[#a375ff] mb-12 self-center mx-auto block">
              <h1 className="text-[#a375ff] font-bold text-3xl text-center">
                Detalles de la solicitud
              </h1>
            </div>
            <div className="block w-fit mb-7">
              <h2 className="text-[#707070] font-bold text-center">
                1. Datos personales
              </h2>
            </div>
            <div className="mx-auto w-[85%] h-fit p-7 px-14 rounded-2xl shadow-md border border-[#bbbbbb] border-t-8 border-t-[#bbbadc]">
              <div>
                <div className="flex flex-row gap-7">
                  <div className="w-[50%] flex flex-row gap-7 justify-center">
                    <div className="avatar">
                      <div className="w-12 h-12 mask mask-squircle">
                        <img
                          src={
                            patient?.Profile_Photo_Url ||
                            require("../../assets/template/avatar.jpg")
                          }
                          alt="pfp"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-[#000000] font-semibold">Paciente: </p>
                      <p className="text-[#707070]">{`${patient.First_Names} ${patient.Last_Names}`}</p>
                    </div>
                  </div>
                  <div className="w-[1px] h-[2rem] bg-[#bbbbbb] self-center"></div>
                  <div className="flex flex-col w-[25%] justify-center items-center">
                    <p className="text-[#000000] font-semibold">Edad: </p>
                    <p className="text-[#707070]">{getPatientAge(patient.Age, patient.Birthdate)}</p>
                  </div>
                  <div className="w-[1px] h-[2rem] bg-[#bbbbbb] self-center"></div>
                  <div className="w-[25%] flex flex-col justify-center items-center">
                    <p className="text-[#000000] font-semibold">Género: </p>
                    <p className="text-[#707070]">
                      {patient.Gender === 1 ? "Masculino" : "Femenino"}
                    </p>
                  </div>
                </div>
                <div className="w-[90%] h-[1px] bg-[#bbbbbb] self-center mx-auto my-[2rem]"></div>
                <div className="flex flex-row gap-7">
                  <div className="w-[50%] flex flex-row gap-7 justify-center">
                    <div className="avatar">
                      <div className="w-12 h-12 mask mask-squircle">
                        <img
                          src={
                            responsible?.Profile_Photo_Url ||
                            require("../../assets/template/avatar.jpg")
                          }
                          alt="pfp"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-[#000000] font-semibold">Encargado: </p>
                      <p className="text-[#707070]">{`${responsible.First_Names} ${responsible.Last_Names}`}</p>
                    </div>
                  </div>
                  <div className="w-[1px] h-[2rem] bg-[#bbbbbb] self-center"></div>
                  <div className="w-[25%] flex flex-col justify-center items-center">
                    <p className="text-[#000000] font-semibold">Email: </p>
                    <p className="text-[#707070]">{responsible.Email}</p>
                  </div>
                  <div className="w-[1px] h-[2rem] bg-[#bbbbbb] self-center"></div>
                  <div className="w-[25%] flex flex-col justify-center items-center">
                    <p className="text-[#000000] font-semibold">Telefono: </p>
                    <p className="text-[#707070]">{responsible.Phone}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="block mt-12 w-fit mb-7">
              <h2 className="text-[#707070] font-bold text-center">
                2. Motivo de la cita
              </h2>
            </div>
            <div className="mx-auto w-[85%] h-fit p-7 px-14 rounded-2xl shadow-md border border-[#bbbbbb] border-t-8 border-t-[#bbbadc]">
              <p className="flex flex-row">{appointment.Description}</p>
            </div>
            <div className="block mt-12 mb-2 w-fit">
              <h2 className="text-[#707070] font-bold text-center">
                3. Establecer calendarización
              </h2>
            </div>
            <p className="text-[#707070]">
              En el caso de que la solicitud de la cita sea acepatada, por favor
              complete la siguiente información:
            </p>

            <div className="mt-9 mx-auto w-[85%] h-fit p-7 px-14 rounded-2xl shadow-md border border-[#bbbbbb] border-t-8 border-t-[#bbbadc] pb-16">
              <div className="text-[#707070] mt-5 flex flex-row items-start gap-3">
                <RiCalendar2Fill className="mt-[.3rem] text-[1.2rem]" />
                <p className="text-[#707070] text-[1.1rem] font-semibold">
                  Por favor elija una fecha entre el rango solicitado por el encargado
                  del paciente:
                </p>
              </div>
              <div className="ml-7 bg-[#a6a5c2] border border-[#aaaaaa] rounded-2xl p-2 w-fit text-[white] mt-5">
                <b>Rango de días:</b>{" "}
                <span>{determineWeekRange(JSON.parse(appointment.Week))}</span>
              </div>
              <CalendarPicker setDate={setDate} restrictedDays={restrictedDays} formattedInitialDate={initialDateObj} formattedEndDate={endDateObj} {...(restrictedDays ? { handleChangeData: handleChangeData } : null)}/>
              <div className="text-[#707070] mt-9 flex flex-row items-start gap-3">
                <RiTimeFill className="mt-[.3rem] text-[1.2rem]" />
                <p className="text-[#707070] text-[1.1rem] font-semibold">
                  Por favor elija una horario según su disponibilidad
                </p>
              </div>
              <TimeSlider setHour={setHour} noShowBtn={noShowBtn}/>
            </div>
            <div className="block mt-12 mb-2 w-fit">
              <h2 className="text-[#707070] font-bold text-center">
                4. Confirmación
              </h2>
            </div>
            <p className="text-[#707070] w-[85%]">
              Luego de haber evaluado todos los aspectos anteriores, debe confirmar o
              rechazar la cita. Si es aceptada, automaticamente se le agendará en su
              calendario y se le notificará al paciente la fecha exacta y la hora
            </p>
            <div className="mt-12 w-[85%] flex flex-row gap-5 justify-center mx-auto">
              <button
                className="btn btn-active border border-[#c6c6c6] bg-[#a49bb7] hover:bg-[#9890a9] text-white gap-3"
                onClick={() => navigate(-1)}
              >
                <IoMdArrowRoundBack className="w-4 h-4" />
                Regresar
              </button>
              {
                noShowBtn ?
                null
                :
                <button
                  className="btn btn-active border border-[#c6c6c6] bg-[#53de66] hover:bg-[#4ac65b] text-white gap-3"
                  onClick={handleClick}
                >
                    <AiFillCheckCircle className="w-4 h-4" />
                    Aceptar
                </button>
              }
              <button
                className="btn btn-active border border-[#c6c6c6] bg-red-400 hover:bg-[#da6e6e]  text-white gap-3"
                onClick={() => {
                  toggle();
                  setIsDenied(true);
                }}
              >
                <AiFillCloseCircle className="w-4 h-4" />
                Rechazar
              </button>
            </div>
          </>
      }
      
      {toggle && (
        <Modal active={active} toggle={toggle} onRequestClose={toggle}>
          <div className="h-[100%] w-[38rem] p-[3rem]">
            <div className="border-b border-b-[#c6c6c6] mb-[1rem]">
              <p className="text-[1.6rem] text-[#A375FF] font-semibold">
                Confimación
              </p>
            </div>
            {isDenied === false ? (
              <>
                <div className="w-[100%] mx-auto">
                  <p>
                    Está seguro de aceptar la solicitud de cita con los
                    siguientes datos?
                  </p>
                  <div className="mx-auto mt-[1rem] w-full flex flex-row bg-[#D8D7FE] rounded-sm">
                    <div className="w-[2%] bg-[#A375FF]"> </div>
                    <div className="w-[98%] flex flex-col gap-3 p-[1rem]">
                      <div>
                        <span className="font-semibold">Paciente: </span>
                        <span className="text-[#707070]">
                          {`${patient.First_Names} ${patient.Last_Names}`}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold">Responsable: </span>
                        <span className="text-[#707070]">
                          {`${responsible.First_Names} ${responsible.Last_Names}`}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold">Fecha: </span>
                        <span className="text-[#707070]">
                          {new Date(date).toISOString().split("T")[0]}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold">Hora: </span>
                        <span className="text-[#707070]">{hour}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-[1rem] border-t border-t-[#c6c6c6] mt-[1rem] flex items-end justify-end gap-5">
                  <button
                    className="btn btn-active btn-sm border border-[#c6c6c6] bg-[#a49bb7] hover:bg-[#9890a9] text-white gap-3"
                    onClick={handleConfirmation}
                  >
                    {chargin === true ? (
                      <>
                        <VscLoading className="animate-spin w-4 h-4" />
                        Procesando
                      </>
                    ) : (
                      <>
                        <AiFillCheckCircle className="w-4 h-4" />
                        Si, confirmar
                      </>
                    )}
                  </button>
                  <button
                    className="btn btn-active border btn-sm border-[#c6c6c6] bg-[#767082] hover:bg-[#716a81] text-white gap-3"
                    onClick={() => {
                      toggle();
                    }}
                  >
                    <AiFillCloseCircle className="w-4 h-4" />
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-[100%] h-[100%] mx-auto rounded-sm flex bg-[#D8D7FE]">
                  <div className="w-[2%] bg-[#A375FF]"> </div>
                  <div className="w-[98%] h-full p-[1rem]">
                    <p className="text-[#707070]">
                      Está a punto de rechazar la cita con el paciente{" "}
                      <b>{`${patient.First_Names} ${patient.Last_Names}`}</b>.
                      Está acción no se puede deshacer pero el paciente podrá
                      solicitar otra cita de nuevo.
                    </p>
                  </div>
                </div>
                <div className="pt-[1rem] border-t border-t-[#c6c6c6] mt-[1rem] flex items-end justify-end gap-5">
                  <button
                    className="btn btn-active btn-sm border border-[#c6c6c6] bg-[#a49bb7] hover:bg-[#9890a9] text-white gap-3"
                    onClick={handleDecline}
                  >
                    {chargin === true ? (
                      <>
                        <VscLoading className="animate-spin w-4 h-4" />
                        Procesando
                      </>
                    ) : (
                      <>
                        <AiFillCheckCircle className="w-4 h-4" />
                        Rechazar
                      </>
                    )}
                  </button>
                  <button
                    className="btn btn-active border btn-sm border-[#c6c6c6] bg-[#767082] hover:bg-[#716a81] text-white gap-3"
                    onClick={() => {
                      toggle();
                    }}
                  >
                    <AiFillCloseCircle className="w-4 h-4" />
                    Cancelar
                  </button>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
      {toggleError && (
        <Modal
          active={activeError}
          toggle={toggleError}
          onRequestClose={toggleError}
        >
        <div className="h-[100%] w-[38rem] p-[3rem]">
          <div className="border-b border-b-[#c6c6c6] mb-[1rem]">
            <p className="text-[1.6rem] text-red-400 font-semibold flex flex-row gap-2 items-center">
              <AiOutlineWarning className='text-red-400' /> Advertencia
            </p>
          </div>
          <div className="w-[100%] h-[100%] mx-auto rounded-sm flex bg-[#ffe9d9]">
            <div className="w-[2%] bg-red-400"> </div>
            <div className="w-[98%] h-full p-[1rem]">
              <p className="text-[#707070]">
                Asegúrate que los campos de selección de fecha y horario estén completos antes de proceder.
              </p>
            </div>
          </div>
        </div>
        </Modal>
      )}
    </>
  );
};

function determineWeekRange(weekDate) {
  const startDay = weekDate.startDay.split("/");
  const finalDay = weekDate.finalDay.split("/");
  let weekString = "";

  const months = {
    "01": "enero",
    "02": "febrero",
    "03": "marzo",
    "04": "abril",
    "05": "mayo",
    "06": "junio",
    "07": "julio",
    "08": "agosto",
    "09": "septiembre",
    10: "octubre",
    11: "noviembre",
    12: "diciembre",
  };

  if (startDay[1] === finalDay[1]) {
    weekString = `Semana del ${startDay[0]} al ${finalDay[0]} de ${
      months[startDay[1]]
    }`;
  } else {
    weekString = `Semana del ${startDay[0]} de ${months[startDay[1]]} al ${
      finalDay[0]
    } de ${months[finalDay[1]]}`;
  }
  return weekString;
}
