// import { NativeModules } from 'react-native';

// const {
//   Config: { APP_MODE, BASE_BACKEND },
// } = NativeModules;

// export { APP_MODE, BASE_BACKEND };

const config = {
  // backend: BASE_BACKEND,
  backend: '',
};
export default config;

export function setBackend(backend) {
  config.backend = backend;
}

const isDev = __DEV__;

console.log = isDev ? console.log : () => null;

export const enterEntrance = isDev ? 'LoginScreen' : 'LoginScreen';

export const settingEntrance = isDev
  ? 'FirstSettingScreen'
  : 'FirstSettingScreen';

export const mainEntrance = isDev ? 'HomeScreen' : 'HomeScreen';

export const isLogin = isDev;

export const isFirstLogin = !isDev;

export const account = isDev ? '17600108288' : '';
export const password = isDev ? '123456' : '';
