import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import styles from './style';
import CalendarStrip from 'react-native-calendar-strip';
import moment from "moment";
import { Icon, CustomSlider } from '../../components';
import DropDownPicker from 'react-native-dropdown-picker';
import themeStyle from '../../assets/styles/theme.style';
import Block from '../../assets/svg/block.svg';
import Modal from "react-native-modal";
import THEME from '../../assets/styles/theme.style';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
import { BookingServices } from '../../services';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allslots: [],
            availableSolts: [],
            selectedDate: "",
            date: moment(),
            available: false,
            slots: true,
            selectedSlots: [{}],
            dropdownOpen: false,
            unBookModal: false,
            markedDatesArray: [
                {
                    date: new Date(),
                    dots: [
                        {
                            color: "white",
                            selectedColor: "white",

                        }
                    ],
                }
            ],
            multiSliderValues: [],
            hours: null,
            startingHour: 1,
            loading: true,
            bookingLoading: false,
            listloading: false
        }
    }

    componentDidMount = () => {
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
            date: moment().format("YYYY-MM-DD"),
            start_time: "",
            end_time: ""
        }
        BookingServices.getBookings(userData)
            .then((response) => {
                if (response.data.success) {
                    let arr = []
                    let array = [...response.data.data]
                    array.forEach(item => {
                        if (item.booked_slots != 4 && item.isBreak == false) {
                            arr.push(item)
                        }
                    })
                    this.setState({ allslots: response.data.data, availableSolts: arr, loading: false })
                }
            }).catch((err) => console.log(err))


    }

    _renderSeparator = () => {
        return (
            <View style={{ height: 15 }}></View>
        )

    }

    handleBookSlot = (item) => {
        this.setState({ bookingLoading: true })
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
            date: moment(this.state.date).format("yyyy-MM-DD"),
            booking_start_time: item.booking_start_time,
            booking_end_time: item.booking_end_time,
        }
        BookingServices.bookSlot(userData)
            .then((res) => {
                if (res.data.success) {
                    BookingServices.getBookings(userData)
                        .then((response) => {
                            if (response.data.success) {
                                let arr = []
                                let array = [...response.data.data]
                                array.forEach(item => {
                                    if (item.booked_slots != 4 && item.isBreak == false) {
                                        arr.push(item)
                                    }
                                })
                                this.setState({ allslots: response.data.data, availableSolts: arr, bookingLoading: false, item: null, index: null })
                            }
                        }).catch((err) => console.log(err))
                }
            })
            .catch((err) => { console.log(err) })
    }

    handleUnbookSlot = () => {
        this.setState({ bookingLoading: true })
        var { item } = this.state
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
            date: moment(this.state.date).format("yyyy-MM-DD"),
            booking_start_time: item.booking_start_time,
            booking_end_time: item.booking_end_time
        }
        BookingServices.unBookSlot(userData)
            .then((res) => {
                if (res.data.success) {
                    BookingServices.getBookings(userData)
                        .then((response) => {
                            if (response.data.success) {
                                let arr = []
                                let array = [...response.data.data]
                                array.forEach(item => {
                                    if (item.booked_slots != 4 && item.isBreak == false) {
                                        arr.push(item)
                                    }
                                })
                                this.setState({ allslots: response.data.data, availableSolts: arr, unBookModal: false, bookingLoading: false, item: null, index: null })
                            }
                        }).catch((err) => console.log(err))
                }
            })
            .catch((err) => {

            })
    }

    _renderItems = (item, index) => {
        const time = moment().format("YYYY-MM-DD")
        return (
            <>

                <View style={{ marginHorizontal: '5%', }}>
                    {
                        item.isBreak ?
                            <View style={[styles.contentContainer, { marginBottom: "5%", alignItems: "center" }]}>
                                <Text style={{ color: "#d3d3d3", fontSize: 25, fontFamily: "Montserrat-Medium" }}>Break</Text>
                                <Text style={{ color: "#d3d3d3", fontSize: 16, fontFamily: "Montserrat-Medium" }}>{moment(`${time} ${item.booking_start_time}`).format("hh:mm a")} to {moment(`${time} ${item.booking_end_time}`).format("hh:mm a")}</Text>
                            </View>
                            :
                            <View style={styles.contentContainer}>
                                <View style={styles.contentRowStyle}>
                                    <View>
                                        <Text style={styles.timeTextStyle}>{moment(`${time} ${item.booking_start_time}`).format("hh:mm a")}</Text>
                                        <Text style={styles.timeTextStyle}>GMT+1:00</Text>
                                        <Text style={styles.darkTextStyle}>({moment(`${time} ${item.booking_time_duration}`).format("mm")}mins)</Text>
                                    </View>
                                    <View style={styles.bookingContainer}>
                                        <Text style={[styles.textStyle, { textAlign: "center" }]}>{"No. of booking\non this slot"}</Text>
                                        <Text style={styles.textStyle} >{item.booked_slots} / 4</Text>
                                    </View>
                                    {
                                        item.is_blocked == "1" ?
                                            <View style={{ alignItems: "center", justifyContent: "center", marginRight: 15 }}>
                                                <Block />
                                                <Text style={styles.darkTextStyle}>Blocked</Text>
                                            </View>
                                            :
                                            item.is_booked == "0" ?
                                                <TouchableOpacity onPress={() => this.handleBookSlot(item)} style={styles.buttonContainer}>
                                                    <Text style={styles.darkTextStyle}>Book Slot</Text>
                                                </TouchableOpacity>
                                                : item.is_unavailable == "1" ?
                                                    <TouchableOpacity disabled={true} style={[styles.buttonContainer, { backgroundColor: "#D3D3D3" }]}>
                                                        <Text style={styles.darkTextStyle}>Unavailable</Text>
                                                    </TouchableOpacity>
                                                    : item.is_booked == "1" ?
                                                        <TouchableOpacity onPress={() => this.setState({ unBookModal: true, item: item, index: index })} style={[styles.buttonContainer, { backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR, borderWidth: 0 }]}>
                                                            <Text style={[styles.darkTextStyle, { color: "white" }]}>Unbook</Text>
                                                        </TouchableOpacity>
                                                        : null
                                    }
                                </View>

                            </View>
                    }

                </View>
            </>)
    }


    multiSliderValueCallback = (values) => {
        this.setState({ listloading: true })
        const time = moment().format("YYYY-MM-DD")
        console.log("values, =========>", values)
        var now = moment(`${time} 09:00:00`); //todays date
        var end = moment(`${time} 18:00:00`);
        console.log(end)
        var duration = moment.duration(end.diff(now));
        var hours = duration.asHours();
        console.log(duration)
        console.log(hours)
        console.log(moment(now.add('hour', values[0])).format("HH:mm:ss"))
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
            date: moment().format("YYYY-MM-DD"),
            start_time: moment(now.add('hour', values[0])).format("HH:mm:ss"),
            end_time: hours == values[1] ? moment(end).format("HH:mm:ss") : moment(end.subtract('hour', (hours - values[1]))).format("HH:mm:ss")
        }
        console.log(userData)
        BookingServices.getBookings(userData)
            .then((response) => {
                if (response.data.success) {
                    let arr = []
                    let array = [...response.data.data]
                    array.forEach(item => {
                        if (item.booked_slots != 4 && item.isBreak == false) {
                            arr.push(item)
                        }
                    })
                    this.setState({ allslots: response.data.data, availableSolts: arr, listloading: false })
                }
            }).catch((err) => console.log(err))
        this.setState({ multiSliderValues: values })
    }

    render() {
        let datesWhitelist = [{
            start: moment(),
            end: moment().add(3, 'months')  // total 4 days enabled
        }];
        var d = new Date();
        var dated = d.getDate();
        var dayd = d.getDay();

        var weekOfMonth = Math.ceil((dated + 6 - dayd) / 7);
        const time = moment().format("YYYY-MM-DD")
        var now = moment(`${time} 09:00:00`); //todays date
        var end = moment(`${time} 18:00:00`);
        var duration = moment.duration(end.diff(now));
        var hours = duration.asHours();
        console.log(hours)
        const { item, index, date, startingHour, loading, listloading } = this.state;
        return (
            <>
                { loading ?
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size={30} color={THEME.PRIMARY_BACKGROUND_COLOR} />
                    </View>
                    :
                    <View style={styles.container}>
                        <View style={styles.upperContainer}>
                            <CalendarStrip
                                scrollable
                                ref={(ref) => (this.ref = ref)}
                                // calendarAnimation={{ type: 'sequence', duration: 30 }}
                                daySelectionAnimation={{ type: 'background', duration: 200, highlightColor: themeStyle.PRIMARY_BACKGROUND_COLOR }}
                                style={{ height: 100, paddingBottom: 10 }}
                                calendarHeaderStyle={{ color: 'black' }}
                                calendarColor={'#fffff'}
                                headerText={`${moment(date).format("MMMM")} (Week ${weekOfMonth} )\n${moment(date).format('dddd, DD MMM')} (9:00am - 6:00pm)`}
                                selectedDate={date}
                                onDateSelected={(date) => {
                                    this.setState({ listloading: true, date, multiSliderValues: [] }, () => {
                                        let userData = {
                                            id: this.props.user.userData.id,
                                            token: this.props.user.userData.token,
                                            date: moment(date).format("YYYY-MM-DD"),
                                            start_time: "",
                                            end_time: ""
                                        }
                                        BookingServices.getBookings(userData)
                                            .then((response) => {
                                                if (response.data.success) {
                                                    this.setState({ allslots: response.data.data, listloading: false })
                                                }
                                            }).catch((err) => {
                                                console.log('err', err)
                                                this.setState({ allslots: [], listloading: false })
                                            })
                                    })
                                }}
                                dateNumberStyle={{ color: 'black', fontFamily: "Montserrat-Medium" }}
                                dateNameStyle={{ color: 'black', fontFamily: "Montserrat-Medium" }}
                                highlightDateNumberStyle={{ color: 'white' }}
                                highlightDateNameStyle={{ color: 'white' }}
                                disabledDateNameStyle={{ color: 'grey' }}
                                disabledDateNumberStyle={{ color: 'grey' }}
                                datesWhitelist={datesWhitelist}
                                iconLeft={null}
                                iconRight={null}
                            />
                            <View style={styles.headingContainer}>
                                <View>
                                    <Text style={[styles.headingTextStyle, { fontFamily: "Montserrat-Medium" }]}>09:00am GTM+01</Text>
                                </View>
                                <View>
                                    <Text style={[styles.headingTextStyle, { fontFamily: "Montserrat-Medium" }]}>6:00pm GTM+01</Text>
                                </View>
                            </View>
                            <View >
                                <CustomSlider
                                    min={1}
                                    max={hours}
                                    // resetValue={(reset,Va)}
                                    LRpadding={40}
                                    callback={this.multiSliderValueCallback}
                                    single={false}
                                />
                            </View>
                        </View>


                        <View style={styles.headingContainer}>
                            <View>
                                <Text style={styles.headingTextStyle}>Booking Slots</Text>
                            </View>
                            <View>
                                <DropDownPicker
                                    items={[
                                        {
                                            id: 1,
                                            label: "All Slots",
                                            value: "All Slots",
                                        },
                                        {
                                            id: 2,
                                            label: "Available Slots",
                                            value: "Available Slots",
                                        }
                                    ]}
                                    arrowColor="#d3d3d3"
                                    placeholder="All slots"
                                    onClose={() => this.setState({ dropdownOpen: false })}
                                    onOpen={() => this.setState({ dropdownOpen: true })}
                                    containerStyle={{ height: 40, width: 140, marginBottom: this.state.dropdownOpen ? '50%' : 0 }}
                                    globalTextStyle={{ color: "#000000", fontSize: 12, fontFamily: "Montserrat-Medium" }}
                                    defaultValue={this.state.selectedSlots ? this.state.selectedSlots.label : ""}
                                    style={{ backgroundColor: 'white', marginTop: '5%' }}
                                    itemStyle={{
                                        justifyContent: 'center'
                                    }}
                                    dropDownStyle={{ backgroundColor: 'white' }}
                                    onChangeItem={(item) => this.setState({
                                        selectedSlots: item.value, available: item.id == 2 ? true : false, slots: item.id == 1 ? true : false,
                                    })}
                                />
                            </View>
                        </View>
                        <ScrollView >
                            <View style={{ paddingBottom: 10 }}>


                                {this.state.slots ?
                                    this.state.allslots.length == 0 ?
                                        <View style={{ marginTop: "40%", justifyContent: "center", alignItems: "center" }}>
                                            <Text style={styles.darkTextStyle}>No slots available for today :(</Text>
                                        </View>
                                        :
                                        listloading ?
                                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                                <ActivityIndicator size={30} color={THEME.PRIMARY_BACKGROUND_COLOR} />
                                            </View>
                                            :
                                            <FlatList
                                                data={this.state.allslots}
                                                showsVerticalScrollIndicator={false}
                                                ItemSeparatorComponent={this._renderSeparator}
                                                renderItem={({ item, index }) => this._renderItems(item, index)}
                                                keyExtractor={item => item} /> :
                                    null}
                                {this.state.available ?
                                    this.state.availableSolts.length == 0 ?
                                        <View style={{ marginTop: "40%", justifyContent: "center", alignItems: "center" }}>
                                            <Text style={styles.darkTextStyle}>No slots available for today :(</Text>
                                        </View>
                                        :
                                        <FlatList
                                            data={this.state.availableSolts}
                                            showsVerticalScrollIndicator={false}
                                            ItemSeparatorComponent={this._renderSeparator}
                                            renderItem={({ item, index }) => this._renderItems(item, index)}
                                            keyExtractor={item => item} /> :
                                    null}
                            </View>
                        </ScrollView>

                    </View>
                }
                <Modal isVisible={this.state.unBookModal}>
                    <View style={{ backgroundColor: "white", borderRadius: 8, marginHorizontal: '2.5%', marginBottom: 2, }}>
                        <View style={{ marginHorizontal: "5%", marginTop: '5%', alignItems: "center" }}>
                            <Icon.Feather name={"x-circle"} color={themeStyle.PRIMARY_BACKGROUND_COLOR} size={50} />
                        </View>
                        <View style={{ marginHorizontal: '2.5%', marginTop: '3.5%' }}>
                            <Text style={{ fontSize: 12, fontFamily: 'Montserrat-Medium', fontWeight: "normal", textAlign: "center", color: "#77777B" }} >Are you sure you want to cancel booking?</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: "5%", }}>
                            <TouchableOpacity onPress={() => this.setState({ unBookModal: false })} style={{ flex: 1, height: 54, borderBottomLeftRadius: 8, alignItems: "center", justifyContent: "center", backgroundColor: "#77777B" }}>
                                <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Medium', fontWeight: "normal", textAlign: "center", color: "#FFF" }} >No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleUnbookSlot()} style={{ flex: 1, height: 54, borderBottomRightRadius: 8, alignItems: "center", justifyContent: "center", backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR }}>
                                <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Medium', fontWeight: "normal", textAlign: "center", color: "#FFF" }} >Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.state.bookingLoading}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size={60} color={THEME.PRIMARY_BACKGROUND_COLOR} />
                    </View>
                </Modal>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(authActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)