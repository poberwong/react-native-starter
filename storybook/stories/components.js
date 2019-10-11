import React from 'react';
import { Button } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import CenterView from './CenterView';

storiesOf('Components', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Button', () => <Button title="story" />);
