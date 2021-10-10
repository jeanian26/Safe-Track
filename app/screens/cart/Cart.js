/**
 * Foodvila - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View, Text} from 'react-native';

// import components

// import colors
import Colors from '../../theme/colors';

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  inline: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />
        <View>
          <Text>Camera</Text>
        </View>
      </SafeAreaView>
    );
  }
}
