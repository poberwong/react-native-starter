import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import BaseScreen from '../../components/BaseScreen';
import { inject, observer } from 'mobx-react';

export class HomeScreen extends BaseScreen {
  static defaultProps = {
    title: '首页',
  };

  logout = () => {
    const {
      auth: { logout },
    } = this.props;
    logout();
  };

  testInComponent = () => {
    return 2019;
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button title="Logout" onPress={this.logout} />
      </View>
    );
  }
}

export default inject('auth')(observer(HomeScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
