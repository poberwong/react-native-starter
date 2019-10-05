import React, { PureComponent } from 'react';
import { Provider } from 'mobx-react';
import { mainEntrance } from '../../helpers/config';
import { createStackNavigator } from 'react-navigation';
import createRoutes from './createRoutes';
import MainStore from '../../stores/main';

export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.mainStore = MainStore.getInstance();
  }

  render() {
    const Navigator = createStackNavigator(createRoutes(), {
      initialRouteName: mainEntrance,
      headerMode: 'none',
      navigationOptions: {
        gesturesEnabled: true,
      },
    });
    return (
      <Provider main={this.mainStore}>
        <Navigator />
      </Provider>
    );
  }
}
