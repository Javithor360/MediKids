import { useState } from 'react'
import { RiCalendar2Fill, RiTimeFill } from 'react-icons/ri'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'
import { CalendarPicker } from '../Patients/PatientsComponents/CalendarPicker'
import TimeSlider from '../Patients/PatientsComponents/TimeSlider'
import  Modal from '../../components/Modal'

export const AppointmentRequestsDetails = () => {
    const [date, setDate] = useState(null);
    const [hour, setHour] = useState(null);

    const [active, setActive] = useState(false);
    const [isDenied, setIsDenied] = useState();
    const toggle = () => {
      setActive(!active);
    };
  return (
    <>
        <div className="w-fit border-b-[0.1875rem] border-b-[#a375ff] mb-12 self-center mx-auto block">
            <h1 className="text-[#a375ff] font-bold text-3xl text-center">
                Detalles de la solicitud
            </h1>
        </div>
        <div className="w-fit mb-7 block">
            <h2 className="text-[#707070] font-bold text-center">
                1. Datos personales
            </h2>
        </div>
        <div className='mx-auto w-[85%] h-fit p-7 px-14 rounded-2xl shadow-md border border-[#bbbbbb] border-t-8 border-t-[#bbbadc]'>
            <div>
                <div className='flex flex-row gap-7'>
                    <div className='w-[50%] flex flex-row gap-7 justify-center'>
                        <div className="avatar">
                            <div className="w-12 h-12 mask mask-squircle">
                                <img
                                    src={
                                        // patient.Profile_Photo == "NULL"
                                        // ? require("../../assets/template/avatar.jpg")
                                        // : patient.Profile_Photo_Url
                                        require('../../assets/template/walt_jr.png')
                                    }
                                    alt="pfp"
                                />
                            </div>
                        </div>
                        <div>
                            <p className='text-[#000000] font-semibold'>Paciente: </p>
                            <p className='text-[#707070]'>Javier Enrique Mejía Flores</p>
                        </div>
                    </div>
                    <div className='w-[1px] h-[2rem] bg-[#bbbbbb] self-center'></div>
                    <div className='flex flex-col w-[25%] justify-center items-center'>
                        <p className='text-[#000000] font-semibold'>Edad: </p>
                        <p className='text-[#707070]'>13 años</p>
                    </div>
                    <div className='w-[1px] h-[2rem] bg-[#bbbbbb] self-center'></div>
                    <div className='w-[25%] flex flex-col justify-center items-center'>
                        <p className='text-[#000000] font-semibold'>Género: </p>
                        <p className='text-[#707070]'>Masculino</p>
                    </div>
                </div>
                <div className='w-[90%] h-[1px] bg-[#bbbbbb] self-center mx-auto my-[2rem]'></div>
                <div className='flex flex-row gap-7'>
                    <div className='w-[50%] flex flex-row gap-7 justify-center'>
                        <div className="avatar">
                            <div className="w-12 h-12 mask mask-squircle">
                                <img
                                    src={
                                        // patient.Profile_Photo == "NULL"
                                        // ? require("../../assets/template/avatar.jpg")
                                        // : patient.Profile_Photo_Url
                                        require('../../assets/template/avatar.jpg')
                                    }
                                    alt="pfp"
                                />
                            </div>
                        </div>
                        <div>
                            <p className='text-[#000000] font-semibold'>Encargado: </p>
                            <p className='text-[#707070]'>Alvin Josue Melendez Serrano</p>
                        </div>
                    </div>
                    <div className='w-[1px] h-[2rem] bg-[#bbbbbb] self-center'></div>
                    <div className='w-[25%] flex flex-col justify-center items-center'>
                        <p className='text-[#000000] font-semibold'>Email: </p>
                        <p className='text-[#707070]'>kldfjadskñf@gmail.com</p>
                    </div>
                    <div className='w-[1px] h-[2rem] bg-[#bbbbbb] self-center'></div>
                    <div className='w-[25%] flex flex-col justify-center items-center'>
                        <p className='text-[#000000] font-semibold'>Telefono: </p>
                        <p className='text-[#707070]'>7070-7070</p>
                    </div>       
                </div>            
            </div>
        </div>
        <div className="w-fit mt-12 mb-7 block">
            <h2 className="text-[#707070] font-bold text-center">
                2. Motivo de la cita
            </h2>
        </div>
        <div className='mx-auto w-[85%] h-fit p-7 px-14 rounded-2xl shadow-md border border-[#bbbbbb] border-t-8 border-t-[#bbbadc]'>
            <p className='flex flex-row'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates vero voluptatibus natus doloribus quasi laborum quidem sequi ea ad voluptatum. Perspiciatis nostrum molestias delectus cumque amet esse minima, aut eos!</p>
        </div>
        <div className="w-fit mt-12 mb-2 block">
            <h2 className="text-[#707070] font-bold text-center">
                3. Establecer calendarización
            </h2>
        </div>
        <p className='text-[#707070]'>En el caso de que la solicitud de la cita sea acepatada, por favor complete la siguiente información:</p>

        <div className='mt-9 mx-auto w-[85%] h-fit p-7 px-14 rounded-2xl shadow-md border border-[#bbbbbb] border-t-8 border-t-[#bbbadc] pb-16'>

            <div className='text-[#707070] mt-5 flex flex-row items-start gap-3'><RiCalendar2Fill className='mt-[.3rem] text-[1.2rem]' /><p className='text-[#707070] text-[1.1rem] font-semibold'>Por favor elija una fecha entre el rango solicitado por el encargado del paciente:</p></div>
            <div className='ml-7 bg-[#a6a5c2] border border-[#aaaaaa] rounded-2xl p-2 w-fit text-[white] mt-5'><b>Rango de días:</b> <span>Semana del 31 al 07 de agosto</span></div>
                <CalendarPicker setDate={setDate}/>
            <div className='text-[#707070] mt-9 flex flex-row items-start gap-3'><RiTimeFill className='mt-[.3rem] text-[1.2rem]' /><p className='text-[#707070] text-[1.1rem] font-semibold'>Por favor elija una horario según su disponibilidad</p></div>
                <TimeSlider setHour={setHour}/>
        </div>
        <div className="w-fit mt-12 mb-2 block">
            <h2 className="text-[#707070] font-bold text-center">
                4. Confirmación
            </h2>
        </div>
        <p className='text-[#707070] w-[85%]'>Luego de haber evaluado todos los aspectos anteriores, debe confirmar o rechazar la cita. Si es aceptada, automaticamente se le agendará en su calendario y se le notificará al paciente la fecha exacta y la hora</p>
        <div className='mt-12 w-[85%] flex flex-row gap-5 justify-center mx-auto'>
            <button className="btn btn-active border border-[#c6c6c6] bg-[#a49bb7] hover:bg-[#9890a9] text-white gap-3" 
                onClick={() => {
                    toggle();
                    setIsDenied(false);
                }}
            >
                <AiFillCheckCircle className='w-4 h-4'/>
                Aceptar
            </button>
            <button className="btn btn-active border border-[#c6c6c6] bg-red-400 hover:bg-[#da6e6e]  text-white gap-3"
                onClick={() => {
                    toggle();
                    setIsDenied(true);
                }}
            >
                <AiFillCloseCircle className='w-4 h-4'/>
                Rechazar
            </button>
        </div>
        {toggle && (
            <Modal
                active={active}
                toggle={toggle}
                onRequestClose={toggle}
            >
            <div className='h-[100%] w-[38rem] p-[3rem]'>
                <div className='border-b border-b-[#c6c6c6] mb-[1rem]'>
                    <p className='text-[1.6rem] text-[#A375FF] font-semibold'>Confimación</p>
                </div>
                {
                    isDenied === false ?
                    <>
                        <div className='w-[100%] mx-auto'>
                            <p>Está seguro de aceptar la solicitud de cita con los siguientes datos?</p>
                            <div className='mx-auto mt-[1rem] w-full flex flex-row bg-[#D8D7FE] rounded-sm'>
                                <div className='w-[2%] bg-[#A375FF]'> </div>
                                <div className='w-[98%] flex flex-col gap-3 p-[1rem]'>
                                    <div>
                                        <span className='font-semibold'>Paciente: </span> 
                                        <span className='text-[#707070]'>Javier Enrique Mejía Flores</span>
                                    </div>
                                    <div>
                                        <span className='font-semibold'>Responsable: </span> 
                                        <span className='text-[#707070]'>Alvin Josué Melendez Serrano</span>
                                    </div>
                                    <div>
                                        <span className='font-semibold'>Fecha: </span> 
                                        <span className='text-[#707070]'>20/08/2024</span>
                                    </div>
                                    <div>
                                        <span className='font-semibold'>Hora: </span> 
                                        <span className='text-[#707070]'>13:00:00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='pt-[1rem] border-t border-t-[#c6c6c6] mt-[1rem] flex items-end justify-end gap-5'>
                            <button className="btn btn-active btn-sm border border-[#c6c6c6] bg-[#a49bb7] hover:bg-[#9890a9] text-white gap-3" 
                                onClick={() => {
                                    toggle();
                                }}
                            >
                                <AiFillCheckCircle className='w-4 h-4'/>
                                Si, confirmar
                            </button>
                            <button className="btn btn-active border btn-sm border-[#c6c6c6] bg-[#767082] hover:bg-[#716a81] text-white gap-3" 
                                onClick={() => {
                                    toggle();
                                }}
                            >
                                <AiFillCloseCircle className='w-4 h-4'/>
                                Cancelar
                            </button>
                        </div>
                    </>
                    :
                    <>
                        <div className='w-[100%] h-[100%] mx-auto rounded-sm flex bg-[#D8D7FE]'>
                            <div className='w-[2%] bg-[#A375FF]'> </div>
                            <div className='w-[98%] h-full p-[1rem]'>
                                <p className='text-[#707070]'>Está a punto de rechazar la cita con el paciente <b>Alvin Josué Mélendez Serrano</b>. Está acción no se puede deshacer pero el paciente podrá solicitar otra cita de nuevo.</p>
                            </div>
                        </div>
                        <div className='pt-[1rem] border-t border-t-[#c6c6c6] mt-[1rem] flex items-end justify-end gap-5'>
                            <button className="btn btn-active btn-sm border border-[#c6c6c6] bg-[#a49bb7] hover:bg-[#9890a9] text-white gap-3" 
                                onClick={() => {
                                    toggle();
                                }}
                            >
                                <AiFillCheckCircle className='w-4 h-4'/>
                                Rechazar
                            </button>
                            <button className="btn btn-active border btn-sm border-[#c6c6c6] bg-[#767082] hover:bg-[#716a81] text-white gap-3" 
                                onClick={() => {
                                    toggle();
                                }}
                            >
                                <AiFillCloseCircle className='w-4 h-4'/>
                                Cancelar
                            </button>
                        </div>
                    </>
                }
            </div>
            </Modal>
        )}
    </>
  )
}
