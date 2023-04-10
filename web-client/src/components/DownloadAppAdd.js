import { Link } from "react-router-dom"

export const DownloadAppAdd = () => {
  return (
    <section className="ml-16 mt-28 mb-28">
        <div className="__DownloadAdd w-[60rem] h-[20rem] flex">
            <div className="__DownloadAddImg w-1/2 h-full"></div>
            <div className="w-1/2 h-full border border-[#BBBBBB] shadow rounded-tr-[80px] rounded-br-[80px] relative">
                <p className="text-[1.5rem] font-bold text-[#A375FF] max-w-[25rem] ml-9 mt-9">Descarga la App para agendar una cita</p>
                <p className="max-w-[20rem] ml-9 mt-5 text-[#707070]">Puedes ver los pasos de como agendar una cita en nuestra app <Link className="text-[#D48888] font-bold" to="/">aquí</Link></p>
                <Link className="__moreView absolute bottom-7 right-11" to="/download-app">Descargar App</Link>
            </div>
        </div>
    </section>
  )
}
