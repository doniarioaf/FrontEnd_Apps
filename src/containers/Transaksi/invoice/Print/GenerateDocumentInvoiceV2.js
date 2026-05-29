import React, { Fragment, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
// import roboto from '../../../../components/';
import roboto from '../../../../components/Fonts/Roboto/Roboto-Bold.ttf';
import robotoitalic from '../../../../components/Fonts/Roboto/Roboto-BoldItalic.ttf';
import robotononbolditalic from '../../../../components/Fonts/Roboto/Roboto-Italic.ttf';
import { convertGramToKG, desimal00, desimal000, formatRupiah, numToMoney, pembulatanNilai, terbilangRupiah } from '../../../shared/globalFunc';
// import { addKurungBukaPadaValue } from '../utilityPurchaseReceive';

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
        widthnamabarang:90,
        widthukuran:45,
        widthgram:45,
        widthkuantitas:50,
        widthharga:60,
        widthjumlah:72,
        widthweightkg:48,
        widthnoofbox:48,
        no:'5%',
        namabarang:'18%',
        ukuran:'9%',
        gram:'10%',
        kuantitas:'11%',
        harga:'13%',
        jumlah:'15%',
        weightkg:'10%',
        noofbox:'9%',

        widthattnandcountryorigin:110,
        widthcodeandcountryfinal:90,
        widthflightnoandcollie:50,
        widthabwandnettokg:96,
        widthpackinglistnoanddate:148,
        attnandcountryorigin:"23%",
        codeandcountryfinal:"19%",
        flightnoandcollie:"11%",
        abwandnettokg:"19%",
        packinglistnoanddate:"28%",

        // widthno+widthnamabarang+widthukuran+widthgram
        widthtotal:190,
        total:"42%",

        // widthno+widthnamabarang+widthukuran+widthgram+widthkuantitas+widthweightkg+widthnoofbox
        widthkurs:190,
        kurs:"72%",

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

const convertkg = (value) =>{
    let totalnetto = value;
        totalnetto = convertGramToKG({nilaigr:totalnetto});
        totalnetto = pembulatanNilai(totalnetto,{isdown:false,numberdesimal:1});

    return totalnetto;
}

const calcNettoHeader = (value) =>{
    
    let packinglist = value.packinglist;
    let items = packinglist.items;

    let listfilteroutput = items;
    let totalnetto = 0;
    for(let i=0; i < listfilteroutput.length; i++){
        let det = listfilteroutput[i];
        let nettoweight = det.nettoweight?det.nettoweight:0;
            // nettoweight = convertkg(nettoweight);

        //kenapa totalan netto tidak ambil dari value.netto / total netto header karena ketika gr convert ke kg terjadi pembulatan sehingga ketika netto header di convert ke kg menjadi tidak sama desimal nya
        totalnetto += nettoweight;
    }
    
    return totalnetto;
}

const getMaxBox = (value) =>{
    //ambil box yang paling
    let packinglist = value.packinglist;
    let items = packinglist.items;

    let listfilteroutput = items;
    // let totalnetto = 0;
    let valBox = 0;
    for(let i=0; i < listfilteroutput.length; i++){
        let det = listfilteroutput[i];
        let box = det.box?det.box:0;
        if(parseInt(box) > valBox){
            valBox = parseInt(box);
        }
    }
    
    return valBox;
}

// ─── Pagination constants (Invoice) ───────────────────────────────────────────
const ITEMS_SINGLE_PAGE_INV    = 13;
const ITEMS_MAX_FIRST_PAGE_INV = 17;
const ITEMS_PER_NEXT_PAGE_INV  = 23;

const calcFirstPageCountInv = (total) => {
    if (total <= ITEMS_SINGLE_PAGE_INV) return total;
    return Math.min(total - 1, ITEMS_MAX_FIRST_PAGE_INV);
};

const isSinglePageInv = (total) => total <= ITEMS_SINGLE_PAGE_INV;

// ─── Helper: satu baris item (Invoice) ────────────────────────────────────────
const buildItemRowInv = (det, no) => {
    const qty         = det.qty         ? det.qty         : 0;
    const nettoweight = det.nettoweight ? det.nettoweight : 0;
    const heightVal   = "25px";
    return (
        <View style={[styles.tableRow]}>
            <View style={[styles.tableColWidth, { width:styles.width.no, height:heightVal }]}>
                <Text style={[styles.tableCell, { width:styles.width.widthno, maxWidth:styles.width.widthno, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{no}</Text>
            </View>
            <View style={[styles.tableColWidth, { width:styles.width.namabarang, height:heightVal }]}>
                <Text style={[styles.tableCell, { width:styles.width.widthnamabarang, maxWidth:styles.width.widthnamabarang, textAlign:'center', marginTop:'5px', fontSize:9 }]}>{det.productName}</Text>
            </View>
            <View style={[styles.tableColWidth, { width:styles.width.ukuran, height:heightVal }]}>
                <Text style={[styles.tableCell, { width:styles.width.widthukuran, maxWidth:styles.width.widthukuran, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{det.categoryProductSize}</Text>
            </View>
            <View style={[styles.tableColWidth, { width:styles.width.gram, height:heightVal }]}>
                <Text style={[styles.tableCell, { width:styles.width.widthgram, maxWidth:styles.width.widthgram, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{det.categoryProductFromGr+' - '+det.categoryProductThruGr}</Text>
            </View>
            <View style={[styles.tableColWidth, { width:styles.width.kuantitas, height:heightVal }]}>
                <Text style={[styles.tableCell, { width:styles.width.widthkuantitas, maxWidth:styles.width.widthkuantitas, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{qty}</Text>
            </View>
            <View style={[styles.tableColWidth, { width:styles.width.weightkg, height:heightVal }]}>
                <Text style={[styles.tableCell, { width:styles.width.widthweightkg, maxWidth:styles.width.widthweightkg, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{formatRupiah(new String(nettoweight).replaceAll('.',','),1)}</Text>
            </View>
            <View style={[styles.tableColWidth, { width:styles.width.noofbox, height:heightVal }]}>
                <Text style={[styles.tableCell, { width:styles.width.widthnoofbox, maxWidth:styles.width.widthnoofbox, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{det.box}</Text>
            </View>
            <View style={[styles.tableColWidth, { width:styles.width.harga, height:heightVal }]}>
                <Text style={[styles.tableCell, { width:styles.width.widthharga, maxWidth:styles.width.widthharga, textAlign:'right', marginTop:'5px', fontSize:fontSizeBig }]}>{det.price?desimal00(formatRupiah(new String(det.price).replaceAll('.',','),2)):0}</Text>
            </View>
            <View style={[styles.tableColWidth, { width:styles.width.jumlah, height:heightVal }]}>
                <Text style={[styles.tableCell, { width:styles.width.widthjumlah, maxWidth:styles.width.widthjumlah, textAlign:'right', marginTop:'5px', fontSize:fontSizeBig }]}>{det.totalprice?formatRupiah(new String(det.totalprice).replaceAll('.',','),1):0}</Text>
            </View>
        </View>
    );
};

// ─── Helper: baris Total + Kurs + Total In IDR (Invoice) ──────────────────────
const buildTotalRowsInv = (totalQty, totalnetto, totalSubtotalPrice, value) => (
    <Fragment>
        <View style={styles.tableRow}>
            <View style={[styles.tableColWidth, { width:styles.width.total, height:"25px" }]}>
                <Text style={[styles.tableCell, { fontFamily:'robotoitalic', width:styles.width.widthtotal, maxWidth:styles.width.widthtotal, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{'Total'}</Text>
            </View>
            <View style={[styles.tableColWidth, { width:styles.width.kuantitas, height:"25px" }]}>
                <Text style={[styles.tableCell, { width:styles.width.widthkuantitas, maxWidth:styles.width.widthkuantitas, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{totalQty}</Text>
            </View>
            <View style={[styles.tableColWidth, { width:styles.width.weightkg, height:"25px" }]}>
                <Text style={[styles.tableCell, { width:styles.width.widthweightkg, maxWidth:styles.width.widthweightkg, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{formatRupiah(new String(totalnetto).replaceAll('.',','),1)}</Text>
            </View>
            <View style={[styles.tableColWidth, { width:styles.width.noofbox, height:"25px" }]}>
                <Text style={[styles.tableCell, { width:styles.width.widthnoofbox, maxWidth:styles.width.widthnoofbox, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{getMaxBox(value)}</Text>
            </View>
            <View style={[styles.tableColWidth, { borderRight:0, width:styles.width.harga, height:"25px" }]}>
                <Text style={[styles.tableCell, { width:styles.width.widthharga, maxWidth:styles.width.widthharga, textAlign:'left', marginTop:'5px', fontSize:fontSizeBig }]}>{'USD'}</Text>
            </View>
            <View style={[styles.tableColWidth, { width:styles.width.jumlah, height:"25px" }]}>
                <Text style={[styles.tableCell, { width:styles.width.widthjumlah, maxWidth:styles.width.widthjumlah, textAlign:'right', marginTop:'5px', fontSize:fontSizeBig }]}>{formatRupiah(new String(totalSubtotalPrice).replaceAll('.',','),1)}</Text>
            </View>
        </View>
        <View style={styles.tableRow}>
            <View style={[styles.tableColWidth, { width:styles.width.kurs, height:"25px" }]}>
                <Text style={[styles.tableCell, { fontFamily:'robotoitalic', width:styles.width.widthkurs, maxWidth:styles.width.widthkurs, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{'Kurs'}</Text>
            </View>
            <View style={[styles.tableColWidth, { borderRight:0, width:styles.width.harga, height:"25px" }]}>
                <Text style={[styles.tableCell, { width:styles.width.widthharga, maxWidth:styles.width.widthharga, textAlign:'left', marginTop:'5px', fontSize:fontSizeBig }]}>{'IDR'}</Text>
            </View>
            <View style={[styles.tableColWidth, { width:styles.width.jumlah, height:"25px" }]}>
                <Text style={[styles.tableCell, { width:styles.width.widthjumlah, maxWidth:styles.width.widthjumlah, textAlign:'right', marginTop:'5px', fontSize:fontSizeBig }]}>{value.kurs?formatRupiah(new String(value.kurs).replaceAll('.',','),1):0}</Text>
            </View>
        </View>
        <View style={styles.tableRow}>
            <View style={[styles.tableColWidth, { width:styles.width.kurs, height:"25px" }]}>
                <Text style={[styles.tableCell, { fontFamily:'robotoitalic', width:styles.width.widthkurs, maxWidth:styles.width.widthkurs, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{'Total In IDR'}</Text>
            </View>
            <View style={[styles.tableColWidth, { borderRight:0, width:styles.width.harga, height:"25px" }]}>
                <Text style={[styles.tableCell, { width:styles.width.widthharga, maxWidth:styles.width.widthharga, textAlign:'left', marginTop:'5px', fontSize:fontSizeBig }]}>{'IDR'}</Text>
            </View>
            <View style={[styles.tableColWidth, { width:styles.width.jumlah, height:"25px" }]}>
                <Text style={[styles.tableCell, { width:styles.width.widthjumlah, maxWidth:styles.width.widthjumlah, textAlign:'right', marginTop:'5px', fontSize:fontSizeBig }]}>{value.kurs?formatRupiah(new String(totalSubtotalPrice * value.kurs).replaceAll('.',','),1):0}</Text>
            </View>
        </View>
    </Fragment>
);

// ─── Helper: header kolom (Invoice) ───────────────────────────────────────────
const buildColumnHeaderInv = () => (
    <View style={styles.tableRow}>
        <View style={[styles.tableColWidth, { fontFamily:'roboto', backgroundColor:'#bcd6ed', width:styles.width.no, height:"38px" }]}>
            <Text style={[styles.tableCell, { width:styles.width.widthno, maxWidth:styles.width.widthno, marginTop:'5px', fontSize:fontSizeBig }]}>{"No"}</Text>
        </View>
        <View style={[styles.tableColWidth, { fontFamily:'roboto', backgroundColor:'#bcd6ed', width:styles.width.namabarang, height:"38px" }]}>
            <Text style={[styles.tableCell, { width:styles.width.widthnamabarang, maxWidth:styles.width.widthnamabarang, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{"Description \n"}{"Of Goods"}</Text>
        </View>
        <View style={[styles.tableColWidth, { fontFamily:'roboto', backgroundColor:'#bcd6ed', width:styles.width.ukuran, height:"38px" }]}>
            <Text style={[styles.tableCell, { width:styles.width.widthukuran, maxWidth:styles.width.widthukuran, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{"Size"}</Text>
        </View>
        <View style={[styles.tableColWidth, { fontFamily:'roboto', backgroundColor:'#bcd6ed', width:styles.width.gram, height:"38px" }]}>
            <Text style={[styles.tableCell, { width:styles.width.widthgram, maxWidth:styles.width.widthgram, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{"Gram"}</Text>
        </View>
        <View style={[styles.tableColWidth, { fontFamily:'roboto', backgroundColor:'#bcd6ed', width:styles.width.kuantitas, height:"38px" }]}>
            <Text style={[styles.tableCell, { width:styles.width.widthkuantitas, maxWidth:styles.width.widthkuantitas, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{"Qty (Pcs)"}</Text>
        </View>
        <View style={[styles.tableColWidth, { fontFamily:'roboto', backgroundColor:'#bcd6ed', width:styles.width.weightkg, height:"38px" }]}>
            <Text style={[styles.tableCell, { width:styles.width.widthweightkg, maxWidth:styles.width.widthweightkg, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{"Weight Kg"}</Text>
        </View>
        <View style={[styles.tableColWidth, { fontFamily:'roboto', backgroundColor:'#bcd6ed', width:styles.width.noofbox, height:"38px" }]}>
            <Text style={[styles.tableCell, { width:styles.width.widthnoofbox, maxWidth:styles.width.widthnoofbox, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{"No. Of\n"}{"Boxes"}</Text>
        </View>
        <View style={[styles.tableColWidth, { fontFamily:'roboto', backgroundColor:'#bcd6ed', width:styles.width.harga, height:"38px" }]}>
            <Text style={[styles.tableCell, { width:styles.width.widthharga, maxWidth:styles.width.widthharga, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{"Unit Price\n"}{"(USD)"}</Text>
        </View>
        <View style={[styles.tableColWidth, { fontFamily:'roboto', backgroundColor:'#bcd6ed', width:styles.width.jumlah, height:"38px" }]}>
            <Text style={[styles.tableCell, { width:styles.width.widthmati, maxWidth:styles.width.widthjumlah, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{"Total"}</Text>
        </View>
    </View>
);

// Expose multi-page flag untuk styling tabel di JSX utama
const isInvoiceMultiPage = (value) => {
    try {
        const items = value && value.packinglist ? value.packinglist.items : [];
        return !isSinglePageInv(items ? items.length : 0);
    } catch(e) { return false; }
};

// ─── Main: render item dengan pagination (Invoice) ────────────────────────────
const setItems = (value) => {
    const packinglist = value.packinglist;
    const items = packinglist ? packinglist.items : null;
    if (!items || items.length === 0) return null;

    let totalnetto = 0, totalQty = 0, totalSubtotalPrice = 0;
    items.forEach(det => {
        totalQty           += parseInt(det.qty        ? det.qty        : 0);
        totalSubtotalPrice += parseFloat(det.totalprice ? det.totalprice : 0);
        totalnetto         += det.nettoweight ? det.nettoweight : 0;
    });

    const firstPageCount = calcFirstPageCountInv(items.length);
    const firstSlice     = items.slice(0, firstPageCount);
    const restItems      = items.slice(firstPageCount);
    const isMultiPage    = !isSinglePageInv(items.length);

    // Halaman lanjutan (2, 3, dst)
    const continuationPages = [];
    let idx = 0;
    let noOffset = firstPageCount + 1;
    while (idx < restItems.length) {
        const pageItems   = restItems.slice(idx, idx + ITEMS_PER_NEXT_PAGE_INV);
        const startNo     = noOffset;
        idx              += ITEMS_PER_NEXT_PAGE_INV;
        noOffset         += pageItems.length;
        const isLastChunk = idx >= restItems.length;
        continuationPages.push(
            <View key={`cont-inv-${idx}`} break>
                <View style={[styles.table]}>
                    {buildColumnHeaderInv()}
                    {pageItems.map((det, i) => buildItemRowInv(det, startNo + i))}
                    {isLastChunk && buildTotalRowsInv(totalQty, totalnetto, totalSubtotalPrice, value)}
                </View>
            </View>
        );
    }

    return (
        <Fragment>
            {/* Tabel halaman pertama — dibungkus sendiri agar break di halaman lanjutan benar */}
            <View key="cont-inv-1">
                <View style={[styles.table, isMultiPage ? {marginBottom:'250px', borderBottomWidth:1} : {borderBottomWidth:1}]}>
                    {buildColumnHeaderInv()}
                    {firstSlice.map((det, i) => buildItemRowInv(det, i + 1))}
                    {!isMultiPage && buildTotalRowsInv(totalQty, totalnetto, totalSubtotalPrice, value)}
                </View>
            </View>
            {/* Halaman lanjutan */}
            {continuationPages}
        </Fragment>
    );
}

const getCodeAndCountryDest = (value) =>{
    if(value !== null && value !== undefined){
        let customerAlias = value.customerAlias?value.customerAlias:'';
        let arrAlias = new String(customerAlias).split('-');
        if(arrAlias.length > 0){
            return {code:arrAlias[0],destination:arrAlias[1]}
        }
    }
    
    return {code:'',destination:''};
}

const GenerateDocumentInvoiceV2 = ({ valuedata }) => {
    const [IsReady, setIsReady] = useState(false);
        
    useEffect(() => {
        Font.register({ family: 'roboto', fonts: [{ src: roboto }] });
        Font.register({ family: 'robotoitalic', fonts: [{ src: robotoitalic }] });
        Font.register({ family: 'robotononbolditalic', fonts: [{ src: robotononbolditalic }] });
        
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
                                <Image source={"img/logoheaderpdf.png"} style={{width:'100px',height:'80px'}}/>
                                
                            </View>

                            <View style={{ flexDirection: 'row-reverse', paddingTop: '0px' , paddingLeft:'35px'}}>
                                
                            <View style={[styles.tableNoBorder,{marginLeft:'0px'}]}>
                            <View style={styles.tableRow}>

                            <View style={[styles.tableColWidthNoBorder, {  height: "50px",marginBottom:'80px' }]}>
                            <Text style={[styles.tableCell, { fontFamily: 'roboto',width: 10, maxWidth: 10, marginTop: '5px', fontSize: fontSizeBig }]}>
                            {valuedata != null?valuedata.companyName:''}
                            </Text>

                            <Text style={[styles.tableCell, { width: 10, maxWidth: 10, marginTop: '5px', fontSize: fontSizeMedium }]}>
                            {valuedata != null?valuedata.address1:''}
                            </Text>

                            <Text style={[styles.tableCell, { width: 10, maxWidth: 10, marginTop: '5px', fontSize: fontSizeMedium }]}>
                            {valuedata != null?new String(valuedata.address2).replaceAll('L ','L.'):''}
                            </Text>

                            <Text style={[styles.tableCell, { width: 10, maxWidth: 10, marginTop: '5px', fontSize: fontSizeMedium }]}>
                            {valuedata != null?valuedata.address3:''}
                            </Text>

                            </View>
                            

                            <View style={[styles.tableColWidthNoBorder, {  height: "50px",marginBottom:'80px',marginLeft:'200px' }]}>
                                <Text style={[{ fontFamily: 'roboto',width: styles.width.widthno, maxWidth: styles.width.widthno, marginTop: '5px', fontSize: 18,marginLeft:'60px' }]}>{"Sales Invoice"}</Text>

                            <View style={[styles.tableNoBorder]}>
                            <View style={styles.tableRow}>
                            <View style={[styles.tableColWidth, { borderLeft:1,borderTop:1,width:"58%", height: "85px" }]}>
                                <Text style={[styles.tableCell, { fontFamily: 'roboto',width: 10, maxWidth: 10, marginTop: '5px', fontSize: fontSizeBig }]}>
                                    {"To: "}{valuedata != null?valuedata.packinglist.vendorName:''}
                                </Text>
                                <Text style={[styles.tableCell, { width: 10, maxWidth: 10, marginTop: '5px', fontSize: fontSizeMedium }]}>
                                    {valuedata != null?valuedata.packinglist.vendorAddress1:''}
                                </Text>
                                <Text style={[styles.tableCell, { width: 10, maxWidth: 10, marginTop: '3px', fontSize: fontSizeMedium }]}>
                                    {valuedata != null?valuedata.packinglist.vendorAddress2:''}
                                </Text>
                                <Text style={[styles.tableCell, { width: 10, maxWidth: 10, marginTop: '3px', fontSize: fontSizeMedium }]}>
                                    {valuedata != null?'NPWP : '+(valuedata.packinglist.vendorNpwp?valuedata.packinglist.vendorNpwp:''):''}
                                </Text>
                                <Text style={[styles.tableCell, { width: 10, maxWidth: 10, marginTop: '3px', fontSize: fontSizeMedium }]}>
                                    {valuedata != null?'Phone : '+(valuedata.packinglist.vendorPhone?valuedata.packinglist.vendorPhone:''):''}
                                </Text>
                            </View>

                            {/* <View style={[styles.tableColWidth, { borderLeft:1,borderTop:1,width:"58%", height: "70px" }]}>
                                <Text style={[styles.tableCell, { fontFamily: 'roboto',width: 10, maxWidth: 10, marginTop: '5px', fontSize: fontSizeBig }]}>
                                    {"To:"}
                                </Text>
                                <Text style={[styles.tableCell, { width: 10, maxWidth: 10, marginTop: '5px', fontSize: fontSizeMedium }]}>
                                    {valuedata != null?valuedata.packinglist.customerName:''}
                                </Text>
                                <Text style={[styles.tableCell, { width: 10, maxWidth: 10, marginTop: '3px', fontSize: fontSizeBig }]}>
                                    {valuedata != null?valuedata.packinglist.city:''}
                                </Text>
                            </View> */}

                            <View style={[styles.tableColWidthNoBorder, { borderBottom:0,borderTop:0,width:"47%", height: "70px" }]}>
                                <Text style={[styles.tableCell, { width: 100, maxWidth: 100, marginTop: '5px', fontSize: fontSizeBig }]}>{""}</Text>
                            </View>
                            </View>
                            </View>
                                
                            </View>
                            
                            </View>
                            </View>
                            
                            </View>    

                            </View>

                            
                            <View style={[styles.table,{marginTop:'0px', borderBottomWidth:1}]}>
                            
                            {/* <View style={styles.tableRow}>
                            <View style={[styles.tableColWidth, { fontFamily: 'robotoitalic',backgroundColor:'#bcd6ed',width:styles.width.attnandcountryorigin, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthattnandcountryorigin, maxWidth: styles.width.widthattnandcountryorigin,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig}]}>{"Attn."}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { fontFamily: 'robotoitalic',backgroundColor:'#bcd6ed',width:styles.width.codeandcountryfinal, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthcodeandcountryfinal, maxWidth: styles.width.widthcodeandcountryfinal, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Code"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { fontFamily: 'robotoitalic',backgroundColor:'#bcd6ed',width:styles.width.flightnoandcollie, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthflightnoandcollie, maxWidth: styles.width.widthflightnoandcollie, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Flight No"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { fontFamily: 'robotoitalic',backgroundColor:'#bcd6ed',width:styles.width.abwandnettokg, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthabwandnettokg, maxWidth: styles.width.widthabwandnettokg, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"AWB"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { fontFamily: 'robotoitalic',backgroundColor:'#bcd6ed',width:styles.width.packinglistnoanddate, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthpackinglistnoanddate, maxWidth: styles.width.widthpackinglistnoanddate, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Packing List No"}</Text>
                            </View>
                            </View> */}

                            {/* <View style={styles.tableRow}>
                            <View style={[styles.tableColWidth, { width:styles.width.attnandcountryorigin, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthattnandcountryorigin, maxWidth: styles.width.widthattnandcountryorigin,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?valuedata.packinglist.attention:''}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.codeandcountryfinal, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthcodeandcountryfinal, maxWidth: styles.width.widthcodeandcountryfinal, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{getCodeAndCountryDest(valuedata != null?valuedata.packinglist:null).code}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.flightnoandcollie, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthflightnoandcollie, maxWidth: styles.width.widthflightnoandcollie, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?valuedata.packinglist.flightnumber:''}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.abwandnettokg, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthabwandnettokg, maxWidth: styles.width.widthabwandnettokg, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?valuedata.packinglist.awbnumber+' '+valuedata.packinglist.codeGrupcustomer:''}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.packinglistnoanddate, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthpackinglistnoanddate, maxWidth: styles.width.widthpackinglistnoanddate, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?valuedata.packinglist.nodocument:''}</Text>
                            </View>
                            </View> */}

                            <View style={styles.tableRow}>
                            <View style={[styles.tableColWidth, { fontFamily: 'robotoitalic',backgroundColor:'#bcd6ed',width:styles.width.attnandcountryorigin, height: "38px" }]}>
                                {/* <Text style={[styles.tableCell, { width: styles.width.widthattnandcountryorigin, maxWidth: styles.width.widthattnandcountryorigin,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Country Of Origin"}</Text> */}
                                <Text style={[styles.tableCell, { width: styles.width.widthattnandcountryorigin, maxWidth: styles.width.widthattnandcountryorigin,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Invoice Number"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { fontFamily: 'robotoitalic',backgroundColor:'#bcd6ed',width:styles.width.codeandcountryfinal, height: "38px" }]}>
                                {/* <Text style={[styles.tableCell, { width: styles.width.widthcodeandcountryfinal, maxWidth: styles.width.widthcodeandcountryfinal, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Country Of \n"}{"Final Dest."}</Text> */}
                                <Text style={[styles.tableCell, { width: styles.width.widthcodeandcountryfinal, maxWidth: styles.width.widthcodeandcountryfinal, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Invoice Date"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { fontFamily: 'robotoitalic',backgroundColor:'#bcd6ed',width:styles.width.flightnoandcollie, height: "38px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthflightnoandcollie, maxWidth: styles.width.widthflightnoandcollie, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Boxes"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { fontFamily: 'robotoitalic',backgroundColor:'#bcd6ed',width:styles.width.abwandnettokg, height: "38px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthabwandnettokg, maxWidth: styles.width.widthabwandnettokg, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Netto Kg"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { fontFamily: 'robotoitalic',backgroundColor:'#bcd6ed',width:styles.width.packinglistnoanddate, height: "38px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthpackinglistnoanddate, maxWidth: styles.width.widthpackinglistnoanddate, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Packing List Date"}</Text>
                            </View>
                            </View>

                            <View style={styles.tableRow}>
                            <View style={[styles.tableColWidth, { width:styles.width.attnandcountryorigin, height: "25px" }]}>
                                {/* <Text style={[styles.tableCell, { width: styles.width.widthattnandcountryorigin, maxWidth: styles.width.widthattnandcountryorigin,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?valuedata.countryOfOrigin:''}</Text> */}
                                <Text style={[styles.tableCell, { width: styles.width.widthattnandcountryorigin, maxWidth: styles.width.widthattnandcountryorigin,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?valuedata.nodocument:''}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.codeandcountryfinal, height: "25px" }]}>
                                {/* <Text style={[styles.tableCell, { width: styles.width.widthcodeandcountryfinal, maxWidth: styles.width.widthcodeandcountryfinal, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{getCodeAndCountryDest(valuedata != null?valuedata.packinglist:null).destination}</Text> */}
                                <Text style={[styles.tableCell, { width: styles.width.widthcodeandcountryfinal, maxWidth: styles.width.widthcodeandcountryfinal, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?valuedata.date:null}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.flightnoandcollie, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthflightnoandcollie, maxWidth: styles.width.widthflightnoandcollie, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?valuedata.packinglist.koli:''}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.abwandnettokg, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthabwandnettokg, maxWidth: styles.width.widthabwandnettokg, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?formatRupiah(new String(calcNettoHeader(valuedata)).replaceAll('.',','),1) :[]}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.packinglistnoanddate, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthpackinglistnoanddate, maxWidth: styles.width.widthpackinglistnoanddate, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?valuedata.packinglist.date:''}</Text>
                            </View>
                            </View>

                            {/* <View style={styles.tableRow}>
                            <View style={[styles.tableColWidth, { width:styles.width.flightno, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthflightno, maxWidth: styles.width.widthflightno,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?valuedata.flightno:''}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.smuno, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthsmuno, maxWidth: styles.width.widthsmuno, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?valuedata.noSMU:''}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.koli, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthkoli, maxWidth: styles.width.widthkoli, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?getValueChargesBox(valuedata.charges):''}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.prno, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthprno, maxWidth: styles.width.widthprno, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?valuedata.nodocument:''}</Text>
                            </View>
                            </View> */}

                            </View>

                            {setItems(valuedata != null ? valuedata : [])}

                            <View style={[styles.table]}>
                            <View style={styles.tableRow}>
                            <View style={[styles.tableColWidth, {fontFamily:'robotononbolditalic', width:"52%", height: "90px" }]}>
                                <Text style={[styles.tableCell, { width: 100, maxWidth: 100, marginTop: '5px', fontSize: fontSizeBig }]}>{"Remarks"}</Text>
                                <Text style={[styles.tableCell, { width: 100, maxWidth: 100, marginTop: '1px', fontSize: fontSizeBig }]}>{"Bank Account:"}</Text>
                                <Text style={[styles.tableCell, { width: 300, maxWidth: 300, marginTop: '1px', fontSize: fontSizeBig }]}>{valuedata != null?valuedata.bankCompany:''}</Text>
                                <Text style={[styles.tableCell, { width: 300, maxWidth: 300, marginTop: '1px', fontSize: fontSizeBig }]}>{valuedata != null?'a/c '+valuedata.bankAccNoCompany:''}</Text>
                                <Text style={[styles.tableCell, { width: 300, maxWidth: 300, marginTop: '1px', fontSize: fontSizeBig }]}>{valuedata != null?valuedata.bankAccNameCompany:''}</Text>
                                {/* {getBankBroker(valuedata != null ? valuedata.items : [])} */}
                            </View>
                            <View style={[styles.tableColWidth, { width:"48%", height: "90px", paddingLeft:'5px' }]}>
                            <View style={{ flexDirection: 'row',paddingTop:'78px' }}>
                                

                                <View style={{fontFamily:'robotononbolditalic', flexDirection: 'row-reverse', marginLeft: '40%' }}>
                                <Text style={{ fontSize: 7,marginRight:'1px' }}>{'Printed By : '+(valuedata != null?valuedata.namaUser+', '+valuedata.currdatetime:'')}</Text>
                                    {/* <Text style={{ fontSize: 7 }}>{'Edit : '}{(valuedata != null?valuedata.countEdit:'')}{' Print : '+(valuedata != null?(valuedata.countPrint?valuedata.countPrint+1:1):'')}{' Dicetak Oleh: '+(valuedata != null?valuedata.namaUser+' ,'+valuedata.currdatetime:'')}</Text> */}
                                </View>
                            </View>

                                {/* <Text style={[styles.tableCell, { width: 100, maxWidth: 100, marginTop: '5px', fontSize: fontSizeBig }]}>{""}</Text> */}
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
                            <Text style={{fontFamily:'robotononbolditalic',textAlign:'right',marginRight:"2px",fontSize:7}}>{"Edit:"}{(valuedata != null?valuedata.countEdit:'')}{"  Print:"}{(valuedata != null?(valuedata.countPrint?valuedata.countPrint:0):'')}</Text>

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
export default GenerateDocumentInvoiceV2;