import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Login, ForgetPassword, NewPassword, OTP, Signup } from '../../screens';
import themeStyle from '../../assets/styles/theme.style';
import { Icon } from '../../components/';
import Logo from '../../assets/svg/logo.svg'
const Stack = createStackNavigator();

function AuthRoutes() {
    return (
        <Stack.Navigator initialRouteName="Login" >
            <Stack.Screen name="Login" component={Login} options={{
                headerShown: false
            }} />
            {/* <Stack.Screen name="Signup" component={Signup} options={{
                headerShown: false
            }} /> */}
            <Stack.Screen name="OTP" component={OTP} options={({ navigation, route }) => ({
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
            {/* <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{
                headerShown: false
            }} /> */}
            <Stack.Screen name="NewPassword" component={NewPassword} options={({ navigation, route }) => ({
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

const styles = StyleSheet.create({
    headerTitleStyle: {
        fontSize: 16,
        color: "#fff",
    }
})

export default AuthRoutes;