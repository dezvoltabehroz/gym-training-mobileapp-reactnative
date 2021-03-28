import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import styles from './style';
import CalendarStrip from 'react-native-calendar-strip';
import moment from "moment";
import { Icon, CustomSlider } from '../../components';
import DropDownPicker from 'react-native-dropdown-picker';
import themeStyle from '../../assets/styles/theme.style';
import Block from '../../assets/svg/block.svg';
import Modal from "react-native-modal"
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allslots: [{
                date: "2021-03-12",
                time: "11:00:00",
                slotTime: 20,
                gmt: "+1:00",
                bookedSlot: "1"
            },
            {
                date: "2021-03-13",
                time: "11:00:00",
                slotTime: 20,
                gmt: "+1:00",
                bookedSlot: "2"
            },
            {
                date: "2021-03-14",
                time: "11:00:00",
                slotTime: 20,
                gmt: "+1:00",
                bookedSlot: "3"
            },
            {
                date: "2021-03-15",
                time: "11:00:00",
                slotTime: 20,
                gmt: "+1:00",
                bookedSlot: "0"
            },
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
            }],
            availableSolts: [{
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
            }],
            selectedDate: "",
            date: new Date(),
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
            multiSliderValues: [4, 5],
        }
    }


    _renderSeparator = () => {
        return (
            <View style={{ height: 15 }}></View>
        )

    }

    _renderItems = (item, index) => {
        const time = moment().format("YYYY-MM-DD")
        return (
            <>

                <View style={{ marginHorizontal: '5%', }}>
                    {
                        index == 5 ?
                            <View style={[styles.contentContainer, { marginBottom: "5%", alignItems: "center" }]}>
                                <Text style={{ color: "#d3d3d3", fontSize: 25, fontFamily: "Montserrat-Medium" }}>Break</Text>
                                <Text style={{ color: "#d3d3d3", fontSize: 16, fontFamily: "Montserrat-Medium" }}>02:00pm to 04:00</Text>
                            </View>
                            : null
                    }
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
                            {
                                item.bookedSlot == "2" ?
                                    <View style={{ alignItems: "center", justifyContent: "center", marginRight: 15 }}>
                                        <Block />
                                        <Text style={styles.darkTextStyle}>Blocked</Text>
                                    </View>
                                    :
                                    item.bookedSlot == "0" ?
                                        <TouchableOpacity onPress={() => {
                                            let items = this.state.slots ? [...this.state.allslots] : [...this.state.availableSolts]
                                            items[index] = { ...items[index], bookedSlot: '1' };
                                            this.setState(this.state.slots ? { allslots: items } : { availableSolts: items })
                                        }} style={styles.buttonContainer}>
                                            <Text style={styles.darkTextStyle}>Book Slot</Text>
                                        </TouchableOpacity>
                                        :
                                        item.bookedSlot == "3" ?
                                            <TouchableOpacity disabled={true} style={[styles.buttonContainer, { backgroundColor: "#D3D3D3" }]}>
                                                <Text style={styles.darkTextStyle}>Unavailable</Text>
                                            </TouchableOpacity>
                                            : item.bookedSlot == "1" ?
                                                <TouchableOpacity onPress={() => this.setState({ unBookModal: true, item: item, index: index })} style={[styles.buttonContainer, { backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR, borderWidth: 0 }]}>
                                                    <Text style={[styles.darkTextStyle, { color: "white" }]}>Unbook</Text>
                                                </TouchableOpacity>
                                                : null
                            }
                        </View>

                    </View>
                </View>
            </>)
    }

    multiSliderValueCallback = (values) => {
        // debugger;
        console.log("values, =========>", values)
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
        const { item, index, date } = this.state;
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.upperContainer}>
                        <CalendarStrip
                            scrollable
                            calendarAnimation={{ type: 'sequence', duration: 30 }}
                            daySelectionAnimation={{ type: 'background', duration: 200, highlightColor: themeStyle.PRIMARY_BACKGROUND_COLOR }}
                            style={{ height: 100, paddingBottom: 10 }}
                            calendarHeaderStyle={{ color: 'black' }}
                            calendarColor={'#fffff'}
                            headerText={`${moment(date).format("MMMM")} (Week ${weekOfMonth} )\n${moment(date).format('dddd, DD MMM')} (9:00am - 6:00pm)`}
                            selectedDate={moment()}
                            // onDateSelected={(date) => { console.log(date); }}
                            dateNumberStyle={{ color: 'black', fontFamily: "Montserrat-Medium" }}
                            dateNameStyle={{ color: 'black', fontFamily: "Montserrat-Medium" }}
                            highlightDateNumberStyle={{ color: 'white' }}
                            highlightDateNameStyle={{ color: 'white' }}
                            disabledDateNameStyle={{ color: 'grey' }}
                            disabledDateNumberStyle={{ color: 'grey' }}
                            datesWhitelist={datesWhitelist}
                            // dayComponentHeight={40}
                            // datesBlacklist={datesBlacklist}
                            iconLeft={null}
                            iconRight={null}
                        // iconContainer={{ flex: 0.1 }}
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
                                max={12}
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
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={styles.darkTextStyle}>No slots available for today :(</Text>
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
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
                            <TouchableOpacity onPress={() => {
                                let items = this.state.slots ? [...this.state.allslots] : [...this.state.availableSolts]
                                items[index] = { ...items[index], bookedSlot: '0' };
                                this.setState(this.state.slots ? { allslots: items, unBookModal: false } : { availableSolts: items, unBookModal: false })
                            }} style={{ flex: 1, height: 54, borderBottomRightRadius: 8, alignItems: "center", justifyContent: "center", backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR }}>
                                <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Medium', fontWeight: "normal", textAlign: "center", color: "#FFF" }} >Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </>
        )
    }
}