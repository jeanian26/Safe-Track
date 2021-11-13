/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
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
import Button from '../../components/buttons/Button';
import { Heading4, Heading6 } from '../../components/text/CustomText';
const bgImg = 'http://www.newgeography.com/files/manila-1.jpg';
import Colors from '../../theme/colors';
import GradientContainer from '../../components/gradientcontainer/GradientContainer';
import Logo from '../../components/logo/Logo';
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
  categoryHeading: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
    width: 154,
    height: 154,
    backgroundColor: Colors.white,
    marginTop: 20,
  },
  titleText: {
    fontWeight: '700',
  },
  buttonContainer: {
    paddingTop: 22,
    justifyContent: 'center',
    alignItems: 'center',
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
      <ImageBackground source={{ uri: bgImg }} style={styles.bgImg}>
        <StatusBar
          //translucent
          backgroundColor={Colors.primaryColor}
          barStyle="light-content"
        />

        <GradientContainer
          colors={[Colors.secondaryGradientColor, 'transparent']}
          start={{ x: 0, y: 0.90 }}
          end={{ x: 0, y: 0 }}>
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}><View style={styles.logoContainer}>
              <Logo logoStyle={{ borderRadius: 100 }} size={120} />
            </View>
            <View style={{ marginTop: 20, alignItems: "center" }}>
              <Heading4
                style={(styles.titleText, styles.categoryHeading)}>
                SafeTrack
              </Heading4 >
              <Heading6 style={(styles.titleText, styles.categoryHeading)}>Welcome to SafeTrack Security App. Your own personal security system</Heading6>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                onPress={this.navigateTo("Settings")}
                color={"#fff"}
                small
                title={'get Started'.toUpperCase()}
                titleColor={Colors.primaryColor}
                borderRadius={100}
              />
            </View>
          </View>
        </GradientContainer>
      </ImageBackground>
    );
  }
}
