import i18nJs from 'i18n-js';
import memoize from 'lodash.memoize';
import * as RNLocalize from 'react-native-localize';
import { I18nManager } from 'react-native';

const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  en: () => require('../assets/languages/en').default,
  cn: () => require('../assets/languages/cn').default,
};

const translate = memoize(
  (key, config) => i18nJs.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

const setI18nConfig = () => {
  // fallback if no available language fits
  const fallback = { languageTag: 'en', isRTL: false };

  const { languageTag, isRTL } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);

  // set i18n-js config
  i18nJs.translations = { [languageTag]: translationGetters[languageTag]() };
  i18nJs.locale = languageTag;
};

export default {
  t: translate,
  setI18nConfig,
  ...RNLocalize,
};
