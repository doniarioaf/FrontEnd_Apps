import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#3778C2'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#3778C2',
        // backgroundColor: '#3778C2',
        // color: '#fff',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    description: {
        width: '60%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    amount: {
        width: '15%'
    },
    no: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    nocontainer: {
        width: '50%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    type: {
        width: '13%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    koli: {
        width: '13%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    kg: {
        width: '13%',
        borderRightColor: borderColor,
        // borderRightWidth: 1,
    },
});

const ContainerTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.no}>No</Text>
        <Text style={styles.nocontainer}>No Container</Text>
        <Text style={styles.type}>Type</Text>
        <Text style={styles.koli}>Koli</Text>
        <Text style={styles.kg}>Kg</Text>
    </View>
);

export default ContainerTableHeader;