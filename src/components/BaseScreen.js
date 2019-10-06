import React from 'react';
import PropTypes from 'prop-types';

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

  componentDidMount() {
    // you can add some data-collection tools.
    // BaiduMobStat.onPageStart(this.props.title || this.state.title)
  }
  componentWillUnmount() {
    // you can add some data-collection tools.
    // BaiduMobStat.onPageEnd(this.props.title || this.state.title)
  }
}
