import React, { Fragment, useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';
// import roboto from '../../../../components/';
import roboto from '../../../../components/Fonts/Roboto/Roboto-Bold.ttf';
import { desimal00, numToMoney, terbilang } from '../../../shared/globalFunc';

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
        widthqty:50,
        widthweight:45,
        widthprice:70,
        widthsubprice:95,
        box:'4%',
        desc:'15%',
        size:'13%',
        gram:'12%',
        qty:'11%',
        weight:'10%',
        price:'15%',
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
    tableLeftZero: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderLeftWidth:0,
        borderTopWidth:0,
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

const setItemstotal = (valuedata) =>{
    let items = valuedata.packinglist? valuedata.packinglist.items:[]
    if(items != undefined && items != null){
        let listRow = [];
        let totalPriceInUSD = 0;
        for(let i=0; i < items.length; i++){
            let det = items[i];

            totalPriceInUSD += parseFloat(det.totalprice?det.totalprice:0);
        }
        let rowItem = [];
        rowItem.push(
            <View style={[ { width:'65%', height: "25px" }]}>
                <Text style={[ { width: 440, maxWidth: 440, marginTop: '1px', fontSize: fontSizeBig }]}>{"Bank Account : "}</Text>
                <Text style={[ { width: 440, maxWidth: 440, marginTop: '1px', fontSize: fontSizeBig }]}>{valuedata.bankCompany}</Text>
                <Text style={[ { width: 440, maxWidth: 440, marginTop: '1px', fontSize: fontSizeBig }]}>{valuedata.bankAccNoCompany}</Text>
                <Text style={[ { width: 440, maxWidth: 440, marginTop: '1px', fontSize: fontSizeBig }]}>{valuedata.bankAccNameCompany}</Text>
            </View>
        );
        rowItem.push(
            <View style={[styles.tableColWidth, {borderLeftWidth:1,borderTopWidth:0,  width:styles.width.price, height: "25px" }]}>
                <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{"Total In USD"}</Text>
            </View>
        );
        rowItem.push(
            <View style={[styles.tableColWidth, { width:styles.width.subprice, height: "25px" }]}>
                <Text style={[styles.tableCell, { width: styles.width.widthsubprice, maxWidth: styles.width.widthsubprice, textAlign:'right', marginTop: '5px', fontSize: fontSizeBig }]}>{"$ "}{desimal00(numToMoney(totalPriceInUSD))}</Text>
            </View>
        );
        listRow.push(<View style={styles.tableRow}>{rowItem}</View>);

        rowItem = [];
        rowItem.push(
            <View style={[ { width:'65%', height: "25px" }]}>
                <Text style={[ { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{""}</Text>
            </View>
        );
        rowItem.push(
            <View style={[styles.tableColWidth, {borderLeftWidth:1,borderTopWidth:0,  width:styles.width.price, height: "25px" }]}>
                <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{"Kurs"}</Text>
            </View>
        );
        rowItem.push(
            <View style={[styles.tableColWidth, { width:styles.width.subprice, height: "25px" }]}>
                <Text style={[styles.tableCell, { width: styles.width.widthsubprice, maxWidth: styles.width.widthsubprice, textAlign:'right', marginTop: '5px', fontSize: fontSizeBig }]}>{'Rp '}{valuedata.kurs?desimal00(numToMoney(valuedata.kurs)):''}</Text>
            </View>
        );
        listRow.push(<View style={styles.tableRow}>{rowItem}</View>);

        rowItem = [];
        rowItem.push(
            <View style={[ { width:'65%', height: "25px" }]}>
                <Text style={[ { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{""}</Text>
            </View>
        );
        rowItem.push(
            <View style={[styles.tableColWidth, {borderLeftWidth:1,borderTopWidth:0,  width:styles.width.price, height: "25px" }]}>
                <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{"Total In IDR"}</Text>
            </View>
        );
        rowItem.push(
            <View style={[styles.tableColWidth, { width:styles.width.subprice, height: "25px" }]}>
                <Text style={[styles.tableCell, { width: styles.width.widthsubprice, maxWidth: styles.width.widthsubprice, textAlign:'right', marginTop: '5px', fontSize: fontSizeBig }]}>{"Rp "}{desimal00(numToMoney(totalPriceInUSD * parseFloat(valuedata.kurs?valuedata.kurs:1)))}</Text>
            </View>
        );
        listRow.push(<View style={styles.tableRow}>{rowItem}</View>);

        rowItem = [];
        rowItem.push(
            <View style={[ { width:'65%', height: "25px"}]}>
                <Text style={[ { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{""}</Text>
            </View>
        );
        rowItem.push(
            <View style={[ {borderLeftWidth:0,borderTopWidth:0,textAlign:'center',  width:styles.width.price, height: "25px" }]}>
                <Text style={[ { width: 200, maxWidth: 200, marginTop: '25px', fontSize: fontSizeBig }]}>{"Regards,"}</Text>
                <Text style={[ { width: 200, maxWidth: 200, marginTop: '60x', fontSize: fontSizeBig }]}>{"__________________________"}</Text>
            </View>
        );
        rowItem.push(
            <View style={[ { width:styles.width.subprice,textAlign:'left' ,height: "25px" }]}>
                <Text style={[ { width: 200, maxWidth: 200, marginTop: '65px', fontSize: fontSizeBig }]}>{""}</Text>
            </View>
        );

        listRow.push(<View style={styles.tableRow}>{rowItem}</View>);
        

        return listRow;
    }
    return null;
}
const setItems = (items) =>{
    if(items != undefined && items != null){
        let listRow = [];
        let totalQty = 0;
        let totalWeight = 0;
        let totalPrice = 0;
        let no = 1;
        for(let i=0; i < items.length; i++){
            let det = items[i];
            let rowItem = [];
            let prodName = det.productName;
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.box, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{det.box}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.desc, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{prodName}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.size, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{det.categoryProductSize}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.gram, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{det.categoryProductFromGr+'-'+det.categoryProductThruGr}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.qty, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthqty, maxWidth: styles.width.widthqty,textAlign:'right', marginTop: '5px', fontSize: fontSizeBig }]}>{det.qty}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.weight, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthweight, maxWidth: styles.width.widthweight, textAlign:'right', marginTop: '5px', fontSize: fontSizeBig }]}>{parseFloat(det.nettoweight).toFixed(2)}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.price, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthprice, maxWidth: styles.width.widthprice,textAlign:'right', marginTop: '5px', fontSize: fontSizeBig }]}>{'$ '}{det.price?desimal00(numToMoney(parseFloat(det.price))):0}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.subprice, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthsubprice, maxWidth: styles.width.widthsubprice,textAlign:'right', marginTop: '5px', fontSize: fontSizeBig }]}>{'$ '}{det.totalprice?desimal00(numToMoney(det.totalprice)):0}</Text>
                </View>
            );
            listRow.push(<View style={styles.tableRow}>{rowItem}</View>)
            totalQty += parseInt(det.qty);
            totalWeight += parseFloat(det.nettoweight);
            totalPrice += parseFloat(det.totalprice);
            no++;
        }
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
                        <View style={{ marginTop: '0px' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row-reverse' }}>
                                    <Text style={[{ fontFamily: 'roboto', fontSize: fontSizeBig, margin: '0 auto', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', width: 150, maxWidth: 150 }]}>{''}</Text>
                                </View>

                                <View style={{ flexDirection: 'row-reverse', marginLeft: '40%' }}>
                                    <Text style={{ fontSize: 7 }}>{'Edit : '}{(valuedata != null?valuedata.countEdit:'')}{' Print : '+(valuedata != null?(valuedata.countPrint?valuedata.countPrint+1:1):'')}{' Dicetak Oleh: '+(valuedata != null?valuedata.namaUser+' ,'+valuedata.currdatetime:'')}</Text>
                                </View>
                            </View>    

                            <View style={{ flexDirection: 'row',marginTop:'20px' }}>
                                <Text style={[{ fontFamily: 'roboto', fontSize: fontSizeBig, margin: '0 auto', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }]}>{valuedata != null ? valuedata.companyName : ''}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[{ fontSize: fontSizeBig, margin: '0 auto', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }]}>{valuedata != null ? valuedata.address1 : ''}</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[{ fontSize: fontSizeBig, margin: '0 auto', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }]}>{valuedata != null ? valuedata.address2 : ''}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row-reverse' }}>
                                <Text style={[{ fontSize: fontSizeBig, margin: '0 auto', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', width: 250, maxWidth: 250 }]}>{valuedata != null ? valuedata.address3 : ''}</Text>
                            </View>
                            <View style={{ flexDirection: 'row-reverse', marginLeft: '20%' }}>
                            <Text style={[{ fontFamily: 'roboto', fontSize: 14 }]}>{'SALES INVOICE'}</Text>
                            </View>

                            </View>

                            <View style={{ flexDirection: 'row',paddingTop:'10px' }}>
                                <View style={{ flexDirection: 'row-reverse' }}>
                                    <Text style={[{ margin: '0 auto', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', width: 340, maxWidth: 340 }]}>{'Customer  : '}{valuedata != null ? (valuedata.packinglist?valuedata.packinglist.customerName:'') : ''}</Text>
                                </View>
    
                                <View style={{ flexDirection: 'row-reverse', marginLeft: '3%' }}>
                                    <Text style={{ fontSize: fontSizeBig }}>{'Invoice Number : '}{valuedata != null ? valuedata.nodocument : ''}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row'}}>
                                <View style={{ flexDirection: 'row-reverse' }}>
                                    <Text style={[{ margin: '0 auto', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', width: 250, maxWidth: 250 }]}>{'Address  : '}{valuedata != null ? (valuedata.packinglist?valuedata.packinglist.customerAddress:'') : ''}</Text>
                                </View>
    
                                <View style={{ flexDirection: 'row-reverse', marginLeft: '20%' }}>
                                    <Text style={{ fontSize: fontSizeBig }}>{'Invoice Date : '}{valuedata != null ? valuedata.date : ''}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row'}}>
                                <View style={{ flexDirection: 'row-reverse' }}>
                                    <Text style={[{ margin: '0 auto', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', width: 250, maxWidth: 250 }]}>{'Phone  : '}{valuedata != null ? valuedata.phone : ''}</Text>
                                </View>
    
                                <View style={{ flexDirection: 'row-reverse', marginLeft: '20%' }}>
                                    <Text style={{ fontSize: fontSizeBig }}>{'Flight Number : '}{valuedata != null ? (valuedata.packinglist?valuedata.packinglist.flightnumber:'') : ''}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row'}}>
                                <View style={{ flexDirection: 'row-reverse' }}>
                                    <Text style={[{ margin: '0 auto', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', width: 250, maxWidth: 250 }]}>{'ATTN  : '}{valuedata != null ? (valuedata.packinglist?valuedata.packinglist.attention:'') : ''}</Text>
                                </View>
    
                                <View style={{ flexDirection: 'row-reverse', marginLeft: '20%' }}>
                                    <Text style={{ fontSize: fontSizeBig }}>{'AWB : '}{valuedata != null ? (valuedata.packinglist?valuedata.packinglist.awbnumber:'') : ''}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row'}}>
                                <View style={{ flexDirection: 'row-reverse' }}>
                                    <Text style={[{ margin: '0 auto', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', width: 250, maxWidth: 250 }]}>{''}</Text>
                                </View>
    
                                <View style={{ flexDirection: 'row-reverse', marginLeft: '20%' }}>
                                    <Text style={{ fontSize: fontSizeBig }}>{'Collie : '}{valuedata != null ? (valuedata.packinglist?valuedata.packinglist.koli:'') : ''}</Text>
                                </View>
                            </View>

                            
                            <View style={styles.table}>
                                <View style={styles.tableRow}>
                                <View style={[styles.tableColWidth, { width:styles.width.box, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{"No"}</Text>
                                </View>
                                <View style={[styles.tableColWidth, { width:styles.width.desc, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: 70, maxWidth: 70, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Description"}</Text>
                                </View>
                                <View style={[styles.tableColWidth, { width:styles.width.size, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: 65, maxWidth: 65, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Size"}</Text>
                                </View>
                                <View style={[styles.tableColWidth, { width:styles.width.gram, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: 55, maxWidth: 55, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Gram"}</Text>
                                </View>
                                <View style={[styles.tableColWidth, { width:styles.width.qty, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: styles.width.widthqty, maxWidth: styles.width.widthqty,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Qty(Pcs)"}</Text>
                                </View>
                                <View style={[styles.tableColWidth, { width:styles.width.weight, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: styles.width.widthweight, maxWidth: styles.width.widthweight, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Weight"}</Text>
                                </View>
                                <View style={[styles.tableColWidth, { width:styles.width.price, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: styles.width.widthprice, maxWidth: styles.width.widthprice,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Unit Price"}</Text>
                                </View>
                                <View style={[styles.tableColWidth, { width:styles.width.subprice, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: styles.width.widthsubprice, maxWidth: styles.width.widthsubprice,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Total"}</Text>
                                </View>
                                </View>

                                {/* Items */}
                                {setItems(valuedata != null ? (valuedata.packinglist? valuedata.packinglist.items:'') : [])}

                            </View>

                            <View style={styles.tableLeftZero}>
                            {setItemstotal(valuedata != null ? valuedata : [])}
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