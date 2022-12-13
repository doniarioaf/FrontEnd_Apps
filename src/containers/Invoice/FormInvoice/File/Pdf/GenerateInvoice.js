import React,{ Fragment } from 'react';
import { Text, View, StyleSheet,Image } from '@react-pdf/renderer';
import logo from "./kseilogo.png";
import ContainerItemsTable from './ContainerItemsTable';

const styles = StyleSheet.create({
    container:{
        marginTop:70
    },noInvoiceContainer: {
        flexDirection: 'row',
        marginTop: -55,
        justifyContent: 'flex-start'
    },noInvoiceDateContainer: {
        flexDirection: 'row',
        marginTop: -35,
        justifyContent: 'flex-start'
    },customerIdContainer: {
        flexDirection: 'row',
        marginTop: -15,
        justifyContent: 'flex-start'
    },rightposition: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },refNoContainer: {
        flexDirection: 'row',
        marginTop: -55,
        justifyContent: 'flex-end'
    },deliveredToContainer: {
        flexDirection: 'row',
        marginTop: -35,
        justifyContent: 'flex-end'
    },deliveredDateContainer: {
        flexDirection: 'row',
        marginTop: -15,
        justifyContent: 'flex-end'
    },
    customerinfo: {
        flexDirection: 'row',
        marginTop: -5,
        justifyContent: 'flex-end'
    }
});

const getNameContact = (data) =>{
    if(data != undefined && data != null){
        if(data.length > 0){
            return data[0].namakontak;
        }
    }
    return '';
}
const GenerateInvoice = ({ valuedata }) => (
    <Fragment>
        <View style={styles.container}>

        <View style={styles.noInvoiceContainer}>
        <Text >{'Invoice No    : '}</Text>
        <Text >{valuedata != null?valuedata.nodocument:''}</Text>        
        </View>

        <View style={styles.noInvoiceDateContainer}>
        <Text >{'Invoice Date : '}</Text>
        <Text >{valuedata != null?valuedata.tanggal:''}</Text>        
        </View>

        <View style={styles.customerIdContainer}>
        <Text >{'Customer ID : '}</Text>
        <Text >{valuedata != null?valuedata.idcustomer:''}</Text>        
        </View>

        <View style={styles.refNoContainer}>
        <Text >{'Ref. No. : '}</Text>
        <Text >{valuedata != null?valuedata.refno:''}</Text>        
        </View>

        <View style={styles.deliveredToContainer}>
        <Text >{'Delivered To : '}</Text>
        <Text >{valuedata != null?valuedata.deliveredto:''}</Text>        
        </View>

        <View style={styles.deliveredDateContainer}>
        <Text >{'Delivered Date : '}</Text>
        <Text >{valuedata != null?valuedata.deliverydate:''}</Text>        
        </View>

        <View style={styles.deliveredDateContainer}>
        
        </View>

        {/* <View style={styles.customerinfo}> */}
        <Text style={{marginTop:'20px'}}>{'To : '}</Text>
        <Text style={{fontWeight:'bold',fontSize:'11'}}>{valuedata != null?(valuedata.customer?valuedata.customer.customername:''):''}</Text>  
        <Text >{valuedata != null?(valuedata.customer?valuedata.customer.alamat:''):''}</Text>  
        <Text >{valuedata != null?(valuedata.customer?(valuedata.customer.kotaname+','+valuedata.customer.provinsiname+' - '+valuedata.customer.kodepos):''):''}</Text>  
        {/* </View> */}

        <Text style={{marginTop:'10px'}}>{'Att. : '+getNameContact(valuedata != null?(valuedata.customer?valuedata.customer.detailsInfoContact:[]):[])}</Text>
        </View>

        <ContainerItemsTable data = {valuedata != null?valuedata:[]} />
        <Text style={{marginTop:'5px'}}>{'Payment To :'}</Text>
        <Text >{valuedata != null?valuedata.keteranganinvoice1:''}</Text>   
        <Text >{valuedata != null?valuedata.keteranganinvoice2:''}</Text>   
        <Text >{valuedata != null?valuedata.keteranganinvoice3:''}</Text> 

        <View style={{marginTop:-55,marginLeft:320}}>
        <Text style={{width:'150',textAlign:'center'}}>{valuedata != null?valuedata.namapenagih:''}</Text>
        <Text style={{marginTop:60}}>{'(.......................................................)'}</Text>
        </View>  
    </Fragment>
);
export default GenerateInvoice;