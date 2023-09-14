import React,{ Fragment,useEffect,useState } from 'react';
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';
// import logo from "./kseilogo.png";
// import ContaineritemsTable from "./ContaineritemsTable";
// import { formatdate } from '../../../shared/constantValue';
import { numToMoney } from '../../../shared/globalFunc';

import RobotoBold               from '../../../../components/Fonts/Roboto/Roboto-Bold.ttf';

const fontSizeBig = 20;
const fontSizeMedium = 12;
const fontSizeSmall = 0;



const styles = StyleSheet.create({
    table: { 
        display: "table", 
        width: "auto", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderRightWidth: 0, 
        borderBottomWidth: 0 
      }, 
      tableRow: {  
        margin: "auto", 
        flexDirection: "row" 
      }, 
      tableColWidth100Persen: { 
        width: "100%", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
      }, 
      tableColWidth60Persen: { 
        width: "60%",
        borderStyle: "solid", 
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
      },
      tableColWidth40Persen: { 
        width: "40%", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
      }, 
      tableCell: { 
        // margin: "auto", 
        marginLeft:3,
        marginTop: 5, 
        fontSize: fontSizeMedium ,
        maxWidth:"98%"
      },
      title: { fontFamily: 'roboto', fontWeight: 600 },
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



const GenerateSuratJalanV1 = ({ valuedata }) => {
    const [IsReady, setIsReady] = useState(false);
    useEffect(() => {
    
        Font.register({ family: 'roboto', fonts:[{src:RobotoBold}] });
        
        setTimeout(() => {
            // generatePDF(det);
            setIsReady(true);
        }, 1000);
    }, [])
   
    return (
        
            <Fragment>
                <View style={{marginTop:'20px'}}>
                <View style={{flexDirection:'row'}}>
                    <View style={{flexDirection:'row-reverse'}}>
                    <Text style={[{ fontSize:fontSizeMedium,margin:'0 auto',textAlign:'left',overflow:'hidden',textOverflow:'ellipsis',width: 250,maxWidth:250}]}>{valuedata != null?valuedata.companyname:''}</Text>
                    </View>
        
                    <View style={{ flexDirection:'row-reverse',marginLeft:'420px'}}>
                    <Text style={{fontStyle:'bold',fontSize:fontSizeMedium}}>{"SURAT JALAN"}</Text>
                    </View>
                </View>
        
                <View style={{flexDirection:'row'}}>
                <View style={{flexDirection:'row-reverse'}}>
                    <Text style={{fontStyle:'bold',fontSize:fontSizeMedium,margin:'0 auto',textAlign:'left',overflow:'hidden',textOverflow:'ellipsis',width:'50px'}}>{valuedata != null?valuedata.compaddress:''}</Text>
                </View>
        
                <View style={{flexDirection:'row-reverse',marginLeft:'560px'}}>
                    <Text style={{fontStyle:'bold',fontSize:fontSizeMedium}}>{"No. SJ     : "+(valuedata != null?valuedata.nodocument:'')}</Text>
                </View>
                </View>
        
                <View style={{flexDirection:'row'}}>
                <View style={{flexDirection:'row-reverse',width: 50}}>
                    {/* <Text style={{fontStyle:'bold',fontSize:fontSizeMedium}}>{"Jakarta"}</Text> */}
                </View>
        
                <View style={{flexDirection:'row-reverse',paddingLeft:'560px'}}>
                    <Text style={{fontStyle:'bold',fontSize:fontSizeMedium}}>{"No. AJU  : "+(valuedata != null?valuedata.noajuWO:'')}</Text>
                </View>
                </View>
        
                <View style={{flexDirection:'row'}}>
                <View style={{flexDirection:'row-reverse'}}>
                    <Text style={{fontStyle:'bold',fontSize:fontSizeMedium,margin:'0 auto',textAlign:'left',overflow:'hidden',textOverflow:'ellipsis',width: 450,maxWidth:450}}> {valuedata != null?valuedata.customertype+". "+valuedata.namacustomer:''}</Text>
                </View>
        
                <View style={{flexDirection:'row-reverse',paddingLeft:'160px'}}>
                    <Text style={{fontStyle:'bold',fontSize:fontSizeMedium}}>{"No. WO   : "+(valuedata != null?valuedata.nodocumentWO:'')}</Text>
                </View>
                </View>
        
                <View style={{flexDirection:'row'}}>
                <View style={{flexDirection:'row-reverse'}}>
                    <Text style={{fontStyle:'bold',fontSize:fontSizeMedium,margin:'0 auto',textAlign:'left',overflow:'hidden',textOverflow:'ellipsis',width: 450,maxWidth:450}}> {valuedata != null?valuedata.customerAddress:''}</Text>
                </View>
        
                <View style={{flexDirection:'row-reverse',paddingLeft:'160px'}}>
                    <Text style={{fontStyle:'bold',fontSize:fontSizeMedium}}>{"Tanggal   : "+(valuedata != null?valuedata.tanggal:'')}</Text>
                </View>
                </View>
        
                <View style={{flexDirection:'row'}}>
                <View style={{flexDirection:'row-reverse'}}>
                    <Text style={{fontStyle:'bold',fontSize:fontSizeMedium,margin:'0 auto',textAlign:'left',overflow:'hidden',textOverflow:'ellipsis',width: 450,maxWidth:450}}> {valuedata != null?valuedata.customerAddress2:''}</Text>
                </View>
                </View>
        
                <View style={{flexDirection:'row'}}>
                <View style={{flexDirection:'row-reverse'}}>
                    <Text style={{fontStyle:'bold',fontSize:fontSizeMedium,margin:'0 auto',textAlign:'left',overflow:'hidden',textOverflow:'ellipsis',width: 400,maxWidth:400}}> {valuedata != null?valuedata.customerAddress3:''}</Text>
                </View>
        
                <View style={{flexDirection:'row-reverse',paddingLeft:'20px'}}>
                    <Text style={{fontStyle:'bold',fontSize:fontSizeMedium,margin:'0 auto',textAlign:'left',overflow:'hidden',textOverflow:'ellipsis',width: 340,maxWidth:340}}>{valuedata != null?'('+valuedata.warehouseancerancer+')':''}</Text>
                </View>
                </View>
        
                <View style={{flexDirection:'row'}}>
                <View style={{flexDirection:'row-reverse'}}>
                    <Text style={{fontStyle:'bold',fontSize:fontSizeMedium,margin:'0 auto',textAlign:'left',overflow:'hidden',textOverflow:'ellipsis',width: 600,maxWidth:600}}> 
                    {"Hubungi : "+(getContact(valuedata != null?valuedata.warehousecontactname:''))+' - No. HP : '+(getContact(valuedata != null?valuedata.warehousecontactno:''))}
                    </Text>
                </View>
                </View>
        
                <View style={styles.table}> 
                <View style={styles.tableRow}>
                <View style={styles.tableColWidth100Persen}> 
                    <Text style={[styles.tableCell,{width:720,maxWidth:720}]}>{"No. BL : "+(valuedata != null?valuedata.noblWO:'')+' - '+(valuedata != null?valuedata.woTypeName:'')+' - '+(valuedata != null?valuedata.namacargoWO:'')+' - '+(valuedata != null?valuedata.containerjumlahkoli+' Koli':'')+' - '+(valuedata != null? (!isNaN(valuedata.containerjumlahkg)?numToMoney(parseFloat(valuedata.containerjumlahkg)):valuedata.containerjumlahkg) +' KG':'')}</Text> 
                  </View> 
                </View>
                <View style={styles.tableRow}>
                <View style={[styles.tableColWidth60Persen,{height:"50px"}]}> 
                <Text style={[styles.tableCell,{width:440,maxWidth:440,marginTop:'15px'}]}>{"No. Container : "+(valuedata != null?valuedata.containerpartai+' / '+valuedata.nocantainer:'....... / ............................................')}</Text>
                </View>
                <View style={[styles.tableColWidth40Persen,{height:"50px"}]}> 
                <Text style={[styles.tableCell,{width:290,maxWidth:290,marginTop:'15px'}]}>{"No. Seal : "+(valuedata != null?valuedata.nosealwo:'')}</Text>
                </View>
                </View>
                </View>
        
                <View style={{flexDirection:'row',marginTop:'20px'}}>
                <View style={{flexDirection:'row-reverse'}}>
                    <Text style={{fontStyle:'bold',fontSize:fontSizeMedium,margin:'0 auto',textAlign:'left',overflow:'hidden',textOverflow:'ellipsis',width: 300}}> {"Tanggal dan Jam Masuk  : ..........................."}</Text>
                </View>
        
                <View style={{flexDirection:'row-reverse',paddingLeft:'200px'}}>
                    <Text style={{fontStyle:'bold',fontSize:fontSizeMedium,margin:'0 auto',textAlign:'left',overflow:'hidden',textOverflow:'ellipsis',width: 300}}>{"Nama, Tanda Tangan dan Cap Gudang"}</Text>
                </View>
                </View>
        
                <View style={{flexDirection:'row',marginTop:'20px'}}>
                <View style={{flexDirection:'row-reverse'}}>
                    <Text style={{fontStyle:'bold',fontSize:fontSizeMedium,margin:'0 auto',textAlign:'left',overflow:'hidden',textOverflow:'ellipsis',width: 300}}> {"Tanggal dan Jam Keluar  : ..........................."}</Text>
                </View>
                </View>
        
                <View style={{flexDirection:'row',marginTop:'20px'}}>
                <View style={{flexDirection:'row-reverse'}}>
                    <Text style={{fontStyle:'bold',fontSize:fontSizeMedium,margin:'0 auto',textAlign:'left',overflow:'hidden',textOverflow:'ellipsis',width: 280,maxWidth:280}}> {"Catatan : "+(valuedata != null?valuedata.catatan:'')}</Text>
                </View>
        
                <View style={{flexDirection:'row-reverse',paddingLeft:'170px'}}>
                    <Text style={{fontStyle:'bold',fontSize:fontSizeMedium,margin:'0 auto',textAlign:'center',overflow:'hidden',textOverflow:'ellipsis',width: 300}}>{"(....................................................)"}</Text>
                </View>
                </View>
        
                <View style={styles.table}> 
                <View style={styles.tableRow}>
                <View style={[styles.tableColWidth60Persen]}> 
                    <Text style={[styles.tableCell,{width:440,maxWidth:440}]}>{"Kosongan diambil/dibuang ke : "+(valuedata != null?valuedata.depoWO:'')}</Text> 
                  </View> 
                  <View style={styles.tableColWidth40Persen}> 
                    <Text style={styles.tableCell}>{"(Cek mau bongkar / Muat jam berapa)"}</Text> 
                  </View> 
                </View>
                <View style={styles.tableRow}>
                <View style={[styles.tableColWidth60Persen,{height:"50px"}]}> 
                <Text style={[styles.tableCell,{marginTop:'15px'}]}>{"No. Mobil : ..........................."}</Text>
                </View>
                <View style={[styles.tableColWidth40Persen,{height:"50px"}]}> 
                <Text style={[styles.tableCell,{marginTop:'15px'}]}>{"Nama Supir : ..........................."}</Text>
                </View>
                </View>
                </View>
        
                </View>
            </Fragment>
    
);
    };
export default GenerateSuratJalanV1;