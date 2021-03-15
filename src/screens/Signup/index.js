import React, { Component } from 'react';
import { Image, TouchableOpacity, ImageBackground, Text, View, } from 'react-native';
import { Button, Input, } from '../../components';
import styles from './style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Logo from '../../assets/svg/logo.svg';
import { AuthServices } from '../../services';
import PhoneInput from 'react-native-phone-input';
import CountryPicker, { FlagButton } from 'react-native-country-picker-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phonenumber: '+92',
            email: '',
            password: '',
            confirmPassword: '',
            isVisible: false,
            submit: false,
            disabled: true
        };

    }

    // ============== func_HandleSignUp - Function Will allow user to register himself ==============
    func_HandleSignUp = () => {
        const { name, phonenumber, email, password, confirmPassword, loading, isVisible, submit, disabled } = this.state;
        this.setState({ submit: true }, () => {
            let userData = {
                full_name: this.state.name,
                email: this.state.email,
                phone: this.state.phonenumber,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            }
            if (submit && this.isNameValid(name) && this.isPhoneValid(phonenumber) && this.isEmailValid(email) && password == confirmPassword) {
                const { replace } = this.props.navigation
                this.props.authActions.sendVerificationCode(userData, replace)
            }

        })

    }

    onPressFlag() {
        this.countryPicker.openModal();
    }
    onSelect = (country) => {
        this.setState({
            countryCode: country.cca2,
            phonenumber: "+" + country.callingCode[0],
            country: country,
            isVisible: false
        })
    };
    selectCountry(country) {
        this.phoneRef.selectCountry(country.cca2);
        this.setState({ phone: "+" + country.callingCode, countryCode: country.cca2 })

    }

    _flagButton = () => {
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={() => this.setState({ isVisible: !this.state.isVisible })} >
                <View style={{}}>
                    <FlagButton
                        onOpen={() => this.setState({ isVisible: !this.state.isVisible })}
                        onClose={() => this.setState({ isVisible: !this.state.isVisible })}
                        placeholder={""}
                        withEmoji={false}
                        withFlagButton={false}
                        countryCode={this.state.countryCode}
                        containerButtonStyle={{ height: 0 }}
                    />
                </View>
            </TouchableOpacity>
        )
    }
    disabled = () => {
        const { name, email, phonenumber, password, confirmPassword, submit } = this.state;
        if (this.isNameValid(name) && this.isEmailValid(email) && this.isPhoneValid(phonenumber)) {
            if (password == confirmPassword && submit) {
                this.setState({ disabled: false })
            } else {
                this.setState({ disabled: true })
            }
        } else {
            this.setState({ disabled: true })
        }

    }

    isNameValid(name) {
        return /^[A-Za-z\s]{1,}[A-Za-z\s]{0,}$/.test(name)
    }

    isEmailValid(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    }

    // isPasswordValid(password) {
    //     return /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)
    // }

    isPhoneValid = (phone) => {
        return /^\+[0-9]{10,13}$/.test(phone)
    }


    // ============== func_HandleResetPassword - Function Will allow user to reset his/her password ==============
    func_HandleResetPassword = () => {

    }

    render() {
        const { name, phonenumber, email, password, confirmPassword, loading, isVisible, submit, disabled } = this.state;
        return (

            <ImageBackground resizeMode="cover" style={styles.backgroundStyle} source={require('../../assets/images/signup.jpg')}>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.innerImageContainer}>
                        <Logo />
                    </View>

                    <View style={{ marginHorizontal: '5%', marginTop: '10%' }}>
                        <Input
                            placeholder="Name *"
                            value={name}
                            // onBlur={() => this.disabled()}
                            // onFocus={() => this.setState({ submit: true })}
                            onChangeText={(name) => this.setState({ name: name }, () => this.disabled())}
                        />
                        {
                            submit && !name ? <Text style={[styles.errorText]}>Please fill this field</Text> : null
                        }
                        {
                            submit && name.length && !this.isNameValid(name) ? <Text style={[styles.errorText]}>Name is invalid</Text> : null
                        }
                    </View>

                    <View style={{ marginHorizontal: '8%', height: 50, justifyContent: 'center', paddingHorizontal: "2.5%", borderRadius: 5, marginTop: '3%', backgroundColor: '#e2e2e2' }}>
                        <PhoneInput
                            ref={c => (this.phoneRef = c)}
                            onPressFlag={() => this.setState({ isVisible: true })}
                            autoFormat={true}
                            allowZeroAfterCountryCode={false}
                            textStyle={{
                                marginTop: 2,
                                lineHeight: 25,
                                fontFamily: 'Montserrat-Regular',
                                fontSize: 14,
                                color: 'grey',
                            }}
                            returnKeyType="next"
                            blur={() => this.disabled()}
                            onChangePhoneNumber={phonenumber => this.setState({ phonenumber }, () => this.disabled())}
                            value={phonenumber}
                            textProps={{
                                placeholder: 'Phone Number *',
                                placeholderTextColor: "grey",
                            }}
                        />
                        <View >
                            <CountryPicker
                                countryCodes={['PK']}
                                theme={styles.themeText}
                                withFilter={true}
                                visible={this.state.isVisible}
                                onSelect={(country) => this.onSelect(country)}
                                withAlphaFilter={true}
                                withCountryNameButton={true}
                                renderFlagButton={this._flagButton}
                            >
                                <View />
                            </CountryPicker>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: '5%' }}>
                        {
                            submit && !phonenumber ? <Text style={[styles.errorText]}>Please fill this field</Text> : null
                        }
                        {
                            submit && phonenumber.length && !this.isPhoneValid(phonenumber) ? <Text style={[styles.errorText]}>Phone number is incomplete </Text> : null
                        }
                    </View>
                    <View style={{ marginHorizontal: '5%', marginTop: '3%' }}>
                        <Input
                            placeholder="Email *"
                            value={email}
                            onBlur={() => this.disabled()}
                            onChangeText={(email) => this.setState({ email: email }, () => this.disabled())}
                        />
                        {
                            submit && !email ? <Text style={[styles.errorText]}>Please fill this field</Text> : null
                        }
                        {
                            submit && email.length && !this.isEmailValid(email) ? <Text style={[styles.errorText]}>Email is invalid</Text> : null
                        }
                    </View>
                    <View style={{ marginHorizontal: '5%', marginTop: '3%' }}>
                        <Input
                            placeholder="Password *"
                            value={password}
                            secureTextEntry={true}
                            onBlur={() => this.disabled()}
                            onChangeText={(password) => this.setState({ password: password })}
                        />
                        {
                            submit && !password ? <Text style={[styles.errorText]}>Please fill this field</Text> : null
                        }
                        {/* {
                            submit && password.length && !this.isPasswordValid(password) ? <Text style={[styles.errorText]}>Password should have at least 1 uppercase, 1 lowercase, 1 digit and 1 special character and length range 6-16 characters</Text> : null
                        } */}
                    </View>
                    <View style={{ marginHorizontal: '5%', marginTop: '3%' }}>
                        <Input
                            placeholder="Confirm password *"
                            value={confirmPassword}
                            secureTextEntry={true}
                            onBlur={() => this.disabled()}
                            onChangeText={(confirmPassword) => this.setState({ confirmPassword: confirmPassword })}
                        />
                        {
                            submit && !confirmPassword ? <Text style={[styles.errorText]}>Please fill this field</Text> :
                                submit && password != confirmPassword ?
                                    <Text style={[styles.errorText]}>Password Mismatch</Text> : null
                        }
                    </View>
                    <View style={{ alignItems: 'center', marginVertical: '5%' }}>
                        <Button loading={this.props.user.loading}
                            // disabled={disabled}
                            title='Signup' onPress={() => this.func_HandleSignUp()} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: '5%', justifyContent: 'center' }}>
                        <Text style={{ color: '#707070', opacity: 0.7, fontFamily: 'Montserrat-Regular', }}>Already have an account?</Text>
                        <Text onPress={() => this.props.navigation.replace('Auth')} style={{ marginLeft: '5%', fontFamily: 'Montserrat-Bold', }}>Login</Text>
                    </View>
                </KeyboardAwareScrollView>
            </ImageBackground>
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
export default connect(mapStateToProps, mapDispatchToProps)(Signup)