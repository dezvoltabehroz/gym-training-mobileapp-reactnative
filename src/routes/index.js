import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import { AuthLoading } from '../screens';
import AuthRoutes from './Auth';
import MainRoutes from './Main';


const Stack = createStackNavigator();

function AppRoutes() {
    return (
        <Stack.Navigator initialRouteName="AuthLoading" >
            <Stack.Screen name="AuthLoading" component={AuthLoading} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Auth" component={AuthRoutes} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Main" component={MainRoutes} options={{
                headerShown: false
            }} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    headerTitleStyle: {
        fontSize: 16,
        color: "#fff",
    }
})

export default AppRoutes;


