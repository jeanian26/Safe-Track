/* eslint-disable prettier/prettier */
/**
 *
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component, PureComponent } from 'react';
import {
  AppRegistry,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import RNFS from 'react-native-fs';
import { RNCamera } from 'react-native-camera';
import { getDatabase, ref as dataRef, set, get, child } from 'firebase/database';
import { getStorage, uploadBytes, ref } from 'firebase/storage';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geolocation from 'react-native-geolocation-service';
import uuid from 'react-native-uuid';


import Colors from '../../theme/colors';
const delay = ms => new Promise(res => setTimeout(res, ms));
const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  inline: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filename: '',
      isRecording: false,
      recordOptions: {
        quality: RNCamera.Constants.VideoQuality['1080p'],
        videoBitrate: 10,
        willrecord: true,
      },
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


  componentDidMount() {
    const { navigation } = this.props;
    this.autotakeVideo();

    this.focusListener = navigation.addListener('focus', () => {
      this.autotakeVideo();
    });

  }
  autotakeVideo = async () => {
    await delay(2000);
    if (this.props.route.params && this.state.isRecording !== true) {
      let { event } = this.props.route.params;
      console.log('event', event);
      if (event === true) {
        this.props.route.params = false;
        this.takeVideo();
        await delay(10000);
        this.takeVideo();

      } else {
        console.log('event false');
      }
    } else {
      console.log('not working');
    }
  }

  takeVideo = async () => {

    // eslint-disable-next-line no-unused-vars
    const storage = getStorage();
    if (this.state.isRecording === false) {
      if (this.camera) {
        try {
          const promise = this.camera.recordAsync(this.state.recordOptions);

          if (promise) {
            this.setState({ isRecording: true });
            const data = await promise;
            this.setState({ isRecording: false });
            console.log('takeVideo', data);
            // const destinationAddress = RNFS.ExternalDirectoryPath + `/${global.USERID}.mp4`;
            this.confirmUpload(data.uri);
            // RNFS.moveFile(data.uri, destinationAddress).then(
            //   () => {
            //     console.log('Video copied locally!!');
            //   },
            //   (error) => {
            //     console.log('CopyFile fail for video: ' + error);
            //   },
            // );
          }

        } catch (e) {
          console.error(e);
          this.setState({ isRecording: false });
        }
      }
    } else {
      this.camera.stopRecording();
    }
  };

  confirmUpload = (uri) => {
    console.log(uri);
    Alert.alert('VIDEO RECORDED', 'DO YOU WANT TO SEND SOS?', [
      {
        text: 'Yes',
        onPress: () => {
          this.upload(uri);

        },
      },
      {
        text: 'No',
        onPress: () => {
          return;
        },
      },
    ]);
  };
  upload = async (uri) => {
    const filename = uuid.v4();
    this.setState({ filename: filename });
    console.log('filename', filename);
    //const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const storage = getStorage();
    const metadata = {
      contentType: 'video/mp4',
    };
    const storageRef = ref(storage, `/videos/${filename}.mp4`);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    uploadBytes(storageRef, blob, metadata).then((snapshot) => {
      console.log('Uploaded a blob or file!', snapshot);
    });
    this.getPosition();
  }

  getPosition = () => {
    const self = this;
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then((data) => {
        console.log(data);
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
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
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
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
        console.log(err);
      });
  };
  reverseGeoCode = (lat, long) => {
    console.log('Latitude', lat);
    console.log('Longitude', long);
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
        // this.showAlert(
        //   r.Response.View[0].Result[0].Location.Address.Label,
        //   lat,
        //   long,
        // );
        this.saveEvent(r.Response.View[0].Result[0].Location.Address.Label,
          lat,
          long);
      });
  };
  saveEvent(location, lat, long){
    let time = Date.now();
    console.log(location,lat,long);
    const db = getDatabase();
    set(dataRef(db, 'Events/' + this.state.filename), {
      filename: this.state.filename,
      user:global.USERID ,
      time:time,
      active:true,
      location:location,
      lat:lat,
      long:long,
    });
  }

  showAlert = (location, lat, long) =>
    Alert.alert(
      'Location to Send',
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

  render() {
    const { } = this.state;


    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />
        <View style={styles.container}>
          <RNCamera
            ref={(ref) => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          />
          <View
            style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
              ref={(swiper) => {
                this.swiper = swiper;
              }}
              onPress={this.takeVideo.bind(this)}

              style={styles.capture}>
              <Text style={{ fontSize: 14 }}>
                {' '}
                {this.state.isRecording === false ? 'START' : 'STOP'}{' '}
              </Text>
            </TouchableOpacity>
            {/* <Button onPress={this.takeVideo.bind(this)}
              ref={(button) => {this.button = button; }}
              title="some button" /> */}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

AppRegistry.registerComponent('App', () => Cart);
