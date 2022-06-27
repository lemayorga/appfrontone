import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";
import TRANSLATIONS_EN from '@app/translations/en/traslation.json';
import TRANSLATIONS_ES from '@app/translations/es/traslation.json';

const resources ={
    es: {
        translation: TRANSLATIONS_ES
    },
    en: {
        translation: TRANSLATIONS_EN
    },
};

const fallbackLng = [process.env.REACT_APP_LANGUAGUE]
const availableLanguages = ['es', 'en']
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng,
    detection: {
        checkWhitelist: true
    },
    debug: false,
    returnEmptyString: false,
    resources: resources,
    whitelist: availableLanguages,
    interpolation: {
        escapeValue: false // no need for react. it escapes by default
    }
  });

export { i18n };

// https://relatablecode.com/how-to-set-up-localization-with-react-i18next
// https://www.npmjs.com/package/webpack-typings-for-json
// https://hco.medium.com/create-a-multi-language-website-with-react-context-api-10f9544bee09
// https://www.pluralsight.com/guides/using-react's-context-api-with-typescript