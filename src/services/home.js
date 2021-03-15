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

    getCategories: function () {
        return axiosInstance.get('buyer/getCategories', config)
    },
    getProductsforCustomer: function (userData) {
        return axiosInstance.post('buyer/getproductsforcustomer', {
            category_id: userData.category_id
        }, configToken(userData.token))
    },



};

export default Api;