

import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import styles from './style';
import { Icon } from '../../components'
import { ProfileServices } from '../../services';
import { connect } from 'react-redux';
import themeStyle from '../../assets/styles/theme.style';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            phone: "",
            website: "",
            developed_by: "",
            content: null,
            loading: true,
            facebookUrl: '',
            instaUrl: '',
        }
    }

    componentDidMount = () => {
        this.setState({ loading: true })
        ProfileServices.getAboutUs(this.props.user.userData.token)
            .then(res => {
                console.log(res.data)
                this.setState({
                    website: res.data.data.website,
                    city: res.data.data.city_country,
                    contents: res.data.data.content,
                    email: res.data.data.email,
                    facebookUrl: res.data.data.facebook,
                    instaUrl: res.data.data.instagram,
                    developed_by: res.data.data.developed_by,
                    phone: res.data.data.phone,
                    loading: false
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { facebookUrl, instaUrl } = this.state;
        return (
            <>
                {
                    this.state.loading ?
                        <View style={[styles.mainView, { justifyContent: "center", alignItems: "center" }]}>
                            <ActivityIndicator size={"small"} color={themeStyle} />
                        </View>
                        :
                        <View style={styles.mainView}>
                            <ScrollView >

                                <View style={styles.aboutcontentmainStyle}>

                                    <Text style={styles.aboutTitleStyle}>{'About Us'}</Text>
                                    <Text style={[styles.aboutcontentStyle, { marginHorizontal: 10 }]}>{this.state.contents}</Text>
                                    <Text style={styles.aboutTitleStyle}>{'Contact Us'}</Text>
                                    <View style={styles.contact}>
                                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: '2.5%' }}>
                                            <Icon.Entypo name="network" color="#5F6365" size={18} />
                                            <View style={{ width: 5 }}></View>
                                            <Text style={styles.aboutcontentStyle}>{this.state.website}</Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: '2.5%' }}>
                                            <Icon.FontAwesome5 name="map-marker-alt" color="#5F6365" size={20} />
                                            <View style={{ width: 5 }}></View>
                                            <Text style={styles.aboutcontentStyle}> {this.state.city}</Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: '2.5%' }}>
                                            <Icon.FontAwesome name="phone" color="#5F6365" size={20} />
                                            <Text style={styles.aboutcontentStyle}> {this.state.phone}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => {
                                            let url = 'fb://page/1797845333842406';
                                            Linking.openURL(url).then((data) => {
                                            }).catch(() => {
                                                Linking.openURL(facebookUrl)
                                            });
                                        }} style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: '2.5%' }}>
                                            <Icon.FontAwesome name="facebook-square" color="#5F6365" size={20} />
                                            <View style={{ width: 5 }}></View>
                                            <Text style={styles.aboutcontentStyle}> {'Facebook'}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            let msg = '';
                                            let phoneWithCountryCode = this.state.phone.split("+");
                                            let mobile = Platform.OS == 'ios' ? phoneWithCountryCode : this.state.phone;
                                            let url = 'whatsapp://send?text=' + msg + '&phone=' + mobile;
                                            Linking.openURL(url).then((data) => {
                                            }).catch(() => {
                                                alert('Make sure WhatsApp installed on your device');
                                            });
                                        }} style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: '2.5%' }}>
                                            <Icon.FontAwesome name="whatsapp" color="#5F6365" size={20} />
                                            <View style={{ width: 5 }}></View>
                                            <Text style={styles.aboutcontentStyle}> {'WhatsApp'}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            let url = 'instagram://user?username=educogymeccles'
                                            Linking.openURL(url).then((data) => {
                                            }).catch(() => {
                                                Linking.openURL(instaUrl)
                                            });
                                        }} style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: '2.5%' }}>
                                            <Icon.FontAwesome name="instagram" color="#5F6365" size={20} />
                                            <View style={{ width: 5 }}></View>
                                            <Text style={styles.aboutcontentStyle}> {"Instagram"}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.aboutTitleStyle}>{'Developed By'}</Text>
                                    <View style={{ marginLeft: "2.5%" }}>
                                        <Text style={styles.contacttype1}> {this.state.developed_by}</Text>
                                    </View>
                                </View>
                            </ScrollView>
                        </View >
                }
            </>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};
export default connect(mapStateToProps)(About)