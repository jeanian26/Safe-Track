/**
 * Foodvila - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component, PureComponent} from 'react';
import {
  AppRegistry,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import RNFS from 'react-native-fs';
import {RNCamera} from 'react-native-camera';

// import components

// import colors
import Colors from '../../theme/colors';

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
      },
    };
  }

  takeVideo = async () => {
    if (this.state.isRecording == false) {
      if (this.camera) {
        try {
          const promise = this.camera.recordAsync(this.state.recordOptions);

          if (promise) {
            this.setState({isRecording: true});
            const data = await promise;
            let fileName = 'VID_currentDate.mp4';
            this.setState({isRecording: false});
            console.log('takeVideo', data);
            const destinationAddress = RNFS.ExternalDirectoryPath + '/vid.mp4';
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
          this.setState({isRecording: false});
        }
      }
    } else {
      this.camera.stopRecording();
    }
  };
  render() {
    const {} = this.state;

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
            style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={this.takeVideo.bind(this)}
              style={styles.capture}>
              <Text style={{fontSize: 14}}>
                {' '}
                {this.state.isRecording == false ? 'START' : 'STOP'}{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

AppRegistry.registerComponent('App', () => Cart);
