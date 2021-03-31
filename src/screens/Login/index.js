import React, { Component } from 'react';
import { Image, ImageBackground, TouchableOpacity, Dimensions, Text, View, Alert, ActivityIndicator } from 'react-native';
import { Button, Input, ClearButton, Icon, ColorButton } from '../../components';
import styles from './style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { AuthServices } from '../../services';
import AsyncStorage from '@react-native-community/async-storage';
// import { GoogleSignin } from '@react-native-community/google-signin';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
import Logo from '../../assets/svg/logo.svg';
import Email from '../../assets/svg/email_icon.svg';
import Password from '../../assets/svg/password_icon.svg';
import themeStyle from '../../assets/styles/theme.style';
import Modal from 'react-native-modal';
import { color } from 'react-native-reanimated';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

// import auth from '@react-native-firebase/auth'
// GoogleSignin.configure({
//     webClientId: '929459102958-4arbgpufia94rno2f65tjmi4hc28iimk.apps.googleusercontent.com',
// });
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submit: false,
            email: "",
            password: "",
            resetEmail: "",
            submit1: false,
            sendLoading: false
        };
    }

    // ============== func_HandleLogin - Function Will allow user to get login ==============
    func_HandleLogin = async () => {
        const { replace, navigate } = this.props.navigation;
        const { email, password, submit, resetEmail } = this.state;
        this.setState({ submit: true })

        if (this.isEmailValid(email) && submit && email && password) {
            let userData = {
                email: email,
                password: password
            }
            // replace("Main")
            // this.setState({ resetModal: false, submit: false })
            await this.props.authActions.userLogin(userData, replace);
        }
        else {
            this.setState({ submit: true })
        }
    }

    isEmailValid(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    }

    // ============== func_HandleSignUp - Function Will allow user to register himself ==============
    func_HandleSignUp = () => {

    }

    // ============== func_HandleResetPassword - Function Will allow user to reset his/her password ==============
    func_HandleResetPassword = () => {
        const { email, password, submit1, resetEmail, sendLoading } = this.state;
        const { replace, navigate } = this.props.navigation;
        if (this.isEmailValid(resetEmail) && submit1 && resetEmail) {
            AuthServices.resetpasswordmail(resetEmail)
                .then((res) => {
                    if (res.data.success) {
                        navigate("OTP", { email: resetEmail, code: res.data.data })
                        this.setState({ resetModal: false, submit1: false, resetEmail: "", sendLoading: false })
                    }
                })
                .catch((err) => { console.log(err) })

            // await this.props.authActions.userLogin(userData, replace);
        }
        else {
            this.setState({ submit1: true, sendLoading: false })
        }
    }

    render() {
        const { email, password, loading, submit, resetEmail, submit1, sendLoading } = this.state;
        return (
            <>
                <View style={styles.backgroundStyle}>
                    <View style={{ flex: 1, }}>
                        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.innerImageContainer}>
                                <Logo />
                            </View>

                            <View style={{ marginTop: "10%", backgroundColor: "white", borderRadius: 8, marginHorizontal: '5%' }}>
                                <View style={{ marginLeft: "5%", marginTop: '5%' }}>
                                    <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Bold', fontWeight: "normal", color: themeStyle.PRIMARY_BACKGROUND_COLOR }} >Sign In</Text>
                                </View>

                                <View style={{ marginHorizontal: '2.5%', marginTop: '5%' }}>
                                    <View>
                                        <Input
                                            label={"Email"}
                                            placeholder="Email"
                                            value={email}
                                            leftIcon={<Email height={12} width={12} />}
                                            onChangeText={(email) => this.setState({ email: email })}
                                        />
                                    </View>
                                    {
                                        submit && !email ? <Text style={[styles.errorText, { marginTop: "5%" }]}>Please fill this field</Text> : null
                                    }
                                    {
                                        submit && email.length && !this.isEmailValid(email) ? <Text style={[styles.errorText, , { marginTop: "5%" }]}>Email is invalid</Text> : null
                                    }
                                </View>
                                <View style={{ marginHorizontal: '2.5%', marginTop: '5%', paddingBottom: "10%", }}>
                                    <View>
                                        <Input
                                            label={"Password"}
                                            placeholder="Password"
                                            value={password}
                                            leftIcon={<Password height={12} width={12} />}
                                            secureTextEntry={true}
                                            onChangeText={(password) => this.setState({ password })}
                                        />
                                    </View>

                                    {
                                        submit && !password ? <Text style={[styles.errorText, { marginTop: "5%" }]}>Please fill this field</Text> : null
                                    }
                                </View>
                            </View>

                            <TouchableOpacity onPress={() => this.setState({ resetModal: true })} style={{ marginHorizontal: '7%', alignItems: 'flex-end', marginTop: "5%" }} >
                                <Text style={{ fontFamily: 'Montserrat-Regular', color: "white" }} >Forget Password?</Text>
                            </TouchableOpacity>
                            <View style={{ alignItems: 'flex-end', margin: '5%', marginTop: '10%' }}>
                                <Button loading={this.props.user.loading} title='Sign In ' onPress={() => { this.setState({ submit: true }, () => this.func_HandleLogin()); }} />
                            </View>
                            {/* <TouchableOpacity onPress={() => { this.handleGoogle() }} style={{ alignItems: 'center', marginTop: '5%' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 5, borderWidth: 0.5, borderColor: 'red', height: 44, width: 180 }}>
                                    <Google />
                                    <Text style={{ marginLeft: '10%', fontFamily: 'Montserrat-Regular', fontSize: 16 }}>Google</Text>
                                </View>
                            </TouchableOpacity> */}

                        </ KeyboardAwareScrollView>

                        {/* <View style={{ flexDirection: 'row', marginBottom: '5%', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#707070', opacity: 0.7, fontFamily: 'Montserrat-Regular' }}>Don't have an account?</Text>
                            <Text onPress={() => this.props.navigation.navigate('Signup')} style={{ marginLeft: '5%', fontFamily: 'Montserrat-Bold', fontSize: 15 }}>Signup</Text>
                        </View> */}
                    </View>
                </View>
                <Modal isVisible={this.state.resetModal}>
                    <View style={{ padding: "5%", backgroundColor: "white", borderRadius: 8, marginHorizontal: '2.5%' }}>
                        <View style={{ marginLeft: "5%", marginTop: '5%' }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Bold', fontWeight: "normal" }} >Reset Password</Text>
                        </View>
                        <View style={{ marginHorizontal: '2.5%', marginTop: '3.5%' }}>
                            <Input
                                // label={"Email"}
                                placeholder="Enter email to get reset code"
                                value={resetEmail}
                                leftIcon={<Email height={12} width={12} />}
                                onChangeText={(resetEmail) => this.setState({ resetEmail })}
                            />
                            {
                                submit1 && !resetEmail ? <Text style={[styles.errorText]}>Please fill this field</Text> : null
                            }
                            {
                                submit1 && resetEmail.length && !this.isEmailValid(resetEmail) ? <Text style={[styles.errorText]}>Email is invalid</Text> : null
                            }
                        </View>
                        <View style={{ alignItems: 'flex-end', margin: '5%', }}>
                            <View style={{ flexDirection: "row", }}>
                                <ClearButton title='Cancel ' onPress={() => { this.setState({ resetModal: false, submit: false, resetEmail: "" }) }} />
                                <View style={{ width: 15 }}></View>
                                <ColorButton title='Send ' onPress={() => this.setState({ submit1: true, sendLoading: true }, () => this.func_HandleResetPassword())} />
                            </View>

                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.props.user.loading || sendLoading}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size={"large"} color={themeStyle.PRIMARY_COLOR} />
                    </View>
                </Modal>
            </>

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
        authActions: bindActionCreators(authActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)