/* eslint-disable prettier/prettier */

import React, { Component } from 'react';
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
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import uuid from 'react-native-uuid';

// import components

import { Heading6 } from '../../components/text/CustomText';
import TouchableItem from '../../components/TouchableItem';
import SafeAreaView from '../../components/SafeAreaView';
import Contacts from 'react-native-contacts';
import { passAuth } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, get, child } from 'firebase/database';

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
  filterItem: { flex: 1, justifyContent: 'center' },
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
  searchResults: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    borderBottomColor: '#909090',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
});

// Search
export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uri: 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Clipart.png',
      data: [],
      dataToDisplay: [],
      searchValue: '',
      uid: '',
      savedContactsData: [],
    };
  }

  navigateTo = (screen) => () => {
    const { navigation } = this.props;

    Keyboard.dismiss();

    navigation.navigate(screen);
  };

  getData() {
    Contacts.getAll().then(
      (contacts) => {
        this.setState({ data: contacts });
        this.setState({ dataToDisplay: contacts });
      },
      () => { },
    );
    onAuthStateChanged(passAuth(), (user) => {
      if (user) {
        const uid = user.uid;
        this.setState({ uid: uid });
      } else {
        console.log('no user logged in');
      }
    });
    let savedContacts = [];
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'SocialContacts/' + this.state.uid))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());
          // console.log(this.state.data);
          Object.keys(snapshot.val()).map((item, index) => {
            console.log(snapshot.val()[item].name);
            savedContacts.push(snapshot.val()[item].name);
          });
          this.setState({ savedContactsData: savedContacts });
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  componentDidMount() {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener('focus', () => {
      this.getData()
    });

  }
  componentWillUnmount() {
    // Remove the event listener
    if (this.focusListener != null && this.focusListener.remove) {
      this.focusListener.remove();
    }
  }

  searchPress(text) {
    text = text.toLowerCase();
    var arrayOfData = [];
    for (let i = 0; i < this.state.data.length; i++) {
      var rowValue = this.state.data[i].displayName;
      var rowValueLower = rowValue.toLowerCase();
      if (rowValueLower.startsWith(text)) {
        console.log(this.state.data[i].displayName);
        arrayOfData.push(this.state.data[i]);
      }
    }
    console.log(arrayOfData);
    this.setState({ dataToDisplay: arrayOfData });
  }
  addContact(index) {
    let dataSaved = this.state.savedContactsData;
    if (dataSaved.includes(this.state.data[index].displayName)) {
      Alert.alert(
        'Adding Contact Failed',
        'Already Added in your list',

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
      return;
    }
    const db = getDatabase();
    set(ref(db, 'SocialContacts/' + this.state.uid + '/' + this.state.data[index].displayName), {
      name: this.state.data[index].displayName,
      phone: this.state.data[index].phoneNumbers[0].number,
    });
    Alert.alert(
      'Contact Added',
      `${this.state.data[index].displayName} \n${this.state.data[index].phoneNumbers[0].number}`,

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
    this.getData();
  }

  render() {
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
            onChangeText={(text) => this.searchPress(text)}
          />
        </View>
        <View style={{ flex: 1, paddingLeft: 13, paddingRight: 13 }}>
          <ScrollView>
            {this.state.dataToDisplay.map((item, index) => (
              <View style={styles.searchResults}>
                <Image
                  source={{ uri: this.state.uri }}
                  style={styles.profilePic}
                />
                <View style={{ paddingLeft: 20 }}>
                  <Text style={{ fontSize: 20 }}>{item.displayName}</Text>
                  <Text>{item.phoneNumbers[0].number}</Text>
                </View>
                <View style={styles.AddButtonContainer}>
                  <TouchableItem onPress={() => this.addContact(index)}>
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
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
