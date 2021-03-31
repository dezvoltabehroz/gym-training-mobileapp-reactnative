import React, { Component } from 'react';
import { Image, ImageBackground, ScrollView, Text, View } from 'react-native';
import { Button, Input, ColorButton } from '../../components';
import styles from './style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { AuthServices } from '../../services';
import Logo from '../../assets/svg/logo.svg';
import Lock from '../../assets/svg/password_icon.svg'
export default class NewPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
            submit: false,
            buttonLoading: false
        };
    }

    // ============== func_HandleSetNewPassword - Function Will allow user to update his/her password ==============
    func_HandleSetNewPassword = () => {

        this.setState({ buttonLoading: true })
        let userData = {
            id: this.props.route.params.id,
            token: this.props.route.params.token,
            new_password: this.state.password,
        }
        if (this.state.submit && this.isPasswordValid(this.state.password) && this.state.password == this.state.confirmPassword) {
            AuthServices.updatePassword(userData)
                .then((res) => {
                    if (res.data.success) {
                        this.props.navigation.replace('Auth')
                    }
                    else {
                        Alert.alert(res.data.message)
                        this.setState({ buttonLoading: false })
                    }
                })
                .catch((err) => console.log(err))

            this.props.navigation.replace('Login')
        }
        else {
            this.setState({ submit: true, buttonLoading: false })
        }

    }

    isPasswordValid(password) {
        // return /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)
        return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)
    }

    render() {
        const { password, confirmPassword, loading, submit, buttonLoading } = this.state;
        return (
            <>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <ImageBackground resizeMode="cover" style={styles.backgroundStyle} source={require('../../assets/images/verification.png')}>
                        <View style={{ flex: 1, marginTop: '5%', }}>
                            {/* <View style={styles.innerImageContainer}>
                                <Logo />
                            </View> */}
                            <View style={styles.secondCardStyle}>
                                {/* <View style={{ marginHorizontal: '2.5%', marginTop: '5%', paddingBottom: "10%", }}> */}
                                <Input
                                    label={"New password"}
                                    placeholder="Enter new password"
                                    value={password}
                                    leftIcon={<Lock height={12} width={12} />}
                                    secureTextEntry={true}
                                    onChangeText={(password) => this.setState({ password })}
                                />
                                <View style={{ paddingTop: '5%' }}>
                                    {
                                        submit && password.length && !this.isPasswordValid(password) ?
                                            <Text style={[styles.errorText, { marginVertical: '2%' }]}>Password must be 8 letters along which must contain one capital letter, and one digit</Text> : null
                                    }
                                </View>
                                <View style={{ marginVertical: "5%" }}>
                                    <Input
                                        label={"Confirm new password"}
                                        secureTextEntry={true}
                                        leftIcon={<Lock height={12} width={12} />}
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChangeText={(text) => this.setState({ confirmPassword: text })}
                                    />
                                    <View style={{ paddingTop: '5%' }}>
                                        {password != confirmPassword ?
                                            <Text style={[styles.errorText, { marginVertical: '2%' }]}>Password Mismatch</Text> : null}
                                    </View>

                                </View>

                                {/* <View style={{ alignItems: 'flex-end', marginTop: '15%' }}>
                                    <ColorButton title='Done  ' onPress={this.func_HandleSubmitVerificationCode} />
                                </View> */}
                            </View>
                            <View style={{ alignItems: 'flex-end', marginHorizontal: "5%", marginTop: '5%' }}>
                                <ColorButton loading={buttonLoading} disabled={password && confirmPassword && password == confirmPassword ? false : true} title='Reset  ' onPress={() => this.setState({ submit: true }, () => this.func_HandleSetNewPassword())} />
                            </View>
                        </View>

                    </ImageBackground>
                </KeyboardAwareScrollView>
            </>
        );
    }
}