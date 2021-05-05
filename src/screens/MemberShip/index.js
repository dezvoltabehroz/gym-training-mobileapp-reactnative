import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
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
import Calender from '../../assets/svg/calenderTime.svg';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
import { ProfileServices } from '../../services';
class MemberShip extends Component {
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
            loading: true,
            selectedDuration: [
                {

                }
            ],
            data: [
                {
                    id: 1,
                    label: "1 Week",
                    value: "1",
                },
                {
                    id: 2,
                    label: "2 Week",
                    value: "2",
                },
                {
                    id: 3,
                    label: "3 Week",
                    value: "3",
                },
                {
                    id: 4,
                    label: "4 Week",
                    value: "4",
                }
            ],
            reason: "",
            buttonLoading: false,
            dropdownOpen: false

        }
    }

    componentDidMount = () => {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.getMemberShipDetail()
        });
        this.getMemberShipDetail()
    }

    getMemberShipDetail = () => {
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token
        }
        ProfileServices.getMemberShipDetails(userData)
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        name: response.data.data.full_name,
                        email: response.data.data.email,
                        phone: response.data.data.phone,
                        memberShipType: response.data.data.membership_type,
                        memberId: response.data.data.member_id,
                        validFrom: moment(response.data.data.membership_start_date).format("YY / MM"),
                        validTo: moment(response.data.data.membership_end_date).format("YY / MM"),
                        pauseAvailed: response.data.data.pause_count,
                        loading: false
                    })
                }
            }).catch((err) => console.log(err))

    }

    hideDatePicker = () => {
        this.setState({ showDatePicker: !this.state.showDatePicker, });
    };

    handleConfirm = (selectedDate) => {
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

    handleRequestPause = () => {
        this.setState({ buttonLoading: true })
        const { date, selectedDuration, reason, memberId } = this.state;
        // if(date&&selectedDuration&&reason&&memberId){

        // }
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
            start_date: moment(date).format('YYYY-MM-DD'),
            end_date:
                selectedDuration.value == "1 Week" ? moment(date).add(6, "days").format('YYYY-MM-DD')
                    : selectedDuration.value == "2 Week" ? moment(date).add(13, "days").format('YYYY-MM-DD')
                        : selectedDuration.value == "3 Week" ? moment(date).add(20, "days").format('YYYY-MM-DD')
                            : selectedDuration.value == "4 Week" ? moment(date).add(27, "days").format('YYYY-MM-DD') :
                                moment(date).add(7, "days").format('YYYY-MM-DD'),
            reason: reason,
            member_id: memberId
        }
        ProfileServices.requestPauseMembership(userData)
            .then((res) => {
                if (res.data.success) {
                    this.componentDidMount();
                    this.setState({ reason: "", date: new Date(), selectedDuration: [{}], pauseMemberShip: false, buttonLoading: false })
                }else{
                    this.setState({pauseMemberShip: false, buttonLoading: false});
                    Alert.alert(res.data.message);

                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        var from = moment().format('YYYY-MM-DD')
        var d = new Date(from);
        d.setMonth(d.getMonth() + 1);
        const { name, email, phone, memberId, memberShipType, validFrom, validTo, pauseAvailed, date, loading, reason, selectedDuration, buttonLoading } = this.state;
        return (
            <>
                {
                    loading ?
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <ActivityIndicator size={30} color={THEME.PRIMARY_BACKGROUND_COLOR} />
                        </View>
                        :
                        <View style={styles.container}>
                            {
                                this.state.pauseMemberShip ?
                                    <View style={{ backgroundColor: "white", borderRadius: 8, marginTop: "10%", marginHorizontal: '2.5%', marginBottom: 2, }}>
                                        <View style={{ marginTop: "5%", marginHorizontal: "5%", alignItems: "flex-end" }}>
                                            <Icon.Entypo onPress={() => this.setState({ reason: "", date: new Date(), selectedDuration: [{}], pauseMemberShip: false, buttonLoading: false, dropdownOpen: false })} name="circle-with-cross" size={25} />
                                        </View>
                                        <View style={{ flexDirection: "row", marginBottom: this.state.dropdownOpen ? "35%" : 0, justifyContent: "space-between", marginHorizontal: "5%", marginTop: '5%', alignItems: "center" }}>
                                            <View style={{ flex: 0.5 }}>
                                                <Text style={styles.userTextStyle}>Start Date</Text>
                                                <TouchableOpacity style={styles.dateContainer} onPress={() => this.setState({ showDatePicker: true })}>
                                                    <Text style={styles.dateTextStyle} >{moment(date).format("MMM DD,YYYY")}</Text>
                                                    <Calender />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ width: 15 }}></View>
                                            <View style={{ flex: 0.5, }}>
                                                <Text style={styles.userTextStyle}>Time Duration</Text>
                                                <View style={{ flexWrap: "wrap" }}>
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
                                                        arrowColor="#000000"
                                                        placeholder="Select week"
                                                        onClose={() => this.setState({ dropdownOpen: false })}
                                                        onOpen={() => this.setState({ dropdownOpen: true })}
                                                        containerStyle={{ height: 40, width: 140, }}
                                                        globalTextStyle={{ color: "#000000", fontSize: 12, fontFamily: "Montserrat-Medium" }}
                                                        defaultValue={this.state.selectedDuration ? this.state.selectedDuration.label : ""}
                                                        // containerStyle={{ height: 40 }}
                                                        style={{ backgroundColor: 'white', marginTop: '5%' }}
                                                        itemStyle={{
                                                            justifyContent: 'center'
                                                        }}
                                                        dropDownStyle={{ backgroundColor: 'white' }}
                                                        onChangeItem={(item) => {
                                                            this.setState({
                                                                selectedDuration: item, item: item.value, index: item.value,
                                                            })
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ marginHorizontal: '5%', marginTop: '3.5%' }}>
                                            <Text style={{ fontSize: 12, fontFamily: 'Montserrat-Medium', fontWeight: "normal", }} >Any specific reason? (Required)</Text>
                                            <View style={{ marginTop: "5%" }}>
                                                <Input
                                                    placeholder="Input text here"
                                                    multiline={true}
                                                    value={reason}
                                                    containerStyle={styles.containerStyle}
                                                    placeholderTextColor={'#77777B'}
                                                    onChangeText={(reason) => this.setState({ reason })}
                                                    inputContainerStyle={styles.inputContainerStyle}
                                                    inputStyle={styles.inputStyle} />
                                            </View>
                                        </View>
                                        <View style={{ alignItems: 'flex-end', marginTop: '5%', marginHorizontal: "5%", paddingBottom: '5%' }}>
                                            <Button disabled={reason && selectedDuration.value && date ? false : true} titleStyle={buttonStyle.colorBtnPrimaryText} buttonStyle={styles.colorBtnPrimary} title='Request Pause ' onPress={() => this.handleRequestPause()} />
                                        </View>
                                    </View>
                                    :
                                    <>
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
                                                <Text style={styles.userDetailTextStyle}>Pauses Availed</Text>
                                                <Text style={styles.userDetailTextStyle}>{pauseAvailed}</Text>
                                            </View>

                                        </View>
                                        <View style={styles.pausedHistoryContainer}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate("PauseHistory", { memberId })} style={styles.memberShipContentRowStyle}>
                                                <Text style={styles.userDetailTextStyle}>Pause History</Text>
                                                <Icon.Entypo name={"chevron-right"} size={20} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ alignItems: 'flex-end', marginTop: '15%', marginHorizontal: "5%" }}>
                                            <Button titleStyle={buttonStyle.colorBtnPrimaryText} buttonStyle={styles.colorBtnPrimary} title='Pause Membership ' onPress={() => this.setState({ pauseMemberShip: true })} />
                                        </View>
                                    </>
                            }
                        </View>
                        /* <View style={styles.memberShipContainer}>
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
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("PauseHistory", { memberId })} style={styles.memberShipContentRowStyle}>
                                <Text style={styles.userDetailTextStyle}>Paused History</Text>
                                <Icon.Entypo name={"chevron-right"} size={20} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'flex-end', marginTop: '15%', marginHorizontal: "5%" }}>
                            <Button titleStyle={buttonStyle.colorBtnPrimaryText} buttonStyle={styles.colorBtnPrimary} title='Pause Membership ' onPress={() => this.setState({ pauseMemberShip: true })} />
                        </View>
                    </View >}
                <Modal visible={this.state.pauseMemberShip}>
                    <View style={{ backgroundColor: "white", borderRadius: 8, marginHorizontal: '2.5%', marginBottom: 2, }}>
                        <View style={{ marginTop: "5%", marginHorizontal: "5%", alignItems: "flex-end" }}>
                            <Icon.Entypo onPress={() => this.setState({ reason: "", date: new Date(), selectedDuration: [{}], pauseMemberShip: false, buttonLoading: false })} name="circle-with-cross" size={25} />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: "5%", marginTop: '5%', alignItems: "center" }}>
                            <View style={{ flex: 0.5, }}>
                                <Text style={styles.userTextStyle}>Start Date</Text>
                                <TouchableOpacity style={styles.dateContainer} onPress={() => this.setState({ pauseMemberShip: false, showDatePicker: true })}>
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
                                        arrowColor="#000000"
                                        placeholder="Select week"
                                        onClose={() => this.setState({ dropdownOpen: false })}
                                        onOpen={() => this.setState({ dropdownOpen: true })}
                                        containerStyle={{ height: 40, width: 140, marginBottom: this.state.dropdownOpen ? '50%' : 0 }}
                                        globalTextStyle={{ color: "#000000", fontSize: 12, fontFamily: "Montserrat-Medium" }}
                                        defaultValue={this.state.selectedDuration ? this.state.selectedDuration.label : ""}
                                        // containerStyle={{ height: 40 }}
                                        style={{ backgroundColor: 'white', marginTop: '5%' }}
                                        itemStyle={{
                                            justifyContent: 'center'
                                        }}
                                        dropDownStyle={{ backgroundColor: 'white' }}
                                        onChangeItem={(item) => {
                                            this.setState({
                                                selectedDuration: item, item: item.value, index: item.value,
                                            })
                                        }}
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
                                    value={reason}
                                    containerStyle={styles.containerStyle}
                                    placeholderTextColor={'#77777B'}
                                    onChangeText={(reason) => this.setState({ reason })}
                                    inputContainerStyle={styles.inputContainerStyle}
                                    inputStyle={styles.inputStyle} />
                            </View>
                        </View>
                        <View style={{ alignItems: 'flex-end', marginTop: '5%', marginHorizontal: "5%", paddingBottom: '5%' }}>
                            <Button loading={buttonLoading} disabled={reason && selectedDuration.value && date ? false : true} titleStyle={buttonStyle.colorBtnPrimaryText} buttonStyle={styles.colorBtnPrimary} title='Request Pause ' onPress={() => this.handleRequestPause()} />
                        </View>
                    </View>
                </Modal> */}
                <Modal isVisible={buttonLoading}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size={30} color={THEME.PRIMARY_BACKGROUND_COLOR} />
                    </View>
                </Modal>
                <DateTimePickerModal
                    isVisible={this.state.showDatePicker}
                    mode="date"
                    minimumDate={new Date()}
                    maximumDate={d}
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                />
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
        authActions: bindActionCreators(authActions, dispatch),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(MemberShip)