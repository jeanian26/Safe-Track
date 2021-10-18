/**
 * safetrack - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
  I18nManager,
  Keyboard,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  Text,
  PermissionsAndroid,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import components

import {Heading6} from '../../components/text/CustomText';
import TouchableItem from '../../components/TouchableItem';
import SafeAreaView from '../../components/SafeAreaView';
import Contacts from 'react-native-contacts';

// import colors
import Colors from '../../theme/colors';

// Search Config
const isRTL = I18nManager.isRTL;
const SEARCH_ICON = 'magnify';

// Search Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  titleContainer: {
    paddingHorizontal: 16,
  },
  titleText: {
    paddingTop: 16,
    paddingBottom: 8,
    fontWeight: '700',
    textAlign: 'left',
  },
  inputContainer: {
    marginHorizontal: 16,
    paddingBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    paddingLeft: 8,
    paddingRight: 51,
    height: 46,
    fontSize: 16,
    textAlignVertical: 'center',
    textAlign: isRTL ? 'right' : 'left',
  },
  searchButtonContainer: {
    position: 'absolute',
    top: 4,
    right: 4,
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
  filtersList: {
    paddingVertical: 8,
    paddingRight: isRTL ? 0 : 16,
    paddingLeft: isRTL ? 16 : 0,
  },
  filterItemContainer: {
    marginRight: isRTL ? 16 : 0,
    marginLeft: isRTL ? 0 : 16,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(35, 47, 52, 0.08)',
    overflow: 'hidden',
  },
  filterItem: {flex: 1, justifyContent: 'center'},
  filterName: {
    top: -1,
    fontWeight: '700',
    color: 'rgb(35, 47, 52)',
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
  },
  profilePic: {
    width: 80,
    height: 80,
  },
});

// Search
export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: [1, 3, 4, 5, 6, 7],
      phoneNumbers: [],
      displayName: ['None'],
      source:
        'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Clipart.png',
    };
  }

  navigateTo = (screen) => () => {
    const {navigation} = this.props;

    Keyboard.dismiss();

    navigation.navigate(screen);
  };
  componentDidMount() {
    var phoneNumbers = [];
    var displayName = [];
    Contacts.getAll().then(
      (contacts) => {
        for (var i = 0; i < contacts.length; i++) {
          displayName.push(contacts[i].displayName);
          phoneNumbers.push(contacts[i].phoneNumbers[0].number);
        }
        this.setState({
          phoneNumbers: [...this.state.phoneNumbers, ...phoneNumbers],
        });
        console.log(phoneNumbers);
      },
      () => {},
    );
  }

  render() {
    const {} = this.state;

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.titleContainer}>
          <Heading6 style={styles.titleText}>Search</Heading6>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Search for your Contact"
            returnKeyType="search"
            maxLength={50}
            style={styles.textInput}
          />
          <View style={styles.searchButtonContainer}>
            <TouchableItem onPress={this.getContact}>
              <View style={styles.searchButton}>
                <Icon
                  name={SEARCH_ICON}
                  size={23}
                  color={Colors.onPrimaryColor}
                />
              </View>
            </TouchableItem>
          </View>
          <View>
            {this.state.phoneNumbers.map((item) => (
              <Text key={item}>{item}</Text>
            ))}
            {this.state.phoneNumbers.map((item) => (
              <Image
                key={item}
                source={this.state.source}
                style={styles.profilePic}
              />
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
