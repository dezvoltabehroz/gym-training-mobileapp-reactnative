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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        borderColor: "#EEE",
        borderWidth: 0.3,
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
        paddingVertical: '5%',
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 2,
        borderColor: "#EEE",
        borderWidth: 0.3,
        shadowColor: "#000",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
    },
    listTextStyle: {
        fontSize: 12,
        color: '#7A7A7A',
        fontFamily: 'Montserrat-Regular'
    },
    itemContainer: {
        // marginTop: '2.5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemNameContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    itemNameTextStyle: {
        color: '#000',
        // marginVertical: '5%',
        fontSize: 12,
        fontFamily: 'Montserrat-Regular'
    },
    itemQuantityContainer: {
        flexDirection: 'column',
        // justifyContent: 'space-between'
    },
    listSeperatorStyle: {
        height: 5,
        marginTop: 5,
        borderTopWidth: 0.5,
        borderTopColor: '#707070'
    },
})