import { StyleSheet, Dimensions } from 'react-native';
import themeStyle from '../../assets/styles/theme.style';

const screenWidth = Dimensions.get('window').width;
export default StyleSheet.create({
    btnPrimary: {
        height: 44,
        width: 100,
        borderRadius: 8,
        backgroundColor: 'white'
    },
    btnPrimaryText: {
        fontSize: 16,
        fontFamily: 'Montserrat-Bold',
        color: '#0DA7DF',
    },
    clearBtnPrimary: {
        height: 44,
        width: 100,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
        backgroundColor: 'white'
    },
    clearBtnPrimaryText: {
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
        color: themeStyle.PRIMARY_BACKGROUND_COLOR,
    },
    colorBtnPrimary: {
        height: 44,
        width: 100,
        borderRadius: 8,
        // borderWidth: 0.5,
        // borderColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
        backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR
    },
    colorBtnPrimaryText: {
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
        fontWeight: "normal",
        color: "white",
    },
});