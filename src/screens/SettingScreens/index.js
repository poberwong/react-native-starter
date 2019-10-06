import React, { PureComponent } from 'react';
import { enterEntrance } from '../../helpers/config';
import { createAppContainer } from 'react-navigation';
import { StackNavigator } from 'react-navigation';
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
    const Navigator = createAppContainer(
      StackNavigator(this.getScreens(), {
        initialRouteName: enterEntrance,
        headerMode: 'none',
        navigationOptions: {
          gesturesEnabled: true,
        },
      }),
    );
    return <Navigator />;
  }
}
