/* eslint-disable prettier/prettier */
/**
 *
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {SafeAreaView as SafeView} from 'react-native-safe-area-context';

import Colors from '../theme/colors';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});

type Prpos = {
  children: React.ReactNode,
  style: ViewStyle,
};

// SafeAreaView
const SafeAreaView = ({children, style, ...rest}: Prpos) => {
  return (
    <SafeView
      style={[
        styles.safeArea,
        // {backgroundColor: Colors.background},
        style,
      ]}
      {...rest}>
      {children}
    </SafeView>
  );
};

// export SafeAreaView
export default SafeAreaView;
