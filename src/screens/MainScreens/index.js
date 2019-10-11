import React, { PureComponent } from 'react';
import { Provider } from 'mobx-react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { MAIN_ENTRANCE } from '../../helpers/config';
import { createRoutes } from '../../helpers/utils';
import MainStore from '../../stores/main';
import HomeScreen from './HomeScreen';

const SCREENS = {
  HomeScreen,
};

export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.mainStore = MainStore.getInstance();
  }

  render() {
    const Navigator = createAppContainer(
      createStackNavigator(createRoutes(SCREENS), {
        initialRouteName: MAIN_ENTRANCE,
        headerMode: 'none',
        navigationOptions: {
          gesturesEnabled: true,
        },
      }),
    );
    return (
      <Provider main={this.mainStore}>
        <Navigator />
      </Provider>
    );
  }
}
