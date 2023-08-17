import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en/translation.json'
import es from './es/translation.json'

export const resources = {
  es: {
    translation: es,
  },
  en: {
    translation: en,
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'es',
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v3'
})

export default i18n;