/* eslint-disable prettier/prettier */
/**
 *
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// import components
import Button from '../../components/buttons/Button';
import InputModal from '../../components/modals/InputModal';
import UnderlinePasswordInput from '../../components/textinputs/UnderlinePasswordInput';
import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';
import { signInWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { passAuth, USERID } from '../../config/firebase';
import { get, getDatabase, ref, set, child, update } from 'firebase/database';
import uuid from 'react-native-uuid';

// import colors, layout
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

// SignIn Config
const PLACEHOLDER_TEXT_COLOR = Colors.onPrimaryColor;
const INPUT_TEXT_COLOR = Colors.onPrimaryColor;
const INPUT_BORDER_COLOR = Colors.onPrimaryColor;
const INPUT_FOCUSED_BORDER_COLOR = Colors.onPrimaryColor;

// SignIn Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
  contentContainerStyle: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  form: {
    paddingHorizontal: Layout.LARGE_PADDING,
  },
  inputContainer: { marginBottom: 7 },
  buttonContainer: { paddingTop: 23 },
  forgotPassword: { paddingVertical: 23 },
  forgotPasswordText: {
    fontWeight: '300',
    fontSize: 13,
    color: Colors.onPrimaryColor,
    textAlign: 'center',
  },
  separator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 64,
    height: 1,
    backgroundColor: INPUT_BORDER_COLOR,
  },
  orText: {
    top: -2,
    paddingHorizontal: 8,
    color: PLACEHOLDER_TEXT_COLOR,
  },
  buttonsGroup: {
    paddingTop: 23,
  },
  vSpacer: {
    height: 15,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '100%',
  },
  termsContainer: {
    flexDirection: 'row',
  },
  footerText: {
    fontWeight: '300',
    fontSize: 13,
    color: Colors.onPrimaryColor,
  },
  footerLink: {
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
});

// SignIn
export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailFocused: false,
      password: '',
      passwordFocused: false,
      secureTextEntry: true,
      inputModalVisible: false,
    };
  }

  emailChange = (text) => {
    this.setState({
      email: text,
    });
  };

  emailFocus = () => {
    this.setState({
      emailFocused: true,
      passwordFocused: false,
    });
  };

  passwordChange = (text) => {
    this.setState({
      password: text,
    });
  };

  passwordFocus = () => {
    this.setState({
      passwordFocused: true,
      emailFocused: false,
    });
  };

  onTogglePress = () => {
    const { secureTextEntry } = this.state;
    this.setState({
      secureTextEntry: !secureTextEntry,
    });
  };

  focusOn = (nextFiled) => () => {
    if (nextFiled) {
      nextFiled.focus();
    }
  };

  showInputModal = (value) => () => {
    this.setState({
      inputModalVisible: value,
    });
  };

  navigateTo = (screen) => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  signIn = () => () => {
    const { navigation } = this.props;
    this.setState({
      emailFocused: false,
      passwordFocused: false,
    });
    const self = this;

    signInWithEmailAndPassword(
      passAuth(),
      this.state.email,
      this.state.password,
    )
      .then((userCredential) => {
        console.log(userCredential._tokenResponse.localId);
        global.USERID = userCredential._tokenResponse.localId;
        global.DISPLAY_NAME = userCredential._tokenResponse.displayName;
        global.EMAIL = userCredential._tokenResponse.email;

        let email = userCredential._tokenResponse.email;
        email = email.split('.');
        const dbRef = ref(getDatabase());
        get(child(dbRef, `Logs/${email[0]}/seen`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              let result = snapshot.val();
              const db = getDatabase();

              console.log(result);
              if (!result) {
                Alert.alert(
                  'Login Success ',
                  'Welcome Back, You have new logs',
                  [
                    {
                      text: 'ok',
                      style: 'cancel',
                    },
                    {
                      text: 'Go to Logs',
                      onPress: () => {
                        const updates = {};

                        updates[`/Logs/${email[0]}/seen`] = true;
                        update(ref(db), updates).then((r) => {
                        navigation.navigate('Logs');
                        });


                      },
                    },
                  ],
                  {
                    cancelable: true,
                  },
                );
              }
            } else {
              console.log('No data available');
            }
          })
          .catch((error) => {
            console.error(error);
          });


        navigation.navigate('HomeNavigator');
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        if (errorCode === 'auth/wrong-password') {
          const logID = uuid.v4();
          var today = new Date();
          var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
          var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
          var dateTime = date + ' ' + time;
          let email = this.state.email;
          email = email.split('.');
          const db = getDatabase();
          set(ref(db, `Logs/${email[0]}/${logID}`), {
            ID: logID,
            email: this.state.email,
            time: dateTime,
          });
          const updates = {};
          updates[`/Logs/${email[0]}/seen`] = false;
          update(ref(db), updates).then((r) => {
          });
        }
        Alert.alert(
          'Login ',
          'Failed to Login',

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
      });
  };

  signInGoogle = async () => {
    try {
      const { navigation } = this.props;

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
      console.log(userInfo.user.id, userInfo.user.name, userInfo.user.email);
      global.USERID = userInfo.user.id;
      global.DISPLAY_NAME = userInfo.user.name;
      global.EMAIL = userInfo.user.email;
      navigation.navigate('HomeNavigator');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(1, error.code, statusCodes.SIGN_IN_CANCELLED);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log(2, error.code, statusCodes.IN_PROGRESS);

      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log(3, error.code, statusCodes.PLAY_SERVICES_NOT_AVAILABLE);

      } else {
        // some other error happened
        console.log(4, error);

      }
    }
  };

  render() {
    const {
      email,
      emailFocused,
      password,
      passwordFocused,
      secureTextEntry,
      inputModalVisible,
    } = this.state;

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <KeyboardAwareScrollView
          contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.content}>
            <View />

            <View style={styles.form}>
              <UnderlineTextInput
                onRef={(r) => {
                  this.email = r;
                }}
                onChangeText={this.emailChange}
                onFocus={this.emailFocus}
                inputFocused={emailFocused}
                onSubmitEditing={this.focusOn(this.password)}
                returnKeyType="next"
                blurOnSubmit={false}
                keyboardType="email-address"
                placeholder="E-mail or phone number"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                inputContainerStyle={styles.inputContainer}
              />

              <UnderlinePasswordInput
                onRef={(r) => {
                  this.password = r;
                }}
                onChangeText={this.passwordChange}
                onFocus={this.passwordFocus}
                inputFocused={passwordFocused}
                onSubmitEditing={this.signIn}
                returnKeyType="done"
                placeholder="Password"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                secureTextEntry={secureTextEntry}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                toggleVisible={password.length > 0}
                toggleText={secureTextEntry ? 'Show' : 'Hide'}
                onTogglePress={this.onTogglePress}
              />

              <View style={styles.buttonContainer}>
                <Button
                  color={'#fff'}
                  rounded
                  borderRadius
                  onPress={this.signIn()}
                  title={'Sign in'.toUpperCase()}
                  titleColor={Colors.primaryColor}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  color={'#fff'}
                  rounded
                  borderRadius
                  onPress={() => this.signInGoogle()}
                  title={'Sign in With Google'.toUpperCase()}
                  titleColor={Colors.primaryColor}
                />
              </View>

              <View style={styles.forgotPassword}>
                <Text
                  // onPress={this.showInputModal(true)}
                  onPress={this.navigateTo('ForgotPassword')}
                  style={styles.forgotPasswordText}>
                  Forgot password?
                </Text>
                {/* <GoogleSigninButton
                  style={{ width: '100%', height: 50, alignSelf: 'center', marginBottom: 20, marginTop: 50,borderRadius: }}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={this.signInGoogle}
                  disabled={this.state.isSigninInProgress}
                /> */}
              </View>


            </View>

            <TouchableWithoutFeedback>
              <View style={styles.footer} />
            </TouchableWithoutFeedback>
          </View>
        </KeyboardAwareScrollView>

        <InputModal
          title="Forgot password?"
          message="Enter your e-mail address to reset password"
          inputDefaultValue={email}
          inputPlaceholder="E-mail address"
          inputKeyboardType="email-address"
          onRequestClose={this.showInputModal(false)}
          buttonTitle={'Reset password'.toUpperCase()}
          onClosePress={this.showInputModal(false)}
          visible={inputModalVisible}
        />
      </SafeAreaView>
    );
  }
}
