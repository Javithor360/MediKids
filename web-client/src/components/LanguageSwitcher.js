import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  return (
    <select
      id="language"
      className="langSelector"
      value={i18n.language}
      onChange={(e) => {
        i18n.changeLanguage(e.target.value);
        window.scrollTo(0, 0);
      }}
    >
      <option value="es">ES</option>
      <option value="en">EN</option>
    </select>
  );
};
