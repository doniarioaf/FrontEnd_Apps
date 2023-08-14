import React,{ Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
// import logo from "./kseilogo.png";
// import ContaineritemsTable from "./ContaineritemsTable";
// import { formatdate } from '../../../shared/constantValue';
import { numToMoney } from '../../../shared/globalFunc';

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
    suratJalanCatatan: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: -15,
    },
    suratJalanAlamat: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // width:'100px'
    },
    suratJalanAlamatCatatan: {
        flexDirection: 'row',
    },
    label: {
        width: 25
    },
    labelleft: {
        width: 40
    },
    labelAJUWO: {
        width: 45
    },
    labelcustomer: {
        width: 50
    },
    labelcontactperson: {
        width: 45
    },
    labeldikirimoleh: {
        width: 150,
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

const getKalimat1 = (data) => {
    let text = 'Kami kirimkan barang-barang tersebut dibawah ini dengan kendaraan......';
    if(data == 'EX'){
        text = 'Mohon dapat dimuat barang tersebut dibawah ini untuk kiriman export';
    }else if(data == 'IM'){
        text = 'Kami kirimkan barang impor tersebut dibawah ini : ';
    }
    return text;
}

const getKalimat2 = (data) => {
    // let text = 'kosongan container dikirim Ke/diambil dari :';
    // if(data == 'EX'){
    //     text = 'Kosongan diambil dari : ';
    // }else if(data == 'IM'){
    //     text = 'Kosongan dikirim ke : ';
    // }
    return 'Kosongan diambil dari / buang ke : ';
}

const setFotmatCurrValueNumber = (data) => {
    if(!isNaN(data)){
        return numToMoney(parseFloat(data));
    }
    return data;
}

const GenerateSuratJalan = ({ valuedata }) => (
    <Fragment>
    <View style={styles.container}>
    <View style={styles.leftposition}>
        <Text style={styles.companyname}>{valuedata != null?valuedata.companyname:''}</Text>        
    </View>

    <View style={styles.noBLContainer}>
    <Text style={styles.labelleft}>{'No BL:'}</Text>
    <Text >{valuedata != null?valuedata.noblWO+' - '+valuedata.woTypeName:''}</Text>
    </View>

    <View style={styles.noAJUContainer}>
    <Text style={styles.labelAJUWO}>{'No AJU :'}</Text>
    {/* <Text >{'128318 / DWO-0000001-220222'}</Text> */}
    <Text >{valuedata != null?valuedata.noajuWO +' - WO : '+valuedata.nodocumentWO:''}</Text>
    </View>

    <View style={styles.rightposition}>
    <Text style={styles.companyname}>{'SURAT JALAN'}</Text>
    </View>
    <View style={styles.suratJalanNoContainer}>
        <Text style={styles.label}>No: </Text>
        <Text >{valuedata != null?valuedata.nodocument+'   ':''}</Text>
    </View>

    <View style={styles.suratJalanDateContainer}>
        <Text style={styles.label}>Date: </Text>
        <Text >{valuedata != null?valuedata.tanggal:''}</Text>
        {/* {valuedata != null?moment (new Date(valuedata.tanggal)).format(formatdate):''} */}
    </View>

    {/* <Text >{valuedata != null?getKalimat1(valuedata.woType):''}</Text> */}

    <View style={styles.customerContainer}>
        <Text style={styles.labelcustomer}>Customer: </Text>
        <Text >{valuedata != null?valuedata.namacustomer:''}</Text>
    </View>

    <View>
    <Text >{valuedata != null?valuedata.customerAddress:''}</Text>
    </View>

    <View style={styles.suratJalanAlamat}>
    <Text >{valuedata != null?(valuedata.customerProvince+', '+valuedata.customerCity+', '+valuedata.customerDistrict+', '+valuedata.customerKodePos):''}</Text>
    </View>

    {/* <View style={styles.suratJalanCatatan}>
    <Text >{valuedata != null?valuedata.warehouseancerancer:''}</Text>    
    </View> */}

    <View style={{flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: -27,}}>
    <Text >{valuedata != null?valuedata.warehousecatatan:''}</Text>    
    </View>
    
    <View style={styles.contactPersonContainer}>
        <Text style={styles.labelcontactperson}>Hubungi: </Text>
        <Text >{(getContact(valuedata != null?valuedata.warehousecontactname:''))+'/'+(getContact(valuedata != null?valuedata.warehousecontactno:''))+'/ '+(valuedata != null?valuedata.warehouseancerancer:'')}</Text>
    </View>

    <View style={styles.horizontalline}/>

    <View style={styles.customerContainer}>
        <Text style={styles.labelcustomer}>Barang: </Text>
        <Text >{valuedata != null?valuedata.namacargoWO:''}</Text>
    </View>

    <View style={styles.customerContainer}>
        <Text style={{width:'70'}}>No. Container: </Text>
        <Text >{valuedata != null?valuedata.containerpartai+' - '+valuedata.nocantainer+' - '+valuedata.containerjumlahkoli+' Koli - '+setFotmatCurrValueNumber(valuedata.containerjumlahkg)+' KG':''}</Text>
    </View>

    <View style={styles.customerContainer}>
        <Text >{valuedata != null?valuedata.catatan:''}</Text>
    </View>

    {/* <ContaineritemsTable data = {valuedata != null?valuedata:[]} /> */}

    <Text >{(valuedata != null?getKalimat2(valuedata.woType):'')+(valuedata != null?valuedata.depoWO:'')}</Text>

    <View style={styles.containerttd}>

    <View style={{marginTop:20}}>
    <Text style={styles.labeldikirimoleh} >{'Diterima Oleh'}</Text>
    <Text style={styles.ttddikirimoleh} >{'(.......................................................)'}</Text>
    </View>

    <View style={{marginTop:20,marginLeft:140}}>
    {/* <Text >{'Diterima oleh (Diisi lengkap dan cap perusahaan)'}</Text> */}
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