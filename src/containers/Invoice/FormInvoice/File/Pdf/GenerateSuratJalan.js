import React,{ Fragment } from 'react';
import { Text, View, StyleSheet,Image } from '@react-pdf/renderer';
import ContainerItemsTableSuratJalan from './ContainerItemsTableSuratJalan';

const styles = StyleSheet.create({
    container:{
        marginTop:0
    }
});

const GenerateSuratJalan = ({ valuedata }) => (
    <Fragment>
        <View style={styles.container}>
        <ContainerItemsTableSuratJalan data = {valuedata != null?valuedata:[]} />
        </View>
    </Fragment>

);
export default GenerateSuratJalan;