import i18next from 'i18next'
import en from './language/en.json'
import pt from './language/pt.json'

i18next.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    pt: { translation: pt },
  },
})

export default i18next
