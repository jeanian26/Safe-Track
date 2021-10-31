/* eslint-disable prettier/prettier */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Intro from '../screens/introduction/Introduction';

import Welcome from '../screens/welcome/Welcome';

import SignUp from '../screens/signup/SignUp';

import SignIn from '../screens/signin/SignIn';

import ForgotPassword from '../screens/forgotpassword/ForgotPassword';

import TermsConditions from '../screens/terms/TermsConditions';

import HomeNavigator from './HomeNavigator1';

import EditProfile from '../screens/profile/EditProfile';

import EditAddress from '../screens/address/EditAddress';

import Notifications from '../screens/notifications/Notifications';

import Social from '../screens/Social/Social';

import Colors from '../theme/colors';

const Stack = createStackNavigator();

function MainNavigatorA() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardOverlayEnabled: false,
          headerStyle: {
            elevation: 1,
            shadowOpacity: 0,
          },
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTintColor: Colors.onBackground,
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name="Onboarding"
          component={Intro}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: 'Create Account',
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
        />
        {/* <Stack.Screen
          name="Verification"
          component={Verification}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            title: 'Sign In',
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
            title: 'Forgot Password?',
          }}
        />
        <Stack.Screen
          name="TermsConditions"
          component={TermsConditions}
          options={{
            title: 'Terms and Conditions',
          }}
        />
        <Stack.Screen
          name="HomeNavigator"
          component={HomeNavigator}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={({navigation}) => ({
            title: 'Edit Profile',
          })}
        />

        <Stack.Screen
          name="EditAddress"
          component={EditAddress}
          options={{
            title: 'Edit Address',
          }}
        />

        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{
            title: 'Notifications',
          }}
        />
        <Stack.Screen
          name="Social"
          component={Social}
          options={{
            title: 'Social Networks',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigatorA;
