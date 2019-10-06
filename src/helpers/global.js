import {
  Dimensions,
  PixelRatio,
  Platform,
  NativeModules,
  DeviceInfo,
  YellowBox,
} from 'react-native';
import RNDeviceInfo from 'react-native-device-info';

let { height, width } = Dimensions.get('window');

// 获取屏幕宽度
global.SCREEN_WIDTH = width;

// 获取屏幕高度
global.SCREEN_HEIGHT = height;

// 获取屏幕分辨率
global.PixelRatio = PixelRatio.get();

// 系统是iOS
global.iOS = Platform.OS === 'ios';

// 系统是安卓
global.Android = Platform.OS === 'android';

// app名称
global.ApplicationName = RNDeviceInfo.getApplicationName();

// app版本
global.AppVersion = RNDeviceInfo.getVersion();

// 设备唯一编号
global.DeviceUniqueID = RNDeviceInfo.getUniqueId();

const X_WIDTH = 375;
const X_HEIGHT = 812;
const { PlatformConstants = {} } = NativeModules;
const { minor = 0 } = PlatformConstants.reactNativeVersion || {};
const isIPhoneX = (() => {
  if (minor >= 50) {
    return DeviceInfo.isIPhoneX_deprecated;
  }
  return (
    Platform.OS === 'ios' &&
    ((global.SCREEN_HEIGHT === X_HEIGHT && global.SCREEN_HEIGHT === X_WIDTH) ||
      (global.SCREEN_HEIGHT === X_WIDTH && global.SCREEN_HEIGHT === X_HEIGHT))
  );
})();

global.isIPhoneX = isIPhoneX;

const UIWidth = 375;
global.sp = pt => {
  return (pt * global.SCREEN_WIDTH) / UIWidth;
};

/**
 * 忽略某些警告
 * 1、循环引用警告(Require cycle)
 * 2、iOS端的module没有实现+(BOOL)requiresMainQueueSetup这个方法
 */
YellowBox.ignoreWarnings(['Require cycle:', 'requiresMainQueueSetup']);

export default global;
