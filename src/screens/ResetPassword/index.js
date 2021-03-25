import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Icon, Input } from '../../components';
import styles from './style';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import { AuthServices } from '../../services';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import themeStyle from '../../assets/styles/theme.style';
import buttonStyle from '../../components/Button/style';
class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            oldPassword: "",
            buttonLoading: false,
            oldShow: false,
            newShow: false,
            confirmShow: false,
            buttonLoading: false
        }
    }

    componentDidMount = () => {
        this.setState({ email: this.props.user.userData.email })
    }

    isPasswordValid(password) {
        return /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)
    }

    handleChangePassword = () => {
        this.setState({ buttonLoading: true })
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
            current_password: this.state.oldPassword,
            new_password: this.state.password,
        }
        AuthServices.changePassword(userData)
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

    }

    render() {
        const { email, name, phone, password, confirmPassword, oldPassword, newShow, confirmShow, oldShow, buttonLoading } = this.state;
        return (

            <KeyboardAwareScrollView>
                <View style={styles.container}>


                    <View style={styles.cardContainer}>
                        <View style={styles.content}>
                            <View style={styles.itemQuantityContainer}>
                                <View>
                                    <Text style={styles.headingTitleStyle}>ChangePassword</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: '5%' }}>
                                <Input label="Current Password" value={oldPassword}
                                    secureTextEntry={!oldShow}
                                    rightIcon={<Icon.Ionicons onPress={() => this.setState({ oldShow: !this.state.oldShow })} name={this.state.oldShow ? "eye" : "eye-off"} size={15} color="#000" />}
                                    onChangeText={(oldPassword) => this.setState({ oldPassword })}
                                    placeholder="Enter your current password" />
                            </View>
                            <View style={{ marginTop: '5%' }}>
                                <Input label="New Password" value={password}
                                    secureTextEntry={!newShow}
                                    rightIcon={<Icon.Ionicons onPress={() => this.setState({ newShow: !this.state.newShow })} name={this.state.newShow ? "eye" : "eye-off"} size={15} color="#000" />}
                                    onChangeText={(password) => this.setState({ password })}
                                    placeholder="Enter your new password" />
                                {
                                    password.length && !this.isPasswordValid(password) ?
                                        <Text style={[styles.errorText, { marginVertical: '2%' }]}>Password must be 8 letters along which must contain one special character, one capital, and one digit</Text> : null
                                }

                            </View>
                            <View style={{ marginTop: '5%' }}>
                                <Input label="Confirm Password"
                                    value={confirmPassword}
                                    secureTextEntry={!confirmShow}
                                    rightIcon={<Icon.Ionicons onPress={() => this.setState({ confirmShow: !this.state.confirmShow })} name={this.state.confirmShow ? "eye" : "eye-off"} size={15} color="#000" />}
                                    onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                                    containerStyle={{ marginHorizontal: 0, paddingHorizontal: 0 }}
                                    placeholder="Confirm your password" />
                                {password != confirmPassword ?
                                    <Text style={[styles.errorText, { marginVertical: '2%' }]}>Password Mismatch</Text> : null}
                            </View>


                        </View>

                    </View>
                    <View style={{ flex: 0.2, alignItems: 'flex-end', marginHorizontal: "5%" }}>
                        <Button loading={buttonLoading} disabled={oldPassword && password && this.isPasswordValid(password) && confirmPassword == password ? false : true} titleStyle={buttonStyle.colorBtnPrimaryText} buttonStyle={styles.colorBtnPrimary} title='Change Password' onPress={() => this.handleChangePassword()} />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};


export default connect(mapStateToProps)(ResetPassword)