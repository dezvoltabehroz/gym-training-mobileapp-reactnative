import { Dimensions, StyleSheet } from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    headerImageStyle: {
        height: 40,
        width: screenWidth
    },
    upperListContainer: {
        marginHorizontal: '5%',
        paddingVertical: '5%',
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 1,
        borderColor: "#EEE",
        borderWidth: 0.3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
    },
    tabContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '2%'
    },
    upperContainer: {
        marginHorizontal: '5%',
        paddingHorizontal: '5%',
        paddingVertical: '2.5%',
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 2,
        borderColor: "#EEE",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
    },
    content: {
        backgroundColor: 'white',
        padding: 22,
        // justifyContent: 'center',
        // alignItems: 'center',
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
        fontSize: 20,
        marginBottom: 12,
    },
    tipContainer: {
        height: 54,
        // backgroundColor: THEME.PRIMARY_COLOR,
        justifyContent: "center",
        alignItems: "center",
        width: screenWidth * 0.35,
        borderRadius: 7
    },
    checkButtonTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold'
    },
    checkoutButtonContainer: {
        borderRadius: 35,
        height: 30,
        width: 95,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainer: {
        backgroundColor: '#E2E2E2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        height: 25,
        width: 25
    },
    discountTextStyle: {
        color: '#A50808'
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: '#7A7A7A'
    },
    headingText: {
        fontSize: 16,
        fontFamily: 'Montserrat-Regular'
    }
})