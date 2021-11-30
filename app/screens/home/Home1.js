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
  Alert,
} from 'react-native';
import { getAuth } from 'firebase/auth';
import {
  getDatabase,
  ref as refData,
  child,
  get,
} from 'firebase/database';

import Button from '../../components/buttons/Button';
import { Heading4, Heading6 } from '../../components/text/CustomText';
const bgImg = 'http://www.newgeography.com/files/manila-1.jpg';
import Colors from '../../theme/colors';
import GradientContainer from '../../components/gradientcontainer/GradientContainer';
import Logo from '../../components/logo/Logo';
import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
} from "react-native-sensors";
import { map, filter } from "rxjs/operators";



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
      ShakeSetting: true,
      isAlertActive: false,
    };
  }
  getShakeSettings() {
    const auth = getAuth();
    const user = auth.currentUser;
    const dbRef = refData(getDatabase());
    get(child(dbRef, `Shake/${user.uid}`))
      .then((snapshot) => {
        let result = snapshot.val();
        console.log(result.Activate);
        if (result.Activate === true) {
          this.setState({ ShakeSetting: true });
        } else {
          this.setState({ ShakeSetting: false });
        }
      })
      .catch((error) => {
        console.log("Shake Error", error);
        this.setState({ ShakeSetting: false });
      });
  }

  navigateTo = (screen) => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };
  componentDidMount() {
    console.log('test');
    const { navigation } = this.props;
    if (this.state.isAlertActive === false) {
      this.getShakeSettings();
      this.Subscribeshake();
    }


    this.focusListener = navigation.addListener('focus', () => {
      if (this.state.isAlertActive === false) {
        this.getShakeSettings();
        this.Subscribeshake();
      }
    });
  }
  Subscribeshake() {
    const subscription = accelerometer.subscribe(
      ({ x, y, z }) => this.computeShake(x, y, z, subscription),
      error => console.log(error)
    );

    // this.componentDidUpdate{
    //   if
    // }


  }
  computeShake(x, y, z, subscription) {
    const { navigation } = this.props;
    let total = Math.abs(x) + Math.abs(y) + Math.abs(z);
    if (this.state.isAlertActive === false) {
      if (total >= 20) {
        this.setState({ isAlertActive: true });
        subscription.unsubscribe();
        console.log('STOP');
        Alert.alert('SHAKE EVENT DETECTED', `DO YOU WANT TO RECORD A VIDEO?`, [
          {
            text: 'Yes',
            onPress: () => {
              this.setState({ isAlertActive: false });
              navigation.navigate("Camera", { event: true });
            },
          },
          {
            text: 'No',
            onPress: () => {
              this.setState({ isAlertActive: false });
              this.Subscribeshake();
              return;
            },
          },
        ]);
      }
    }

    return;


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
