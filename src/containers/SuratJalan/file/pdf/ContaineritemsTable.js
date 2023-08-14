import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import ContainerTableHeader from './ContainerTableHeader';
import ContainerTableItemsValue from './ContainerTableItemsValue';
// import InvoiceTableRow from './InvoiceTableRow';
// import InvoiceTableFooter from './InvoiceTableFooter';

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1,
        // borderColor: '#3778C2',
        borderColor: 'black',
    },
});

const dummycontainer = [
    {no:1,nocontainer:'BHB090293',type:'40ft',koli:'1.231',kg:'25,123'}
]

const setData = (data) =>{
    return [
        {no:1,nocontainer:data.nocantainer,type:data.containerpartai,koli:data.containerjumlahkoli,kg:data.containerjumlahkg}
    ]
}

const ContainerItemsTable = ({ data }) => (
    <View style={styles.tableContainer}>
        <ContainerTableHeader />
        <ContainerTableItemsValue items={setData(data)} />
        {/* <InvoiceTableFooter items={invoice.items} /> */}
    </View>
);

export default ContainerItemsTable;