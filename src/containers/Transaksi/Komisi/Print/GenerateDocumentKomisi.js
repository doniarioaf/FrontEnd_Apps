import React, { Fragment, useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
// import roboto from '../../../../components/';
import roboto from '../../../../components/Fonts/Roboto/Roboto-Bold.ttf';
import { numToMoney, terbilang } from '../../../shared/globalFunc';
import logo from "./kseilogo.png";

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
        widthtanggal:90,
        widthnodokumen:70,
        widthvendor:70,
        widthkoli:50,
        widthkomisiperkoli:80,
        widthsubtotalkomisi:100,
        no:'5%',
        tanggal:'18%',
        nodokumen:'15%',
        vendor:'14%',
        koli:'10%',
        komisiperkoli:'18%',
        subtotalkomisi:'20%',
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
        let totalKoli = 0;
        let totalsubtotalkomisi = 0;
        let no = 1;
        for(let i=0; i < items.length; i++){
            let det = items[i];
            let rowItem = [];
            // no,tanggal,nodokumen,koli,komisiperkoli,subtotalkomisi
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.no, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthno, maxWidth: styles.width.widthno, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{no}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.tanggal, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthtanggal, maxWidth: styles.width.widthtanggal, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.date}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.vendor, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthvendor, maxWidth: styles.width.widthvendor, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.vendoralias}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.nodokumen, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthnodokumen, maxWidth: styles.width.widthnodokumen, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.nodocument}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.koli, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthkoli, maxWidth: styles.width.widthkoli, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.koli}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.komisiperkoli, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthkomisiperkoli, maxWidth: styles.width.widthkomisiperkoli, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.komisi?numToMoney(parseFloat(det.komisi)):''}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.subtotalkomisi, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthsubtotalkomisi, maxWidth: styles.width.widthsubtotalkomisi, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.subTotalkomisi?numToMoney(parseFloat(det.subTotalkomisi)):''}</Text>
                </View>
            );
            
            listRow.push(<View style={styles.tableRow}>{rowItem}</View>)
            totalKoli += parseInt(det.koli?det.koli:0);
            totalsubtotalkomisi += parseFloat(det.subTotalkomisi?det.subTotalkomisi:0);
            no++;
        }
        let rowItem = [];
        rowItem.push(
            <View style={[styles.tableColWidth, { width:styles.width.no, height: "25px" }]}>
                <Text style={[styles.tableCell, { width: styles.width.widthno, maxWidth: styles.width.widthno, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{''}</Text>
            </View>
        );
        rowItem.push(
            <View style={[styles.tableColWidth, { width:styles.width.tanggal, height: "25px" }]}>
                <Text style={[styles.tableCell, { width: styles.width.widthtanggal, maxWidth: styles.width.widthtanggal, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{''}</Text>
            </View>
        );
        rowItem.push(
            <View style={[styles.tableColWidth, { width:styles.width.vendor, height: "25px" }]}>
                <Text style={[styles.tableCell, { width: styles.width.widthvendor, maxWidth: styles.width.widthvendor, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{''}</Text>
            </View>
        );
        rowItem.push(
            <View style={[styles.tableColWidth, { width:styles.width.nodokumen, height: "25px" }]}>
                <Text style={[styles.tableCell, { width: styles.width.widthnodokumen, maxWidth: styles.width.widthnodokumen, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{'Total'}</Text>
            </View>
        );
        rowItem.push(
            <View style={[styles.tableColWidth, { width:styles.width.koli, height: "25px" }]}>
                <Text style={[styles.tableCell, { width: styles.width.widthkoli, maxWidth: styles.width.widthkoli, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{totalKoli}</Text>
            </View>
        );
        rowItem.push(
            <View style={[styles.tableColWidth, { width:styles.width.komisiperkoli, height: "25px" }]}>
                <Text style={[styles.tableCell, { width: styles.width.widthkomisiperkoli, maxWidth: styles.width.widthkomisiperkoli, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{''}</Text>
            </View>
        );
        rowItem.push(
            <View style={[styles.tableColWidth, { width:styles.width.subtotalkomisi, height: "25px" }]}>
                <Text style={[styles.tableCell, { width: styles.width.widthsubtotalkomisi, maxWidth: styles.width.widthsubtotalkomisi, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{numToMoney(totalsubtotalkomisi)}</Text>
            </View>
        );
            listRow.push(<View style={styles.tableRow}>{rowItem}</View>)
        return listRow;
    }
    return null;
}

const getNamaBroker = (items) =>{
    if(items){
        return items.length > 0? items[0].vendornamabroker:'';
    }
    return '';
}

const GenerateDocument = ({ valuedata }) => {
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
                            
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row-reverse' }}>
                                {/* <Image source={"img/logoheaderpdf.png"} /> */}
                                    <Text style={[{ fontFamily: 'roboto', fontSize: fontSizeBig, margin: '0 auto', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', width: 150, maxWidth: 150 }]}>{''}</Text>
                                </View>

                                <View style={{ flexDirection: 'row-reverse', marginLeft: '40%' }}>
                                    <Text style={{ fontSize: 7 }}>{'Edit : '}{(valuedata != null?valuedata.countEdit:'')}{' Print : '+(valuedata != null?(valuedata.countPrint?valuedata.countPrint+1:1):'')}{' Dicetak Oleh: '+(valuedata != null?valuedata.namaUser+' ,'+valuedata.currdatetime:'')}</Text>
                                </View>
                            </View>


                            <View style={{ flexDirection: 'row',paddingTop:'20px'}}>
                            <View style={{ flexDirection: 'row-reverse' }}>
                                <Image source={"img/logoheaderpdf.png"} style={{marginLeft:'70px',width:'200px',height:'100px'}}/>
                            </View>

                            <View style={{ flexDirection: 'row-reverse', marginLeft: '15%' }}>
                            <Text style={{ fontSize: fontSizeBig,lineHeight: 2 }} >
                                {'To          : '}{valuedata != null ? getNamaBroker(valuedata.items) : ''}{'\n'}
                                {'Tanggal : '}{valuedata != null ? valuedata.date : ''}{'\n'}
                                {'Doc No : '}{valuedata != null ? valuedata.nodocument : ''}{'\n'}
                                {'Broker : '}{valuedata != null ? getNamaBroker(valuedata.items) : ''}
                                </Text>
                            </View>    

                            </View>

                            <View style={[styles.table,{marginTop:'20px'}]}>
                            <View style={styles.tableRow}>
                            <View style={[styles.tableColWidth, { width:styles.width.no, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthno, maxWidth: styles.width.widthno, marginTop: '5px', fontSize: fontSizeBig }]}>{"No"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.tanggal, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthtanggal, maxWidth: styles.width.widthtanggal, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Tanggal"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.vendor, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthvendor, maxWidth: styles.width.widthvendor, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Vendor"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.nodokumen, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthnodokumen, maxWidth: styles.width.widthnodokumen, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"No Document"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.koli, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthkoli, maxWidth: styles.width.widthkoli, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Koli"}</Text>
                            </View>

                            <View style={[styles.tableColWidth, { width:styles.width.komisiperkoli, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthkomisiperkoli, maxWidth: styles.width.widthkomisiperkoli,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Komisi Per koli"}</Text>
                            </View>

                            <View style={[styles.tableColWidth, { width:styles.width.subtotalkomisi, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthsubtotalkomisi, maxWidth: styles.width.widthsubtotalkomisi,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Subtotal Komisi"}</Text>
                            </View>
                            </View>

                            {/* Items */}
                            {setItems(valuedata != null ? valuedata.items : [])}

                            </View>
                            
                            <View style={[styles.table]}>
                            <View style={styles.tableRow}>
                            <View style={[styles.tableColWidth, { width:"52%", height: "70px" }]}>
                                <Text style={[styles.tableCell, { width: 100, maxWidth: 100, marginTop: '5px', fontSize: fontSizeBig }]}>{"Remarks"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:"48%", height: "70px" }]}>
                                <Text style={[styles.tableCell, { width: 100, maxWidth: 100, marginTop: '5px', fontSize: fontSizeBig }]}>{""}</Text>
                            </View>
                            </View>
                            </View>

                            <View style={[styles.table]}>
                            <View style={styles.tableRow}>
                            <View style={[styles.tableColWidth, { width:"100%", height: "20px" }]}>
                                <Text style={[styles.tableCell, { width: 500, maxWidth: 500, marginTop: '5px', fontSize: 6 }]}>{"Declaration : We declare that this invoice shows actual price of goods described and that all particulars are true and correct"}</Text>
                            </View>
                            </View>
                            </View>

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
export default GenerateDocument;