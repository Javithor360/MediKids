import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  return (
    <select className="select select-bordered w-full max-w-xs selcet-xs"
      id="language"
      value={i18n.language}
      onChange={(e) => {
        i18n.changeLanguage(e.target.value);
        window.scrollTo(0, 0);
    }}
    >
      <option value="es">ESPAÑOL</option>
      <option value="en">ENGLISH</option>
    </select>
  );
};
