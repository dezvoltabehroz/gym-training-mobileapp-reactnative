import { Dimensions, StyleSheet } from 'react-native'
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default StyleSheet.create({
    backgroundImageStyle: {
        height: screenHeight * 0.368,
        width: screenWidth
    },
    innerImageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerImageStyle: {
        height: screenHeight * 0.3,
        width: screenWidth,
    },
    logoImageStyle: {
        height: 90,
        width: 306
    },
    headingTextStyle: {
        fontSize: 16,
        textAlign: "center",
        fontFamily: 'Montserrat-Regular',
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
    backgroundStyle: {
        height: screenHeight,
        width: screenWidth
    },
    codeContainer: {
        justifyContent: 'center',
        // paddingTop: "5%",
        paddingVertical: "5%",
        flexDirection: 'row',
        marginHorizontal: '10%'
    },
    codeInput: {
        marginLeft: 8,
        marginRight: 8,
        backgroundColor: '#F0F1F3',
        borderRadius: 5,
        fontSize: 13,
        color: '#3F4B59'
    },
    errorText: {
        paddingTop: "1%",
        paddingLeft: 8,
        color: '#c30000',
        fontSize: 12,
        marginLeft: 5
    },
    secondCardStyle: {
        // flex: 0.325,
        // alignItems: "center",
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        borderRadius: 8,
        marginTop: '5%',
        paddingTop: "5%",
        // flexDirection: "row",
        // justifyContent: "space-between",
        marginHorizontal: "5%",
        paddingHorizontal: "5%",
        paddingBottom: "5%"
    }

})