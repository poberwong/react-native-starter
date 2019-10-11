/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src';
import StoryUI from './storybook';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => (__DEV__ ? StoryUI : App));
