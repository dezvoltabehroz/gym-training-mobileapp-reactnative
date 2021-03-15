import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MemberShip, PauseHistory, PauseMemberShip } from '../../screens';
import { connect } from 'react-redux'
import themeStyle from '../../assets/styles/theme.style';
import Logo from '../../assets/svg/logo.svg';
import { Icon } from '../../components/';
const Stack = createStackNavigator();
function MemberShipRoutes(props) {
    return (
        <Stack.Navigator initialRouteName="MemberShip">
            <Stack.Screen name="MemberShip" component={MemberShip} options={({ navigation, route }) => ({
                headerBackTitleVisible: false,
                headerTitleAlign: 'center',
                headerStyle: {
                    elevation: 0,
                    backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR
                },
                headerTintColor: 'white',
                // headerLeft: () => (<TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 15 }}><Icon.MaterialIcons name={"keyboard-arrow-left"} size={35} color={themeStyle.COLOR_WHITE} /></TouchableOpacity>),
                // headerRight: () => (<TouchableOpacity style={{ paddingRight: 15 }}><Image source={require('../../assets/images/siren.png')} resizeMode='contain' style={{ height: 20, width: 20 }} /></TouchableOpacity>),
                headerTitle: () => (<View><Logo height={39} width={57} /></View>),
            })} />
            <Stack.Screen name="PauseHistory" component={PauseHistory} options={({ navigation, route }) => ({
                headerBackTitleVisible: false,
                headerTitleAlign: 'center',
                headerStyle: {
                    elevation: 0,
                    backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR
                },
                headerTintColor: 'white',
                headerLeft: () => (<TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 15 }}><Icon.MaterialIcons name={"keyboard-arrow-left"} size={35} color={themeStyle.COLOR_WHITE} /></TouchableOpacity>),
                // headerRight: () => (<TouchableOpacity style={{ paddingRight: 15 }}><Image source={require('../../assets/images/siren.png')} resizeMode='contain' style={{ height: 20, width: 20 }} /></TouchableOpacity>),
                headerTitle: () => (<View><Logo height={39} width={57} /></View>),
            })} />
            <Stack.Screen name="PauseMemberShip" component={PauseMemberShip} options={({ navigation, route }) => ({
                headerBackTitleVisible: false,
                headerTitleAlign: 'center',
                headerStyle: {
                    elevation: 0,
                    backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR
                },
                headerTintColor: 'white',
                headerLeft: () => (<TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 15 }}><Icon.MaterialIcons name={"keyboard-arrow-left"} size={35} color={themeStyle.COLOR_WHITE} /></TouchableOpacity>),
                // headerRight: () => (<TouchableOpacity style={{ paddingRight: 15 }}><Image source={require('../../assets/images/siren.png')} resizeMode='contain' style={{ height: 20, width: 20 }} /></TouchableOpacity>),
                headerTitle: () => (<View><Logo height={39} width={57} /></View>),
            })} />
        </Stack.Navigator>
    );
}
const truncateString = (str, num) => {
    if (str.length <= num) {
        return str
    }
    return str.slice(0, num) + '...'
}
const styles = StyleSheet.create({
    headerTitleStyle: {
        fontSize: 18,
        color: "#fff",
    },
    headerMapTitleStyle: {
        fontSize: 14,
        color: "#fff",
    },
    headerTextStyle: {
        color: "#fff",
    }
})
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {},
        cart: state.cartReducer || {}
    };
};
export default connect(mapStateToProps)(MemberShipRoutes);


