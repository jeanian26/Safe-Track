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
  I18nManager,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {getDatabase, ref, child, get} from 'firebase/database';

import TouchableItem from '../../components/TouchableItem';

// import colors
import Colors from '../../theme/colors';

// AboutUs Config
const isRTL = I18nManager.isRTL;

const AVATAR_SIZE = 54;
const REMOVE_ICON = 'account-multiple-minus';

// AboutUs Styles
const styles = StyleSheet.create({
  pb6: {paddingBottom: 6},
  pl8: {paddingLeft: 8},
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 16,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  swiperContainer: {
    width: '100%',
    height: 252,
  },
  paginationStyle: {
    bottom: 14,
    transform: [{scaleX: isRTL ? -1 : 1}],
  },
  dot: {backgroundColor: Colors.primaryColor},
  activeDot: {backgroundColor: Colors.white},
  bgImg: {
    flex: 1,
    resizeMode: 'cover',
  },
  swiperContent: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 16,
  },
  avatarWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: AVATAR_SIZE + 2,
    height: AVATAR_SIZE + 2,
    borderRadius: (AVATAR_SIZE + 4) / 2,
    backgroundColor: Colors.white,
  },
  info: {
    fontWeight: '500',
  },
  infoText: {
    color: Colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 4,
    textAlign: 'left',
  },
  caption: {
    color: Colors.primaryColor,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 4,
    textAlign: 'left',
  },
  description: {
    maxWidth: '80%',
  },
  phone: {
    marginTop: 8,
    color: Colors.primaryColor,
  },
  social: {
    flexDirection: 'row',
    marginTop: 8,
    fontWeight: '500',
    marginBottom: 20,
  },
  socialButton: {
    margin: 8,
    borderRadius: 22,
    backgroundColor: Colors.primaryColor,
  },
  socialIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: 44,
  },
  footer: {
    width: '100%',
    backgroundColor: Colors.background,
  },
  footerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
  },
  footerButtonText: {
    fontWeight: '500',
    color: Colors.primaryColor,
  },
  profilePic: {
    width: 70,
    height: 70,
  },
  searchResults: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    borderBottomColor: '#909090',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  AddButtonContainer: {
    position: 'absolute',
    right: 5,
    borderRadius: 4,
    backgroundColor: Colors.primaryColor,
    overflow: 'hidden',
  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 38,
    height: 38,
  },
});

// AboutUs
export default class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      uri: 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Clipart.png',
    };
  }

  goBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  componentDidMount() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'contacts/'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          this.setState({data: snapshot.val()});
          console.log(this.state.data);
          Object.keys(snapshot.val()).map((item, index) => {
            console.log(snapshot.val()[item].name);
          });
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={{flex: 1, paddingLeft: 13, paddingRight: 13}}>
          <ScrollView>
            {Object.keys(this.state.data).map((item, index) => {
              if (global.USERID === this.state.data[item].userID) {
                return (
                  <View style={styles.searchResults}>
                    <Image
                      source={{uri: this.state.uri}}
                      style={styles.profilePic}
                    />
                    <View style={{paddingLeft: 20}}>
                      <Text style={{fontSize: 20}}>
                        {this.state.data[item].name}
                      </Text>
                      <Text>{this.state.data[item].phone}</Text>
                    </View>
                    <View style={styles.AddButtonContainer}>
                      <TouchableItem>
                        <View style={styles.searchButton}>
                          <Icon
                            name={REMOVE_ICON}
                            size={23}
                            color={'#BF0A30'}
                          />
                        </View>
                      </TouchableItem>
                    </View>
                  </View>
                );
              }
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
