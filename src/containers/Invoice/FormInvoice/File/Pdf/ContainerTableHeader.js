import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
// const borderColor = '#3778C2';
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
    no: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    jasa: {
        width: '35%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    discjasa: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    hargajasa: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    subtotaljasa: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    reimbursement: {
        width: '35%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    discreimbursement: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    hargareimbursement: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    subtotalreimbursement: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
});

const setHeader = (type) =>{
    let list = [];
    console.log('setHeader ',type);
    if(type.type == 'JASA'){
        list.push(<Text style={styles.no}>No</Text>);
        list.push(<Text style={styles.jasa}>Jasa PPJK</Text>);
        list.push(<Text style={styles.discjasa}>Disc</Text>);
        list.push(<Text style={styles.hargajasa}>Harga</Text>);
        list.push(<Text style={styles.subtotaljasa}>Subtotal</Text>);
    }else{
        list.push(<Text style={styles.no}>No</Text>);
        list.push(<Text style={styles.reimbursement}>Reimbursement / Dana Talangan</Text>);
        list.push(<Text style={styles.discreimbursement}>Disc</Text>);
        list.push(<Text style={styles.hargareimbursement}>Harga</Text>);
        list.push(<Text style={styles.subtotalreimbursement}>Subtotal</Text>);
    }

    return list;
}

const ContainerTableHeader = (type) => (
    <View style={styles.container}>
        {setHeader(type)}
    </View>
);

export default ContainerTableHeader;