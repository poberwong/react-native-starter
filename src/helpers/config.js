// import { NativeModules } from 'react-native';
import codePush from 'react-native-code-push';

// const {
//   Config: { APP_MODE, BASE_BACKEND },
// } = NativeModules;

// export { APP_MODE, BASE_BACKEND };

const config = {
  // backend: BASE_BACKEND,
  backend: '',
};
export default config;

export const codePushSetting = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
};

export function setBackend(backend) {
  config.backend = backend;
}

const isDev = __DEV__;

export const enterEntrance = isDev ? 'LoginScreen' : 'LoginScreen';

export const settingEntrance = isDev
  ? 'FirstSettingScreen'
  : 'FirstSettingScreen';

export const mainEntrance = isDev ? 'HomeScreen' : 'HomeScreen';

export const isLogin = isDev;

export const isFirstLogin = !isDev;

export const account = isDev ? '17600108288' : '';
export const password = isDev ? '123456' : '';
