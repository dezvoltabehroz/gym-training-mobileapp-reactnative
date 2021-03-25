import React, { Component } from 'react';
import { Image, ImageBackground, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button, Input, ColorButton } from '../../components';
import styles from './style';
import CodeInput from 'react-native-confirmation-code-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { AuthServices } from '../../services';
import Logo from '../../assets/svg/logo.svg';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
import { Alert } from 'react-native';
import Code from '../../assets/svg/code.svg'
import ProvidedEmailSign from '../../assets/svg/Subtract.svg'
class OTP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            submit: false,
            buttonLoading: false
        };
    }

    // ============== func_HandleSubmitVerificationCode - Function Will allow user to verify the code to reset his/her password ==============
    func_HandleSubmitVerificationCode = () => {
        this.setState({ buttonLoading: true })
        console.log(this.props.route.params.code)
        if (this.state.submit) {
            if (this.state.code == this.props.route.params.code) {
                AuthServices.verifyCodeForResetPass(this.state.code)
                    .then((res) => {
                        if (res.data.success) {
                            this.props.navigation.replace('NewPassword', { id: res.data.data[0].id, token: res.data.data[0].token })
                            this.setState({ buttonLoading: false })
                        }
                    })
            }
            else {

            }

        }
        // const { password, userData, phoneAuthSnapshot } = this.props.route.params;
        // if (password) {
        //     this.setState({ loading: true })
        //     let userData = {
        //         email: this.props.route.params.email,
        //         resetToken: this.state.value,
        //     }
        //     AuthServices.resetpasswordtokencheck(userData)
        //         .then((response) => {
        //             if (response.data.success) {
        //                 this.props.navigation.replace('NewPassword', { token: this.state.value, email: this.props.route.params.email, })
        //             }
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //             Alert.alert("", "Invaid Token!");
        //             this.setState({ loading: false })
        //         })
        // }
        // else {
        //     let data = {
        //         ...userData,
        //         code: phoneAuthSnapshot.code,
        //         id: phoneAuthSnapshot.verificationId
        //     }
        //     console.log('data:', data)
        //     this.props.authActions.verifyCode(data, this.props.navigation.replace)
        // }
    }

    // ============== func_HandleResendCode - Function Will allow user to resend code to reset his/her email again ==============
    func_HandleResendCode = () => {
        // const { userData } = this.props.route.params;
        // this.props.authActions.sendVerificationCode(userData, this.props.navigation.replace)
    }

    render() {
        const { code, submit, buttonLoading } = this.state;
        const { email } = this.props.route.params;
        console.log(this.props.route.params.code)
        return (
            <View>
                <ImageBackground resizeMode="cover" style={styles.backgroundStyle} source={require('../../assets/images/verification.png')}>
                    <View style={{ flex: 0.95 }}>
                        <View style={{ flex: 0.8, marginTop: '1%', }}>
                            {/* <View style={styles.innerImageContainer}>
                                <Logo />
                            </View> */}
                            <View style={styles.cardStyle}>
                                <View style={{ alignItems: "flex-start" }}>
                                    <Text style={styles.headingTextStyle}>Account</Text>
                                    <Text style={styles.headingTextStyle1}>{email != "" ? email : ""}</Text>
                                </View>
                                <View style={{ alignItems: "center" }}>
                                    <ProvidedEmailSign height={31} width={31} />
                                </View>

                            </View>
                            <View style={styles.secondCardStyle}>
                                {/* <View style={{ marginHorizontal: '2.5%', marginTop: '5%', paddingBottom: "10%", }}> */}
                                <Input
                                    label={"Code"}
                                    placeholder="Enter your reset code"
                                    value={code}
                                    leftIcon={<Code height={12} width={12} />}
                                    secureTextEntry={true}
                                    onChangeText={(code) => this.setState({ code })}
                                />

                                {
                                    submit && !code ? <Text style={[styles.errorText]}>Please fill this field</Text> : submit && code.length != 6 ? <Text style={[styles.errorText]}>Code is Invalid!</Text> : null
                                }

                            </View>

                            {/* </View> */}
                            <View style={{ alignItems: 'flex-end', marginTop: '15%', marginHorizontal: '10%' }}>
                                <ColorButton loading={buttonLoading} title='Done  ' onPress={() => this.setState({ submit: true }, () => this.func_HandleSubmitVerificationCode())} />
                            </View>
                        </View>

                        {/* <View style={{ flex: 0.8, justifyContent: 'flex-end', marginTop: "5%", }} >
                            <View style={{ alignItems: 'center', marginTop: '5%' }}>
                                <Button disabled={code != '' ? false : true} title='Verify' onPress={this.func_HandleSubmitVerificationCode} />
                            </View>
                            <TouchableOpacity onPress={this.func_HandleResendCode} style={{ alignItems: 'center', marginTop: '5%' }} >
                                <Text style={{ color: '#707070', fontFamily: 'Montserrat-Regular', }}>Resend Code</Text>
                            </TouchableOpacity>
                        </View> */}
                    </View>
                </ImageBackground>
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
export default connect(mapStateToProps, mapDispatchToProps)(OTP)