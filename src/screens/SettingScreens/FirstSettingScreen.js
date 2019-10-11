import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import BaseScreen from '../../components/BaseScreen';
import { inject, observer } from 'mobx-react';

export class FirstSettingScreen extends BaseScreen {
  static defaultProps = {
    title: 'FirstSetting',
  };

  completeSettings = () => {
    const {
      auth: { completeSettings },
    } = this.props;
    completeSettings();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>First Setting Screen</Text>
        <Button title="CompleteSettings" onPress={this.completeSettings} />
      </View>
    );
  }
}

export default inject('auth')(observer(FirstSettingScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
