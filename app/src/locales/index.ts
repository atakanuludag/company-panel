import i18n, { Resource } from 'i18next'
import { initReactI18next } from 'react-i18next'
//import LanguageDetector from 'i18next-browser-languagedetector';
//
import coreTR from './core.tr.json'
import coreEN from './core.en.json'
import navigationTR from './navigation.tr.json'
import navigationEN from './navigation.en.json'

const resources: Resource = {
  tr: {
    core: coreTR,
    navigation: navigationTR,
  },
  en: {
    core: coreEN,
    navigation: navigationEN,
  },
}

i18n
  //.use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS: 'core',
    lng: localStorage.getItem('i18nextLng') || 'tr',
    fallbackLng: 'tr',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  })
export default i18n
