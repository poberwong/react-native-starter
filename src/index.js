import React, { Component } from 'react';
import { AppState, StatusBar, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import codePush from 'react-native-code-push';
import './helpers/global';
import MainScreens from './screens/MainScreens';
import EnterScreens from './screens/EnterScreens';
import SettingScreens from './screens/SettingScreens';
import { observer, Provider } from 'mobx-react';
import AuthStore, { INIT_STATE } from './stores/auth';
import GlobalStore from './stores/global';
import { codePushSettings } from './helpers/config';

@codePush(codePushSettings)
@observer
export default class extends Component {
  constructor(props) {
    super(props);
    this.authStore = AuthStore.getInstance();
    this.globalStore = GlobalStore.getInstance();
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = appState => {
    if (appState === 'active') {
      // SplashScreen.hide();
    } else if (appState === 'background') {
      // do whatever you wanna do when app is background
    }
  };

  render() {
    const { isLoggedIn, initState, isAppLoading } = this.authStore;
    if (isAppLoading) {
      return <View style={{ flex: 1, backgroundColor: 'white' }} />;
    }

    return (
      <Provider auth={this.authStore} global={this.globalStore}>
        <View style={{ flex: 1 }}>
          <StatusBar
            translucent
            barStyle="light-content"
            backgroundColor="transparent"
          />
          {isLoggedIn ? (
            initState !== INIT_STATE.complete ? (
              <SettingScreens />
            ) : (
              <MainScreens />
            )
          ) : (
            <EnterScreens />
          )}
        </View>
      </Provider>
    );
  }
}
