import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export class Item extends Component {

    render() {
        return (
            <View>
                <Text style={[this.checkActive() ? [styles.line, { backgroundColor: "#00B4E5", }] : [styles.line, { backgroundColor: "#D3D3D3", }]]}> {this.checkActive() ? '' : ''}</Text>
            </View>
        );
    }

    checkActive = () => {
        if (this.props.value >= this.props.first && this.props.value <= this.props.second)
            return true
        else
            return false
    }

}

const styles = StyleSheet.create({
    active: {
        fontSize: 8,
        color: '#5e5e5e',
    },
    inactive: {
        flex: 1,
        fontSize: 5,
        fontWeight: 'normal',
        color: '#bdc3c7',
    },
    line: {
        top: 10,
        height: 10, width: 10,
        borderRadius: 5,
    }
});