import React, { Fragment, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
// import roboto from '../../../../components/';
import roboto from '../../../components/Fonts/Roboto/Roboto-Bold.ttf';
import { desimal00, numToMoney } from '../../shared/globalFunc';
// import { LisTime } from '../add';

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
        widthukuran:58,
        widthgram:58,
        widthpatokanperkoli:58,
        widthstockkolomaterakhir:90,
        widthudangmati:55,
        widthudangmasuk:55,
        widthtotalekor:58,
        widthtotalkoli:58,

        ukuran:'12%',
        gram:'12%',
        patokanperkoli:'12%',
        stockkolomaterakhir:'18%',
        udangmati:'11%',
        udangmasuk:'11%',
        totalekor:'12%',
        totalkoli:'12%',
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
        for(let i=0; i < items.length; i++){
            let det = items[i];
            let rowItem = [];
            //,,,,,,
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.ukuran, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthukuran, maxWidth: styles.width.widthukuran, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.ukuran}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.gram, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthgram, maxWidth: styles.width.widthgram, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.gram}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.patokanperkoli, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthpatokanperkoli, maxWidth: styles.width.widthpatokanperkoli, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.patokanperkoli}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.stockkolomaterakhir, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthstockkolomaterakhir, maxWidth: styles.width.widthstockkolomaterakhir, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.stockkolamterakhir}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.udangmati, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthudangmati, maxWidth: styles.width.widthudangmati, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.udangmati}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.udangmasuk, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthudangmasuk, maxWidth: styles.width.widthudangmasuk, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.udangmasuk}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.totalekor, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthtotalekor, maxWidth: styles.width.widthtotalekor, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.totalekor}</Text>
                </View>
            );

            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.totalkoli, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthtotalkoli, maxWidth: styles.width.widthtotalkoli, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.totalkoli?desimal00(numToMoney(det.totalkoli)):0}</Text>
                </View>
            );
            
            listRow.push(<View style={styles.tableRow}>{rowItem}</View>)
        }
        
        return listRow;
    }
    return null;
}

const getCabang = (items) =>{
    if(items != undefined && items != null){
        if(items.length > 0){
            return items[0].cabang;
        }
    }
    return '';
}

const GenerateStockUdangHidupDanMati = ({ valuedata }) => {
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
                            <View style={{ flexDirection: 'row',paddingTop:'20px'}}>
                            <Text style={{ fontSize: fontSizeBig }}>{'Laporan Stock Udang Hidup & Mati'}</Text>
                            </View>
                            <View style={{ flexDirection: 'row'}}>
                            <Text style={{ fontSize: fontSizeBig }}>{'Tanggal : '}{valuedata != null?valuedata.date:''}</Text>
                            </View>
                            <View style={{ flexDirection: 'row'}}>
                            <Text style={{ fontSize: fontSizeBig }}>{'Cabang : '}{valuedata != null?getCabang(valuedata.item):''}</Text>
                            </View>


                            <View style={[styles.table,{marginTop:'20px'}]}>
                                <View style={styles.tableRow}>
                                    <View style={[styles.tableColWidth, { width:styles.width.ukuran, height: "40px" }]}>
                                        <Text style={[styles.tableCell, { width: styles.width.widthukuran, maxWidth: styles.width.widthukuran,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"UKURAN"}</Text>
                                    </View>
                                    <View style={[styles.tableColWidth, { width:styles.width.gram, height: "40px" }]}>
                                        <Text style={[styles.tableCell, { width: styles.width.widthgram, maxWidth: styles.width.widthgram,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"GRAM"}</Text>
                                    </View>
                                    <View style={[styles.tableColWidth, { width:styles.width.patokanperkoli, height: "40px" }]}>
                                        <Text style={[styles.tableCell, { width: styles.width.widthpatokanperkoli, maxWidth: styles.width.widthpatokanperkoli,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"PATOKAN PERKOLI"}</Text>
                                    </View>
                                    <View style={[styles.tableColWidth, { width:styles.width.stockkolomaterakhir, height: "40px" }]}>
                                        <Text style={[styles.tableCell, { width: styles.width.widthstockkolomaterakhir, maxWidth: styles.width.widthstockkolomaterakhir,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"STOCK \n"}{"KOLAM TERAKHIR"}</Text>
                                    </View>
                                    <View style={[styles.tableColWidth, { width:styles.width.udangmati, height: "40px" }]}>
                                        <Text style={[styles.tableCell, { width: styles.width.widthudangmati, maxWidth: styles.width.widthudangmati,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"UDANG \n"}{"MATI"}</Text>
                                    </View>
                                    <View style={[styles.tableColWidth, { width:styles.width.udangmasuk, height: "40px" }]}>
                                        <Text style={[styles.tableCell, { width: styles.width.widthudangmasuk, maxWidth: styles.width.widthudangmasuk,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"UDANG \n"}{"MASUK"}</Text>
                                    </View>
                                    <View style={[styles.tableColWidth, { width:styles.width.totalekor, height: "40px" }]}>
                                        <Text style={[styles.tableCell, { width: styles.width.widthtotalekor, maxWidth: styles.width.widthtotalekor,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"TOTAL \n"}{"EKOR"}</Text>
                                    </View>
                                    <View style={[styles.tableColWidth, { width:styles.width.totalkoli, height: "40px" }]}>
                                        <Text style={[styles.tableCell, { width: styles.width.widthtotalkoli, maxWidth: styles.width.widthtotalkoli,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"TOTAL \n "}{"KOLI"}</Text>
                                    </View>
                                </View>
                                {setItems(valuedata != null ? valuedata.item : [])}
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
export default GenerateStockUdangHidupDanMati;