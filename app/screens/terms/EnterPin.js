/* eslint-disable prettier/prettier */

import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
} from 'react-native';

import Button from '../../components/buttons/Button';
import {getDatabase, ref, set, get, child} from 'firebase/database';

import Colors from '../../theme/colors';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  caption: {
    paddingBottom: 12,
    textAlign: 'left',
    color: Colors.onPrimaryColor,
  },
  heading: {
    paddingBottom: 16,
    fontWeight: '700',
    fontSize: 16,
    color: Colors.onPrimaryColor,
    letterSpacing: 0.2,
    textAlign: 'left',
  },
  textBlock: {
    paddingBottom: 24,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.onPrimaryColor,
    letterSpacing: 0.4,
    textAlign: 'left',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    width: '100%',
    backgroundColor: Colors.surface,
  },
  button: {
    width: '30%',
    fontSize: 24,
  },
  buttonAccept: {
    backgroundColor: Colors.primaryColor,
    color: Colors.onPrimaryColor,
  },
  buttonDecline: {},
  buttonContainer: {
    paddingTop: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinCodeCircle: {
    height: 50,
    width: 50,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  pinStyle: {
    fontSize: 50,
  },
  forgotPassword: {paddingVertical: 23},
  forgotPasswordText: {
    fontWeight: '300',
    fontSize: 13,
    color: '#000',
    textAlign: 'center',
  },
});

export default class TermsConditions extends Component {
  constructor(props) {
    super(props);
    this.state = {PIN: [], CorrectPin: []};
  }

  onpressNumber = (number) => {
    const {navigation} = this.props;
    let pin = this.state.PIN;
    let CorrectPin = this.state.CorrectPin;
    pin.push(number);
    this.setState({PIN: pin});

    if (pin.length === 4) {
      if (JSON.stringify(pin) === JSON.stringify(CorrectPin)) {
        console.log('true');
        ToastAndroid.showWithGravity(
          'CORRECT',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        navigation.navigate('HomeNavigator');
      } else {
        console.log('wrong');
        this.setState({PIN: []});
        ToastAndroid.showWithGravity(
          'FAILED',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        return;
      }
      return;
    }
  };
  onPressReset = () => {
    let pin = [];
    this.setState({PIN: pin});
    console.log(this.state.PIN);
  };
  onPressDelete = () => {
    let pin = this.state.PIN;
    if (pin.length === 0) {
      return;
    }
    pin.pop();
    this.setState({PIN: pin});
    console.log(this.state.PIN);
  };
  savePinCode = () => {
    const db = getDatabase();
    set(ref(db, 'pin/' + global.USERID), {
      pin: this.state.PIN,
      Activate: true,
    });
  };
  loadPinCode = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `pin/${global.USERID}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let result = snapshot.val();
          console.log(result.pin);
          this.setState({CorrectPin: result.pin});
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  componentDidMount = async () => {
    this.loadPinCode();
  };
  goLogin = () => {
    const {navigation} = this.props;
    navigation.navigate('SignIn');
  };

  render() {
    var pinImage = [];
    var data = this.state.PIN;
    for (let i = 0; i < data.length; i++) {
      pinImage.push(
        <Text style={styles.pinStyle} key={i}>
          *
        </Text>,
      );
    }
    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: 50,
            height: 150,
          }}>
          <Text style={{fontSize: 24}}>Enter 4 digit pin code</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingBottom: 30,
            height: 100,
          }}>
          {pinImage}
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            onPress={() => this.onpressNumber(1)}
            buttonStyle={[styles.button, styles.buttonDecline]}
            title="1"
            darkScreenOutlinedTitle
            rounded
            titleColor={Colors.primaryColor}
          />
          <Button
            onPress={() => this.onpressNumber(2)}
            buttonStyle={[styles.button, styles.buttonDecline]}
            title="2"
            darkScreenOutlinedTitle
            rounded
            titleColor={Colors.primaryColor}
          />
          <Button
            onPress={() => this.onpressNumber(3)}
            buttonStyle={[styles.button, styles.buttonDecline]}
            title="3"
            darkScreenOutlinedTitle
            rounded
            titleColor={Colors.primaryColor}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            onPress={() => this.onpressNumber(4)}
            buttonStyle={[styles.button, styles.buttonDecline]}
            title="4"
            darkScreenOutlinedTitle
            rounded
            titleColor={Colors.primaryColor}
          />
          <Button
            onPress={() => this.onpressNumber(5)}
            buttonStyle={[styles.button, styles.buttonDecline]}
            title="5"
            darkScreenOutlinedTitle
            rounded
            titleColor={Colors.primaryColor}
          />
          <Button
            onPress={() => this.onpressNumber(6)}
            buttonStyle={[styles.button, styles.buttonDecline]}
            title="6"
            darkScreenOutlinedTitle
            rounded
            titleColor={Colors.primaryColor}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            onPress={() => this.onpressNumber(7)}
            buttonStyle={[styles.button, styles.buttonDecline]}
            title="7"
            darkScreenOutlinedTitle
            rounded
            titleColor={Colors.primaryColor}
          />
          <Button
            onPress={() => this.onpressNumber(8)}
            buttonStyle={[styles.button, styles.buttonDecline]}
            title="8"
            darkScreenOutlinedTitle
            rounded
            titleColor={Colors.primaryColor}
          />
          <Button
            onPress={() => this.onpressNumber(9)}
            buttonStyle={[styles.button, styles.buttonDecline]}
            title="9"
            darkScreenOutlinedTitle
            rounded
            titleColor={Colors.primaryColor}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            onPress={() => this.onPressReset()}
            buttonStyle={[styles.button, styles.buttonDecline]}
            title="RESET"
            darkScreenOutlinedTitle
            rounded
            titleColor={Colors.primaryColor}
          />
          <Button
            onPress={() => this.onpressNumber(0)}
            buttonStyle={[styles.button, styles.buttonDecline]}
            title="0"
            darkScreenOutlinedTitle
            rounded
            titleColor={Colors.primaryColor}
          />
          <Button
            onPress={() => this.onPressDelete()}
            buttonStyle={[styles.button, styles.buttonDecline]}
            title="DELETE"
            darkScreenOutlinedTitle
            rounded
            titleColor={Colors.primaryColor}
          />
        </View>
        <View style={styles.forgotPassword}>
          <Text
            // onPress={this.showInputModal(true)}
            onPress={() => {
              this.goLogin();
            }}
            style={styles.forgotPasswordText}>
            Log in with another account
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}
