import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
import { cartActions } from '../../redux/actions/cart';
class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const { replace } = this.props.navigation;
        const userToken = await AsyncStorage.getItem('USER');
        const data = await AsyncStorage.getItem('CART_ITEMS');
        if (data) {
            let cartItems = JSON.parse(data)
            await this.props.cartActions.setCart(cartItems)
        }
        let userData = JSON.parse(userToken)
        if (userData) {
            await this.props.authActions.getUserProfile(userData, replace);
        } else {
            this.props.navigation.replace('Auth');
        }
    };

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={60} color={''} />
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {},
        cart: state.cartReducer || {}
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        cartActions: bindActionCreators(cartActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen)