import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import uk from './locales/uk/translation.json';
import en from './locales/en/translation.json';

const savedLanguage = localStorage.getItem('language') || 'en';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: false,
  resources: {
    en: {
      translation: en,
    },
    uk: {
      translation: uk,
    },
  },
  lng: savedLanguage,
  ns: ['translation'],
  defaultNS: 'translation',
});

export default i18n;
