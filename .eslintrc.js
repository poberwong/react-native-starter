module.exports = {
  root: true,
  extends: '@react-native-community',
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  rules: {
    'react-native/no-inline-styles': 0,
  },
  globals: {
    AppVersion: false,
    ApplicationName: false,
    DeviceUniqueID: false,
    SCREEN_WIDTH: false,
    SCREEN_HEIGHT: false,
    iOS: false,
    Android: false,
    isIPhoneX: false,
    jest: false,
  },
};
