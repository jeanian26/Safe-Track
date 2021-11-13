/* eslint-disable prettier/prettier */

import React, { Component } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Platform,
    Alert
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

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
});

export default class Fingerprint extends Component {
    constructor(props) {
        super(props);
        this.state = { PIN: [] };
    }

    goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    };


    componentDidMount() {
        FingerprintScanner
            .isSensorAvailable()
            .then(biometryType => console.log("Good", biometryType))
            .catch(error => console.log(error));

        if (this.requiresLegacyAuthentication()) {
            this.authLegacy();
        } else {
            this.authCurrent();
        }
    }
    componentWillUnmount = () => {
        FingerprintScanner.release();
    }
    requiresLegacyAuthentication() {
        return Platform.Version < 23;
    }
    authCurrent() {
        FingerprintScanner
            .authenticate({ title: 'Log in with Biometrics' })
            .then(() => {
                this.props.onAuthenticate();
            }).catch((error) => console.log(error));
    }
    authLegacy() {
        FingerprintScanner
            .authenticate({ onAttempt: this.handleAuthenticationAttemptedLegacy })
            .then(() => {
                this.props.handlePopupDismissedLegacy();
                Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
            })
            .catch((error) => {
                this.setState({ errorMessageLegacy: error.message, biometricLegacy: error.biometric });
                this.description.shake();
            });
    }
    handleAuthenticationAttemptedLegacy = (error) => {
        this.setState({ errorMessageLegacy: error.message });
        this.description.shake();
    };


    render() {

        return (
            <SafeAreaView style={styles.screenContainer}>
                <StatusBar
                    backgroundColor={Colors.statusBarColor}
                    barStyle="dark-content"
                />
                <View
                    style={{
                        paddingTop: 50,
                        paddingBottom: 50,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        height: 150,
                    }}>
                </View>

            </SafeAreaView >
        );
    }
}
