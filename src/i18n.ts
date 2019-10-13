/* eslint-disable i18next/no-literal-string */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

export const supportedLanguages = [
  {
    code: 'it',
    name: 'Italiano',
  },
  {
    code: 'en',
    name: 'English',
  },
];

i18n
  // load translation using xhr -> see /public/locales
  .use(Backend)
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    // Language to fall back to if the user language is not available
    fallbackLng: 'en',

    // Allowed languages
    whitelist: supportedLanguages.map(lng => lng.code),

    // Enable debugging when not in production
    debug: process.env.NODE_ENV !== 'production',

    backend: {
      // Path where resources get loaded from
      loadPath: process.env.PUBLIC_URL + '/locales/{{lng}}/{{ns}}.json',
    },

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
