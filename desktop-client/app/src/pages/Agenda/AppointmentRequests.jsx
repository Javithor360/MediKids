import { useState  } from 'react'
import { Link } from 'react-router-dom'
import PropagateLoader from "react-spinners/PropagateLoader";

export const AppointmentRequests = () => {
    const [loadingScreen, setLoadingScreen] = useState(true)
    const [requestsFromDB, serRequestsFromDB] = useState(true)
    setTimeout(() => {
        setLoadingScreen(false);
    }, 3000);
  return (
    <div className='h-full w-full'>
        {
        loadingScreen === true ?
            <div className='w-full h-full justify-center items-center flex'>
                <PropagateLoader 
                    color="#a375ff"
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
            :
            <>
            {   
                requestsFromDB === true ? //validation with the array length...
                    <div>
                        <div className="w-fit border-b-[0.1875rem] border-b-[#a375ff] mb-12">
                            <h1 className="text-[#a375ff] font-bold text-3xl">
                                Solicitudes de cita
                            </h1>
                        </div>
                        <div className="overflow-x-auto w-[90%] rounded-lg border border-[#c6c6c6] mx-auto shadow-md">
                            <table className="table w-full">
                                <thead className="bg-[#a375ff] text-white">
                                <tr className="text-center">
                                    <th className="border-b border-r border-[#BBBBBB]">ID</th>
                                    <th className="border-b border-r border-[#BBBBBB]">Paciente</th>
                                    <th className="border-b border-r border-[#BBBBBB]">Encargado</th>
                                    <th className="border-b border-[#BBBBBB]">Detalles</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-center">
                                        <td className="border-r border-[#BBBBBB]">
                                            <span className='font-bold text-[#a375ff] text-[1.2rem]'>
                                                1
                                            </span>
                                        </td>
                                        <td className="border-r border-[#BBBBBB]">
                                            <div className="flex items-center space-x-3">
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
                                                <div className="font-bold text-left">
                                                    Javier Enrique Mejía Flores
                                                </div>
                                                <div className="text-sm text-left opacity-50">{`99 años`}</div>
                                            </div>
                                            </div>
                                        </td>
                                        <td className="border-r border-[#BBBBBB]">
                                            <div className="flex items-center space-x-3">
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
                                                <div className="font-semibold text-left mb-[8%]">
                                                    Alvin Josué Mélendez Serrano
                                                </div>
                                            </div>
                                            </div>
                                        </td>
                                        <td className="border-[#BBBBBB]">
                                            <Link to="/agenda/appointment_requests/details">
                                            <button className="btn btn-outline btn-xs hover:bg-[#a375ff] hover:text-white">
                                                Ver detalles
                                            </button>
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                :
                <div className='h-full w-ful'>
                    <div className='h-full w-full overflow-hidden flex flex-col items-center justify-center gap-[2rem]'>
                        <img src={require('../../assets/icons/no_requests.png')} alt="Nothing" className='w-[20%] h-auto'/>
                        <p className='text-[#707070] font-bold text-[1.6rem]'>No hay solicitudes de citas</p>
                    </div>
                </div>
            }
            </>
        }
    </div>
  )
}
