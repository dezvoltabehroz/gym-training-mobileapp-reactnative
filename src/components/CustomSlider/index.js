import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { CustomMarker } from '../CustomeMarker/index';
import { Item } from './item';

export default class CustomSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            multiSliderValue: [this.props.min, this.props.max],
            first: this.props.min,
            second: this.props.max,
            value: [this.props.array]
        }
    }

    render() {
        return (
            <View>
                <View style={[styles.column, { marginLeft: 35, marginRight: 0 }]}>
                    {this.renderScale()}
                </View>
                <View style={styles.container}>

                    <MultiSlider
                        trackStyle={{ backgroundColor: '#D3D3D3' }}
                        selectedStyle={{ backgroundColor: "#00B4E5" }}
                        values={this.props.single ? [this.state.multiSliderValue[1]] : [this.state.multiSliderValue[0], this.state.multiSliderValue[1]]}
                        sliderLength={Dimensions.get('window').width * 0.69}
                        onValuesChange={this.multiSliderValuesChange}
                        min={this.props.min}
                        max={this.props.max}
                        step={1}
                        allowOverlap={false}
                        customMarker={CustomMarker}
                        snapped={true}
                    />
                </View>
            </View>
        );
    }

    // multiSliderValuesChange = values => {
    //     console.log("multiSliderValuesChange : ", values)
    //     console.log("multiSliderValuesChange : ", values[0])
    //     console.log("multiSliderValuesChange : ", values[1])
    //     console.log("multiSliderValuesChange4 : ", this.state.value[0][values[0]])
    //     console.log("multiSliderValuesChange5 : ", this.state.value[0][values[1] - 1])
    //     if (this.props.single) {
    //         this.setState({
    //             second: values[0],
    //         })
    //     } else {
    //         this.setState({
    //             multiSliderValue: values,
    //             // first: this.state.value[0][values[0]],
    //             // second: this.state.value[0][values[1]],
    //             first: values[0],
    //             second: values[1],
    //         })
    //     }
    //     //this.props.callback(values)
    // }

    // renderScale = () => {

    //     const items = [];
    //     for (let i = this.props.min; i < this.state.value[0].length; i++) {
    //         items.push(
    //             <Item
    //                 value={this.state.value[0][i]}
    //                 i={i}
    //                 first={this.state.first}
    //                 second={this.state.second}
    //             />
    //         );
    //     }
    //     return items;
    // }

    multiSliderValuesChange = values => {
        if(this.props.single ){
         this.setState({
             second : values[0],
         })  
        }else{
         this.setState({
             multiSliderValue: values,
             first : values[0],
             second : values[1],
         }) 
        }
         this.props.callback(values)
     }
 
     renderScale=()=> {
         const items = [];
         for (let i=this.props.min; i <= this.props.max; i++) {
             items.push(
                 <Item 
                     value = {i}
                     first = {this.state.first}
                     second = {this.state.second}
                 />
             );
         }
         return items;
     }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: "5%"
    },
    column: {
        flex: 1,
        width: Dimensions.get('window').width * 0.725,
        flexDirection: 'row',
        flexWrap:"wrap",
        // alignItems: 'center',
        justifyContent: 'space-between',
        bottom: -10,

    },
    active: {
        textAlign: 'center',
        fontSize: 20,
        color: '#5e5e5e',
    },
    inactive: {
        textAlign: 'center',
        fontWeight: 'normal',
        color: '#bdc3c7',
    },
    line: {
        textAlign: 'center',
    }
});