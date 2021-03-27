import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export class Item extends Component {
    // render() {
    //     console.log('Valuse : ', this.props.value)
    //     console.log('Valuse : ', this.props.first)
    //     console.log('Valuse : ', this.props.second)
    //     return (
    //         <View>
    //             {/* <Text style={[this.checkActive() ? styles.active : styles.inactive]}>{this.props.value}</Text> */}
    //             <Text style={[this.checkActive() ? [styles.line, { backgroundColor: "blue", }] : [styles.line, { backgroundColor: "grey", }]]}> {this.checkActive() ? '' : ''}</Text>
    //         </View>
    //     );
    // }

    // checkActive = () => {
    //     if (this.props.i >= this.props.first && this.props.i <= this.props.second)
    //         return true
    //     else
    //         return false
    // }
    render() {
        return (
            <View>
                {/* <Text style={[this.checkActive() ? styles.active : styles.inactive]}>{this.props.value}</Text>
                <Text style={[this.checkActive() ? styles.line : {}]}> {this.checkActive() ? '|' : ''}</Text> */}
                <Text style={[this.checkActive() ? [styles.line, { backgroundColor: "#00B4E5", }] : [styles.line, { backgroundColor: "#D3D3D3", }]]}> {this.checkActive() ? '' : ''}</Text>
            </View>
        );
    }

    checkActive = () => {
        if (this.props.value >= 4 && this.props.value <= 8)
            return true
        else
            return false
    }

}

const styles = StyleSheet.create({
    active: {
        // height: 50,
        // textAlign: 'center',
        fontSize: 8,
        // bottom: 10,
        color: '#5e5e5e',
    },
    inactive: {
        flex: 1,
        // textAlignVertical: 'center',
        // textAlign: 'center',
        fontSize: 5,
        fontWeight: 'normal',
        color: '#bdc3c7',
    },
    line: {
        top: 10,
        height: 10, width: 10,
        borderRadius: 5,
        // backgroundColor: "red",
        // fontSize: 10,
        // textAlign: 'center',
    }
});