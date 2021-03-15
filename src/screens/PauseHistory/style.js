import { Dimensions, StyleSheet } from 'react-native';
import THEME from '../../assets/styles/theme.style'
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1
    },
    memberShipContainer: {
        marginTop: "5%",
        marginHorizontal: "5%",
        padding: "5%",
        // paddingVertical: "10%",
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
    },

    memberShipContentRowStyle: {
        height: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 0.5,
        borderBottomColor: "#d3d3d3",
        alignItems: "center"
    },
    memberShipContentRow: {
        flexDirection: "row",
        // justifyContent: "space-between",
        alignItems: "center"
    },
    userDetailTextStyle: {
        fontFamily: "Montserrat-Medium"
    },
    userTextStyle: {
        fontSize: 12,
        fontFamily: "Montserrat-Medium",
        fontWeight: "normal"
    },
    memberShipTypeTextStyle: {
        fontSize: 16,
        fontFamily: "Montserrat-Bold",
        color: THEME.PRIMARY_BACKGROUND_COLOR
    },
    memberShipIdContainer: {
        marginTop: "10%",
        justifyContent: "center",
        alignItems: "center"
    },
    validityTextStyle: {
        marginRight: 5,
        fontSize: 8,
        textAlign: "justify",
        fontFamily: "Montserrat-Medium",
    },
    pausedAvailedContainer: {
        marginTop: "5%",
        marginHorizontal: "5%",
        padding: "5%",
        // paddingVertical: "10%",
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
    },
    pausedHistoryContainer: {
        marginTop: "5%",
        marginHorizontal: "5%",
        padding: "5%",
        // paddingVertical: "10%",
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
    },
    colorBtnPrimary: {
        height: 44,
        width: 170,
        borderRadius: 8,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR
    },
    dateContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#D3D3D3",
        borderRadius: 5,
        justifyContent: "space-between",
        padding: "5%",
        marginTop: '5%'
    },
    dateTextStyle: {
        fontSize: 12,
        fontFamily: "Montserrat-Medium",
        color: "#d3d3d3"
    },
    containerStyle: {
        height: 110,
        marginBottom: 0
    },
    inputContainerStyle: {
        borderBottomWidth: 0,
        backgroundColor: '#F2F3F5',
        borderRadius: 5,
        height: 100,
    },
    inputStyle: {
        height: 110,
        textAlignVertical: "top",
        fontSize: 12,
        fontFamily: 'Montserrat-Medium',
        marginLeft: '2.5%'
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
    darkTextStyle: {
        fontFamily: "Montserrat-Medium",
        color: "#77777B"
    },
})