import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Icon } from '..';

const Tabs = ({ tabs, active, onTabChange }) => {
    return (
        <View style={styles.container}>

            {
                tabs.map((tab, i) =>
                (
                    <React.Fragment key={i}>
                        <View
                            style={tabs.length == 2 ? [styles.innerContainer, { marginHorizontal: 40 }] : [styles.innerContainer, { marginHorizontal: 20 }]}
                        >
                            {
                                i == 0 && active == 0 || i == 1 && active == 1 || i == 2 && active == 2 || i == 0 && active == 2 || i == 0 && active == 1 || i == 1 && active == 2 ?
                                    <Icon.AntDesign name='checkcircle' color='#0DA7DF' size={15} />
                                    :
                                    i == 1 || i == 2 && active == 1 ?
                                        <Icon.Ionicons name='chevron-forward-circle-sharp' color='#7A7A7A' size={15} />
                                        : i == 2 && active == 0 ?
                                            <Icon.Ionicons name='chevron-forward-circle-sharp' color='#E2E2E2' size={15} />
                                            : null

                            }
                            <Text style={{
                                fontSize: 14, color:
                                    i == 0 && active == 0 || i == 1 && active == 1 || i == 2 && active == 2 || i == 0 && active == 2 || i == 0 && active == 1 || i == 1 && active == 2 ?
                                        '#0DA7DF'
                                        : i == 1 || i == 2 && active == 1 ?
                                            '#7A7A7A'
                                            : i == 2 ?
                                                '#B5B5B5'
                                                :
                                                null,
                                fontWeight: 'bold', marginLeft: '2%',fontFamily:'Montserrat-Medium'
                            }}>{tab}</Text>
                        </View>
                    </React.Fragment>
                ))
            }
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        height: 35,
        display: 'flex',
        flexDirection: 'row',
    },
    innerContainer: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'

    },

})

export default Tabs;
