import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import ContainerTableHeaderSuratJalan from './ContainerTableHeaderSuratJalan';
import ContainerTableItemsValueSuratJalan from './ContainerTableItemsValueSuratJalan';

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 100,
        marginBottom: 10,
        borderWidth: 1,
        // borderColor: '#3778C2',
        borderColor: 'black',
    },
});

const ContainerItemsTable = ({ data }) => (
    <View style={styles.tableContainer}>
        <ContainerTableHeaderSuratJalan type ={''} />
        <ContainerTableItemsValueSuratJalan items={data} />
        {/* <InvoiceTableFooter items={invoice.items} /> */}
    </View>
);

export default ContainerItemsTable;