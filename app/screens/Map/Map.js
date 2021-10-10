/**
 * Foodvila - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

// import components

import Colors from '../../theme/colors';

// Favorites Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

// Favorites
export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getLocation = () => {
    Geolocation.getCurrentPosition((info) => console.log(info));
  };

  componentDidMount() {
    if (true) {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }

  render() {
    const {} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />
        <Button onPress={this.getLocation} title="get location" />
        <View>
          <Text>Map</Text>
        </View>
      </SafeAreaView>
    );
  }
}
