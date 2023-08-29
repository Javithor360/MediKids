import React from 'react'
import { RiDoubleQuotesL } from 'react-icons/ri'
import { CalendarPicker } from '../Patients/PatientsComponents/CalendarPicker'
import TimeSlider from '../Patients/PatientsComponents/TimeSlider'
export const AppointmentRequestsDetails = () => {
  return (
    <>
        <div className="w-fit border-b-[0.1875rem] border-b-[#a375ff] mb-12 self-center mx-auto block">
            <h1 className="text-[#a375ff] font-bold text-3xl text-center">
                Detalles de la solicitud
            </h1>
        </div>
        <div className="w-fit mb-7 block">
            <h2 className="text-[#5AB1BB] font-bold text-center">
                1. Datos personales
            </h2>
        </div>
        <div className='mx-auto w-[85%] h-fit p-7 px-14 rounded-2xl shadow-md border border-[#bbbbbb] border-t-8 border-t-[#5AB1BB]'>
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
                            <h3 className='text-[#5AB1BB]'>Paciente: </h3>
                            <p>Javier Enrique Mejía Flores</p>
                        </div>
                    </div>
                    <div className='w-[1px] h-[2rem] bg-[#bbbbbb] self-center'></div>
                    <div className='flex flex-col w-[25%] justify-center items-center'>
                        <h3 className='text-[#5AB1BB]'>Edad: </h3>
                        <p>13 años</p>
                    </div>
                    <div className='w-[1px] h-[2rem] bg-[#bbbbbb] self-center'></div>
                    <div className='w-[25%] flex flex-col justify-center items-center'>
                        <h3 className='text-[#5AB1BB]'>Género: </h3>
                        <p>Masculino</p>
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
                            <h3 className='text-[#5AB1BB]'>Encargado: </h3>
                            <p>Alvin Josue Melendez Serrano</p>
                        </div>
                    </div>
                    <div className='w-[1px] h-[2rem] bg-[#bbbbbb] self-center'></div>
                    <div className='w-[25%] flex flex-col justify-center items-center'>
                        <h3 className='text-[#5AB1BB]'>Email: </h3>
                        <p>kldfjadskñf@gmail.com</p>
                    </div>
                    <div className='w-[1px] h-[2rem] bg-[#bbbbbb] self-center'></div>
                    <div className='w-[25%] flex flex-col justify-center items-center'>
                        <h3 className='text-[#5AB1BB]'>Telefono: </h3>
                        <p>7070-7070</p>
                    </div>       
                </div>            
            </div>
        </div>
        <div className="w-fit mt-12 mb-7 block">
            <h2 className="text-[#5AB1BB] font-bold text-center">
                2. Motivo de la cita
            </h2>
        </div>
        <div className='mx-auto w-[85%] h-fit p-7 px-14 rounded-2xl shadow-md border border-[#bbbbbb] border-t-8 border-t-[#5AB1BB]'>
            <p className='flex flex-row'><RiDoubleQuotesL className='text-[#5AB1BB] text-[1.2rem]'/> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates vero voluptatibus natus doloribus quasi laborum quidem sequi ea ad voluptatum. Perspiciatis nostrum molestias delectus cumque amet esse minima, aut eos!</p>
        </div>
        <div className="w-fit mt-12 mb-2 block">
            <h2 className="text-[#5AB1BB] font-bold text-center">
                3. Establecer calendarización
            </h2>
        </div>
        <p>Si va a aceptar la cita y confirmar la solicitud, complete lo siguiente:</p>

        <div className='mt-9 mx-auto w-[85%] h-fit p-7 px-14 rounded-2xl shadow-md border border-[#bbbbbb] border-t-8 border-t-[#5AB1BB] pb-7'>

            <h3 className='text-[#5AB1BB] mt-5'>Por favor elija una fecha entre el rango solicitado por el encargado del paciente: </h3>
            <div className='bg-[#5AB1BB] border border-[#bbbbbb] rounded-2xl p-2 w-fit font-bold text-[white] mt-5'>Semana del 31 al 07 de agosto</div>

                <CalendarPicker />

            <h3 className='text-[#5AB1BB] mt-5'>Elija un horario disponible: </h3>
                <TimeSlider />
        </div>
        <div className='w-[80%] flex flex-row gap-5 justify-center mx-auto'>
            <button>Aceptar</button>
            <button>Rechazar</button>
        </div>
    </>
  )
}
