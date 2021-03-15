import { StyleSheet, Dimensions } from "react-native";
import themeStyle from "../../assets/styles/theme.style";
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        marginTop: '15%'
    },
    cardContainer: {
        paddingVertical: '5%',
        marginTop: '5%',
        backgroundColor: 'white',
        marginHorizontal: '5%',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        borderColor: "#EEE",
        borderWidth: 0.3,
        bottom: '10%',
        paddingHorizontal: '5%',
    },
    itemQuantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headingTitleStyle: {
        fontSize: 20,
        color:themeStyle.PRIMARY_BACKGROUND_COLOR,
        fontFamily:"Montserrat-Bold",
        marginLeft: 15,
        // marginTop: 8
    },
    lineStyle: {
        marginTop: '5%',
        borderWidth: 0.2,
        color: '#7A7A7A'
    },
    listTextStyle: {
        lineHeight: 25,
        fontSize: 12,
        color: '#7A7A7A'
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    checkButtonTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold'
    },
    checkoutButtonContainer: {
        borderRadius: 35,
        height: 33,
        width: 95,
        paddingBottom: '3%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '5%'
    },
    iconContainer: {
        backgroundColor: '#E2E2E2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        height: 25,
        width: 25
    },
    clearTextStyle: {
        color: '#0DA7DF',
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold'
    },
    clearButtonContainer: {
        borderRadius: 35,
        height: 33,
        width: 95,
        borderWidth: 1,
        paddingBottom: '3%',
        borderColor: '#0DA7DF',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '5%'
    },
    errorText: {
        paddingTop: "1%",
        paddingLeft: 8,
        color: '#c30000',
        fontSize: 12,
        marginLeft: 5
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