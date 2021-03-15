import { Dimensions, StyleSheet } from 'react-native';
import THEME from '../../assets/styles/theme.style';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F3F5"
    },
    headingContainer: {
        flexDirection: "row",
        borderBottomWidth: 1,
        height: 40,
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: "5%"
    },
    headingTextStyle: {
        fontFamily: "Montserrat-Bold",
        fontSize: 13,
        fontWeight: "normal"
    },
    dateTextStyle: {
        fontFamily: "Montserrat-Bold",
        fontSize: 11,
        fontWeight: "normal"
    },
    textStyle: {
        fontFamily: "Montserrat-Medium",
        color: "#D3D3D3"
    },
    darkTextStyle: {
        fontFamily: "Montserrat-Medium",
        color: "#77777B"
    },
    timeTextStyle: {
        fontFamily: "Montserrat-Medium"
    },
    bookingContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    buttonContainer: {
        height: 40,
        width: 80,
        backgroundColor: THEME.COLOR_WHITE,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#D3D3D3"
    },
    contentRowStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    contentContainer: {
        marginTop: 10,
        padding: "5%",
        paddingVertical: "10%",
        borderRadius: 8,
        backgroundColor: THEME.COLOR_WHITE,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    }

})