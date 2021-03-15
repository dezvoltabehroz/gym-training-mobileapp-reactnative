import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Login, ForgetPassword, NewPassword, OTP, Signup, More, Profile, EditInfo, About, ResetPassword } from '../../screens';
import themeStyle from '../../assets/styles/theme.style';
import { Icon } from '../../components/';
import Logo from '../../assets/svg/logo.svg'
const Stack = createStackNavigator();

function MoreRoutes() {
    return (
        <Stack.Navigator initialRouteName="More" >
            <Stack.Screen name="More" component={More} options={({ navigation, route }) => ({
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
            {/* <Stack.Screen name="Signup" component={Signup} options={{
                headerShown: false
            }} /> */}
            <Stack.Screen name="Profile" component={Profile} options={({ navigation, route }) => ({
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
            <Stack.Screen name="About" component={About} options={({ navigation, route }) => ({
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
            <Stack.Screen name="EditInfo" component={EditInfo} options={({ navigation, route }) => ({
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
            <Stack.Screen name="ChangePassword" component={ResetPassword} options={({ navigation, route }) => ({
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

export default MoreRoutes;