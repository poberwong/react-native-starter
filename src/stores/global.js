import { action, observable } from 'mobx';
import NetInfo from '@react-native-community/netinfo';
import i18n from '../helpers/i18n';
// import Permission from '../helpers/permission';

/**
 * 主要用来控制全局的一些辅助工具
 */
export default class Global {
  // 是否联网
  @observable isConnected = true;

  constructor() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.connectivityChange,
    );
    i18n.setI18nConfig();
    i18n.addEventListener('change', this.handleLocalizationChange);
  }

  @action connectivityChange = isConnected => {
    this.isConnected = isConnected;
  };

  /**
   * If you wanna update UI, please use mobx or force update to refresh page where you change locale manually.
   */
  handleLocalizationChange = () => {
    i18n.setI18nConfig();
  };

  requestPermissionOnstart = () => {
    // Android && NativeModules.PermissionManager.requestNotificationPermission();
    // Android && Permission.androidStorage();
    // iOS && Permission.openSettingIfNoPermission();
  };

  /**
   * 模仿 java 的一个单例模式
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new Global();
    }
    return this.instance;
  }
}
