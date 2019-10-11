import React from 'react';
import PropTypes from 'prop-types';

/**
 * 1. You can add some data-collection tools in componentDidMount and componentWillUnmount
 * such as xxx.onStart(this.props.title || this.state.title)
 * 2. Of course, you can write render function to wrap content with SafeAreaView in order to
 * make content locate at right area. (HOC could be better to wrap a screen)
 */
export default class extends React.Component {
  static PropTypes = {
    title: PropTypes.string,
    navigation: PropTypes.object,
  };
  static defaultProps = {
    title: '',
  };

  _openScreen = (...params) => {
    const { navigation } = this.props;
    navigation.navigate(...params);
  };

  _goBack = (...params) => {
    const { navigation } = this.props;
    navigation.goBack(...params);
  };

  componentDidMount() {}
  componentWillUnmount() {}
}
