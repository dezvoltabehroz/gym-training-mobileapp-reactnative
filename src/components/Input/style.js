import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
export default StyleSheet.create({
    containerStyle: {
        height: 75,
        marginBottom: 0
    },
    inputContainerStyle: {
        borderBottomWidth: 0.5,
        borderColor: '#E0E0E0',
        // borderRadius: 5,
    },
    inputStyle: {
        fontSize: 12,
        fontFamily: 'Montserrat-Medium',
        marginLeft: '2.5%'
    },
    labelStyle: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: "black"
    }
}
);
