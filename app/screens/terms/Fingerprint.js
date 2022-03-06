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
    Alert,
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { Caption, Paragraph } from '../../components/text/CustomText';
import Button from '../../components/buttons/Button';

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
    contentContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 24,
    },
    instructionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
    },
    result: {
        marginTop: 32,
        paddingHorizontal: 32,
        fontSize: 20,
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 20,
        width: '100%',
    },
    extraSmallButton: {
        width: '48%',
    },
});

export default class Fingerprint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fingerPrint: 'Not Good',
        };
    }

    goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    };


    componentDidMount() {
        this.askFingerprint();
    }
    askFingerprint() {
        console.log('start biometrics');
        FingerprintScanner.release();
        FingerprintScanner
            .isSensorAvailable()
            .then(biometryType => console.log('Good', biometryType))
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
            .then((result) => {
                this.setState({ fingerPrint: 'Good' });
                console.log(result);
            }).catch((error) => {
                console.log(error);
                this.setState({ fingerPrint: 'Not Good' });
            }
            );
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

                <View style={styles.instructionContainer}>
                    <Paragraph style={styles.instruction}>
                        Tap the fingerprint Sensor
                    </Paragraph>
                    <Paragraph style={styles.result}>
                        {this.state.fingerPrint}
                    </Paragraph>
                </View>
                <View style={styles.buttonsContainer}>
                    <Button
                        onPress={() => this.askFingerprint()}
                        disabled={false}
                        small
                        title={'Try again'.toUpperCase()}
                        buttonStyle={styles.extraSmallButton}
                    />
                </View>

            </SafeAreaView >
        );
    }
}
