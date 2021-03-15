import { Dimensions, StyleSheet } from 'react-native'
import themeStyle from '../../assets/styles/theme.style';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default StyleSheet.create({
    backgroundImageStyle: {
        height: screenHeight * 0.368,
        width: screenWidth
    },
    backgroundStyle: {
        height: screenHeight,
        width: screenWidth
    },
    innerImageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerImageStyle: {
        height: screenHeight * 0.2,
        width: screenWidth,
    },
    logoImageStyle: {
        height: 90,
        width: 306
    },
    headingTextStyle: {
        fontSize: 16,
        textAlign: "center",
        fontFamily: 'Montserrat-Medium',
        fontWeight: "normal",
        // color: themeStyle.PRIMARY_BACKGROUND_COLOR
    },
    headingTextStyle1: {
        fontSize: 14,
        textAlign: "center",
        fontFamily: 'Montserrat-Medium',
        color: themeStyle.COLOR_GREY
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
        height: 40, width: 30,
        fontSize: 13,
        fontFamily: 'Montserrat-Regular',
        color: '#3F4B59'
    },
    cardStyle: {
        flex: 0.25,
        alignItems: "center",
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
        flexDirection: "row",
        // justifyContent: "space-between",
        marginHorizontal: "5%",
        paddingHorizontal: "5%"
    },
    secondCardStyle: {
        flex: 0.325,
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
        paddingHorizontal: "5%"
    },
    colorBtnPrimary: {
        height: 44,
        width: 170,
        borderRadius: 8,
        // borderWidth: 0.5,
        // borderColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
        backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR
    },

})