import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { observer, inject } from 'mobx-react';
import BaseScreen from '../../components/BaseScreen';

export class LoginScreen extends BaseScreen {
  static defaultProps = {
    title: '首页',
  };

  login = () => {
    const {
      auth: { login, loginSuccess },
    } = this.props;
    login({
      username: 'poberwong',
      password: '23',
    }).then(res => {
      console.log('login success');
      loginSuccess();
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello, This is Login Screen</Text>
        <Button title="Login" onPress={this.login} />
      </View>
    );
  }
}

export default inject('auth')(observer(LoginScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
