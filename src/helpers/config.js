import { NativeModules } from 'react-native';
import codePush from 'react-native-code-push';
const {
  Config: { APP_MODE, BASE_BACKEND },
} = NativeModules;
const codePushSetting = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
};

// configurations from native
export { APP_MODE, BASE_BACKEND };
console.log('app: ', APP_MODE, BASE_BACKEND);

// configurations from JS memory, could be changed one day.
const config = {
  appMode: APP_MODE,
  backend: BASE_BACKEND,
  codePushSetting,
};

export function setBackend(backend) {
  config.backend = backend;
}

export default config;

// some constants based on isDev
const isDev = __DEV__;

export const ENTER_ENTRANCE = isDev ? 'LoginScreen' : 'LoginScreen';

export const SETTING_ENTRANCE = isDev
  ? 'FirstSettingScreen'
  : 'FirstSettingScreen';

export const MAIN_ENTRANCE = isDev ? 'HomeScreen' : 'HomeScreen';

export const IS_LOGIN = isDev;

export const IS_FIRST_LOGIN = !isDev;

export const ACCOUNT = isDev ? '17600108288' : '';
export const PASSWORD = isDev ? '123456' : '';
