import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './data/aboutAlgorithm.en.json';
import de from './data/aboutAlgorithm.de.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    de: { translation: de },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
