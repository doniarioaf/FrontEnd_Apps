import React, { Fragment, useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';
// import roboto from '../../../../components/';
import roboto from '../../../../components/Fonts/Roboto/Roboto-Bold.ttf';
import { numToMoney, terbilang } from '../../../shared/globalFunc';

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
        widthbox:20,
        widthsize:70,
        widthgram:70,
        widthqty:50,
        widthweight:70,
        widthprice:100,
        widthsubprice:100,
        box:'5%',
        size:'15%',
        gram:'15%',
        qty:'11%',
        weight:'14%',
        price:'20%',
        subprice:'20%'
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
        let totalWeight = 0;
        let totalPrice = 0;
        for(let i=0; i < items.length; i++){
            let det = items[i];
            let rowItem = [];
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.box, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthbox, maxWidth: styles.width.widthbox, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.box}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.size, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthsize, maxWidth: styles.width.widthsize, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.categoryProductSize}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.gram, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthgram, maxWidth: styles.width.widthgram, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.categoryProductFromGr+'-'+det.categoryProductThruGr}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.qty, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthqty, maxWidth: styles.width.widthqty, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.qty}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.weight, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthweight, maxWidth: styles.width.widthweight, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.nettoweight}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.price, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthprice, maxWidth: styles.width.widthprice, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.price}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.subprice, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthsubprice, maxWidth: styles.width.widthsubprice, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.totalprice}</Text>
                </View>
            );
            listRow.push(<View style={styles.tableRow}>{rowItem}</View>)
            totalQty += parseInt(det.qty);
            totalWeight += parseFloat(det.nettoweight);
            totalPrice += parseFloat(det.totalprice);
        }
        let rowItem = [];
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.box, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{''}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.size, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{''}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.gram, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{''}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.qty, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthqty, maxWidth: styles.width.widthqty,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{totalQty}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.weight, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthweight, maxWidth: styles.width.widthweight, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{totalWeight}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.price, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{''}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.subprice, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthsubprice, maxWidth: styles.width.widthsubprice, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{totalPrice}</Text>
                </View>
            );
            listRow.push(<View style={styles.tableRow}>{rowItem}</View>)
        return listRow;
    }
    return null;
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
                        <View style={{ marginTop: '20px' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[{ fontFamily: 'roboto', fontSize: fontSizeBig, margin: '0 auto', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }]}>{valuedata != null ? valuedata.companyName : ''}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[{ fontFamily: 'roboto', fontSize: fontSizeBig, margin: '0 auto', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }]}>{valuedata != null ? valuedata.address1 : ''}</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[{ fontFamily: 'roboto', fontSize: fontSizeBig, margin: '0 auto', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }]}>{valuedata != null ? valuedata.address2 : ''}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[{ fontFamily: 'roboto', fontSize: fontSizeBig, margin: '0 auto', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }]}>{valuedata != null ? valuedata.address3 : ''}</Text>
                            </View>

                            <View style={{ flexDirection: 'row',paddingTop:'20px' }}>
                                <View style={{ flexDirection: 'row-reverse' }}>
                                    <Text style={[{ margin: '0 auto', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', width: 250, maxWidth: 250 }]}>{'No. PackingList  : '}{valuedata != null ? valuedata.nodocument : ''}</Text>
                                </View>
    
                                <View style={{ flexDirection: 'row-reverse', marginLeft: '20%' }}>
                                    <Text style={{ fontSize: fontSizeBig }}>{'Flight No : '}{valuedata != null ? valuedata.flightnumber : ''}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row'}}>
                                <View style={{ flexDirection: 'row-reverse' }}>
                                    <Text style={[{ margin: '0 auto', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', width: 340, maxWidth: 340 }]}>{'To  : '}{valuedata != null ? valuedata.customerName : ''}</Text>
                                </View>
    
                                <View style={{ flexDirection: 'row-reverse', marginLeft: '3%' }}>
                                    <Text style={{ fontSize: fontSizeBig }}>{'AWB : '}{valuedata != null ? valuedata.awbnumber : ''}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row'}}>
                                <View style={{ flexDirection: 'row-reverse' }}>
                                    <Text style={[{ margin: '0 auto', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', width: 250, maxWidth: 250 }]}>{'ATTN  : '}{valuedata != null ? valuedata.attention : ''}</Text>
                                </View>
    
                                <View style={{ flexDirection: 'row-reverse', marginLeft: '20%' }}>
                                    <Text style={{ fontSize: fontSizeBig }}>{'Netto : '}{valuedata != null ? valuedata.netto : ''}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row'}}>
                                <View style={{ flexDirection: 'row-reverse' }}>
                                    <Text style={[{ margin: '0 auto', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', width: 250, maxWidth: 250 }]}>{''}</Text>
                                </View>
    
                                <View style={{ flexDirection: 'row-reverse', marginLeft: '20%' }}>
                                    <Text style={{ fontSize: fontSizeBig }}>{'Collie : '}{valuedata != null ? valuedata.koli : ''}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', paddingTop:'20px' }}>
                                <Text style={[{ fontFamily: 'roboto', fontSize: fontSizeBig, margin: '0 auto', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }]}>{valuedata != null ? valuedata.customerAlias : ''}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[{ fontFamily: 'roboto', fontSize: fontSizeBig, margin: '0 auto', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }]}>{'P.LIST EXPORT '}{valuedata != null ? valuedata.customerAlias+' '+valuedata.date : ''}</Text>
                            </View>

                            
                            <View style={styles.table}>
                                <View style={styles.tableRow}>
                                <View style={[styles.tableColWidth, { width:styles.width.box, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: styles.width.widthbox, maxWidth: styles.width.widthbox, marginTop: '5px', fontSize: fontSizeBig }]}>{"BOX"}</Text>
                                </View>
                                <View style={[styles.tableColWidth, { width:styles.width.size, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: styles.width.widthsize, maxWidth: styles.width.widthsize, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"SIZE"}</Text>
                                </View>
                                <View style={[styles.tableColWidth, { width:styles.width.gram, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: styles.width.widthgram, maxWidth: styles.width.widthgram,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"GRAM"}</Text>
                                </View>
                                <View style={[styles.tableColWidth, { width:styles.width.qty, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: styles.width.widthqty, maxWidth: styles.width.widthqty, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"PIECES"}</Text>
                                </View>
                                <View style={[styles.tableColWidth, { width:styles.width.weight, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: styles.width.widthweight, maxWidth: styles.width.widthweight,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"WEIGHT(KG)"}</Text>
                                </View>
                                <View style={[styles.tableColWidth, { width:styles.width.price, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: styles.width.widthprice, maxWidth: styles.width.widthprice,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"PRICE"}</Text>
                                </View>
                                <View style={[styles.tableColWidth, { width:styles.width.subprice, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: styles.width.widthsubprice, maxWidth: styles.width.widthsubprice,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"TOTAL"}</Text>
                                </View>
                                </View>

                                {/* Items */}
                                {setItems(valuedata != null ? valuedata.items : [])}

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