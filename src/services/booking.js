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
    getBookings: function (userData) {
        console.log("userData :===", userData)
        return axiosInstance.post('booking/getBookings', {
            id: userData.id,
            date: userData.date,
            start_time: userData.start_time ? userData.start_time : "",
            end_time: userData.end_time ? userData.end_time : ""
        }, configToken(userData.token))
    },
    bookSlot: function (userData) {
        return axiosInstance.post('booking/bookSlot', {
            id: userData.id,
            booking_date: userData.date,
            booking_start_time: userData.booking_start_time,
            booking_end_time: userData.booking_end_time
        }, configToken(userData.token))
    },
    unBookSlot: function (userData) {
        return axiosInstance.post('booking/unBookSlot', {
            id: userData.id,
            booking_date: userData.date,
            booking_start_time: userData.booking_start_time,
            booking_end_time: userData.booking_end_time
        }, configToken(userData.token))
    }
};

export default Api;