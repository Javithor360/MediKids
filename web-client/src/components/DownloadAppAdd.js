import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"

export const DownloadAppAdd = () => {
  const { t } = useTranslation();
  return (
    <section className="ml-16 mt-28 mb-28">
        <div className="__DownloadAdd w-[60rem] h-[20rem] flex">
            <div className="__DownloadAddImg w-1/2 h-full"></div>
            <div className="w-1/2 h-full border border-[#BBBBBB] shadow rounded-tr-[80px] rounded-br-[80px] relative">
                <p className="text-[1.5rem] font-bold text-[#A375FF] max-w-[25rem] ml-9 mt-9"> {t("DrGarza.tittle5")}</p>
                <p className="max-w-[20rem] ml-9 mt-5 text-[#707070]">{t("DrGarza.subtittle3")} <Link className="text-[#D48888] font-bold" to="/">{t("DrGarza.subtittle4")}</Link></p>
                <Link className="__moreView absolute bottom-7 right-11" to="/download-app">{t("Doc1.button")}</Link>
            </div>
        </div>
    </section>
  )
}
