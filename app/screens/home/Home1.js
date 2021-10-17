/**
 * safetrack - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View, Text} from 'react-native';

// import utils
import getImgSource from '../../utils/getImgSource.js';

// import colors
import Colors from '../../theme/colors';

// Home Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
});

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  navigateTo = (screen) => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  render() {
    const {} = this.state;

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
        <View style={styles.container}>
          <Text>Home</Text>
        </View>
      </SafeAreaView>
    );
  }
}
