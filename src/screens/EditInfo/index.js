import React, { Component } from 'react';
import { Image, ImageBackground, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Input, ColorButton, Icon } from '../../components';
import styles from './style';
import CodeInput from 'react-native-confirmation-code-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { AuthServices, ProfileServices } from '../../services';
import Logo from '../../assets/svg/logo.svg';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
import { Alert } from 'react-native';
import { Button } from 'react-native-elements'
import Lock from '../../assets/svg/blacklock.svg';
import User from '../../assets/svg/user_icon.svg'
import Email from '../../assets/svg/email_icon.svg'
import Phone from '../../assets/svg/phone_icon.svg'
import themeStyle from '../../assets/styles/theme.style';
import buttonStyle from '../../components/Button/style';
class EditInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            submit: false,
            email: this.props.user.userData.email,
            name: this.props.user.userData.full_name,
            phone: this.props.user.userData.phone,
            buttonLoading: false
        };
    }

    // ============== func_HandleSubmitVerificationCode - Function Will allow user to verify the code to reset his/her password ==============
    func_HandleSubmitVerificationCode = () => {
        this.setState({ buttonLoading: true })
        if (this.state.submit && this.state.phone && this.isNameValid(this.state.name) && this.isPhoneValid(this.state.phone)) {
            let userData = {
                id: this.props.user.userData.id,
                name: this.state.name,
                phone: this.state.phone,
                token: this.props.user.userData.token
            }
            ProfileServices.changeProfileDetail(userData)
                .then((response) => {
                    if (response.data.success) {
                        this.props.authActions.getUserProfile(userData)
                        Alert.alert(response.data.message)
                        this.setState({ buttonLoading: false })
                    }
                })
        } else {
            this.setState({ buttonLoading: false })
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
    isPhoneValid = (phone) => {
        // return /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/.test(phone)
        return /^\+?[0-9]{3}-?[0-9]{6,12}$/.test(phone)
    }

    isNameValid(name) {
        return /^[A-Za-z\s]{1,}[A-Za-z\s]{0,}$/.test(name)
    }
    render() {
        const { code, submit } = this.state;
        const { email, phone, name, buttonLoading } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: themeStyle.COLOR_WHITE }}>
                <KeyboardAwareScrollView>
                    <View style={{ flex: 0.8, marginTop: '1%', }}>
                        <View>




                            <View style={[styles.secondCardStyle]}>
                                <View style={styles.itemQuantityContainer}>
                                    <View>
                                        <Text style={styles.headingTitleStyle}>Edit Info</Text>
                                    </View>
                                </View>
                                {/* <View style={styles.lineStyle}></View> */}
                                <View style={{ marginTop: '5%' }}>
                                    <Input label="Email address" value={email}
                                        disabled={true}
                                        leftIcon={<Email height={12} width={12} />}
                                        onChangeText={(email) => this.setState({ email })}
                                        placeholder="Enter email address"

                                    />
                                </View>
                                <View style={{}}>
                                    <Input label="Name"
                                        value={name}
                                        leftIcon={<User height={12} width={12} />}
                                        onChangeText={(name) => this.setState({ name })}
                                        placeholder="" />
                                </View>
                                <View style={{}}>
                                    <Input label="Phone Number"
                                        value={phone}
                                        leftIcon={<Phone height={12} width={12} />}
                                        onChangeText={(phone) => this.setState({ phone })}
                                        placeholder="" />
                                </View>
                                {
                                    phone.length && !this.isPhoneValid(phone) ? <Text style={[styles.errorText]}>Phone is invalid </Text> : null
                                }
                            </View>

                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ChangePassword')} style={styles.cardStyle}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ alignItems: "center" }}>
                                    <Lock height={31} width={31} />
                                </View>
                                <View style={{ width: 15 }}></View>
                                <View style={{ alignItems: "flex-start", justifyContent: "center" }}>
                                    <Text style={styles.headingTextStyle}>Change Password</Text>
                                    {/* <Text style={styles.headingTextStyle1}>{email != "" ? email : ""}</Text> */}
                                </View>
                            </View>
                            <View>
                                <Icon.Entypo name={"chevron-right"} size={30} color={"#000"} />
                            </View>

                        </TouchableOpacity>
                        <View style={{ flex: 0.2, alignItems: 'flex-end', marginTop: '15%', marginHorizontal: "5%" }}>
                            <Button loading={buttonLoading} titleStyle={buttonStyle.colorBtnPrimaryText} buttonStyle={styles.colorBtnPrimary} title='Update Info' onPress={() => this.setState({ submit: true }, () => this.func_HandleSubmitVerificationCode())} />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(EditInfo)