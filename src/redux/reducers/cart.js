import {
    CART_SUCCESS,
    REGION_SUCCESS,
    SUB_CATEGORIES_SUCCESS,
    LOADING_CATEGORIES_SUCCESS,
    ALL_SERVICES_SUCCESS
} from '../types';

const initialState = {
    cart: [],
    loading: false,
    region: null,
    address: null

};

const categories = (state = initialState, action) => {
    switch (action.type) {
        case CART_SUCCESS:
            return {
                ...state,
                cart: action.cart
            };
        case REGION_SUCCESS:
            return {
                ...state,
                region: action.region,
                address: action.address
            };
        default:
            return state;
    }
};

export default categories;
