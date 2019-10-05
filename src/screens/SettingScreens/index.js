import React, { PureComponent } from 'react';
import { enterEntrance } from '../../helpers/config';
import { createStackNavigator } from 'react-navigation';
import FirstSettingScreen from './FirstSettingScreen';

const SCREENS = {
  FirstSettingScreen,
};

export default class extends PureComponent {
  addProps = SomeComponent => {
    return class extends SomeComponent {
      render() {
        return <SomeComponent {...this.props} />; // u can add more props here
      }
    };
  };

  getScreens() {
    const screens = {};
    Object.keys(SCREENS).forEach(key => {
      screens[key] = {
        screen: this.addProps(SCREENS[key]),
      };
    });
    return screens;
  }

  render() {
    const Navigator = createStackNavigator(this.getScreens(), {
      initialRouteName: enterEntrance,
      headerMode: 'none',
      navigationOptions: {
        gesturesEnabled: true,
      },
    });
    return <Navigator />;
  }
}
