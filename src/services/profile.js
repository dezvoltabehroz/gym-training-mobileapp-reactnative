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
    getlistAllBookings: function (userData) {
        return axiosInstance.post('profile/listAllBookings', {
            "id": userData.id
        }, configToken(userData.token))
    },
    getMemberShipDetails: function (userData) {
        return axiosInstance.post('profile/getMembershipDetail', {
            "id": userData.id
        }, configToken(userData.token))
    },
    getPauseList: function (userData) {
        return axiosInstance.post('profile/getPauseList', {
            "id": userData.id,
            "member_id": userData.member_id
        }, configToken(userData.token))
    },
    requestPauseMembership: function (userData) {
        return axiosInstance.post('profile/requestPauseMembership', {
            "id": userData.id,
            "member_id": userData.member_id,
            "start_date": userData.start_date,
            "end_date": userData.end_date,
            "reason": userData.reason
        }, configToken(userData.token))
    },
    cancelRequestPauseMembership: function (userData) {
        return axiosInstance.post('profile/cancelRequestPauseMembership', {
            "pause_request_id": userData.pause_request_id
        }, configToken(userData.token))
    },

};

export default Api;