import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#3778C2'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#3778C2',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
        flexGrow: 1,
    },
    description: {
        width: '60%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    amount: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
    no: {
        width: '10%',
        textAlign: 'center',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        // paddingLeft: 8,
    },
    nocontainer: {
        width: '50%',
        textAlign: 'center',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    type: {
        width: '13%',
        textAlign: 'center',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    koli: {
        width: '13%',
        textAlign: 'center',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    kg: {
        width: '13%',
        textAlign: 'center',
        // borderRightColor: borderColor,
        // borderRightWidth: 1,
        paddingLeft: 8,
    },
});

const ContainerTableItemsValue = ({ items }) => {
    const rows = items.map(item =>
        <View style={styles.row} key={item.no}>
            <Text style={styles.no}>{item.no}</Text>
            <Text style={styles.nocontainer}>{item.nocontainer}</Text>
            <Text style={styles.type}>{item.type}</Text>
            <Text style={styles.koli}>{item.koli}</Text>
            <Text style={styles.kg}>{item.kg}</Text>
        </View>
    );
    return (<Fragment>{rows}</Fragment>)
};

export default ContainerTableItemsValue;