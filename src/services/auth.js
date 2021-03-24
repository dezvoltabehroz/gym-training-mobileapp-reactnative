import AsyncStorage from '@react-native-community/async-storage';
import axiosInstance from './Interceptor';
let config = { headers: { 'Content-Type': 'application/json' } }
let configToken = (token) => {
    return {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }
}
const Api = {
    userLogin: function (userData) {
        return axiosInstance.post('registration/loginTrainee', {
            email: userData.email,
            password: userData.password
        }, config)
    },
    googleLogin: function (userData) {
        return axiosInstance.post('buyer/logingoogle', {
            idToken: userData.token,
            client_id: userData.client_id
        }, config)
    },
    userSignUp: function (userData) {
        return axiosInstance.post('buyer/signup', {
            fullName: userData.full_name,
            email: userData.email,
            password: userData.password,
            password2: userData.confirmPassword,
            phone: userData.phone
        }, config)
    },
    addFcmToken: function (userData) {
        return axiosInstance.post('buyer/addfcmToken', {
            customer_id: userData.id,
            fcmToken: userData.fcmToken
        }, configToken(userData.token))
    },
    changePasswordOnLogin: function (userData) {
        return axiosInstance.put('registration/changePasswordOnLogin', {
            "id": userData.id,
            "new_password": `${userData.new_password}`
        }, configToken(userData.token))
    },
    getUserProfile: function (userData) {
        console.log("userData.id : ", userData.id)
        return axiosInstance.post(`registration/refreshToken`, {
            "id": userData.id
        }, configToken(userData.token))
    },
    updateUserProfile: function (userData) {
        return axiosInstance.put('buyer/updatecustomer', {
            "id": userData.id,
            "city": `${userData.city}`,
            "address": `${userData.address}`,
            "phone": `${userData.phone}`,
            "fullName": `${userData.fullName}`
        }, configToken(userData.token))
    },
    resetpasswordmail: function (email) {
        return axiosInstance.post('registration/forgetPassword', {
            "email": email
        }, config)
    },
    verifyCodeForResetPass: function (code) {
        return axiosInstance.post('registration/verifyCodeForResetPass', {
            "code": code,
        }, config)
    },
    updatePassword: function (userData) {
        return axiosInstance.post('registration/updatePassword', {
            "id": userData.id,
            "new_password": userData.new_password
        }, config)
    }


};

export default Api;