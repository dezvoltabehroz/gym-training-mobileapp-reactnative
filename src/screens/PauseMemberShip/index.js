import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import styles from './style';
import moment from "moment";
import Dot from '../../assets/svg/greydot.svg';
import Loading from '../../assets/svg/loading.svg';
import Tick from '../../assets/svg/tick.svg';
import { Input } from 'react-native-elements'
import StepIndicator from 'react-native-step-indicator';
import themeStyle from '../../assets/styles/theme.style';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements'
import buttonStyle from '../../components/Button/style';
import Modal from "react-native-modal";
import { Icon } from '../../components';
export default class PauseMemberShip extends Component {
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
            cancelRequest:false

        }
    }
    getStepIndicatorIconConfig = (
        position: number,
        stepStatus: string) => {
        switch (position) {
            case 0: {
                iconConfig.name = 'shopping-cart';
                break;
            }
            case 1: {
                iconConfig.name = 'location-on';
                break;
            }
            case 2: {
                iconConfig.name = 'assessment';
                break;
            }
            case 3: {
                iconConfig.name = 'payment';
                break;
            }
            case 4: {
                iconConfig.name = 'track-changes';
                break;
            }
            default: {
                break;
            }
        }
        return iconConfig;
    };

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

    renderStepIndicator = (params: any) => {
        if (params.position == 1 && params.stepStatus == "current") {
            return (
                <Loading height={25} width={25} />
            )
        }
        else if (params.position == 0 && params.stepStatus == "finished") {
            return (
                <Tick />
            )
        }
        else if (params.position == 2 && params.stepStatus == "unfinished") {
            return (
                <Dot height={30} width={30} />
            )
        }
        else {
            return null;
        }
    };
    renderLabel = (params: any) => {
        console.log(params.position, params.label, params.currentPosition)
        return (
            <View style={{ width: 70 }}>
                <Text
                    style={
                        params.position == 0
                            ? { fontSize: 12, color: themeStyle.PRIMARY_BACKGROUND_COLOR, fontFamily: "Montserrat-Medium", textAlign: "center" }
                            : { fontSize: 12, color: "#d3d3d3", fontFamily: "Montserrat-Medium", textAlign: "center" }
                    }
                >
                    {params.label}
                </Text>
            </View>

        );
    };


    render() {
        const secondIndicatorStyles = {
            stepIndicatorSize: 30,
            currentStepIndicatorSize: 30,
            separatorStrokeWidth: 2,
            currentStepStrokeWidth: 0,
            stepStrokeCurrentColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
            stepStrokeWidth: 1,
            separatorStrokeFinishedWidth: 4,
            stepStrokeFinishedColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
            stepStrokeUnFinishedColor: 'grey',
            separatorFinishedColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
            separatorUnFinishedColor: '#d3d3d3',
            stepIndicatorFinishedColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
            stepIndicatorUnFinishedColor: 'grey',
            stepIndicatorCurrentColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
            stepIndicatorLabelFontSize: 16,
            currentStepIndicatorLabelFontSize: 16,
            stepIndicatorLabelCurrentColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
            stepIndicatorLabelFinishedColor: '#d3d3d3',
            stepIndicatorLabelUnFinishedColor: '#d3d3d3',
            labelColor: '#d3d3d3',
            labelSize: 12,
            labelFontFamily: "Montserrat-Medium",
            currentStepLabelColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
        };
        const { item } = this.props.route.params;
        const { name, email, phone, memberId, memberShipType, validFrom, validTo, pauseAvailed, date, data } = this.state;
        return (
            <>
                <View style={styles.container}>
                    <View style={{ flex: 0.1, marginTop: "5%" }}>
                        <View style={styles.headingContainer}>
                            <View>
                                <Text style={styles.headingTextStyle}>Pause Membership</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 0.9, }}>
                        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                            <StepIndicator
                                stepCount={3}
                                customStyles={secondIndicatorStyles}
                                currentPosition={1}
                                renderLabel={this.renderLabel}
                                renderStepIndicator={this.renderStepIndicator}
                                labels={[
                                    'Pause Requested',
                                    'Admin Approval',
                                    'Pause Availed'
                                ]}
                            />
                            <View style={styles.memberShipContainer}>
                                <View style={styles.memberShipContentRowStyle}>
                                    <View >
                                        <Text style={styles.userDetailTextStyle}>{"Membership Type:"}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.userDetailTextStyle}>{item.memberShipType}</Text>
                                    </View>
                                </View>
                                <View style={styles.memberShipContentRowStyle}>
                                    <View >
                                        <Text style={styles.userDetailTextStyle}>{"Pause Duration:"}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.userDetailTextStyle}>{item.duration}</Text>
                                    </View>
                                </View>
                                <View style={styles.memberShipContentRowStyle}>
                                    <View >
                                        <Text style={styles.userDetailTextStyle}>{"Start Date:"}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.userDetailTextStyle}>{moment(item.startDate).format("MMM DD,YYYY")}</Text>
                                    </View>
                                </View>
                                <View style={styles.memberShipContentRowStyle}>
                                    <View >
                                        <Text style={styles.userDetailTextStyle}>{"End Date:"}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.userDetailTextStyle}>{moment(item.startDate).add(7, "days").format("MMM DD,YYYY")}</Text>
                                    </View>
                                </View>
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
                                <Button titleStyle={buttonStyle.colorBtnPrimaryText} buttonStyle={styles.colorBtnPrimary} title='Cancel Request ' onPress={() => this.setState({ cancelRequest: true })} />
                            </View>
                        </ScrollView>

                    </View>
                </View>
                <Modal isVisible={this.state.cancelRequest}>
                    <View style={{ backgroundColor: "white", borderRadius: 8, marginHorizontal: '2.5%', marginBottom: 2, }}>
                    <View style={{ marginHorizontal: "5%", marginTop: '5%', alignItems: "center",transform:[{ rotateY: '180deg' }] }}>
                            <Icon.Ionicons name={"ios-reload-circle-outline"} color={themeStyle.PRIMARY_BACKGROUND_COLOR} size={50} />
                        </View>
                        <View style={{ marginHorizontal: '5%', marginTop: '3.5%' }}>
                            <Text style={{ fontSize: 12, fontFamily: 'Montserrat-Medium', fontWeight: "normal", textAlign: "center", color: "#77777B" }} >Are you sure you want to cancel pasue request?</Text>
                        </View>

                        <View style={{ flexDirection: "row", marginTop: "5%", }}>
                            <TouchableOpacity onPress={() => this.setState({ cancelRequest: false })} style={{ flex: 1, height: 54, borderBottomLeftRadius: 8, alignItems: "center", justifyContent: "center", backgroundColor: "#77777B" }}>
                                <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Medium', fontWeight: "normal", textAlign: "center", color: "#FFF" }} >No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ flex: 1, height: 54, borderBottomRightRadius: 8, alignItems: "center", justifyContent: "center", backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR }}>
                                <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Medium', fontWeight: "normal", textAlign: "center", color: "#FFF" }} >Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </>
        )
    }
}