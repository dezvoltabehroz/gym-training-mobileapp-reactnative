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



};

export default Api;