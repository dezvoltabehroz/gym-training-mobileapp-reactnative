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
            await dispatch({ type: USER_LOGIN_SUCCESS, userData: userData, userToken: data, loading: false });
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
                if (responseData.data.success) {
                    await AsyncStorage.setItem('USER', JSON.stringify(responseData.data.data))
                    await dispatch(setUserProfile(responseData.data.data, navigate))
                }
                else {
                    dispatch(removeUser(navigate));
                    dispatch({ type: LOADING_SUCCESS, loading: !loading })
                }

            })
            .catch(err => { console.log(err) })
    };
};

const removeUser = (navigate) => {
    return async (dispatch) => {
        dispatch({ type: USER_LOGOUT_SUCCESS })
        await navigate('Auth')
        await AsyncStorage.removeItem('USER');
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
                    await AsyncStorage.setItem('USER', JSON.stringify(responseData.data.data))
                    await AsyncStorage.setItem('TOKEN', JSON.stringify(responseData.data.data.token))
                    await AsyncStorage.setItem('Email', JSON.stringify(userData))
                    await dispatch({ type: USER_LOGIN_SUCCESS, userData: responseData.data.data, loading: !loading })
                    navigate("Main")
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

export const authActions = {
    setUserProfile,
    removeUser,
    getUserProfile,
    userLogin
};