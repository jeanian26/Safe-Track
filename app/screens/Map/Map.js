/* eslint-disable consistent-this */
/* eslint-disable prettier/prettier */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
} from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geolocation from 'react-native-geolocation-service';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

// import components

import Colors from '../../theme/colors';

// Favorites Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

// Favorites
export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapREgion: null,
      lastLat: null,
      lastLong: null,
      region: {
        latitude: 1,
        longitude: 1,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      latLng: {
        latitude: 1,
        longitude: 1,
      },
    };
  }

  getPosition = () => {
    const self = this;
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then((data) => {
        console.log(data)
        Geolocation.watchPosition(
          (position) => {
            console.log(position)
            console.log(position.coords.longitude);
            console.log(position.coords.latitude);
            self.reverseGeoCode(
              position.coords.latitude,
              position.coords.longitude,
            );
            self.setState({
              region: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              },
            });
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      })
      .catch((err) => {
        console.log(err)
      });
  };
  reverseGeoCode = (lat, long) => {
    console.log("Latitude", lat)
    console.log("Longitude", long)
    const self = this;
    const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=${long}%2C${lat}%2C137&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=v_9DU2wi_FDqhJ71oCKfMHhCBVt7L7HszBSG72sWvAQ`;
    console.log('URL: ', url);
    fetch(
      `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=${lat}%2C${long}%2C137&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=v_9DU2wi_FDqhJ71oCKfMHhCBVt7L7HszBSG72sWvAQ`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then((r) => r.json())
      .then((r) => {
        console.log(r.Response.View[0].Result[0].Location.Address.Label);
        // self.showAlert(
        //   r.Response.View[0].Result[0].Location.Address.Label,
        //   lat,
        //   long,
        // );
      });
  };

  showAlert = (location, lat, long) =>
    Alert.alert(
      'Location',
      `${location} \nLatitue: ${lat} \nLongitude:${long}`,

      [
        {
          text: 'ok',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );

  componentDidMount() {
    const { navigation } = this.props;
    this.getPosition()
    this.focusListener = navigation.addListener('focus', () => {
      this.getPosition()
    });

  }
  componentWillUnmount() {
    // Remove the event listener
    if (this.focusListener != null && this.focusListener.remove) {
      this.focusListener.remove();
    }
  }

  render() {
    const { } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />
        <Button onPress={() => this.getPosition()} title="get location" />
        <MapView style={styles.map} region={this.state.region}>
          <Marker
            coordinate={{
              latitude: this.state.region.latitude,
              longitude: this.state.region.longitude,
            }}
          />
        </MapView>
      </SafeAreaView>
    );
  }
}
