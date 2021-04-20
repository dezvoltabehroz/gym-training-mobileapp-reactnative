import React, { Component } from 'react';
import { View, Text, TouchableOpacity, PixelRatio } from 'react-native';
import { Icon, Input } from '../../components';
import styles from './style';
import Modal from 'react-native-modal';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { AuthServices } from '../../services';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
import { ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import PhoneInput from 'react-native-phone-input';
import CountryPicker, { FlagButton } from 'react-native-country-picker-modal';
import buttonStyle from '../../components/Button/style';
import User from '../../assets/svg/user_icon.svg'
import Email from '../../assets/svg/email_icon.svg'
import Phone from '../../assets/svg/phone_icon.svg'
import Edit from '../../assets/svg/edit_icon.svg'
import SignOut from '../../assets/svg/signout.svg';
import themeStyle from '../../assets/styles/theme.style';
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.user.userData.email,
            name: this.props.user.userData.full_name,
            phone: this.props.user.userData.phone,
            changePassword: false,
            updateContactInfo: false,
            password: "",
            confirmPassword: "",
            address: "",
            city: "",
            loading: true,
            buttonLoading: false,
            isVisible: false,
            disabled: true,
            signOutModal: false
        }
    }
    componentDidMount = () => {
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 3000);
    }


    onSelect = (country) => {
        this.setState({
            countryCode: country.cca2,
            phone: "+" + country.callingCode[0],
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
        const { phone, name, city, address } = this.state;
        if (this.isNameValid(name) && this.isPhoneValid(phone) && address.length && city.length) {
            this.setState({ disabled: false })
        } else {
            this.setState({ disabled: true })
        }
    }

    isPhoneValid = (phone) => {
        return /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/.test(phone)
    }

    isNameValid(name) {
        return /^[A-Za-z\s]{1,}[A-Za-z\s]{0,}$/.test(name)
    }


    render() {
        const { email, name, phone, password, disabled, updateContactInfo, city, address, loading, buttonLoading } = this.state;
        return (

            <>
                <KeyboardAwareScrollView>

                    <View style={{ marginTop: '10%', }}>


                        <View style={[styles.cardContainer]}>
                            <View style={styles.itemQuantityContainer}>
                                <View>
                                    <Text style={styles.headingTitleStyle}>Profile Info</Text>
                                </View>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("EditInfo")}>
                                    <Edit height={25} width={25} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.lineStyle}></View>

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
                                    value={this.props.user.userData.full_name}
                                    disabled={true}
                                    leftIcon={<User height={12} width={12} />}
                                    onChangeText={(name) => this.setState({ name })}
                                    placeholder="" />
                            </View>
                            <View style={{}}>
                                <Input label="Phone Number"
                                    value={this.props.user.userData.phone}
                                    disabled={true}
                                    leftIcon={<Phone height={12} width={12} />}
                                    onChangeText={(phone) => this.setState({ phone })}
                                    placeholder="" />
                            </View>
                        </View>
                        <View style={{ alignItems: 'flex-end', marginHorizontal: "5%" }}>
                            <Button titleStyle={buttonStyle.colorBtnPrimaryText} buttonStyle={styles.colorBtnPrimary} title='Sign Out' onPress={() => this.setState({ signOutModal: true })} />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
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
            </>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)