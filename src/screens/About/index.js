

import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import styles from './style';
import { Icon } from '../../components'
export default class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: " support@mail.com",
            phone: " +1234567890",
            contents: " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It ha Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from"
        }
    }

    render() {
        return (
            <ScrollView style={{ marginTop: 0 }}>
                <View style={styles.aboutcontentmainStyle}>
                    <Text style={styles.aboutTitleStyle}>{'About Us'}</Text>
                    <Text style={[styles.aboutcontentStyle, { marginHorizontal: 10 }]}>{this.state.contents ? this.state.contents : null}</Text>
                    <Text style={styles.aboutTitleStyle}>{'Contact Us'}</Text>
                    <View style={styles.contact}>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: '2.5%' }}>
                            <Icon.Entypo name="network" color="#5F6365" size={18} />
                            <View style={{ width: 5 }}></View>
                            <Text style={styles.aboutcontentStyle}>{"www.educogym.co"}</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: '2.5%' }}>
                            <Icon.FontAwesome5 name="map-marker-alt" color="#5F6365" size={20} />
                            <View style={{ width: 5 }}></View>
                            <Text style={styles.aboutcontentStyle}> {'Local Store'}</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: '2.5%' }}>
                            <Icon.FontAwesome name="phone" color="#5F6365" size={20} />
                            <Text style={styles.aboutcontentStyle}> {this.state.phone ? this.state.phone : null}</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: '2.5%' }}>
                            <Icon.FontAwesome name="facebook-square" color="#5F6365" size={20} />
                            <View style={{ width: 5 }}></View>
                            <Text style={styles.aboutcontentStyle}> {'Facebook'}</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: '2.5%' }}>
                            <Icon.FontAwesome name="whatsapp" color="#5F6365" size={20} />
                            <View style={{ width: 5 }}></View>
                            <Text style={styles.aboutcontentStyle}> {'WhatsApp'}</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: '2.5%' }}>
                            <Icon.FontAwesome name="instagram" color="#5F6365" size={20} />
                            <View style={{ width: 5 }}></View>
                            <Text style={styles.aboutcontentStyle}> {"Instagram"}</Text>
                        </View>
                    </View>
                    <Text style={styles.aboutTitleStyle}>{'Developed By'}</Text>
                    <View style={{ marginLeft: "2.5%" }}>
                        <Text style={styles.contacttype1}> {"Infinity Bits"}</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
