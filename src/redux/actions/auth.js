import {
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_SUCCESS,
    USER_SOCIALNETWORK_USERDATA_SUCCESS,
    SEND_CODE_TO_USER_PHONENUMBER_SUCCESS,
    IS_USER_VERIFIED_SUCCESS,
    LOADING_SUCCESS,
    USER_UPDATE_PROFILE_INFO_SUCCESS,
    USER_EMAIL_AND_PASSWORD_SUCCESS,
    HEALTH_AND_SEFATY_SUCCESS,
    CART_SUCCESS
} from '../types';
import { AuthServices, RegisterUser } from '../../services';
import { Alert, Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import auth from '@react-native-firebase/auth';
// import messaging from '@react-native-firebase/messaging';
import io from 'socket.io-client';
const socket = io.connect('http://ec2-18-204-20-183.compute-1.amazonaws.com:3000'); //dev

const setUserProfile = (userData, navigate) => {
    return async (dispatch) => {
        let token = await AsyncStorage.getItem('TOKEN')
        let data = JSON.parse(token)
        if (userData) {
            dispatch({ type: USER_LOGIN_SUCCESS, userData: userData, userToken: data, loading: false });
            if (navigate != null)
                navigate('Main');
        }
    }
};

const getUserProfile = (userData, navigate) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_SUCCESS, loading: loading })
        }
        AuthServices.getUserProfile(userData)
            .then(async (responseData) => {
                if (responseData.data.success != 'undefined' && responseData.data.success == false) {
                    dispatch(removeUser(navigate));
                    dispatch({ type: LOADING_SUCCESS, loading: !loading })
                }
                else {
                    // socket.on("updateNotification", async ({ receiver_id }) => {
                    //     if (receiver_id === responseData.data.userData[0].id) {
                    //         await dispatch(notificationActions.getNotification(responseData.data.userData[0]));
                    //     }
                    // });
                    await dispatch(setUserProfile(responseData.data.result, navigate))
                    AsyncStorage.setItem('USER', JSON.stringify(responseData.data.result))
                    // navigate('Main');
                    dispatch({ type: LOADING_SUCCESS, loading: false })
                    // else {
                    //     Alert.alert(responseData.data.message)
                    //     dispatch({ type: LOADING_SUCCESS, loading: !loading })
                }

            })
            .catch(err => { console.log(err) })
    };
};

const setSocialNetworkUserData = (userData) => {
    return ({
        type: USER_SOCIALNETWORK_USERDATA_SUCCESS,
        userData
    })
};

const sendVerificationCode = (userData, navigate) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_SUCCESS, loading: loading })
        }

        // auth().verifyPhoneNumber(userData.phone, 60)
        //     .on('state_changed', (phoneAuthSnapshot) => {
        //         switch (phoneAuthSnapshot.state) {
        //             case auth.PhoneAuthState.CODE_SENT:
        //                 dispatch({ type: SEND_CODE_TO_USER_PHONENUMBER_SUCCESS, userData: { phone: userData.phone }, loading: !loading })
        //                 AsyncStorage.setItem('Phone', JSON.stringify(userData.phone))
        //                 navigate('OTP', { phoneAuthSnapshot: phoneAuthSnapshot, password: false, userData: userData })
        //                 break;
        //             case auth.PhoneAuthState.ERROR: // or 'error'
        //                 console.log(phoneAuthSnapshot.error.code)
        //                 Alert.alert('Phone number is not correct')
        //                 dispatch({ type: LOADING_SUCCESS, loading: !loading })
        //                 break;
        //             case auth.PhoneAuthState.AUTO_VERIFIED: // or 'error'
        //                 if (phoneAuthSnapshot.code == null && phoneAuthSnapshot.verificationId == null) {
        //                     Alert.alert('Phone number is already in use');
        //                     dispatch({ type: LOADING_SUCCESS, loading: !loading })
        //                 }
        //                 else {
        //                     let data = {
        //                         ...userData,
        //                         code: phoneAuthSnapshot.code,
        //                         id: phoneAuthSnapshot.verificationId
        //                     }
        //                     dispatch(verifyCode(data, navigate))
        //                 }
        //                 break;
        //         }
        //     }, (error) => {
        //         console.log(error);
        //     });


    };

};

const verifyCode = (userData, navigate) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_SUCCESS, loading: loading })
        }
        // var credential = auth.PhoneAuthProvider.credential(userData.id, userData.code);
        // if (credential) {
        //     console.log('User email: ', credential);
        //     AuthServices.userSignUp(userData)
        //         .then(response => {
        //             if (response.data.success) {
        //                 dispatch({ type: IS_USER_VERIFIED_SUCCESS, loading: !loading })
        //                 dispatch(userLogin(userData, navigate))
        //             }
        //             else {
        //                 Alert.alert(response.data.msg)
        //                 dispatch({ type: LOADING_SUCCESS, loading: !loading })
        //             }
        //         }).catch(error => {
        //             Alert.alert("This Email already exists", "", [
        //                 { text: "OK", onPress: () => navigate('Auth') }
        //             ])
        //             dispatch({ type: LOADING_SUCCESS, loading: !loading })
        //             console.log(error)
        //         })
        // }
    }
};

const UpdateProfileInfo = (userData, phone, navigate) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_SUCCESS, loading: loading })
        }
        RegisterUser.updateProfileInfo(userData, phone)
            .then(response => {
                if (response.data.status) {
                    dispatch({
                        type: USER_UPDATE_PROFILE_INFO_SUCCESS, userData: {
                            name: userData.name,
                            gender: userData.gender,
                            dob: userData.dob,
                            photo: userData.image
                        },
                        loading: !loading
                    })
                    navigate('AddYourAddress', { editAddress: false });
                }
                else {
                    Alert.alert(response.data.message)
                    dispatch({ type: LOADING_SUCCESS, loading: !loading })
                }
            }).catch(error => {
                console.log(error)
                dispatch({ type: LOADING_SUCCESS, loading: !loading })
            })
    }
};

const UpdateEmailAddressandToken = (userData, navigate) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_SUCCESS, loading: loading })
        }
        RegisterUser.updateEmailAndPassword(userData)
            .then(response => {
                if (response.data.status) {
                    dispatch({
                        type: USER_EMAIL_AND_PASSWORD_SUCCESS,
                        email: userData.email,
                        password: userData.password,
                        loading: !loading
                    })
                    RegisterUser.userLogin(userData)
                        .then(async responseData => {
                            if (responseData.data.status) {
                                await requestUserPermission(responseData.data.userData[0], dispatch, navigate)
                                AsyncStorage.setItem('Email', JSON.stringify(userData))
                                // AsyncStorage.removeItem('Phone');
                                // dispatch({ type: USER_LOGIN_SUCCESS, userData: responseData.data.userData[0], loading: loading })
                                // dispatch(getUserProfile(responseData.data.userData[0], navigate))
                            }
                            else {
                                Alert.alert(response.data.message)
                                dispatch({ type: LOADING_SUCCESS, loading: !loading })
                            }
                        })
                        .catch(err => { console.log(err) })
                }
                else {
                    Alert.alert(response.data.message)
                    dispatch({ type: LOADING_SUCCESS, loading: !loading })
                }
            }).catch(error => {
                console.log(error)
            })
    }
};

const phoneVerificationCode = (userData, navigate) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_SUCCESS, loading: loading })
        }

        auth().verifyPhoneNumber(userData.phone, 60)
            .on('state_changed', (phoneAuthSnapshot) => {
                switch (phoneAuthSnapshot.state) {
                    case auth.PhoneAuthState.CODE_SENT:
                        dispatch({ type: SEND_CODE_TO_USER_PHONENUMBER_SUCCESS, userData: { phone: userData.phone }, loading: !loading })
                        AsyncStorage.setItem('Phone', JSON.stringify(userData.phone))
                        if (navigate != undefined) {
                            navigate('PhoneVerification', { phoneAuthSnapshot: phoneAuthSnapshot, userData: userData })

                        }
                        break;
                    case auth.PhoneAuthState.ERROR: // or 'error'
                        console.log(phoneAuthSnapshot.error.code)
                        Alert.alert('Phone number is not correct')
                        dispatch({ type: LOADING_SUCCESS, loading: !loading })
                        break;
                    case auth.PhoneAuthState.AUTO_VERIFIED: // or 'error'
                        if (phoneAuthSnapshot.code == null && phoneAuthSnapshot.verificationId == null) {
                            Alert.alert('Phone number is already in use');
                            dispatch({ type: LOADING_SUCCESS, loading: !loading })
                        }
                        else {
                            // let data = {
                            //     ...userData,
                            //     code: phoneAuthSnapshot.code,
                            //     id: phoneAuthSnapshot.verificationId
                            // }
                            // console.log('data:', data)
                            // dispatch(phoneVerifyCode(data, navigate))
                        }
                        break;
                }
            }, (error) => {
                console.log(error);
            });


    };

};

const phoneVerifyCode = (userData, navigate) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_SUCCESS, loading: loading })
        }
        var credential = auth.PhoneAuthProvider.credential(userData.phoneAuthSnapshotId, userData.code);
        if (credential) {
            console.log('User email: ', credential);
            AuthServices.updateUserProfile(userData)
                .then(response => {
                    if (response.data.success) {
                        dispatch(getUserProfile(userData, navigate))
                    }
                    else {
                        Alert.alert(response.data.msg)
                        dispatch({ type: LOADING_SUCCESS, loading: !loading })
                    }
                }).catch(error => {
                    // Alert.alert("This Email already exists", "", [
                    //     { text: "OK", onPress: () => navigate('Main') }
                    // ])
                    dispatch({ type: LOADING_SUCCESS, loading: !loading })
                    console.log(error)
                })
        }
    }
};

const removeUser = (navigate) => {
    return async (dispatch) => {
        await navigate('Auth')
        await AsyncStorage.removeItem('USER');
        await AsyncStorage.removeItem('CART_ITEMS');
        dispatch({ type: USER_LOGOUT_SUCCESS })
        dispatch({ type: CART_SUCCESS, cart: [] })
    }
};

const userLogin = (userData, navigate) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_SUCCESS, loading: loading })
        }
        AuthServices.userLogin(userData)
            .then(async (responseData) => {
                if (responseData.data.success) {
                    await requestUserPermission(responseData.data.result, dispatch, navigate)
                    AsyncStorage.setItem('TOKEN', JSON.stringify(responseData.data.result.access_token))
                    AsyncStorage.setItem('Email', JSON.stringify(userData))
                }
                else {
                    Alert.alert(responseData.data.msg)
                    dispatch({ type: LOADING_SUCCESS, loading: !loading })
                }
            })
            .catch(err => {
                console.log(err)
                Alert.alert("Email or Password is incorrect")
                dispatch({ type: LOADING_SUCCESS, loading: !loading })
            })
    }
};

const requestUserPermission = async function (data, dispatch, navigate) {
    // const authorizationStatus = await messaging().requestPermission({
    //     alert: true,
    //     announcement: false,
    //     badge: true,
    //     carPlay: true,
    //     provisional: true,
    //     sound: true,
    // });
    // if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
    //     console.log('User has notification permissions enabled.');
    // } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
    //     console.log('User has provisional notification permissions.');
    // } else {
    //     Alert.alert("Attension", "You need to allow push notification from settings",
    //         [
    //             { text: "OK", onPress: () => Linking.openSettings() }
    //         ])
    //     console.log('User has notification permissions disabled');
    // }

    // const authStatus = await messaging().hasPermission();
    // const enabled =
    //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    // if (enabled) {
    //     getFcmToken(data, dispatch, navigate);
    // } else {
    //     console.log('Authorization status:', authStatus);
    // }

}

const getFcmToken = async (userData, dispatch, navigate) => {
    // const fcmToken = await messaging().getToken();
    // if (fcmToken) {
    //     let data = {
    //         id: userData.user.id,
    //         fcmToken: fcmToken,
    //         token: userData.access_token
    //     }
    //     AuthServices.addFcmToken(data)
    //         .then((res) => {
    //             if (res.data.success) {
    //                 dispatch(getUserProfile(userData, navigate))
    //             }

    //         }).catch((err) => console.log(err))
    // } else {
    //     console.log("Failed", "No token received");
    // }
}

const healthAndSafety = (modal) => {
    return (dispatch) => {
        dispatch({ type: HEALTH_AND_SEFATY_SUCCESS, modal: modal })
    }
}
export const authActions = {
    setUserProfile,
    removeUser,
    setSocialNetworkUserData,
    sendVerificationCode,
    verifyCode,
    UpdateProfileInfo,
    UpdateEmailAddressandToken,
    getUserProfile,
    userLogin,
    healthAndSafety,
    phoneVerificationCode,
    phoneVerifyCode
};