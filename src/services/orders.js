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

    getCustomerOrders: function (userData) {
        return axiosInstance.post('buyer/getcustomerorders', {
            customer_id: userData.id,
        }, configToken(userData.token))
    },
    getOrderDetails: function (userData) {
        return axiosInstance.get(`buyer/customerorderdetail?customer_id=${userData.id}&order_id=${userData.order_id}`)
    },
    placeCustomerOrder: function (userData) {
        return axiosInstance.post('buyer/placeorder', {
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            customer_id: userData.customer_id,
            lat: `${userData.lat}`,
            long: `${userData.long}`,
            day: userData.day,
            time: userData.time,
            totalPrice: userData.totalPrice,
            urgent: userData.urgent,
            grandTotal: userData.grandTotal,
            deliveryAddress: userData.deliveryAddress,
            city: userData.city,
            paymentMethod: userData.paymentMethod,
            transactionId: userData.transactionId,
            notes: userData.notes,
            coupon_id: userData.coupon_id,
            products: userData.products
        }, configToken(userData.token))
    },
    validateCoupon: function (coupon) {
        return axiosInstance.post('buyer/validatecoupon', {
            coupon: coupon
        }, config)
    }



};

export default Api;