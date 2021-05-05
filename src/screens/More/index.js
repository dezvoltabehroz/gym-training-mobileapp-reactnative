import React, { Component } from 'react';
import { Image, Dimensions, Platform, ScrollView, Text, TouchableOpacity, View, Linking } from 'react-native';
import styles from './style';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
import Modal from 'react-native-modal'
import { Button } from 'react-native-elements'
import Star from '../../assets/svg/Star.svg';
import About from '../../assets/svg/about.svg';
import SignOut from '../../assets/svg/signout.svg';
import ProfileIcon from '../../assets/svg/profile_icon.svg';
import themeStyle from '../../assets/styles/theme.style';
import buttonStyle from '../../components/Button/style';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class More extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            submit: false,
            signOutModal: false
        };
    }



    // ============== func_HandleResendCode - Function Will allow user to resend code to reset his/her email again ==============
    func_HandleResendCode = () => {
        // const { userData } = this.props.route.params;
        // this.props.authActions.sendVerificationCode(userData, this.props.navigation.replace)
    }

    render() {
        const { code, submit } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: themeStyle.COLOR_WHITE }}>
                <View style={{ flex: 0.95 }}>
                    <View style={{ flex: 0.8, marginTop: '1%', }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={styles.cardStyle}>
                            <View style={{ alignItems: "center" }}>
                                <ProfileIcon height={31} width={31} />
                            </View>
                            <View style={{ width: 15 }}></View>
                            <View style={{ alignItems: "flex-start" }}>
                                <Text style={styles.headingTextStyle}>Profile</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('About')} style={styles.cardStyle}>
                            <View style={{ alignItems: "center" }}>
                                <About height={31} width={31} />
                            </View>
                            <View style={{ width: 15 }}></View>
                            <View style={{ alignItems: "flex-start" }}>
                                <Text style={styles.headingTextStyle}>About Us</Text>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            let url = "https://play.google.com/store/apps/details?id=com.infinitybits.educogym"
                            Linking.openURL(url)
                        }} style={styles.cardStyle}>
                            <View style={{ alignItems: "center" }}>
                                <Star height={31} width={31} />
                            </View>
                            <View style={{ width: 15 }}></View>
                            <View style={{ alignItems: "flex-start" }}>
                                <Text style={styles.headingTextStyle}>Rate App</Text>
                            </View>

                        </TouchableOpacity>
                        <View style={{ flex: 0.15, alignItems: 'flex-end', marginTop: '15%', marginHorizontal: "5%" }}>
                            <Button titleStyle={buttonStyle.colorBtnPrimaryText} buttonStyle={styles.colorBtnPrimary} title='Sign Out' onPress={() => this.setState({ signOutModal: true })} />
                        </View>
                    </View>

                </View>
                <Modal isVisible={this.state.signOutModal}>
                    <View style={{ backgroundColor: "white", borderRadius: 8, marginHorizontal: '2.5%', marginBottom: 2, }}>
                        <View style={{ marginHorizontal: "5%", marginTop: '5%', alignItems: "center" }}>
                            <SignOut />
                        </View>
                        <View style={{ marginHorizontal: '2.5%', marginTop: '3.5%' }}>
                            <Text style={{ fontSize: 12, fontFamily: 'Montserrat-Medium', fontWeight: "normal", textAlign: "center", color: "#77777B" }} >Are you sure you want to Sign Out?</Text>

                        </View>
                        <View style={{ flexDirection: "row", marginTop: "5%", }}>
                            <TouchableOpacity onPress={() => this.setState({ signOutModal: false })} style={{ flex: 1, height: 54, borderBottomLeftRadius: 8, alignItems: "center", justifyContent: "center", backgroundColor: "#77777B" }}>
                                <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Medium', fontWeight: "normal", textAlign: "center", color: "#FFF" }} >No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.authActions.removeUser(this.props.navigation.replace)} style={{ flex: 1, height: 54, borderBottomRightRadius: 8, alignItems: "center", justifyContent: "center", backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR }}>
                                <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Medium', fontWeight: "normal", textAlign: "center", color: "#FFF" }} >Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(More)