import { Dimensions, StyleSheet } from 'react-native'
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
export default StyleSheet.create({
    backgroundImageStyle: {
        height: screenHeight * 0.368,
        width: screenWidth
    },
    backgroundStyle: {
        height: '100%',
        width: screenWidth
    },
    innerImageContainer: {
        marginTop: '13%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerImageStyle: {
        height: screenHeight * 0.25,
        width: 200,
    },
    logoImageStyle: {
        height: 90,
        width: 306
    },
    headingTextStyle: {
        fontSize: 16,
        textAlign: "center",
        fontWeight: 'bold'
    },
    googleImageContainer: {
        alignItems: 'center',
        marginTop: '5%',
        paddingBottom: '10%'
    },
    googleImageStyle: {
        height: 30, width: 30
    },
    iconImageStyle: {
        height: 20,
        width: 20
    },
    errorText: {
        paddingTop: "1%",
        paddingLeft: 8,
        color: '#c30000',
        fontSize: 12,
        marginLeft: 5
    },
    themeText: {
        fontSize: 12,
        marginRight: '5%',
        fontFamily: 'Montserrat-Regular'
    },

})