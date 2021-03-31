import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import THEME from '../../assets/styles/theme.style';
import styles from './style';
import moment from "moment";
import Modal from 'react-native-modal'
import SignOut from '../../assets/svg/signout.svg';
import { Icon } from '../../components';
import { ProfileServices } from '../../services';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
import { ActivityIndicator } from 'react-native';

class Bookings extends Component {
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
            loading: true,
            buttonLoading: false
        }
    }

    componentDidMount = () => {
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token
        }
        ProfileServices.getlistAllBookings(userData)
            .then((response) => {
                if (response.data.success) {
                    this.setState({ bookings: response.data.data, loading: false })
                }
                else {
                    this.setState({ bookings: [], loading: false })
                }
            })
            .catch((err) => { console.log(err); this.setState({ bookings: [], loading: false }) })
    }

    _renderSeparator = () => {
        return (
            <View style={{ height: 15 }}></View>
        )

    }

    _renderItems = (item) => {
        console.log(item)
        const time = moment().format("YYYY-MM-DD")
        return (
            <View style={{ marginHorizontal: '5%', }}>
                <Text style={styles.timeTextStyle} >{moment(item.booking_date).format('dddd, DD MMM')}</Text>
                <View style={styles.contentContainer}>
                    <View style={styles.contentRowStyle}>
                        <View>
                            <Text style={styles.timeTextStyle}>{moment(`${time} ${item.booking_start_time}`).format("HH:mm a")}</Text>
                            <Text style={styles.timeTextStyle}>GMT{"+1:00"}</Text>
                            <Text style={styles.darkTextStyle}>({moment.duration(`${item.booking_time_duration}`).asMinutes()}mins)</Text>
                        </View>
                        <View style={styles.bookingContainer}>
                            <Text style={[styles.textStyle, { textAlign: "center" }]}>{"No. of booking\non this slot"}</Text>
                            <Text style={styles.textStyle} >{item.booked_slots} / 4</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.setState({ unBookModal: true, item: item })} style={styles.buttonContainer}>
                            <Text style={styles.darkTextStyle}>Unbook</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }

    handleCancelBooking = () => {
        this.setState({ buttonLoading: true })
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
            booking_id: this.state.item.id
        }
        ProfileServices.cancelBookings(userData)
            .then((response) => {
                if (response.data.success) {
                    this.setState({ bookings: this.state.bookings.filter((item) => item != this.state.item), buttonLoading: false, unBookModal: false, item: null })
                }
            })

    }

    render() {
        const { loading, buttonLoading } = this.state;
        var d = new Date();
        var dated = d.getDate();
        var dayd = d.getDay();

        var weekOfMonth = Math.ceil((dated + 6 - dayd) / 7);
        var startOfWeek = moment().startOf('week').toDate();
        var endOfWeek = moment().endOf('week').toDate();
        return (
            <>
                { loading ?
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size={30} color={THEME.PRIMARY_BACKGROUND_COLOR} />
                    </View>
                    :
                    <View style={styles.container}>
                        <View style={{ flex: 0.1, marginTop: "5%" }}>
                            <View style={styles.headingContainer}>
                                <View>
                                    <Text style={styles.headingTextStyle}>Bookings</Text>
                                </View>
                                <View>
                                    <Text style={styles.dateTextStyle}>{moment(startOfWeek).format('MMM DD')} - {moment(endOfWeek).format('MMM DD')} (Week {weekOfMonth})</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 0.9,paddingBottom: 80 }}>
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
                }
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
                            <TouchableOpacity onPress={() => { this.handleCancelBooking() }}
                                style={{ flex: 1, height: 54, borderBottomRightRadius: 8, alignItems: "center", justifyContent: "center", backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR }}>
                                {buttonLoading ? <ActivityIndicator color={"white"} /> : <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Medium', fontWeight: "normal", textAlign: "center", color: "#FFF" }} >Yes</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </>)
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Bookings)