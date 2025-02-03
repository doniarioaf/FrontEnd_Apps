import React, { Fragment, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
// import roboto from '../../../../components/';
import roboto from '../../../../components/Fonts/Roboto/Roboto-Bold.ttf';
import { numToMoney } from '../../../shared/globalFunc';

// import logo from "img/logo.png";

const fontSizeBig = 10;
const fontSizeMedium = 8;
const fontSizeSmall = 0;

const styles = StyleSheet.create({
    footer:{
        position:'relative',
        paddingTop:300,
        // left:0,
        // right:0,
        textAlign:'right',
    },
    width:{
        widthno:20,
        widthnamabarang:100,
        widthukuran:75,
        widthgram:70,
        widthkuantitas:70,
        widthmati:70,
        widthtotal:80,
        no:'5%',
        namabarang:'20%',
        ukuran:'15%',
        gram:'14%',
        kuantitas:'14%',
        mati:'15%',
        total:'17%',

        widthflightno:120,
        widthsmuno:150,
        widthkoli:70,
        widthspbno:170,
        flightno:"25%",
        smuno:"29%",
        koli:"14%",
        spbno:"32%",

        widthcheker:160,
        widthapprover:160,
        widthinputsystem:160,
        cheker:"33%",
        approver:"33%",
        inputsystem:"34%",
    },
    tableNoBorder: {
        display: "table",
        width: "auto",
        // borderStyle: "solid",
        borderWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableColWidthNoBorder: {
        // borderStyle: "solid",
        borderWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
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
    tableColWidth: {
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
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
        marginLeft: 3,
        marginTop: 5,
        fontSize: fontSizeMedium,
        maxWidth: "98%"
    },
    title: { fontFamily: 'roboto', fontWeight: 600 },
});

const setItems = (items) =>{
    
    if(items != undefined && items != null){
        let listRow = [];
        let totalQty = 0;
        let totalmati = 0;
        let totalTotal = 0;
        let no = 1;

        let listfilteroutput = items.filter(output => output.ekor > 0);
        console.log('listfilteroutput ',listfilteroutput);
        let letListDone = [];
        for(let i=0; i < listfilteroutput.length; i++){
            let det = listfilteroutput[i];
            let key = det.idproduct+'-'+det.idcategoryproduct;
            if(letListDone.indexOf(key) == -1){
                letListDone.push(key);
            }else{
                continue;
            }
            let rowItem = [];
            let qtyHidup = '-';
            let qtyMati = '-';
            let totalQtyHidupMati = 0;
            let listfilteroutputHidup = listfilteroutput.filter(output => output.type == 'H' && output.idcategoryproduct == det.idcategoryproduct);
            // console.log('det.idcategoryproduct '+det.idcategoryproduct+' '+qtyHidup);
            if(listfilteroutputHidup.length > 0){
                qtyHidup = listfilteroutputHidup[0].ekor;
                
                totalQtyHidupMati = totalQtyHidupMati + parseInt(qtyHidup);
            }
            let listfilteroutputMati = listfilteroutput.filter(output => output.type == 'M' && output.idcategoryproduct == det.idcategoryproduct);
            if(listfilteroutputMati.length > 0){
                qtyMati = listfilteroutputMati[0].ekor;
                totalQtyHidupMati = totalQtyHidupMati + parseInt(qtyMati);
            }
            if(qtyHidup !== '-'){
                totalQty = totalQty + parseInt(qtyHidup);
            }
            if(qtyMati !== '-'){
                totalmati = totalmati + parseInt(qtyMati);
            }
            totalTotal = totalTotal + totalQtyHidupMati;
            
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.no, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthno, maxWidth: styles.width.widthno, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{no}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.namabarang, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthnamabarang, maxWidth: styles.width.widthnamabarang, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.productName}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.ukuran, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthukuran, maxWidth: styles.width.widthukuran, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.sizecategoryproduct}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.gram, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthgram, maxWidth: styles.width.widthgram, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.weightfromingramcategoryproduct+' - '+det.weighttoingramcategoryproduct}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.kuantitas, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthkuantitas, maxWidth: styles.width.widthkuantitas, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{qtyHidup}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.mati, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthmati, maxWidth: styles.width.widthmati, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{qtyMati}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.total, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthtotal, maxWidth: styles.width.widthtotal, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{totalQtyHidupMati}</Text>
                </View>
            );
            
            listRow.push(<View style={styles.tableRow}>{rowItem}</View>)
            no++;
        }
        let rowItem = [];
        rowItem.push(
            <View style={[styles.tableColWidth, { width:styles.width.no, height: "25px" }]}>
                <Text style={[styles.tableCell, { width: styles.width.widthno, maxWidth: styles.width.widthno, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{''}</Text>
            </View>
        );
        rowItem.push(
            <View style={[styles.tableColWidth, { width:styles.width.namabarang, height: "25px" }]}>
                <Text style={[styles.tableCell, { width: styles.width.widthnamabarang, maxWidth: styles.width.widthnamabarang, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{''}</Text>
            </View>
        );
        rowItem.push(
            <View style={[styles.tableColWidth, { width:styles.width.ukuran, height: "25px" }]}>
                <Text style={[styles.tableCell, { width: styles.width.widthukuran, maxWidth: styles.width.widthukuran, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{''}</Text>
            </View>
        );
        rowItem.push(
            <View style={[styles.tableColWidth, { width:styles.width.gram, height: "25px" }]}>
                <Text style={[styles.tableCell, { width: styles.width.widthgram, maxWidth: styles.width.widthgram, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{''}</Text>
            </View>
        );
        rowItem.push(
            <View style={[styles.tableColWidth, { width:styles.width.kuantitas, height: "25px" }]}>
                <Text style={[styles.tableCell, { width: styles.width.widthkuantitas, maxWidth: styles.width.widthkuantitas, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{totalQty}</Text>
            </View>
        );
        rowItem.push(
            <View style={[styles.tableColWidth, { width:styles.width.mati, height: "25px" }]}>
                <Text style={[styles.tableCell, { width: styles.width.widthmati, maxWidth: styles.width.widthmati, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{totalmati}</Text>
            </View>
        );
        rowItem.push(
            <View style={[styles.tableColWidth, { width:styles.width.total, height: "25px" }]}>
                <Text style={[styles.tableCell, { width: styles.width.widthtotal, maxWidth: styles.width.widthtotal, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{totalTotal}</Text>
            </View>
        );
            listRow.push(<View style={styles.tableRow}>{rowItem}</View>)
        return listRow;
    }
    return null;
}

const GenerateDraftPurchaseReceive = ({ valuedata }) => {
    const [IsReady, setIsReady] = useState(false);
        
    useEffect(() => {
        Font.register({ family: 'roboto', fonts: [{ src: roboto }] });
        setIsReady(true);
    }, [IsReady])

    const generatePdf = (valuedata) => {
        return (
            <Fragment>
                {
                    IsReady ?
                        <View style={{ marginTop: '0px' }}>
                            
                            {/* <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row-reverse' }}>
                                    <Text style={[{ fontFamily: 'roboto', fontSize: fontSizeBig, margin: '0 auto', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', width: 150, maxWidth: 150 }]}>{''}</Text>
                                </View>

                                <View style={{ flexDirection: 'row-reverse', marginLeft: '40%' }}>
                                    <Text style={{ fontSize: 7 }}>{'Edit : '}{(valuedata != null?valuedata.countEdit:'')}{' Print : '+(valuedata != null?(valuedata.countPrint?valuedata.countPrint+1:1):'')}{' Dicetak Oleh: '+(valuedata != null?valuedata.namaUser+' ,'+valuedata.currdatetime:'')}</Text>
                                </View>
                            </View> */}


                            <View style={{ flexDirection: 'row',paddingTop:'20px'}}>
                            <View style={{ flexDirection: 'row-reverse' }}>
                                <Image source={"img/logoheaderpdf.png"} style={{width:'200px',height:'100px'}}/>
                            </View>

                            <View style={{ flexDirection: 'row-reverse', paddingTop: '0px' }}>
                            <View style={[styles.tableNoBorder,{marginLeft:'0px'}]}>
                            <View style={styles.tableRow}>

                            <View style={[styles.tableColWidthNoBorder, {  height: "50px",marginBottom:'80px',marginLeft:'100px' }]}>
                                <Text style={[{ fontFamily: 'roboto',width: styles.width.widthno, maxWidth: styles.width.widthno, marginTop: '5px', fontSize: 18,marginLeft:'10px' }]}>{"Surat Penerimaan Barang"}</Text>

                            <View style={[styles.tableNoBorder]}>
                            <View style={styles.tableRow}>
                            <View style={[styles.tableColWidth, { borderLeft:1,borderTop:1,width:"53%", height: "70px" }]}>
                                <Text style={[styles.tableCell, { fontFamily: 'roboto',width: 10, maxWidth: 10, marginTop: '5px', fontSize: fontSizeBig }]}>
                                    {"Supplier"}
                                </Text>
                                <Text style={[styles.tableCell, { width: 10, maxWidth: 10, marginTop: '5px', fontSize: fontSizeBig }]}>
                                    {valuedata != null?valuedata.vendorName+' / '+valuedata.vendorAlias:''}
                                </Text>
                            </View>
                            <View style={[styles.tableColWidthNoBorder, { borderBottom:0,borderTop:0,width:"47%", height: "70px" }]}>
                                <Text style={[styles.tableCell, { width: 100, maxWidth: 100, marginTop: '5px', fontSize: fontSizeBig }]}>{""}</Text>
                            </View>
                            </View>
                            </View>

                            <Text style={[styles.tableCell, {width: 10, maxWidth: 10, marginTop: '5px', fontSize: fontSizeBig }]}>
                                
                               <Text style={{fontFamily: 'roboto'}}>{'SPB Date :                                                                   '}</Text> {valuedata != null?valuedata.date:''}
                            </Text>
                                
                            </View>
                            
                            </View>
                            </View>
                            
                            </View>    

                            </View>

                            
                            <View style={[styles.table,{marginTop:'0px'}]}>
                            <View style={styles.tableRow}>
                            <View style={[styles.tableColWidth, { fontFamily: 'roboto',backgroundColor:'#bcd6ed',width:styles.width.flightno, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthflightno, maxWidth: styles.width.widthflightno,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Flight No."}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { fontFamily: 'roboto',backgroundColor:'#bcd6ed',width:styles.width.smuno, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthsmuno, maxWidth: styles.width.widthsmuno, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"SMU No."}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { fontFamily: 'roboto',backgroundColor:'#bcd6ed',width:styles.width.koli, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthkoli, maxWidth: styles.width.widthkoli, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Collie"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { fontFamily: 'roboto',backgroundColor:'#bcd6ed',width:styles.width.spbno, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthspbno, maxWidth: styles.width.widthspbno, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"SPB No."}</Text>
                            </View>
                            </View>

                            <View style={styles.tableRow}>
                            <View style={[styles.tableColWidth, { width:styles.width.flightno, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthflightno, maxWidth: styles.width.widthflightno,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?valuedata.flightno:''}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.smuno, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthsmuno, maxWidth: styles.width.widthsmuno, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?valuedata.smu:''}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.koli, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthkoli, maxWidth: styles.width.widthkoli, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?valuedata.box:''}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.spbno, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthspbno, maxWidth: styles.width.widthspbno, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?valuedata.nodocument:''}</Text>
                            </View>
                            </View>

                            <View style={styles.tableRow}>
                            <View style={[styles.tableColWidth, {fontFamily: 'roboto',backgroundColor:'#bcd6ed', width:styles.width.no, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthno, maxWidth: styles.width.widthno, marginTop: '5px', fontSize: fontSizeBig }]}>{"No"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, {fontFamily: 'roboto',backgroundColor:'#bcd6ed', width:styles.width.namabarang, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthnamabarang, maxWidth: styles.width.widthnamabarang, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Nama Barang"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, {fontFamily: 'roboto',backgroundColor:'#bcd6ed',width:styles.width.ukuran, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthukuran, maxWidth: styles.width.widthukuran, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Ukuran"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, {fontFamily: 'roboto',backgroundColor:'#bcd6ed', width:styles.width.gram, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthgram, maxWidth: styles.width.widthgram, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Gram"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, {fontFamily: 'roboto',backgroundColor:'#bcd6ed', width:styles.width.kuantitas, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthkuantitas, maxWidth: styles.width.widthkuantitas, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Kuantitas"}</Text>
                            </View>

                            <View style={[styles.tableColWidth, {fontFamily: 'roboto',backgroundColor:'#bcd6ed', width:styles.width.mati, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthmati, maxWidth: styles.width.widthmati,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Mati"}</Text>
                            </View>

                            <View style={[styles.tableColWidth, {fontFamily: 'roboto',backgroundColor:'#bcd6ed', width:styles.width.total, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthtotal, maxWidth: styles.width.widthtotal,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Total"}</Text>
                            </View>
                            </View>
                            {setItems(valuedata != null ? valuedata.items : [])}

                            </View>
                            
                            <View style={[styles.table]}>
                            <View style={styles.tableRow}>
                            <View style={[styles.tableColWidth, { width:"100%", height: "70px" }]}>
                                <Text style={[styles.tableCell, { fontFamily: 'roboto',width: 500, maxWidth: 500, marginTop: '5px', fontSize: fontSizeBig }]}>{"Keterangan :"}</Text>
                                <Text style={[styles.tableCell, { width: 500, maxWidth: 500, marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null ? valuedata.notes1 : ''}</Text>
                                <Text style={[styles.tableCell, { width: 500, maxWidth: 500, marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null ? valuedata.notes2 : ''}</Text>
                            </View>
                            {/* <View style={[styles.tableColWidth, { width:"48%", height: "70px" }]}>
                                <Text style={[styles.tableCell, { width: 100, maxWidth: 100, marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null ? valuedata.notes1 : ''}</Text>
                            </View> */}
                            </View>
                            </View>

                            <View style={[styles.table,{marginTop:'0px'}]}>
                            <View style={styles.tableRow}>
                            <View style={[styles.tableColWidth, { fontFamily: 'roboto',width:styles.width.cheker, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthcheker, maxWidth: styles.width.widthcheker,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Cheker"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { fontFamily: 'roboto',width:styles.width.approver, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthapprover, maxWidth: styles.width.widthapprover, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Approver"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { fontFamily: 'roboto',width:styles.width.inputsystem, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthinputsystem, maxWidth: styles.width.widthinputsystem, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Input System"}</Text>
                            </View>
                            </View>

                            <View style={styles.tableRow}>
                            <View style={[styles.tableColWidth, { width:styles.width.cheker, height: "60px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthcheker, maxWidth: styles.width.widthcheker,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{""}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.approver, height: "60px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthapprover, maxWidth: styles.width.widthapprover, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{""}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.inputsystem, height: "60px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthinputsystem, maxWidth: styles.width.widthinputsystem, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{""}</Text>
                                <Text style={{textAlign:'right',marginTop:"44px",marginRight:"2px",fontSize:7}}>{"Printed By: "}{(valuedata != null?valuedata.namaUser+' ,'+valuedata.currdatetime:'')}</Text>
                            </View>

                            </View>
                            </View>
                            <Text style={{textAlign:'right',marginRight:"2px",fontSize:7}}>{"Edit:"}{(valuedata != null?valuedata.countEdit:'')}{"  Print:"}{(valuedata != null?(valuedata.countPrint?valuedata.countPrint+1:1):'')}</Text>
                            {/* <Text style={{ fontSize: 7 }}>{'Edit : '}{(valuedata != null?valuedata.countEdit:'')}{' Print : '+(valuedata != null?(valuedata.countPrint?valuedata.countPrint+1:1):'')}{' Dicetak Oleh: '+(valuedata != null?valuedata.namaUser+' ,'+valuedata.currdatetime:'')}</Text> */}

                        </View>
                    :
                    <View style={{ marginTop: '20px' }}>
                    <Text>{" "}</Text>
                    </View>
                }
            </Fragment>
        )
    };
    return (
        generatePdf(valuedata)
    );
};
export default GenerateDraftPurchaseReceive;