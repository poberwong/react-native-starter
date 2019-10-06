import { action, observable } from 'mobx';
import { create } from 'mobx-persist';
import { AsyncStorage } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
// import Permission from '../helpers/permission';

/**
 * 主要用来控制全局的一些辅助工具
 */
export default class Global {
  timer = null;

  // 是否联网
  @observable isConnected = true;
  // i18n here

  constructor() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.connectivityChange,
    );
  }

  @action connectivityChange = isConnected => {
    this.isConnected = isConnected;
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

// const hydrate = create({
//   storage: AsyncStorage,
// });

// hydrate('global', Global.getInstance())
//   .then(() => {
//     console.log('global store hydrate complete');
//   })
//   .catch(err => console.log('mobx-persist global store error : ', err.message));
