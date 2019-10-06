import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BaseScreen from '../../components/BaseScreen';

export default class extends BaseScreen {
  static defaultProps = {
    title: '首页',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello, This is Login Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
