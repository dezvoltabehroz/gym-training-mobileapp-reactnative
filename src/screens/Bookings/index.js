import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import THEME from '../../assets/styles/theme.style';
import styles from './style';
import moment from "moment";
import Modal from 'react-native-modal'
import SignOut from '../../assets/svg/signout.svg';
import { Icon } from '../../components';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default class Bookings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [
                {
                    date: "2021-03-12",
                    time: "11:00:00",
                    slotTime: 20,
                    gmt: "+1:00",
                    bookedSlot: "0"
                },
                {
                    date: "2021-03-13",
                    time: "11:00:00",
                    slotTime: 20,
                    gmt: "+1:00",
                    bookedSlot: "0"
                },
                {
                    date: "2021-03-14",
                    time: "11:00:00",
                    slotTime: 20,
                    gmt: "+1:00",
                    bookedSlot: "0"
                },
                {
                    date: "2021-03-15",
                    time: "11:00:00",
                    slotTime: 20,
                    gmt: "+1:00",
                    bookedSlot: "0"
                }
            ],
            unBookModal: false,
            item: null,
        }
    }

    _renderSeparator = () => {
        return (
            <View style={{ height: 15 }}></View>
        )

    }

    _renderItems = (item) => {
        const time = moment().format("YYYY-MM-DD")
        return (
            <View style={{ marginHorizontal: '5%', }}>
                <Text style={styles.timeTextStyle} >{moment(item.date).format('dddd, DD MMM')}</Text>
                <View style={styles.contentContainer}>
                    <View style={styles.contentRowStyle}>
                        <View>
                            <Text style={styles.timeTextStyle}>{moment(`${time} ${item.time}`).format("HH:mm a")}</Text>
                            <Text style={styles.timeTextStyle}>GMT{item.gmt}</Text>
                            <Text style={styles.darkTextStyle}>({item.slotTime}mins)</Text>
                        </View>
                        <View style={styles.bookingContainer}>
                            <Text style={[styles.textStyle, { textAlign: "center" }]}>{"No. of booking\non this slot"}</Text>
                            <Text style={styles.textStyle} >{item.bookedSlot} / 4</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.setState({ unBookModal: true, item: item })} style={styles.buttonContainer}>
                            <Text style={styles.darkTextStyle}>Unbook</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }

    render() {
        return (
            <>
                <View style={styles.container}>
                    <View style={{ flex: 0.1, marginTop: "5%" }}>
                        <View style={styles.headingContainer}>
                            <View>
                                <Text style={styles.headingTextStyle}>Bookings</Text>
                            </View>
                            <View>
                                <Text style={styles.dateTextStyle}>Jan 10 - Jan 16 (Week 3)</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 0.9, }}>
                        {/* <View style={styles.headingContainer}>
                        <View>
                            <Text style={styles.headingTextStyle}>Bookings</Text>
                        </View>
                        <View>
                            <Text style={styles.dateTextStyle}>Jan 10 - Jan 16 (Week 3)</Text>
                        </View>
                    </View> */}

                        {
                            this.state.bookings.length == 0 ?
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={styles.darkTextStyle}>No bookings at the moment :(</Text>
                                </View>
                                :
                                <FlatList
                                    contentContainerStyle={{ paddingBottom: 80 }}
                                    data={this.state.bookings}
                                    showsVerticalScrollIndicator={false}
                                    ItemSeparatorComponent={this._renderSeparator}
                                    renderItem={({ item }) => this._renderItems(item)}
                                    keyExtractor={item => item} />}
                    </View>

                </View>
                <Modal isVisible={this.state.unBookModal}>
                    <View style={{ backgroundColor: "white", borderRadius: 8, marginHorizontal: '2.5%', marginBottom: 2, }}>
                        <View style={{ marginHorizontal: "5%", marginTop: '5%', alignItems: "center" }}>
                            <Icon.Feather name={"x-circle"} color={THEME.PRIMARY_BACKGROUND_COLOR} size={50} />
                        </View>
                        <View style={{ marginHorizontal: '2.5%', marginTop: '3.5%' }}>
                            <Text style={{ fontSize: 12, fontFamily: 'Montserrat-Medium', fontWeight: "normal", textAlign: "center", color: "#77777B" }} >Are you sure you want to cancel booking?</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: "5%", }}>
                            <TouchableOpacity onPress={() => this.setState({ unBookModal: false })} style={{ flex: 1, height: 54, borderBottomLeftRadius: 8, alignItems: "center", justifyContent: "center", backgroundColor: "#77777B" }}>
                                <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Medium', fontWeight: "normal", textAlign: "center", color: "#FFF" }} >No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({ bookings: this.state.bookings.filter((item) => item != this.state.item), unBookModal: false })

                            }} style={{ flex: 1, height: 54, borderBottomRightRadius: 8, alignItems: "center", justifyContent: "center", backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR }}>
                                <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Medium', fontWeight: "normal", textAlign: "center", color: "#FFF" }} >Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </>)
    }
}