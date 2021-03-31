import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './style';
import moment from "moment";
import { Icon } from '../../components';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
import { ProfileServices } from '../../services';
import THEME from '../../assets/styles/theme.style'

class PauseHistory extends Component {
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
            date: moment().format("MMM DD,YYYY"),
            pauseHistory: [
                {
                    memberShipType: "Basic",
                    startDate: "2021-03-23",
                    duration: "1 Week",
                    is_Processed: '1',
                    reason: ""
                },
                {
                    memberShipType: "Basic",
                    startDate: "2021-03-23",
                    duration: "1 Week",
                    is_Processed: '0',
                    reason: ""
                },
                {
                    memberShipType: "Basic",
                    startDate: "2021-03-23",
                    duration: "1 Week",
                    is_Processed: '1',
                    reason: ""
                },
                {
                    memberShipType: "Basic",
                    startDate: "2021-03-23",
                    duration: "1 Week",
                    is_Processed: '',
                    reason: ""
                },
                {
                    memberShipType: "Basic",
                    startDate: "2021-03-23",
                    duration: "1 Week",
                    is_Processed: '0',
                    reason: ""
                },
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
            ],
            loading: true,

        }
    }


    componentDidMount = () => {
        let userData = {
            id: this.props.user.userData.id,
            member_id: this.props.route.params.memberId,
            token: this.props.user.userData.token
        }
        ProfileServices.getPauseList(userData)
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        pauseHistory: response.data.data,
                        loading: false
                    })
                }
            })
            .catch((err) => console.log(err))
    }

    hideDatePicker = () => {
        this.setState({ showDatePicker: !this.state.showDatePicker });
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
    _renderSeparator = () => {
        return (
            <View style={{ height: 15 }}></View>
        )
    }

    _renderItems = (item) => {
        return (
            <View style={styles.memberShipContainer}>
                <View style={styles.memberShipContentRowStyle}>
                    <View >
                        <Text style={styles.userDetailTextStyle}>{"Membership Type:"}</Text>
                    </View>
                    <View>
                        <Text style={styles.userDetailTextStyle}>{item.membership_type}</Text>
                    </View>
                </View>
                <View style={styles.memberShipContentRowStyle}>
                    <View >
                        <Text style={styles.userDetailTextStyle}>{"Pause Duration:"}</Text>
                    </View>
                    <View>
                        <Text style={styles.userDetailTextStyle}>{Math.floor(item.days / 7)} Week</Text>
                    </View>
                </View>
                <View style={styles.memberShipContentRowStyle}>
                    <View >
                        <Text style={styles.userDetailTextStyle}>{"Start Date:"}</Text>
                    </View>
                    <View>
                        <Text style={styles.userDetailTextStyle}>{moment(item.pause_start).format("MMM DD,YYYY")}</Text>
                    </View>
                </View>
                <View style={styles.memberShipContentRowStyle}>
                    <View >
                        <Text style={styles.userDetailTextStyle}>{"End Date:"}</Text>
                    </View>
                    <View>
                        <Text style={styles.userDetailTextStyle}>{moment(item.pause_end).format("MMM DD,YYYY")}</Text>
                    </View>
                </View>
                {item.is_approved == "1" ?
                    null
                    :
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("PauseMemberShip", { item: item })} style={{ alignItems: 'center', justifyContent: "flex-end", flexDirection: "row", marginTop: '5%', }}>
                        <View>
                            <Text style={styles.userDetailTextStyle}>In Process</Text>
                        </View>
                        <View style={{ width: 10 }}>
                        </View>
                        <View>
                            <Icon.Entypo name="chevron-right" size={20} />
                        </View>
                    </TouchableOpacity>}
            </View>
        )
    }

    render() {
        const { name, email, phone, memberId, memberShipType, validFrom, validTo, pauseAvailed, date, loading } = this.state;
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
                                    <Text style={styles.headingTextStyle}>Pause History</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 0.9, }}>
                            {
                                this.state.pauseHistory.length == 0 ?
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={styles.darkTextStyle}>No pause history at the moment :(</Text>
                                    </View>
                                    :
                                    <FlatList
                                        contentContainerStyle={{ paddingBottom: 80 }}
                                        data={this.state.pauseHistory}
                                        showsVerticalScrollIndicator={false}
                                        ItemSeparatorComponent={this._renderSeparator}
                                        renderItem={({ item }) => this._renderItems(item)}
                                        keyExtractor={item => item} />}
                        </View>
                    </View>}
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
export default connect(mapStateToProps, mapDispatchToProps)(PauseHistory)