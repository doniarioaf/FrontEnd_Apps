import React, { Fragment, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
// import roboto from '../../../../components/';
import roboto from '../../../../components/Fonts/Roboto/Roboto-Bold.ttf';
import { numToMoney } from '../../../shared/globalFunc';
import { LisTime } from '../add';

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

        widthtime:70,
        time:"10%",
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
    tableHidup: {
        display: "table",
        width: "300px",
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

    tableCellHidup: {
        // margin: "auto", 
        marginLeft: 3,
        marginTop: 5,
        fontSize: fontSizeMedium,
        maxWidth: "20%"
    },
    title: { fontFamily: 'roboto', fontWeight: 600 },
});

const setItemsHidupAllCP = (items, valueheader) =>{
    if(items != undefined && items != null){
        let listRow = [];
        let listCP = valueheader.listcp?valueheader.listcp:[];
        
        let jarakPer1Persen = 5;

        let timeNumber = 13;
        
        let qtyNumber = 50;
        let qtyPersen = qtyNumber+"%";

        let totalNumber = (100 - timeNumber) - (qtyNumber * listCP.length);
        let widthtotal = jarakPer1Persen * totalNumber;

        let rowItem = [];      

        rowItem.push(
        <View style={[styles.tableColWidth, { width:qtyPersen, height: "25px" }]}>
            <Text style={[styles.tableCellHidup, { fontFamily: 'roboto',width: widthtotal, maxWidth: widthtotal, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{'Category Product'}</Text>
        </View>
        );

        rowItem.push(
        <View style={[styles.tableColWidth, { width:qtyPersen, height: "25px" }]}>
            <Text style={[styles.tableCellHidup, { fontFamily: 'roboto',width: widthtotal, maxWidth: widthtotal, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{'Qty'}</Text>
        </View>
        );

        listRow.push(<View style={styles.tableRow}>{rowItem}</View>)
        let listfilteroutput = items;
        let totalCP = 0;
        for(let i=0; i < listCP.length; i++){
            let det = listCP[i];
            let idCP = det.id;
            rowItem = [];
            rowItem.push(
            <View style={[styles.tableColWidth, { width:qtyPersen, height: "25px" }]}>
                <Text style={[styles.tableCellHidup, { width: widthtotal, maxWidth: widthtotal, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.size}</Text>
            </View>
            );

            let listfilteroutputByID = listfilteroutput.filter(output => output.idcategoryproduct === parseInt(idCP));
            let qty = 0;
             if(listfilteroutputByID.length > 0){
                let detJ = listfilteroutputByID[0];
                qty = parseInt(detJ.qty)
                totalCP += qty;
             }
            rowItem.push(
            <View style={[styles.tableColWidth, { width:qtyPersen, height: "25px" }]}>
                <Text style={[styles.tableCellHidup, { width: widthtotal, maxWidth: widthtotal, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{numToMoney(qty)}</Text>
            </View>
            );
            listRow.push(<View style={styles.tableRow}>{rowItem}</View>)
        };
        rowItem = [];
        rowItem.push(
        <View style={[styles.tableColWidth, { width:qtyPersen, height: "25px" }]}>
            <Text style={[styles.tableCellHidup, { fontFamily: 'roboto',width: widthtotal, maxWidth: widthtotal, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{'Total'}</Text>
        </View>
        );

        rowItem.push(
        <View style={[styles.tableColWidth, { width:qtyPersen, height: "25px" }]}>
            <Text style={[styles.tableCellHidup, { fontFamily: 'roboto',width: widthtotal, maxWidth: widthtotal, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{numToMoney(totalCP)}</Text>
        </View>
        );

        listRow.push(<View style={styles.tableRow}>{rowItem}</View>)
        return listRow;
    };
    return null;
}
const setItemsAllCP = (items, valueheader) =>{
    
    if(items != undefined && items != null){
        let listRow = [];
        let distinctID = [];
        let grandTotal = [];
        let listCP = valueheader.listcp?valueheader.listcp:[];
        let type = valueheader.type;
        let listmappingstock = valueheader.mappingstock?valueheader.mappingstock:[];
        for(let i=0; i < listCP.length; i++){
            let det = listCP[i];
            grandTotal.push({idcategoryproduct:det.id, grandtotal:0});
        }
        let jarakPer1Persen = 5;

        let timeNumber = 13;
        let timePersen = timeNumber+"%";
        let widthtime = jarakPer1Persen * timeNumber;

        let qtyNumber = 8;
        let qtyPersen = qtyNumber+"%";
        let widthqty = jarakPer1Persen * qtyNumber;

        let totalNumber = (100 - timeNumber) - (qtyNumber * listCP.length);
        let totalPersen = totalNumber+"%";
        let widthtotal = jarakPer1Persen * totalNumber;


        let rowItem = [];
        if(listCP.length > 0){
            grandTotal.push({idcategoryproduct:'total', grandtotal:0});
            rowItem.push(
                <View style={[styles.tableColWidth, { width:timePersen, height: "25px" }]}>
                    <Text style={[styles.tableCell, {fontFamily: 'roboto', width: widthtime, maxWidth: widthtime, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Waktu"}</Text>
                </View>
            );
        }
        
        for(let i=0; i < listCP.length; i++){
            let det = listCP[i];
            rowItem.push(
                <View style={[styles.tableColWidth, { width:qtyPersen, height: "25px" }]}>
                    <Text style={[styles.tableCell, {fontFamily: 'roboto', width: widthqty, maxWidth: widthqty, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.size}</Text>
                </View>
            );
        };

        rowItem.push(
        <View style={[styles.tableColWidth, { width:totalPersen, height: "25px" }]}>
            <Text style={[styles.tableCell, { fontFamily: 'roboto',width: widthtotal, maxWidth: widthtotal, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{'Total'}</Text>
        </View>
        );

        listRow.push(<View style={styles.tableRow}>{rowItem}</View>)

        let timeIsDone = [];
        for(let i=0; i < LisTime.length; i++){
            let rowItem = [];
            let det = LisTime[i];
            let stocktime = det.value?det.value:'';
            
            rowItem.push(
                <View style={[styles.tableColWidth, { width:timePersen, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: widthtime, maxWidth: widthtime, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{stocktime}</Text>
                </View>
            );
            if(timeIsDone.indexOf(stocktime) == -1){
                let listfilteroutput = items.filter(output => output.stocktime == stocktime);
                let totalQtyRowTime = 0;
                if(listCP.length > 0){
                    for(let j=0; j < listCP.length; j++){
                        let detCP = listCP[j];
                        let idCP = '';
                        // let listfilteroutputMappingStock = listmappingstock.filter(output => output.categoryproductidmapping == detCP.id);
                        // if(listfilteroutputMappingStock.length > 0){
                        //     idCP = listfilteroutputMappingStock[0].categoryproductid;
                        // }else{
                        //     idCP = detCP.id;    
                        // }
                        idCP = detCP.id;

                        let listfilteroutputByID = listfilteroutput.filter(output => output.idcategoryproduct === parseInt(idCP));
                        if(listfilteroutputByID.length > 0){
                            let detJ = listfilteroutputByID[0];
                            totalQtyRowTime += parseInt(detJ.qty);

                            let indexItems = grandTotal.findIndex(obj => obj.idcategoryproduct == detCP.id);
                            let grandTotalitems = grandTotal[indexItems]['grandtotal'];
                            grandTotalitems += parseInt(detJ.qty);

                            grandTotal[indexItems]['grandtotal'] = grandTotalitems;

                            rowItem.push(
                                <View style={[styles.tableColWidth, { width:qtyPersen, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: widthqty, maxWidth: widthqty, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{detJ.qty}</Text>
                                </View>
                            );
                        }else{
                            rowItem.push(
                                <View style={[styles.tableColWidth, { width:qtyPersen, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: widthqty, maxWidth: widthqty, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{0}</Text>
                                </View>
                            );
                        };
                    };
                };
                let indexItems = grandTotal.findIndex(obj => obj.idcategoryproduct == 'total');
                let grandTotalitems = grandTotal[indexItems]['grandtotal'];
                grandTotalitems += parseInt(totalQtyRowTime);

                grandTotal[indexItems]['grandtotal'] = grandTotalitems;
                rowItem.push(
                <View style={[styles.tableColWidth, { width:totalPersen, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: widthtotal, maxWidth: widthtotal, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{totalQtyRowTime}</Text>
                </View>
                );
                timeIsDone.push(stocktime);
                listRow.push(<View style={styles.tableRow}>{rowItem}</View>)
            };
        };

        if(listRow.length > 1){
            rowItem = [];
            rowItem.push(
                <View style={[styles.tableColWidth, { width:timePersen, height: "25px" }]}>
                    <Text style={[styles.tableCell, {fontFamily: 'roboto', width: widthtime, maxWidth: widthtime, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{'Total'}</Text>
                </View>
            );
            for(let i=0; i < listCP.length; i++){
                let detCP = listCP[i];
                let listfilteroutput = grandTotal.filter(output => output.idcategoryproduct == detCP.id);
                if(listfilteroutput.length > 0){
                    let det = listfilteroutput[0];
                    rowItem.push(
                        <View style={[styles.tableColWidth, { width:qtyPersen, height: "25px" }]}>
                            <Text style={[styles.tableCell, {fontFamily: 'roboto', width: widthqty, maxWidth: widthqty, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.grandtotal}</Text>
                        </View>
                    );
                };
            };
            let grandTotalTotal = 0;
            let listfilteroutput = grandTotal.filter(output => output.idcategoryproduct == 'total');
            if(listfilteroutput.length > 0){
                grandTotalTotal = listfilteroutput[0].grandtotal;
            }
            rowItem.push(
            <View style={[styles.tableColWidth, { width:totalPersen, height: "25px" }]}>
                <Text style={[styles.tableCell, {fontFamily: 'roboto', width: widthtotal, maxWidth: widthtotal, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{grandTotalTotal}</Text>
            </View>
            );
            listRow.push(<View style={styles.tableRow}>{rowItem}</View>)
        }

        return listRow;

    };
    return null;
}

const setItemsCP = (items, valueheader) =>{
    if(valueheader.type == 'H'){
        return setItemsHidupAllCP(items,valueheader);
    }else if(valueheader.type == 'M'){
        return setItemsAllCP(items,valueheader);
    }
}
const setItems = (items) =>{
    if(items != undefined && items != null){
        let listRow = [];
        let distinctID = [];
        let grandTotal = [];
        for(let i=0; i < items.length; i++){
            let det = items[i];
            let key = det.idcategoryproduct;
            if(distinctID.indexOf(key) == -1){
                distinctID.push(key);
                grandTotal.push({idcategoryproduct:key, grandtotal:0});
            }
        }
        let jarakPer1Persen = 5;

        let timeNumber = 13;
        let timePersen = timeNumber+"%";
        let widthtime = jarakPer1Persen * timeNumber;

        let qtyNumber = 8;
        let qtyPersen = qtyNumber+"%";
        let widthqty = jarakPer1Persen * qtyNumber;

        let totalNumber = (100 - timeNumber) - (qtyNumber * distinctID.length);
        let totalPersen = totalNumber+"%";
        let widthtotal = jarakPer1Persen * totalNumber;


        let rowItem = [];
        if(distinctID.length > 0){
            grandTotal.push({idcategoryproduct:'total', grandtotal:0});
            rowItem.push(
                <View style={[styles.tableColWidth, { width:timePersen, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: widthtime, maxWidth: widthtime, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Waktu"}</Text>
                </View>
            );
        }
        
        for(let i=0; i < distinctID.length; i++){
            let listfilteroutput = items.filter(output => output.idcategoryproduct == distinctID[i]);
            if(listfilteroutput.length > 0){
                let det = listfilteroutput[0];
                rowItem.push(
                    <View style={[styles.tableColWidth, { width:qtyPersen, height: "25px" }]}>
                        <Text style={[styles.tableCell, { width: widthqty, maxWidth: widthqty, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.size}</Text>
                    </View>
                );
            };
        };

        rowItem.push(
        <View style={[styles.tableColWidth, { width:totalPersen, height: "25px" }]}>
            <Text style={[styles.tableCell, { width: widthtotal, maxWidth: widthtotal, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{'Total'}</Text>
        </View>
        );

        listRow.push(<View style={styles.tableRow}>{rowItem}</View>)

        let timeIsDone = [];
        for(let i=0; i < items.length; i++){
            let rowItem = [];
            let det = items[i];
            let stocktime = det.stocktime?det.stocktime:'';
            
            rowItem.push(
                <View style={[styles.tableColWidth, { width:timePersen, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: widthtime, maxWidth: widthtime, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{stocktime}</Text>
                </View>
            );

            if(timeIsDone.indexOf(stocktime) == -1){
                let listfilteroutput = items.filter(output => output.stocktime == stocktime);
                let totalQtyRowTime = 0;
                if(distinctID.length > 0){
                    for(let j=0; j < distinctID.length; j++){
                        let listfilteroutputByID = listfilteroutput.filter(output => output.idcategoryproduct == distinctID[j]);
                        if(listfilteroutputByID.length > 0){
                            let detJ = listfilteroutputByID[0];
                            totalQtyRowTime += parseInt(detJ.qty);

                            let indexItems = grandTotal.findIndex(obj => obj.idcategoryproduct == distinctID[j]);
                            let grandTotalitems = grandTotal[indexItems]['grandtotal'];
                            grandTotalitems += parseInt(detJ.qty);

                            grandTotal[indexItems]['grandtotal'] = grandTotalitems;

                            rowItem.push(
                                <View style={[styles.tableColWidth, { width:qtyPersen, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: widthqty, maxWidth: widthqty, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{detJ.qty}</Text>
                                </View>
                            );
                        }else{
                            rowItem.push(
                                <View style={[styles.tableColWidth, { width:qtyPersen, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: widthqty, maxWidth: widthqty, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{0}</Text>
                                </View>
                            );
                        };
                    };
                };
                let indexItems = grandTotal.findIndex(obj => obj.idcategoryproduct == 'total');
                let grandTotalitems = grandTotal[indexItems]['grandtotal'];
                grandTotalitems += parseInt(totalQtyRowTime);

                grandTotal[indexItems]['grandtotal'] = grandTotalitems;
                rowItem.push(
                <View style={[styles.tableColWidth, { width:totalPersen, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: widthtotal, maxWidth: widthtotal, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{totalQtyRowTime}</Text>
                </View>
                );
                timeIsDone.push(stocktime);
                listRow.push(<View style={styles.tableRow}>{rowItem}</View>)
            };
        };

        if(listRow.length > 1){
            rowItem = [];
            rowItem.push(
                <View style={[styles.tableColWidth, { width:timePersen, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: widthtime, maxWidth: widthtime, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{'Total'}</Text>
                </View>
            );
            for(let i=0; i < distinctID.length; i++){
                let listfilteroutput = grandTotal.filter(output => output.idcategoryproduct == distinctID[i]);
                if(listfilteroutput.length > 0){
                    let det = listfilteroutput[0];
                    rowItem.push(
                        <View style={[styles.tableColWidth, { width:qtyPersen, height: "25px" }]}>
                            <Text style={[styles.tableCell, { width: widthqty, maxWidth: widthqty, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.grandtotal}</Text>
                        </View>
                    );
                };
            };
            let grandTotalTotal = 0;
            let listfilteroutput = grandTotal.filter(output => output.idcategoryproduct == 'total');
            if(listfilteroutput.length > 0){
                grandTotalTotal = listfilteroutput[0].grandtotal;
            }
            rowItem.push(
            <View style={[styles.tableColWidth, { width:totalPersen, height: "25px" }]}>
                <Text style={[styles.tableCell, { width: widthtotal, maxWidth: widthtotal, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{grandTotalTotal}</Text>
            </View>
            );
            listRow.push(<View style={styles.tableRow}>{rowItem}</View>)
        }

        return listRow;

    };
    return null;
}

const GenerateStockUdangMati = ({ valuedata }) => {
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
                                    <Text style={{ fontSize: 7 }}>{'Edit : '}{(valuedata != null?valuedata.countEdit:'')}{' Print : '+(valuedata != null?(valuedata.countPrint?valuedata.countPrint:0):'')}{' Dicetak Oleh: '+(valuedata != null?valuedata.namaUser+' ,'+valuedata.currdatetime:'')}</Text>
                                </View>
                            </View>


                            <View style={{ flexDirection: 'row',paddingTop:'20px'}}>
                            <View style={{ flexDirection: 'row-reverse' }}>
                                <Image source={"img/logoheaderpdf.png"} style={{width:'200px',height:'100px'}}/>
                            </View>

                            <View style={{ flexDirection: 'row-reverse', paddingTop: '0px' }}>
                            <View style={[styles.tableNoBorder,{marginLeft:'0px'}]}>
                            <View style={styles.tableRow}>

                            <View style={[styles.tableColWidthNoBorder, {  height: "50px",marginBottom:'80px',marginLeft:'100px' }]}>
                                <Text style={[{ width: styles.width.widthno, maxWidth: styles.width.widthno, marginTop: '5px', fontSize: 18,marginLeft:'8px' }]}>{valuedata != null?(valuedata.type == "H"?"Form Udang Hidup Di Kolam":"Form Udang Mati Di Kolam"):"Form Udang"}</Text>

                            <View style={[styles.tableNoBorder]}>
                            <View style={styles.tableRow}>
                            <View style={[styles.tableColWidth, { borderLeft:1,borderTop:1,width:"53%", height: "60px" }]}>
                                <Text style={[styles.tableCell, { width: 10, maxWidth: 10, marginTop: '5px', fontSize: fontSizeBig }]}>
                                    {"Dibuat Oleh :"}{valuedata != null?valuedata.createdbyName:''}
                                </Text>
                                <Text style={[styles.tableCell, { width: 10, maxWidth: 10, marginTop: '5px', fontSize: fontSizeBig }]}>
                                    {"Tanggal :"}{valuedata != null?valuedata.date:''}
                                </Text>
                            </View>
                            <View style={[styles.tableColWidthNoBorder, { borderBottom:0,borderTop:0,width:"47%", height: "60px" }]}>
                                <Text style={[styles.tableCell, { width: 100, maxWidth: 100, marginTop: '5px', fontSize: fontSizeBig }]}>{""}</Text>
                            </View>
                            </View>
                            </View>
                                
                            </View>
                            
                            </View>
                            </View>
                            
                            </View>    

                            </View>
                            
                            <Text style={{ fontSize: fontSizeMedium }}>{"Note : "}{valuedata != null ?valuedata.note:""}</Text>
                            {
                                valuedata != null ?
                                valuedata.type == 'M'?
                                <View style={[styles.table,{marginTop:'0px'}]}>
                                
                                {/* {setItems(valuedata != null ? valuedata.items : [])} */}
                                {setItemsAllCP((valuedata != null ? valuedata.items : []),(valuedata != null ? valuedata : []))}
                                
                                </View>
                                :
                                
                                <View style={[styles.tableHidup,{marginTop:'0px'}]}>
                                
                                {/* {setItems(valuedata != null ? valuedata.items : [])} */}
                                {setItemsHidupAllCP((valuedata != null ? valuedata.items : []),(valuedata != null ? valuedata : []))}
                                
                                </View>

                                :''
                            }
                            {/* <View style={[styles.table,{marginTop:'0px'}]}>
                            {setItemsCP((valuedata != null ? valuedata.items : []),(valuedata != null ? valuedata : []))}
                            </View> */}

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
export default GenerateStockUdangMati;