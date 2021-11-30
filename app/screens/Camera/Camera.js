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
import { getStorage, uploadBytes, ref } from 'firebase/storage';


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
      isRecording: false,
      recordOptions: {
        quality: RNCamera.Constants.VideoQuality['1080p'],
        videoBitrate: 10,
        willrecord: true,
      },
    };
  }


  componentDidUpdate() {
    this.autotakeVideo();

  }
  autotakeVideo = async () => {
    await delay(2000);
    if (this.props.route.params && this.state.isRecording !== true) {
      let { event } = this.props.route.params;
      console.log('event', event);
      if (event === true) {
        this.props.route.params = false;
        this.takeVideo();
        await delay(7000);
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
            const destinationAddress = RNFS.ExternalDirectoryPath + `/${global.USERID}.mp4`;
            this.uploadImage(data.uri);
            RNFS.moveFile(data.uri, destinationAddress).then(
              () => {
                console.log('Video copied locally!!');
              },
              (error) => {
                console.log('CopyFile fail for video: ' + error);
              },
            );
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

  uploadImage = async (uri) => {
    const filename = global.USERID + '.mp4';
    //const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const storage = getStorage();
    const metadata = {
      contentType: 'video/mp4',
    };
    const storageRef = ref(storage, `/videos/${filename}`);
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
  };
  async simulatePress() {
    this.swiper.onPress();
    await delay(7000);
    this.swiper.onPress();
  }

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
