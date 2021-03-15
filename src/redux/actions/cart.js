import AsyncStorage from '@react-native-community/async-storage';
import {
    CART_SUCCESS, REGION_SUCCESS,
} from '../types';

const setCart = (cartArray) => {
    return async (dispatch) => {
        await dispatch({ type: CART_SUCCESS, cart: cartArray })
        await AsyncStorage.setItem('CART_ITEMS', JSON.stringify(cartArray))
    };
}
const setRegion = (userData) => {
    return (dispatch) => {
        dispatch({ type: REGION_SUCCESS, region: userData.region, address: userData.address })
    };
}


const clear = () => {
    return async (dispatch) => {
        dispatch({ type: CART_SUCCESS, cart: [] })
        await AsyncStorage.removeItem('CART_ITEMS')
    };
}



export const cartActions = {
    setCart,
    clear,
    setRegion
};