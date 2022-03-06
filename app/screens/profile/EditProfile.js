/* eslint-disable prettier/prettier */

import React, {Component} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {launchImageLibrary} from 'react-native-image-picker';
import {passAuth} from '../../config/firebase';
import {
  getDatabase,
  ref as refData,
  onValue,
  child,
  get,
  set,
  update,
} from 'firebase/database';
import {onAuthStateChanged, getAuth, updateProfile} from 'firebase/auth';

import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';

import Avatar from '../../components/avatar/Avatar';
import Icon from '../../components/icon/Icon';
import {Subtitle2} from '../../components/text/CustomText';
import TouchableItem from '../../components/TouchableItem';
import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';
import Button from '../../components/buttons/Button';

import Colors from '../../theme/colors';

const AVATAR_SIZE = 100;
const IOS = Platform.OS === 'ios';
const CAMERA_ICON = IOS ? 'ios-camera' : 'md-camera';
const INPUT_FOCUSED_BORDER_COLOR = Colors.primaryColor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  avatarSection: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  whiteCircle: {
    marginTop: -18,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
  },
  cameraButtonContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.primaryColor,
    overflow: 'hidden',
  },
  cameraButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 34,
    height: 34,
  },
  editForm: {
    paddingHorizontal: 20,
  },
  overline: {
    color: Colors.primaryColor,
    textAlign: 'left',
  },
  inputContainerStyle: {
    marginTop: 0,
    marginBottom: 17,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  buttonContainer: {
    paddingTop: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'John Doe',
      nameFocused: false,
      email: 'john.doe@example.com',
      emailFocused: false,
      phone: '',
      phoneFocused: false,
      imagePickerVisible: false,
      imagePath: null,
      uri: require('../../assets/img/profile.jpg'),
    };
  }

  goBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  nameChange = (text) => {
    this.setState({
      name: text,
    });
  };

  nameFocus = () => {
    this.setState({
      nameFocused: true,
      emailFocused: false,
      phoneFocused: false,
    });
  };
  saveProfile() {
    const {navigation} = this.props;
    const auth = getAuth();
    // updateProfile(auth.currentUser, {
    //   displayName: this.state.name,
    //   phoneNumber: '1235467',
    //   email: this.state.email,
    // })
    //   .then(() => {
    //     global.DISPLAY_NAME = this.state.name;
    //     global.EMAIL = this.state.email;
    //     navigation.navigate('Settings');
    //   })
    //   .catch((error) => {
    //     console.log('failed');
    //   });
    const user = auth.currentUser;
    const updates = {};
    const db = getDatabase();
    updates[`/Accounts/${global.USERID}/email`] = global.EMAIL;
    updates[`/Accounts/${global.USERID}/name`] = this.state.name;
    updates[`/Accounts/${global.USERID}/phone`] = this.state.phone;
    update(refData(db), updates);
    // set(refData(db, 'userPhoneNumber/' + global.USERID), {
    //   phone: this.state.phone,
    // });
  }

  chooseImage = async () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    /** @type {any} */
    const metadata = {
      contentType: 'image/jpg',
    };
    const self = this;

    launchImageLibrary(options, (res) => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
      } else {
        console.log('response', JSON.stringify(res));
        const uri = res.assets[0].uri;
        this.uploadImage(uri);
        self.setState({
          uri: uri,
        });
      }
    });
  };
  componentDidMount = async () => {

    const storage = getStorage();
    getDownloadURL(ref(storage, `profile_images/${global.USERID}.jpg`))
      .then((url) => {
        this.setState({uri: url});
      })
      .catch((error) => {
        console.log('error', error);
      });

    const dbRef = refData(getDatabase());
    get(child(dbRef, `Accounts/${global.USERID}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let result = snapshot.val();
          this.setState({phone: result.phone, name:result.name});
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  uploadImage = async (uri) => {
    const filename = global.USERID + '.jpg';
    //const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const storage = getStorage();
    const metadata = {
      contentType: 'image/jpg',
    };
    const storageRef = ref(storage, `/profile_images/${filename}`);
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

  emailChange = (text) => {
    this.setState({
      email: text,
    });
  };

  emailFocus = () => {
    this.setState({
      nameFocused: false,
      emailFocused: true,
      phoneFocused: false,
    });
  };

  phoneChange = (text) => {
    this.setState({
      phone: text,
    });
  };

  phoneFocus = () => {
    this.setState({
      nameFocused: false,
      emailFocused: false,
      phoneFocused: true,
    });
  };

  focusOn = (nextFiled) => () => {
    if (nextFiled) {
      nextFiled.focus();
    }
  };

  render() {
    const {name, nameFocused, email, emailFocused, phone, phoneFocused} =
      this.state;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <KeyboardAwareScrollView enableOnAndroid>
          <View style={styles.avatarSection}>
            <Avatar imageUri={this.state.uri} rounded size={AVATAR_SIZE} />

            <View style={styles.whiteCircle}>
              <View style={styles.cameraButtonContainer}>
                <TouchableItem onPress={() => this.chooseImage()}>
                  <View style={styles.cameraButton}>
                    <Icon
                      name={CAMERA_ICON}
                      size={16}
                      color={Colors.onPrimaryColor}
                    />
                  </View>
                </TouchableItem>
              </View>
            </View>
          </View>

          <View style={styles.editForm}>
            <Subtitle2 style={styles.overline}>Name</Subtitle2>
            <UnderlineTextInput
              onRef={(r) => {
                this.name = r;
              }}
              value={name}
              onChangeText={this.nameChange}
              onFocus={this.nameFocus}
              inputFocused={nameFocused}
              onSubmitEditing={this.focusOn(this.email)}
              returnKeyType="next"
              focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
              inputContainerStyle={styles.inputContainerStyle}
            />

            {/* <Subtitle2 style={styles.overline}>E-mail Address</Subtitle2>
            <UnderlineTextInput
              onRef={(r) => {
                this.email = r;
              }}
              value={email}
              onChangeText={this.emailChange}
              onFocus={this.emailFocus}
              inputFocused={emailFocused}
              onSubmitEditing={this.focusOn(this.phone)}
              returnKeyType="next"
              keyboardType="email-address"
              focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
              inputContainerStyle={styles.inputContainerStyle}
            /> */}

            <Subtitle2 style={styles.overline}>Phone Number</Subtitle2>
            <UnderlineTextInput
              onRef={(r) => {
                this.phone = r;
              }}
              value={phone}
              keyboardType="phone-pad"
              onChangeText={this.phoneChange}
              onFocus={this.phoneFocus}
              inputFocused={phoneFocused}
              focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
              inputContainerStyle={styles.inputContainerStyle}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => {
                this.saveProfile();
              }}
              color={Colors.primaryColor}
              small
              title={'SAVE PROFILE'.toUpperCase()}
              titleColor={Colors.background}
              borderRadius={100}
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
