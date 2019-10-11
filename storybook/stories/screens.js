import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { LoginScreen } from '../../src/screens/EnterScreens/LoginScreen';
import { HomeScreen } from '../../src/screens/MainScreens/HomeScreen';
import { FirstSettingScreen } from '../../src/screens/SettingScreens/FirstSettingScreen';

storiesOf('Screens', module)
  .add('LoginScreen', () => <LoginScreen />)
  .add('FirstSettingScreen', () => <FirstSettingScreen />)
  .add('HomeScreen', () => <HomeScreen />);
