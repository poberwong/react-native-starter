import React, { PureComponent } from 'react';
import { settingEntrance } from '../../helpers/config';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
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
        screen: FirstSettingScreen,
      };
    });
    return screens;
  }

  render() {
    const Navigator = createAppContainer(
      createStackNavigator(this.getScreens(), {
        initialRouteName: settingEntrance,
        headerMode: 'none',
        navigationOptions: {
          gesturesEnabled: true,
        },
      }),
    );
    return <Navigator />;
  }
}
