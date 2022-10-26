import React,{ Fragment } from 'react';
import { Text, View, StyleSheet,Image } from '@react-pdf/renderer';
import logo from "./kseilogo.png";
import ContaineritemsTable from "./ContaineritemsTable";

const styles = StyleSheet.create({
    container:{
        marginTop:70
    },
    leftposition: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    lefttextdefault: {
        marginLeft: 5,
    },
    companyname: {
        fontStyle:'bold',
        marginTop: -50,
        marginLeft: 0,
        fontSize:15
    },
    rightposition: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    noBLContainer: {
        flexDirection: 'row',
        marginTop: -27,
        justifyContent: 'flex-start'
    },
    noAJUContainer: {
        flexDirection: 'row',
        marginTop: 0,
        justifyContent: 'flex-start'
    },
    suratJalanNoContainer: {
        flexDirection: 'row',
        marginTop: -27,
        justifyContent: 'flex-end'
    },
    suratJalanDateContainer: {
        flexDirection: 'row',
        marginTop: 0,
        marginRight:10,
        justifyContent: 'flex-end'
    },
    customerContainer: {
        flexDirection: 'row',
        // marginTop: 0,
        justifyContent: 'flex-start'
    },
    containerttd: {
        flexDirection: 'row',
        // marginTop: 0,
        justifyContent: 'flex-start'
    },
    namaditerimaoleh: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'flex-start'
    },
    contactPersonContainer: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'flex-start'
    },
    horizontalline: {
        flexDirection: 'row',
        borderBottomColor: '#3778C2',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 4,
        fontStyle: 'bold',
        marginBottom:5
    },
    label: {
        width: 25
    },
    labelleft: {
        width: 40
    },
    labelAJUWO: {
        width: 70
    },
    labelcustomer: {
        width: 50
    },
    labelcontactperson: {
        width: 75
    },
    labeldikirimoleh: {
        width: 75,
        textAlign:'center'
    },
    ttddikirimoleh: {
        width: 75,
        marginTop:40,
        textAlign:'center'
    },
    labeldefaultditerimaoleh: {
        width: 60
    },
    
    // logo: {
    //     width: 84,
    //     height: 70,
    // }
    
});

const getContact = (data) => {
    let cek = new String(data).includes(',');
    if(cek){
        let arrList = new String(data).split(',');
        if(arrList.length > 0){
            return arrList[0];
        }
    }
    return data;
}

const GenerateSuratJalan = ({ valuedata }) => (
    <Fragment>
    <View style={styles.container}>
    <View style={styles.leftposition}>
        <Text style={styles.companyname}>{'PT. ATAP LOGISTIK INDONESIA'}</Text>        
    </View>

    <View style={styles.noBLContainer}>
    <Text style={styles.labelleft}>{'No BL:'}</Text>
    <Text >{valuedata != null?valuedata.noblWO:''}</Text>
    </View>

    <View style={styles.noAJUContainer}>
    <Text style={styles.labelAJUWO}>{'No AJU / WO:'}</Text>
    {/* <Text >{'128318 / DWO-0000001-220222'}</Text> */}
    <Text >{valuedata != null?valuedata.noajuWO +' / '+valuedata.nodocumentWO:''}</Text>
    </View>

    <View style={styles.rightposition}>
    <Text style={styles.companyname}>{'SURAT JALAN'}</Text>
    </View>
    <View style={styles.suratJalanNoContainer}>
        <Text style={styles.label}>No: </Text>
        <Text >{valuedata != null?valuedata.nodocument:''}</Text>
    </View>

    <View style={styles.suratJalanDateContainer}>
        <Text style={styles.label}>Date: </Text>
        <Text >{valuedata != null?valuedata.tanggal:''}</Text>
        {/* {valuedata != null?moment (new Date(valuedata.tanggal)).format(formatdateDDMMMMYYYY):''} */}
    </View>

    <Text >{'Kami kirimkan barang-barang tersebut dibawah ini dengan kendaraan......'}</Text>

    <View style={styles.customerContainer}>
        <Text style={styles.labelcustomer}>Customer: </Text>
        <Text >{valuedata != null?valuedata.namacustomer:''}</Text>
    </View>

    {/* <Text >{'Jl. Anggrek Raya Blok K No 1'}</Text> */}
    <Text >{valuedata != null?valuedata.customerAddress:''}</Text>
    {/* <Text >{'Kirim Mobil Harus Malam'}</Text> */}
    <Text >{valuedata != null?valuedata.catatan:''}</Text>
    <Text >{valuedata != null?(valuedata.customerProvince+', '+valuedata.customerCity+', '+valuedata.customerDistrict+', '+valuedata.customerKodePos):''}</Text>
    {/* <Text >{'Jawa Barat, Bogor, Gunung Sindur, Gunung Sindur, 16340'}</Text> */}
    
    <View style={styles.contactPersonContainer}>
        <Text style={styles.labelcontactperson}>Contact Person: </Text>
        <Text >{(getContact(valuedata != null?valuedata.warehousecontactname:''))+'/'+(getContact(valuedata != null?valuedata.warehousecontactno:''))+'/'+(valuedata != null?valuedata.warehouseaddress:'')}</Text>
        {/* <Text >{'Yenti/0812.3232.3231/Pergudangan Sigma Kartika'}</Text> */}
    </View>

    <View style={styles.horizontalline}/>

    <View style={styles.customerContainer}>
        <Text style={styles.labelcustomer}>Barang: </Text>
        <Text >{valuedata != null?valuedata.namacargoWO:''}</Text>
    </View>

    <ContaineritemsTable data = {valuedata != null?valuedata:[]} />

    <Text >{'kosongan container dikirim Ke/diambil dari depo '+(valuedata != null?valuedata.depoWO:'')}</Text>

    <View style={styles.containerttd}>

    <View style={{marginTop:20}}>
    <Text style={styles.labeldikirimoleh} >{'dikirim Oleh'}</Text>
    <Text style={styles.ttddikirimoleh} >{'(..................)'}</Text>
    </View>

    <View style={{marginTop:20,marginLeft:60}}>
    <Text >{'diterima oleh (Diisi lengkap dan cap perusahaan)'}</Text>
    <View style={styles.namaditerimaoleh}>
        <Text style={{width:'60'}}>Nama: </Text>
        <Text >{'..................'}</Text>

        <Text style={{width:'60',marginLeft:'50'}}>Tanggal: </Text>
        <Text >{'..................'}</Text>
    </View>

    <View style={styles.namaditerimaoleh}>
        <Text style={{width:'60'}}>Jam Masuk: </Text>
        <Text >{'..................'}</Text>

        <Text style={{width:'60',marginLeft:'50'}}>Jam Keluar: </Text>
        <Text >{'..................'}</Text>
    </View>
    
    </View>
    </View>
    
    </View>
    </Fragment>
);

export default GenerateSuratJalan;