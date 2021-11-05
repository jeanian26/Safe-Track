/* eslint-disable prettier/prettier */

import React, {Component} from 'react';
import {
  AppState,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Colors from '../../theme/colors';

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

    this.state = {
      appState: AppState.currentState,
    };
  }

  navigateTo = (screen) => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };
  componentDidMount() {
    this.appStateSubscription = AppState.addEventListener(
      'change',
      (nextAppState) => {
        if (
          this.state.appState.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('App has come to the foreground!');
        } else {
          console.log('background');
          setTimeout(function () {
            console.log('task run on background');
          }, 5000);
        }
        this.setState({appState: nextAppState});
      },
    );
  }

  render() {
    const {} = this.state;

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
        <View style={styles.container}>
          <Text>{this.state.appState}</Text>
        </View>
      </SafeAreaView>
    );
  }
}
