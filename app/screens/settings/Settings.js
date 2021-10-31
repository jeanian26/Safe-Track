/* eslint-disable prettier/prettier */
/**
 *
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
  Alert,
  I18nManager,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  View,
} from 'react-native';
import {color} from 'react-native-reanimated';

// import components
import {getAuth} from 'firebase/auth';
import {getStorage, ref, getDownloadURL} from 'firebase/storage';
import {getDatabase, ref as refData, child, get, set} from 'firebase/database';
import Avatar from '../../components/avatar/Avatar';
import Divider from '../../components/divider/Divider';
import Icon from '../../components/icon/Icon';
import {Heading6, Subtitle1, Subtitle2} from '../../components/text/CustomText';
import TouchableItem from '../../components/TouchableItem';
import {passAuth} from '../../config/firebase';
import {signOut} from 'firebase/auth';

// import colors
import Colors from '../../theme/colors';

// Settings Config
const isRTL = I18nManager.isRTL;
const IOS = Platform.OS === 'ios';
const DIVIDER_MARGIN_LEFT = 60;
const ARROW_ICON = 'ios-arrow-forward';
const ADDRESS_ICON = IOS ? 'ios-pin' : 'md-pin';
const NOTIFICATION_OFF_ICON = IOS
  ? 'ios-notifications-off'
  : 'md-notifications-off';
const NOTIFICATION_ICON = IOS ? 'ios-notifications' : 'md-notifications';
const PAYMENT_ICON = IOS ? 'ios-card' : 'md-card';
const ORDERS_ICON = IOS ? 'ios-list' : 'md-list';
const TERMS_ICON = IOS ? 'ios-document' : 'md-document';
const ABOUT_ICON = IOS
  ? 'ios-information-circle-outline'
  : 'md-information-circle-outline';
const LOGOUT_ICON = IOS ? 'ios-log-out' : 'md-log-out';

// Settings Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainerStyle: {
    paddingBottom: 16,
  },
  titleContainer: {
    paddingHorizontal: 16,
  },
  titleText: {
    paddingTop: 16,
    paddingBottom: 24,
    paddingLeft: 16,
    fontWeight: '700',
    textAlign: 'left',
    color: Colors.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  profileContainer: {
    paddingBottom: 15,
  },
  profileCenter: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 15,
  },
  leftSide: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileInfo: {
    paddingLeft: 16,
  },
  name: {
    fontWeight: '500',
    textAlign: 'left',
    color: Colors.white,
  },
  email: {
    paddingVertical: 2,
    color: Colors.white,
  },
  mediumText: {
    fontWeight: '500',
  },
  setting: {
    height: 56,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    width: 28,
    height: 28,
  },
  extraDataContainer: {
    top: -8,
    marginLeft: DIVIDER_MARGIN_LEFT,
    paddingBottom: 8,
  },
  extraData: {
    textAlign: 'left',
  },
  logout: {color: Colors.primaryText},
});

// Settings Props
type Props = {
  icon: string,
  title: String,
  onPress: () => {},
  extraData: React.Node,
};

// Settings Components
const Setting = ({icon, title, onPress, extraData}: Props) => (
  <TouchableItem onPress={onPress}>
    <View>
      <View style={[styles.row, styles.setting]}>
        <View style={styles.leftSide}>
          {icon !== undefined && (
            <View style={styles.iconContainer}>
              <Icon name={icon} size={24} color={Colors.primaryColor} />
            </View>
          )}
          <Subtitle1 style={styles.mediumText}>{title}</Subtitle1>
        </View>

        <View style={isRTL && {transform: [{scaleX: -1}]}}>
          <Icon name={ARROW_ICON} size={16} color="rgba(0, 0, 0, 0.16)" />
        </View>
      </View>

      {extraData ? (
        <View style={styles.extraDataContainer}>{extraData}</View>
      ) : (
        <View />
      )}
    </View>
  </TouchableItem>
);

// Settings
export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationsOn: true,
      name: 'test',
      email: 'test',
      imageUri: require('../../assets/img/profile.jpg'),
      number: '',
      street: '',
      district: '',
      city: '',
      country: 'Philippines',
    };
  }

  navigateTo = (screen) => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  toggleNotifications = (value) => {
    this.setState({
      notificationsOn: value,
    });
  };

  logout = () => {
    const {navigation} = this.props;
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            signOut(passAuth())
              .then(() => {
                navigation.navigate('Welcome');
              })
              .catch((error) => {
                console.log(error);
              });
          },
        },
      ],
      {cancelable: false},
    );
  };

  componentDidMount = () => {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      const auth = getAuth();
      const user = auth.currentUser;
      const self = this;
      console.log(user.uid);
      if (user !== null) {
        user.providerData.forEach((profile) => {
          this.setState({name: profile.displayName});
          this.setState({email: profile.email});
        });
      }
      const storage = getStorage();
      getDownloadURL(ref(storage, `profile_images/${user.uid}.jpg`))
        .then((url) => {
          self.setState({imageUri: url});
        })
        .catch((error) => {
          // Handle any errors
        });
      const dbRef = refData(getDatabase());
      get(child(dbRef, `address/${user.uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            const result = snapshot.val();
            self.setState({
              number: result.str_number,
              street: result.street_name,
              district: result.barangay,
              city: result.city,
              zip: result.zipcode,
            });
          } else {
            console.log('No data available');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  render() {
    const {notificationsOn} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.primaryColor}
          barStyle="dark-content"
        />

        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          {/* <View style={styles.titleContainer,{backgroundColor:Colors.primaryColor}}>
            <Heading6 style={styles.titleText}>Settings</Heading6>
          </View> */}

          <TouchableItem useForeground onPress={this.navigateTo('EditProfile')}>
            <View
              style={
                ([styles.row, styles.profileContainer],
                {backgroundColor: Colors.primaryColor})
              }>
              <View style={styles.profileCenter}>
                <Avatar imageUri={this.state.imageUri} rounded size={80} />
                <View style={styles.profileCenter}>
                  <Subtitle1 style={styles.name}>{this.state.name}</Subtitle1>
                  <Subtitle2 style={styles.email}>{this.state.email}</Subtitle2>
                </View>
              </View>
            </View>
          </TouchableItem>

          <Setting
            onPress={this.navigateTo('EditAddress')}
            icon={ADDRESS_ICON}
            title="Personal Address"
            extraData={
              <View>
                <View>
                  <Subtitle2 style={styles.extraData}>
                    {this.state.number + ' ' + this.state.street}
                  </Subtitle2>
                  <Subtitle2 style={styles.extraData}>
                    {this.state.district +
                      ' ' +
                      this.state.city +
                      ' ' +
                      this.state.country}
                  </Subtitle2>
                </View>
              </View>
            }
          />
          <Divider type="inset" marginLeft={DIVIDER_MARGIN_LEFT} />

          <Divider type="inset" marginLeft={DIVIDER_MARGIN_LEFT} />

          <Setting
            onPress={this.navigateTo('TermsConditions')}
            icon={TERMS_ICON}
            title="Settings"
          />
          <Divider type="inset" marginLeft={DIVIDER_MARGIN_LEFT} />

          <Setting
            onPress={this.navigateTo('Social')}
            icon={ABOUT_ICON}
            title="Social Networks"
          />
          <Divider type="inset" marginLeft={DIVIDER_MARGIN_LEFT} />

          <TouchableItem onPress={this.logout}>
            <View style={[styles.row, styles.setting]}>
              <View style={styles.leftSide}>
                <View style={styles.iconContainer}>
                  <Icon
                    name={LOGOUT_ICON}
                    size={24}
                    color={Colors.primaryColor}
                  />
                </View>
                <Subtitle1 style={[styles.logout, styles.mediumText]}>
                  Logout
                </Subtitle1>
              </View>
            </View>
          </TouchableItem>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
