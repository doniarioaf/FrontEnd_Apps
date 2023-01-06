import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
const borderColor = 'black';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: 'black',
        // backgroundColor: '#3778C2',
        // color: '#fff',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    nosuratjalan: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    gudang: {
        width: '30%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    partai: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    nocontainer: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    tanggal: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    }

    //No Surat Jalan , Gudang , Tipe Partai, No Container , Tanggal Loading/Unloading
});

const ContainerTableHeader = (type) => (
    <View style={styles.container}>
        <Text style={styles.nosuratjalan}>No Surat Jalan</Text>
        <Text style={styles.gudang}>Gudang</Text>
        <Text style={styles.partai}>Partai</Text>
        <Text style={styles.nocontainer}>No Container</Text>
        <Text style={styles.tanggal}>Tanggal Load/Unload</Text>
    </View>
);

export default ContainerTableHeader;