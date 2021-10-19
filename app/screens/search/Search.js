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
  Keyboard,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  Text,
  PermissionsAndroid,
  Image,
  Button,
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
const ADD_ICON = 'account-multiple-plus';

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
    width: 70,
    height: 70,
  },
});

// Search
export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: [],
      phoneNumbers: [],
      displayName: ['None'],
      uri: 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Clipart.png',
      data: [],
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
    var id = [];
    Contacts.getAll().then(
      (contacts) => {
        for (var i = 0; i < contacts.length; i++) {
          id.push(i);
          displayName.push(contacts[i].displayName);
          phoneNumbers.push(contacts[i].phoneNumbers[0].number);
        }
        this.setState({data: contacts});
        this.setState({
          id: [...this.state.id, ...id],
          phoneNumbers: [...this.state.phoneNumbers, ...phoneNumbers],
          displayName: [...this.state.displayName, ...displayName],
        });
        console.log(contacts);
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

          {this.state.data.map((item) => (
            <View
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                flexDirection: 'row',
                borderBottomColor: '#909090',
                borderBottomWidth: 1,
                alignItems: 'center',
              }}>
              <Image source={{uri: this.state.uri}} style={styles.profilePic} />
              <View style={{paddingLeft: 20}}>
                <Text style={{fontSize: 20}}>{item.displayName}</Text>
                <Text>{item.phoneNumbers[0].number}</Text>
              </View>
              <View style={styles.AddButtonContainer}>
                <TouchableItem onPress={this.getContact}>
                  <View style={styles.searchButton}>
                    <Icon
                      name={ADD_ICON}
                      size={23}
                      color={Colors.onPrimaryColor}
                    />
                  </View>
                </TouchableItem>
              </View>
            </View>
          ))}
        </View>
      </SafeAreaView>
    );
  }
}
