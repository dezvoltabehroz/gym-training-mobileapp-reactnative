import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet, Dimensions, } from 'react-native';
import { Home, } from '../../screens';
import Logo from '../../assets/svg/logo.svg';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import themeStyle from '../../assets/styles/theme.style';
const screenWidth = Dimensions.get('window').width;
const Stack = createStackNavigator();


function HomeRoutes(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={({ navigation, route }) => ({
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
        fontFamily: 'Montserrat-Regular'
    },
    headerMapTitleStyle: {
        fontSize: 14,
        color: "#fff",
    },
    headerTextStyle: {
        color: "#fff",
        fontFamily: 'Montserrat-Regular'
    }
})
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {},
    };
};

export default connect(mapStateToProps)(HomeRoutes);


