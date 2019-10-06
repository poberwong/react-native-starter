import React, { PureComponent } from 'react';
import { Provider } from 'mobx-react';
import { mainEntrance } from '../../helpers/config';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import createRoutes from './createRoutes';
import MainStore from '../../stores/main';

export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.mainStore = MainStore.getInstance();
  }

  render() {
    const Navigator = createAppContainer(
      createStackNavigator(createRoutes(), {
        initialRouteName: mainEntrance,
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
