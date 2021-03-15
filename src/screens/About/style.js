import { StyleSheet } from 'react-native'
import themeStyle from '../../assets/styles/theme.style'

export default StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: 'white',
        // marginTop: StatusBar.currentHeight,
    },

    aboutTitleStyle: {
        fontSize: 20,
        color:themeStyle.PRIMARY_BACKGROUND_COLOR,
        fontFamily:"Montserrat-Bold",
        marginLeft: 15,
        marginTop: 8
    },
    aboutcontentmainStyle: {
        marginBottom: 60
    },
    aboutcontentStyle: {
        fontSize: 12,
        textAlign: "justify",
        alignSelf: 'center',
        fontFamily: 'Montserrat-Medium',
        // paddingVertical: 10,
        paddingHorizontal: 10,
        letterSpacing: 1,
        marginTop: 6,
    },
    contact: {
        marginTop: 6,
        marginLeft: 15,
        width: "100%",
        marginBottom: 30
    },
    contacttype1: {
        textAlign: 'left',
        fontSize: 16,
        color: "#77777B",
        fontFamily: 'Montserrat-Medium'
    },
    contacttype2: {
        textAlign: 'left',
        marginTop: 4,
        fontFamily: 'Montserrat-Medium',
        fontSize: 15,
    },
    headingTextStyle: {
        color: '#102134',
        fontSize: 18,
        fontFamily: 'Montserrat-Medium',
        marginTop: '5%',
        marginHorizontal: '5%'
    }
})