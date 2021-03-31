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
    changePasswordOnLogin: function (userData) {
        return axiosInstance.put('registration/changePasswordOnLogin', {
            "id": userData.id,
            "new_password": `${userData.new_password}`
        }, configToken(userData.token))
    },
    getUserProfile: function (userData) {
        return axiosInstance.post(`registration/refreshToken`, {
            "id": userData.id
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
    },
    changePassword: function (userData) {
        return axiosInstance.post('registration/changePassword', {
            "id": userData.id,
            "current_password": userData.current_password,
            "new_password": userData.new_password
        }, configToken(userData.token))
    },


};

export default Api;