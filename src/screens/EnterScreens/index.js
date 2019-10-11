import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ENTER_ENTRANCE } from '../../helpers/config';
import { createRoutes } from '../../helpers/utils';
import LoginScreen from './LoginScreen.js';

const SCREENS = {
  LoginScreen,
};

export default createAppContainer(
  createStackNavigator(createRoutes(SCREENS), {
    initialRouteName: ENTER_ENTRANCE,
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: true,
    },
  }),
);
