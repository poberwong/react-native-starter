import { action, observable, toJS } from 'mobx';
import request, { set401Handler, setToken } from '../helpers/request';
import config, {
  account,
  APP_MODE,
  BASE_BACKEND,
  isLogin,
  password,
  setBackend,
} from '../helpers/config';
import MainStore from './main';
import { create, persist } from 'mobx-persist';
import AsyncStorage from '@react-native-community/async-storage';
import BackgroundTimer from 'react-native-background-timer';
import Global from './global';
import SplashScreen from 'react-native-splash-screen';

export { STAGES } from './global';

/**
 * detect whether user finish the settings
 */
export const INIT_STATE = {
  start: 'start',
  complete: 'complete',
};

const REFRESH_TOKEN_TIME = 30 * 60 * 1000;

export default class Auth {
  constructor() {
    set401Handler(this.logout);
  }

  instance = null;
  @observable isAppLoading = true;
  // user info
  @persist('object') @observable userInfo = {};
  @persist @observable username = account;
  @observable password = password;

  @persist @observable initState = INIT_STATE.start;

  // Auth info
  @observable isLoggedIn = isLogin;
  @persist @observable token = '';

  // other
  @persist @observable env = APP_MODE;
  @persist @observable backend = BASE_BACKEND;
  @persist @observable appVersion;

  @action setToken = token => {
    this.token = token;
    setToken(token);
  };

  @action setInitState = state => {
    this.initState = state;
  };

  @action login = ({ username, password }) => {
    return Promise.resolve().then(res => {
      this.username = username;
      this.password = password;
      this.setToken('I am a token');
      return Promise.resolve();
    });
  };

  @action loginSuccess = () => {
    this.isLoggedIn = true;
    // you can do something such as resuming some services, sending deviceInfo to server or starting some listeners here
    // start refresh token task
    this._stopTokenTask = this._runTokenTask();
  };

  @action completeSettings = () => {
    this.setInitState(INIT_STATE.complete);
  };

  @action logout = () => {
    this._stopTokenTask && this._stopTokenTask();
    this._stopTokenTask = null;
    // you can clear some services and listeners based on user
    this.resetApp();
  };

  /**
   * 根据 token 是否有效来决定初始登录态; 待测试
   */
  @action initApp = () => {
    // 设置backend
    setBackend(toJS(this.backend));
    // load 完成
    if (this.token) {
      setToken(toJS(this.token));
      this.isLoggedIn = true; // token存在，认为已经登录了
      this.loginSuccess();
    } else {
      this.logout();
    }
    this.isAppLoading = false;
    SplashScreen.hide();

    Global.getInstance().requestPermissionOnstart(); // 启动时请求一些必要的权限
  };

  @action resetApp = () => {
    this.isLoggedIn = false;
    this.initState = INIT_STATE.hospital;
    this.setToken('', '');

    MainStore.getInstance().reset();
  };

  /**
   * refresh token to keep token valid
   */
  @action refreshAuth = () => {
    if (!this.isLoggedIn) {
      return;
    }
    // request here
  };

  _runTokenTask = () => {
    global.iOS && BackgroundTimer.start();
    const intervalId = BackgroundTimer.setInterval(
      () => this.refreshAuth(),
      REFRESH_TOKEN_TIME,
    );
    global.iOS && BackgroundTimer.stop();
    return function() {
      BackgroundTimer.clearInterval(intervalId);
    };
  };

  checkShowGuide() {
    return false && (!this.appVersion || this.appVersion !== AppVersion);
  }

  @action finishGuide = () => {
    Global.getInstance().dismissModal();
    this.appVersion = AppVersion;
  };

  static getInstance() {
    if (!this.instance) {
      this.instance = new Auth();
    }
    return this.instance;
  }
}

const hydrate = create({
  storage: AsyncStorage,
});

hydrate('auth', Auth.getInstance()).finally(() => {
  Auth.getInstance().initApp();
});
