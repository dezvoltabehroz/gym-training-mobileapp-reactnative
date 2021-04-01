import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import HomeRoutes from '../Home';
import MoreRoutes from '../More';
import { useDispatch, connect } from 'react-redux';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import themeStyle from '../../assets/styles/theme.style';
import WhiteMore from '../../assets/svg/More_color.svg';
import More from '../../assets/svg/More.svg';
import WhiteBooking from '../../assets/svg/booking_icon_color.svg';
import Booking from '../../assets/svg/booking_icon.svg';
import WhiteHome from '../../assets/svg/home_icon_color.svg';
import Home from '../../assets/svg/home_icon.svg';
import WhiteMember from '../../assets/svg/Union.svg';
import Member from '../../assets/svg/membership_icon.svg';
import BookingRoutes from '../Bookings';
import MemberShipRoutes from '../MemberShip';
const Tabs = AnimatedTabBarNavigator();
// const BadgedIcon = withBadge(1)(Icons);
function MainRoutes(props) {
    return (
        <Tabs.Navigator
            tabBarOptions={{
                activeTintColor: themeStyle.COLOR_WHITE,
                inactiveTintColor: themeStyle.COLOR_GREY,
                activeBackgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
                labelStyle: {
                    fontFamily: "Montserrat-Bold",
                    fontWeight: "normal",
                    fontSize: 12
                }
            }}
            initialRouteName="Home" >
            <Tabs.Screen name="Home" component={HomeRoutes} options={{

                swipeEnabled: false,
                tabBarIcon: ({ focused, color, size }) => (
                    focused ?
                        <WhiteHome />
                        :
                        <Home />
                ),
                unmountOnBlur: true,
            }} />
            <Tabs.Screen name="Bookings" component={BookingRoutes} options={{
                swipeEnabled: false,
                unmountOnBlur: true,
                tabBarIcon: ({ focused, color, size }) => (
                    focused ?
                        <WhiteBooking />
                        :
                        <Booking />
                )
            }} />
            <Tabs.Screen name="MemberShip" component={MemberShipRoutes} options={{
                swipeEnabled: false,
                tabBarIcon: ({ focused, color, size }) => (
                    focused ?
                        <WhiteMember />
                        :
                        <Member />
                )
            }} />
            <Tabs.Screen name="More" component={MoreRoutes} options={{
                swipeEnabled: false,
                tabBarIcon: ({ focused, color, size }) => (
                    focused ?
                        <WhiteMore />
                        :
                        <More />
                )
            }} />
        </Tabs.Navigator>
    );
}


const styles = StyleSheet.create({
    headerTitleStyle: {
        fontSize: 16,
        color: "#fff",
    },
    upperContainer: {
        flex: 0.3,
        justifyContent: 'center',
    },
    itemStyle: { flexDirection: 'row', height: 54, alignItems: 'center', paddingLeft: '10%' },
    policyStyles: { paddingLeft: '10%', paddingVertical: '10%' }
});

const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

export default connect(mapStateToProps)(MainRoutes);