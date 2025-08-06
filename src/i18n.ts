import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './language/en.json'
import pt from './language/pt.json'

i18next.use(LanguageDetector).init({
  fallbackLng: 'en',
  detection: {
    order: ['navigator', 'htmlTag'],
    caches: ['localStorage'],
  },
  resources: {
    en: { translation: en },
    pt: { translation: pt },
  },
})

i18next.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
})

export default i18next
