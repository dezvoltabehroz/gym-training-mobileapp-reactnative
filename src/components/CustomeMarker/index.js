import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Icon } from '../index'
export class CustomMarker extends Component {
    render() {
        return (
            //     <Image
            //     style={styles.image}
            //     source={require('../../images/slider-button.png')}
            //     resizeMode="contain"
            //   />
            <View>
                <Icon.Octicons name="primitive-dot" size={30} color={"#00B4E5"} />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    circle1: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 1,
        position: 'absolute'
    },
    circle2: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#4eaa37',
        position: 'absolute',
        justifyContent: 'center',
        alignSelf: 'center',
        zIndex: 1
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 30, height: 30
    }
});