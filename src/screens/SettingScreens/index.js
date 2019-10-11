import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { SETTING_ENTRANCE } from '../../helpers/config';
import { createRoutes } from '../../helpers/utils';
import FirstSettingScreen from './FirstSettingScreen';

const SCREENS = {
  FirstSettingScreen,
};

export default createAppContainer(
  createStackNavigator(createRoutes(SCREENS), {
    initialRouteName: SETTING_ENTRANCE,
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: true,
    },
  }),
);
