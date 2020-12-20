import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import ru from './locales/ru';
import { getLocales } from 'react-native-localize';

function checkFirstLanguageOrFallback(): {
  languageTag: string;
  isRTL: boolean;
} {
  const languageTags = getLocales().map((locale) => locale.languageTag);
  const { languageTag, languageCode, scriptCode, isRTL } = getLocales()[0];

  // languageTag format: en-US, zh-Hans-TW, etc.
  // (language code + script code if it exists + country code)
  if (languageTags.includes(languageTag)) {
    return { languageTag, isRTL };
  }

  // partialCode format: en, zh-Hans, etc.
  // (language code + script code if it exists)
  const partialCode = languageCode + (scriptCode ? `-${scriptCode}` : '');

  if (languageTags.includes(partialCode)) {
    return { languageTag: partialCode, isRTL };
  }

  // languageCode format: en, zh, etc.
  if (languageTags.includes(languageCode)) {
    return { languageTag: languageCode, isRTL };
  }

  return getLocales()[0];
}

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: checkFirstLanguageOrFallback().languageTag,
  nsSeparator: ':::',
  keySeparator: '::',
  resources: {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
  },
  debug: __DEV__,
});

export default i18n;
