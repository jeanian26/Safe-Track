/* eslint-disable prettier/prettier */

import React, { Component } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import Button from '../../components/buttons/Button';
import { getDatabase, ref, set, get, child } from 'firebase/database';

import Colors from '../../theme/colors';
import { Heading1, Heading5, Paragraph, Heading6, Heading4 } from '../../components/text/CustomText';

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        paddingTop: 24,
        paddingHorizontal: 20,
    },
    caption: {
        paddingBottom: 12,
        textAlign: 'left',
        color: Colors.onPrimaryColor,
    },
    heading: {
        paddingBottom: 16,
        fontWeight: '700',
        fontSize: 16,
        color: Colors.onPrimaryColor,
        letterSpacing: 0.2,
        textAlign: 'left',
    },
    textBlock: {
        paddingBottom: 24,
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 22,
        color: Colors.onPrimaryColor,
        letterSpacing: 0.4,
        textAlign: 'left',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        width: '100%',
        backgroundColor: Colors.surface,
    },
    button: {
        width: '30%',
    },
    buttonAccept: {
        backgroundColor: Colors.primaryColor,
        color: Colors.onPrimaryColor,
    },
    buttonDecline: {},
    buttonContainer: {
        paddingTop: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pinCodeCircle: {
        height: 50,
        width: 50,
        backgroundColor: '#fff',
        borderRadius: 100,
    },
});

export default class PinCode extends Component {
    constructor(props) {
        super(props);
        this.state = { PIN: [] };
    }

    goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    };



    componentDidMount = async () => {

    };

    render() {
        return (
            <SafeAreaView style={styles.screenContainer}>
                <StatusBar
                    backgroundColor={Colors.statusBarColor}
                    barStyle="dark-content"
                />
                <ScrollView>
                    <View
                        style={{
                            paddingTop: 20,
                            paddingBottom: 50,
                            paddingLeft: 20,
                            paddingRight: 20,
                        }} >
                        <Heading5>Privacy Policy</Heading5>
                        <Paragraph style={{ marginTop: 10 }}>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You. We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.</Paragraph>
                        <Heading5 style={{ marginTop: 20 }}>Interpretation and Definitions</Heading5>
                        <Heading6 style={{ marginTop: 20 }}>Interpretation</Heading6>
                        <Paragraph style={{ marginTop: 10 }}>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</Paragraph>
                        <Heading6 style={{ marginTop: 20 }}>Definitions</Heading6>
                        <Paragraph style={{ marginTop: 10 }}>For the purposes of this Privacy Policy:</Paragraph>
                        <Paragraph style={{ marginTop: 10 }}>Account means a unique account created for You to access our Service or parts of our Service.</Paragraph>
                        <Paragraph style={{ marginTop: 10 }}>Affiliate means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</Paragraph>
                        <Paragraph style={{ marginTop: 10 }}>Application means the software program provided by the Company downloaded by You on any electronic device, named SafeTrack</Paragraph>
                        <Paragraph style={{ marginTop: 10 }}>Company (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to SafeTrack, Quezon Province.

                        </Paragraph>
                        <Paragraph style={{ marginTop: 10 }}>Country refers to: Philippines

                        </Paragraph>

                        <Paragraph style={{ marginTop: 10 }}>Device means any device that can access the Service such as a computer, a cellphone or a digital tablet.

                        </Paragraph>

                        <Paragraph style={{ marginTop: 10 }}>Personal Data is any information that relates to an identified or identifiable individual.

                        </Paragraph>

                        <Paragraph style={{ marginTop: 10 }}>Service refers to the Application.

                        </Paragraph>

                        <Paragraph style={{ marginTop: 10 }}>Service Provider means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.

                        </Paragraph>
                        <Paragraph style={{ marginTop: 10 }}>Usage Data refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).

                        </Paragraph>

                        <Paragraph style={{ marginTop: 10 }}>You means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.

                        </Paragraph>
                        <Heading5 style={{ marginTop: 20 }}>Collecting and Using Your Personal Data</Heading5>
                        <Heading6 style={{ marginTop: 20 }} >Types of Data Collected</Heading6>
                        <Paragraph style={{ marginTop: 10 }} >Personal Data</Paragraph>
                        <Paragraph style={{ marginTop: 10 }} >While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:

                        </Paragraph>

                        <Paragraph style={{ marginTop: 10 }} >Email address

                        </Paragraph>

                        <Paragraph style={{ marginTop: 10 }} >First name and last name

                        </Paragraph>

                        <Paragraph style={{ marginTop: 10 }} >Phone number

                        </Paragraph>
                        <Paragraph style={{ marginTop: 10 }} >Address, State, Province, ZIP/Postal code, City

                        </Paragraph>
                        <Paragraph style={{ marginTop: 10 }} />
                        <Heading6 style={{ marginTop: 20 }} >Usage Data</Heading6>
                        <Paragraph style={{ marginTop: 10 }} >Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.

                        </Paragraph>
                        <Paragraph style={{ marginTop: 10 }} >When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.
                        </Paragraph>
                        <Paragraph style={{ marginTop: 10 }} >We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.

                        </Paragraph>
                        <Heading6 style={{ marginTop: 20 }}>Information Collected while Using the Application</Heading6>
                        <Paragraph style={{ marginTop: 10 }}>While using Our Application, in order to provide features of Our Application, We may collect, with Your prior permission:</Paragraph>
                        <Paragraph style={{ marginTop: 10 }}>Information regarding your location</Paragraph>
                        <Paragraph style={{ marginTop: 10 }}>Information from your Device's phone book (contacts list)</Paragraph>
                        <Paragraph style={{ marginTop: 10 }}>Pictures and other information from your Device's camera and photo library</Paragraph>

                        <Paragraph style={{ marginTop: 10 }} >We use this information to provide features of Our Service, to improve and customize Our Service. The information may be uploaded to the Company's servers and/or a Service Provider's server or it may be simply stored on Your device.</Paragraph>
                        <Paragraph style={{ marginTop: 10 }}>You can enable or disable access to this information at any time, through Your Device settings.</Paragraph>
                        <Heading5 style={{ marginTop: 20 }}>Use of Your Personal Data</Heading5>
                        <Paragraph style={{ marginTop: 10 }}>The Company may use Personal Data for the following purposes:</Paragraph>
                        <Paragraph style={{ marginTop: 10 }}>To provide and maintain our Service, including to monitor the usage of our Service.</Paragraph>

                        <Paragraph style={{ marginTop: 10 }}>To manage Your Account: to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</Paragraph>

                        <Paragraph style={{ marginTop: 10 }}>For the performance of a contract: the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.

                        </Paragraph>

                        <Paragraph style={{ marginTop: 10 }}>To contact You: To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.

                        </Paragraph>

                        <Paragraph style={{ marginTop: 10 }}>To provide You with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.

                        </Paragraph>

                        <Paragraph style={{ marginTop: 10 }}>To manage Your requests: To attend and manage Your requests to Us.

                        </Paragraph>

                        <Paragraph style={{ marginTop: 10 }}>For business transfers: We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.

                        </Paragraph>

                        <Paragraph style={{ marginTop: 10 }}>For other purposes: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.

                        </Paragraph>

                        <Paragraph style={{ marginTop: 20 }}>We may share Your personal information in the following situations:

                        </Paragraph>

                        <Paragraph style={{ marginTop: 10 }}>With Service Providers: We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.
                        </Paragraph>

                        <Paragraph style={{ marginTop: 10 }}>For business transfers: We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.
                        </Paragraph>

                        <Paragraph style={{ marginTop: 10 }}>With Affiliates: We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.
                        </Paragraph>

                        <Paragraph style={{ marginTop: 10 }}>With business partners: We may share Your information with Our business partners to offer You certain products, services or promotions.
                        </Paragraph>

                        <Paragraph style={{ marginTop: 10 }}>With other users: when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.
                        </Paragraph>

                        <Paragraph style={{ marginTop: 10 }}>With Your consent: We may disclose Your personal information for any other purpose with Your consent.
                        </Paragraph>
                        <Heading5 style={{ marginTop: 20 }}>Retention of Your Personal Data</Heading5>
                        <Paragraph style={{ marginTop: 10 }}>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies. The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.</Paragraph>
                        <Heading5 style={{ marginTop: 20 }}>Transfer of Your Personal Data</Heading5>
                        <Paragraph style={{ marginTop: 10 }}>Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction. Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer. The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.</Paragraph>
                        <Heading5 style={{ marginTop: 30 }}>Changes to this Privacy Policy</Heading5>
                        <Paragraph style={{ marginTop: 10 }}>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</Paragraph>
                        <Paragraph style={{ marginTop: 10 }}>We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.

                        </Paragraph>
                        <Paragraph style={{ marginTop: 10 }}>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.

                        </Paragraph>
                        <Heading5 style={{marginTop:20}}>Contact Us</Heading5>
                        <Paragraph style={{marginTop:10}}>If you have any questions about this Privacy Policy, You can contact us:</Paragraph>
                        <Paragraph style={{marginTop:10}}>safetrack25@gmail.com</Paragraph>













                    </View>
                </ScrollView>


            </SafeAreaView>
        );
    }
}
