import React, { Component } from 'react';
import { StatusBar, Linking, Platform, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './routes'
import { Provider } from "react-redux";
import createStore from "./redux/CreateStore";
import SplashScreen from 'react-native-splash-screen';
import themeStyle from './assets/styles/theme.style';
// import { Login } from './screens';
const store = createStore();


export default function App() {
    React.useEffect(() => { SplashScreen.hide(); })
    React.useEffect(() => {
        LogBox.ignoreAllLogs(true);
    });
    return (
        <>
            <Provider store={store}>
                <NavigationContainer>
                    <SafeAreaProvider>
                        <StatusBar backgroundColor={themeStyle.PRIMARY_BACKGROUND_COLOR} />
                        <AppRoutes />
                    </SafeAreaProvider>
                </NavigationContainer>
            </Provider>
        </>
    );
}


