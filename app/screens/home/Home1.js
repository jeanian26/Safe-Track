/* eslint-disable prettier/prettier */

import React, { Component } from 'react';
import {
  ImageBackground,
  AppState,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';
const bgImg = 'http://www.newgeography.com/files/manila-1.jpg';
import Colors from '../../theme/colors';
import GradientContainer from '../../components/gradientcontainer/GradientContainer';
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  bgImg: {
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
    const { navigation } = this.props;
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
        this.setState({ appState: nextAppState });
      },
    );
  }

  render() {
    const { } = this.state;

    return (
      <ImageBackground source={{uri: bgImg}} style={styles.bgImg}>
      <StatusBar
        //translucent
        backgroundColor={Colors.primaryColor}
        barStyle="light-content"
      />

      <GradientContainer
        colors={[Colors.secondaryGradientColor, 'transparent']}
        start={{x: 0, y: 0.90}}
        end={{x: 0, y: 0}}>
          <View><Text>TEST</Text></View>
      </GradientContainer>
    </ImageBackground>
    );
  }
}
