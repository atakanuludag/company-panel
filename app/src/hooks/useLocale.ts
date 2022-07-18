import { useTranslation } from 'react-i18next'
import tr from '../assets/images/flags/TR.svg'
import en from '../assets/images/flags/US.svg'

const LANGS = [
  {
    label: 'Türkçe',
    value: 'tr',
    icon: tr,
  },
  {
    label: 'English',
    value: 'en',
    icon: en,
  },
]

export default function useLocales(namespace?: any) {
  const { i18n, t: translate } = useTranslation([namespace])
  const langStorage = localStorage.getItem('i18nextLng')
  const currentLang =
    LANGS.find((_lang) => _lang.value === langStorage) || LANGS[0]

  const onChangeLang = (newlang: any) => {
    i18n.changeLanguage(newlang, () => {
      localStorage.setItem('i18nextLng', newlang)
    })
  }

  return {
    onChangeLang,
    translate,
    currentLang,
    allLang: LANGS,
  }
}
