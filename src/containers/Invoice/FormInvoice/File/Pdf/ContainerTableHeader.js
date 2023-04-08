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
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    jasa: {
        width: '30%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    discjasa: {
        width: '12%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    hargajasa: {
        width: '19%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    subtotaljasa: {
        width: '19%',
        borderRightColor: borderColor,
        borderRightWidth: 0,
    },
    reimbursement: {
        width: '30%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    discreimbursement: {
        width: '12%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    hargareimbursement: {
        width: '19%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    subtotalreimbursement: {
        width: '19%',
        borderRightColor: borderColor,
        borderRightWidth: 0,
    },
});

const setHeader = (param) =>{
    let list = [];
    let showDiskon = false;
    if(param.items.detailsprice){
        for(let i=0; i < param.items.detailsprice.length; i++){
            let det = param.items.detailsprice;
            if(det.diskon){
                showDiskon = true;
            }
        }
    }
    if(param.type == 'JASA'){
        list.push(<Text style={styles.no}>No</Text>);
        list.push(<Text style={styles.jasa}>Jasa PPJK</Text>);
        list.push(<Text style={styles.qty}>Qty</Text>);
        list.push(<Text style={styles.hargajasa}>Harga</Text>);
        if(showDiskon){
            list.push(<Text style={styles.discjasa}>Disc</Text>);
        }
        list.push(<Text style={styles.subtotaljasa}>Subtotal</Text>);
    }else{
        list.push(<Text style={styles.no}>No</Text>);
        list.push(<Text style={styles.reimbursement}>Reimbursement / Dana Talangan</Text>);
        list.push(<Text style={styles.qty}>Qty</Text>);
        list.push(<Text style={styles.hargareimbursement}>Harga</Text>);
        if(showDiskon){
            list.push(<Text style={styles.discreimbursement}>Disc</Text>);
        }
        list.push(<Text style={styles.subtotalreimbursement}>Subtotal</Text>);
    }

    return list;
}

const ContainerTableHeader = (param) => (
    <View style={styles.container}>
        {setHeader(param)}
    </View>
);

export default ContainerTableHeader;