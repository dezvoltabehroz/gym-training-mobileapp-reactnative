import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './style';
import User from "../../assets/svg/user_image.svg"
import { Icon } from '../../components';
import buttonStyle from '../../components/Button/style';
import { Button, Input } from "react-native-elements";
import Modal from "react-native-modal";
import THEME from '../../assets/styles/theme.style';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import moment from "moment";
import Calender from '../../assets/svg/calenderTime.svg'
export default class MemberShip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "John Doe",
            email: "adress@gmail.com",
            phone: "+123456789",
            memberShipType: "Basic",
            memberId: "1234567890",
            validFrom: "01 / 21",
            validTo: "12 / 21",
            pauseAvailed: 1,
            pauseMemberShip: false,
            date: new Date(),
            selectedDuration: [
                {

                }
            ],
            data: [
                {
                    id: 1,
                    label: "1 Week",
                    value: "1 Week",
                },
                {
                    id: 2,
                    label: "2 Week",
                    value: "2 Week",
                },
                {
                    id: 3,
                    label: "3 Week",
                    value: "3 Week",
                },
                {
                    id: 4,
                    label: "4 Week",
                    value: "4 Week",
                }
            ]

        }
    }

    hideDatePicker = () => {
        this.setState({ showDatePicker: !this.state.showDatePicker });
    };

    handleConfirm = (selectedDate) => {
        console.log()
        var date = moment(selectedDate).format('YYYY-MM-DD')
        var dob = (selectedDate.getYear() + 1900);
        dob += "-";
        dob += (selectedDate.getMonth() + 1) < 10 ? "0" + (selectedDate.getMonth() + 1) : (selectedDate.getMonth() + 1);
        dob += "-";
        dob += selectedDate.getDate() < 10 ? "0" + selectedDate.getDate() : selectedDate.getDate();
        this.setState({
            date
        })
        this.hideDatePicker();
    };

    render() {
        const { name, email, phone, memberId, memberShipType, validFrom, validTo, pauseAvailed, date, data } = this.state;
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.memberShipContainer}>
                        <View style={styles.memberShipContentRowStyle}>
                            <View style={styles.memberShipContentRow}>
                                <View >
                                    <User />
                                </View>
                                <View style={{ marginLeft: 5 }}>
                                    <Text style={styles.userDetailTextStyle}>{name}</Text>
                                    <Text style={styles.userDetailTextStyle}>{email}</Text>
                                    <Text style={styles.userDetailTextStyle}>{phone}</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.memberShipTypeTextStyle}>{memberShipType}</Text>
                            </View>
                        </View>
                        <View style={styles.memberShipIdContainer}>
                            <Text style={styles.userDetailTextStyle}>Member ID : {memberId}</Text>
                        </View>
                        <View style={[styles.memberShipContentRowStyle, { marginTop: "5%" }]}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.validityTextStyle}>{"VALID\nFROM"}</Text>
                                <Text style={styles.userDetailTextStyle}>{validFrom}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.validityTextStyle}>{"VALID\nTHRU"}</Text>
                                <Text style={styles.userDetailTextStyle}>{validTo}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.pausedAvailedContainer}>
                        <View style={styles.memberShipContentRowStyle}>
                            <Text style={styles.userDetailTextStyle}>Paused Availed</Text>
                            <Text style={styles.userDetailTextStyle}>{pauseAvailed}</Text>
                        </View>

                    </View>
                    <View style={styles.pausedHistoryContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("PauseHistory")} style={styles.memberShipContentRowStyle}>
                            <Text style={styles.userDetailTextStyle}>Paused History</Text>
                            <Icon.Entypo name={"chevron-right"} size={20} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'flex-end', marginTop: '15%', marginHorizontal: "5%" }}>
                        <Button titleStyle={buttonStyle.colorBtnPrimaryText} buttonStyle={styles.colorBtnPrimary} title='Pause Membership ' onPress={() => this.setState({ pauseMemberShip: true })} />
                    </View>
                </View >
                <Modal isVisible={this.state.pauseMemberShip}>
                    <View style={{ backgroundColor: "white", borderRadius: 8, marginHorizontal: '2.5%', marginBottom: 2, }}>
                        <View style={{ marginTop: "5%", marginHorizontal: "5%", alignItems: "flex-end" }}>
                            <Icon.Entypo onPress={() => this.setState({ pauseMemberShip: false })} name="circle-with-cross" size={25} />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: "5%", marginTop: '5%', alignItems: "center" }}>
                            <View style={{ flex: 0.5, }}>
                                <Text style={styles.userTextStyle}>Start Date</Text>
                                <TouchableOpacity style={styles.dateContainer} onPress={() => this.setState({ showDatePicker: true })}>
                                    <Text style={styles.dateTextStyle} >{moment(date).format("MMM DD,YYYY")}</Text>
                                    <Calender />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: 15 }}></View>
                            <View style={{ flex: 0.5, }}>
                                <Text style={styles.userTextStyle}>Time Duration</Text>
                                <View>
                                    <DropDownPicker
                                        items={[
                                            {
                                                id: 1,
                                                label: "1 Week",
                                                value: "1 Week",
                                            },
                                            {
                                                id: 2,
                                                label: "2 Week",
                                                value: "2 Week",
                                            },
                                            {
                                                id: 3,
                                                label: "3 Week",
                                                value: "3 Week",
                                            },
                                            {
                                                id: 4,
                                                label: "4 Week",
                                                value: "4 Week",
                                            }
                                        ]}
                                        arrowColor="#d3d3d3"
                                        placeholder="Select week"
                                        globalTextStyle={{ color: "#d3d3d3", fontSize: 12, fontFamily: "Montserrat-Medium" }}
                                        defaultValue={this.state.selectedDuration ? this.state.selectedDuration.label : ""}
                                        containerStyle={{ height: 40 }}
                                        style={{ backgroundColor: 'white', marginTop: '5%' }}
                                        itemStyle={{
                                            justifyContent: 'center'
                                        }}
                                        dropDownStyle={{ backgroundColor: 'white' }}
                                        onChangeItem={(item) => this.setState({
                                            selectedDuration: item.value, item: item.value, index: item.value,
                                        })}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ marginHorizontal: '5%', marginTop: '3.5%' }}>
                            <Text style={{ fontSize: 12, fontFamily: 'Montserrat-Medium', fontWeight: "normal", }} >Any specific reason? (Required)</Text>
                            <View style={{ marginTop: "5%" }}>
                                <Input
                                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
                                    multiline={true}
                                    containerStyle={styles.containerStyle}
                                    placeholderTextColor={'#77777B'}
                                    inputContainerStyle={styles.inputContainerStyle}
                                    inputStyle={styles.inputStyle} />
                            </View>
                        </View>
                        <View style={{ alignItems: 'flex-end', marginTop: '5%', marginHorizontal: "5%", paddingBottom: '5%' }}>
                            <Button titleStyle={buttonStyle.colorBtnPrimaryText} buttonStyle={styles.colorBtnPrimary} title='Request Pause ' onPress={() => this.setState({ pauseMemberShip: true })} />
                        </View>
                    </View>
                </Modal>
                <DateTimePickerModal
                    isVisible={this.state.showDatePicker}
                    mode="date"
                    minimumDate={new Date()}
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                />
            </>
        )
    }
}