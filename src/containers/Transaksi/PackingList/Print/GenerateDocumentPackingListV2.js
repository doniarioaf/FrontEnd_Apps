import React, { Fragment, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
// import roboto from '../../../../components/';
import roboto from '../../../../components/Fonts/Roboto/Roboto-Bold.ttf';
import { convertGramToKG, desimal00, desimal000, formatRupiah, numToMoney, pembulatanNilai, roundCeiling, terbilangRupiah } from '../../../shared/globalFunc';
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
        
        widthnamabarang:93,
        widthukuran:45,
        widthgram:45,
        widthkuantitas:50,
        widthharga:58,
        widthjumlah:90,
        widthweightkg:55,
        widthnoofbox:48,
        no:'5%',
        
        namabarang:'20%',
        ukuran:'9%',
        gram:'10%',
        kuantitas:'11%',
        harga:'12%',
        jumlah:'18%',
        weightkg:'11%',
        noofbox:'9%',

        widthattnandcountryorigin:100,
        widthcodeandcountryfinal:90,
        widthflightnoandcollie:50,
        widthabwandnettokg:96,
        widthpackinglistnoanddate:148,
        attnandcountryorigin:"21%",
        codeandcountryfinal:"19%",
        flightnoandcollie:"11%",
        abwandnettokg:"19%",
        packinglistnoanddate:"30%",

        // widthno+widthnamabarang+widthukuran+widthgram
        widthtotal:200,
        total:"48%",

        // widthno+widthnamabarang+widthukuran+widthgram+widthkuantitas+widthweightkg+widthnoofbox
        widthkurs:190,
        kurs:"70%",

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
    let items = value.items;
    let listfilteroutput = items;
    let totalnetto = 0;
    for(let i=0; i < listfilteroutput.length; i++){
        let det = listfilteroutput[i];
        let nettoweight = det.nettoweight?det.nettoweight:0;
            // nettoweight = convertkg(nettoweight);

        //kenapa totalan netto tidak ambil dari value.netto / total netto header karena ketika gr convert ke kg terjadi pembulatan sehingga ketika netto header di convert ke kg menjadi tidak sama desimal nya
        totalnetto += nettoweight;
    }
    totalnetto         = Math.round(totalnetto         * 10) / 10; // 1 desimal
    return totalnetto;
}

// const calcNettoHeaderRoundCeiling = (value) =>{
//     let items = value.items;
//     let listfilteroutput = items;
//     let totalnetto = 0;
//     for(let i=0; i < listfilteroutput.length; i++){
//         let det = listfilteroutput[i];
//         let nettoweight = det.nettoweight?det.nettoweight:0;
//             nettoweight = roundCeiling(nettoweight,1);

//         //kenapa totalan netto tidak ambil dari value.netto / total netto header karena ketika gr convert ke kg terjadi pembulatan sehingga ketika netto header di convert ke kg menjadi tidak sama desimal nya
//         totalnetto += nettoweight;
//     }
//     return totalnetto;
// }

// ─── Pagination constants ──────────────────────────────────────────────────────
const ITEMS_SINGLE_PAGE    = 13;  // jika total <= 13 → semua di 1 halaman
const ITEMS_MAX_FIRST_PAGE = 17;  // maksimal item di halaman pertama (saat multi-page)
const ITEMS_PER_NEXT_PAGE  = 23;  // maksimal item di halaman berikutnya

// Hitung berapa item yang masuk halaman pertama:
// - total <= 13 : single page, semua di hal.1
// - total 14–18 : hal.1 = total - 1  (sisakan 1 untuk hal.2)
// - total >= 19 : hal.1 = 17 (max), sisanya ke hal.2+
// Contoh: 13 → 13 | 14 → 13 | 18 → 17 | 19 → 17+2 | 20 → 17+3
const calcFirstPageCount = (total) => {
    if (total <= ITEMS_SINGLE_PAGE) return total;          // single page
    return Math.min(total - 1, ITEMS_MAX_FIRST_PAGE);      // multi-page
};

// Single page jika total item muat semua di halaman 1
const isSinglePage = (total) => total <= ITEMS_SINGLE_PAGE;

// ─── Helper: satu baris item ────────────────────────────────────────────────
const buildItemRow = (det) => {
    const qty         = det.qty         ? det.qty         : 0;
    const nettoweight = det.nettoweight ? det.nettoweight : 0;
    const heightVal = "23px";
    const marginTopVal = "5px";
    return (
        <View style={[styles.tableRow]}>
            <View style={[styles.tableColWidth, { width:styles.width.noofbox, height:heightVal }]}>
                <Text style={[styles.tableCell, { width:styles.width.widthnoofbox, maxWidth:styles.width.widthnoofbox, textAlign:'center', marginTop:marginTopVal, fontSize:fontSizeBig }]}>{det.box}</Text>
            </View>
            <View style={[styles.tableColWidth, { width:styles.width.namabarang, height:heightVal }]}>
                <Text style={[styles.tableCell, { width:styles.width.widthnamabarang, maxWidth:styles.width.widthnamabarang, textAlign:'center', marginTop:marginTopVal, fontSize:fontSizeBig }]}>{det.productName}</Text>
            </View>
            <View style={[styles.tableColWidth, { width:styles.width.ukuran, height:heightVal }]}>
                <Text style={[styles.tableCell, { width:styles.width.widthukuran, maxWidth:styles.width.widthukuran, textAlign:'center', marginTop:marginTopVal, fontSize:fontSizeBig }]}>{det.categoryProductSize}</Text>
            </View>
            <View style={[styles.tableColWidth, { width:styles.width.gram, height:heightVal }]}>
                <Text style={[styles.tableCell, { width:styles.width.widthgram, maxWidth:styles.width.widthgram, textAlign:'center', marginTop:marginTopVal, fontSize:fontSizeBig }]}>{det.categoryProductFromGr+' - '+det.categoryProductThruGr}</Text>
            </View>
            <View style={[styles.tableColWidth, { width:styles.width.kuantitas, height:heightVal }]}>
                <Text style={[styles.tableCell, { width:styles.width.widthkuantitas, maxWidth:styles.width.widthkuantitas, textAlign:'center', marginTop:marginTopVal, fontSize:fontSizeBig }]}>{qty}</Text>
            </View>
            <View style={[styles.tableColWidth, { width:styles.width.weightkg, height:heightVal }]}>
                <Text style={[styles.tableCell, { width:styles.width.widthweightkg, maxWidth:styles.width.widthweightkg, textAlign:'center', marginTop:marginTopVal, fontSize:fontSizeBig }]}>{formatRupiah(new String(nettoweight).replaceAll('.',','),1)}</Text>
            </View>
            <View style={[styles.tableColWidth, { width:styles.width.harga, height:heightVal }]}>
                <Text style={[styles.tableCell, { width:styles.width.widthharga, maxWidth:styles.width.widthharga, textAlign:'right', marginTop:marginTopVal, fontSize:fontSizeBig }]}>{det.price?desimal00(formatRupiah(new String(det.price).replaceAll('.',','),2)):0}</Text>
            </View>
            <View style={[styles.tableColWidth, { width:styles.width.jumlah, height:heightVal }]}>
                <Text style={[styles.tableCell, { width:styles.width.widthjumlah, maxWidth:styles.width.widthjumlah, textAlign:'right', marginTop:marginTopVal, fontSize:fontSizeBig }]}>{det.totalprice?formatRupiah(new String(det.totalprice).replaceAll('.',','),1):0}</Text>
            </View>
        </View>
    );
};

// ─── Helper: baris Total ────────────────────────────────────────────────────
const buildTotalRow = (totalQty, totalnetto, totalSubtotalPrice) => (
    <View style={styles.tableRow}>
        <View style={[styles.tableColWidth, { width:styles.width.total, height:"25px" }]}>
            <Text style={[styles.tableCell, { fontFamily:'roboto', width:styles.width.widthtotal, maxWidth:styles.width.widthtotal, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{'Total'}</Text>
        </View>
        <View style={[styles.tableColWidth, { width:styles.width.kuantitas, height:"25px" }]}>
            <Text style={[styles.tableCell, { width:styles.width.widthkuantitas, maxWidth:styles.width.widthkuantitas, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{totalQty}</Text>
        </View>
        <View style={[styles.tableColWidth, { width:styles.width.weightkg, height:"25px" }]}>
            <Text style={[styles.tableCell, { width:styles.width.widthweightkg, maxWidth:styles.width.widthweightkg, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{formatRupiah(new String(totalnetto).replaceAll('.',','),1)}</Text>
        </View>
        <View style={[styles.tableColWidth, { borderRight:0, width:styles.width.harga, height:"25px" }]}>
            <Text style={[styles.tableCell, { width:styles.width.widthharga, maxWidth:styles.width.widthharga, textAlign:'left', marginTop:'5px', fontSize:fontSizeBig }]}>{'USD'}</Text>
        </View>
        <View style={[styles.tableColWidth, { width:styles.width.jumlah, height:"25px" }]}>
            <Text style={[styles.tableCell, { width:styles.width.widthjumlah, maxWidth:styles.width.widthjumlah, textAlign:'right', marginTop:'5px', fontSize:fontSizeBig }]}>{formatRupiah(new String(totalSubtotalPrice).replaceAll('.',','),1)}</Text>
        </View>
    </View>
);

// ─── Helper: header kolom (diulang di tiap halaman lanjutan) ─────────────────
const buildColumnHeader = () => (
    <View style={styles.tableRow}>
        <View style={[styles.tableColWidth, { fontFamily:'roboto', backgroundColor:'#bcd6ed', width:styles.width.noofbox, height:"38px" }]}>
            <Text style={[styles.tableCell, { width:styles.width.widthnoofbox, maxWidth:styles.width.widthnoofbox, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{"No. Of\nBox"}</Text>
        </View>
        <View style={[styles.tableColWidth, { fontFamily:'roboto', backgroundColor:'#bcd6ed', width:styles.width.namabarang, height:"38px" }]}>
            <Text style={[styles.tableCell, { width:styles.width.widthnamabarang, maxWidth:styles.width.widthnamabarang, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{"Product Name"}</Text>
        </View>
        <View style={[styles.tableColWidth, { fontFamily:'roboto', backgroundColor:'#bcd6ed', width:styles.width.ukuran, height:"38px" }]}>
            <Text style={[styles.tableCell, { width:styles.width.widthukuran, maxWidth:styles.width.widthukuran, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{"Size"}</Text>
        </View>
        <View style={[styles.tableColWidth, { fontFamily:'roboto', backgroundColor:'#bcd6ed', width:styles.width.gram, height:"38px" }]}>
            <Text style={[styles.tableCell, { width:styles.width.widthgram, maxWidth:styles.width.widthgram, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{"Gram"}</Text>
        </View>
        <View style={[styles.tableColWidth, { fontFamily:'roboto', backgroundColor:'#bcd6ed', width:styles.width.kuantitas, height:"38px" }]}>
            <Text style={[styles.tableCell, { width:styles.width.widthkuantitas, maxWidth:styles.width.widthkuantitas, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{"Pieces"}</Text>
        </View>
        <View style={[styles.tableColWidth, { fontFamily:'roboto', backgroundColor:'#bcd6ed', width:styles.width.weightkg, height:"38px" }]}>
            <Text style={[styles.tableCell, { width:styles.width.widthweightkg, maxWidth:styles.width.widthweightkg, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{"Weight Kg"}</Text>
        </View>
        <View style={[styles.tableColWidth, { fontFamily:'roboto', backgroundColor:'#bcd6ed', width:styles.width.harga, height:"38px" }]}>
            <Text style={[styles.tableCell, { width:styles.width.widthharga, maxWidth:styles.width.widthharga, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{"Price"}</Text>
        </View>
        <View style={[styles.tableColWidth, { fontFamily:'roboto', backgroundColor:'#bcd6ed', width:styles.width.jumlah, height:"38px" }]}>
            <Text style={[styles.tableCell, { width:styles.width.widthmati, maxWidth:styles.width.widthjumlah, textAlign:'center', marginTop:'5px', fontSize:fontSizeBig }]}>{"Total"}</Text>
        </View>
    </View>
);

// ─── Helper: footer (Remarks + Declaration) ──────────────────────────────────
const buildFooter = (valuedata) => (
    <Fragment>
        <View style={[styles.table]}>
            <View style={styles.tableRow}>
                <View style={[styles.tableColWidth, { width:"52%", height:"90px" }]}>
                    <Text style={[styles.tableCell, { width:100, maxWidth:100, marginTop:'5px', fontSize:fontSizeBig }]}>{"Remarks"}</Text>
                </View>
                <View style={[styles.tableColWidth, { width:"48%", height:"90px", paddingLeft:'5px' }]}>
                    <View style={{ flexDirection:'row', paddingTop:'78px' }}>
                        <View style={{ flexDirection:'row-reverse', marginLeft:'40%' }}>
                            <Text style={{ fontSize:7, marginRight:'1px' }}>{'Print By : '+(valuedata != null ? valuedata.namaUser+', '+valuedata.currdatetime : '')}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
        <View style={[styles.table]}>
            <View style={styles.tableRow}>
                <View style={[styles.tableColWidth, { width:"100%", height:"20px" }]}>
                    <Text style={[styles.tableCell, { width:500, maxWidth:500, marginTop:'5px', fontSize:6 }]}>{"Declaration : We declare that this invoice shows actual price of goods described and that all particulars are true and correct"}</Text>
                </View>
            </View>
        </View>
        <Text style={{ textAlign:'right', marginRight:"2px", fontSize:7 }}>{"Edit:"}{(valuedata != null ? valuedata.countEdit : '')}{"  Print:"}{(valuedata != null ? (valuedata.countPrint ? valuedata.countPrint : 0) : '')}</Text>
    </Fragment>
);

// ─── Main: render item dengan pagination ─────────────────────────────────────
const setItems = (value) => {
    const items = value ? value.items : null;
    if (!items || items.length === 0) return null;

    let totalnetto = 0, totalQty = 0, totalSubtotalPrice = 0;
    items.forEach(det => {
        totalQty           += parseInt(det.qty         ? det.qty         : 0);
        totalSubtotalPrice += parseFloat(det.totalprice ? det.totalprice : 0);
        totalnetto         += parseFloat(det.nettoweight ? det.nettoweight : 0);
    });
    // info bugs kenapa di set totalnetto = Math.round
    //  pada javascript saya menjumlahkan 2 nilai,
    // nilai a = 12.1,
    // nilai b = 11.7
    // kenapa hasilnya jadi 23.799999999999997
    //nilainya jad 23,7
    totalnetto         = Math.round(totalnetto         * 10) / 10; // 1 desimal
    //
    
    console.log('totalnetto items ',totalnetto);
    
    const firstPageCount = calcFirstPageCount(items.length);
    const firstSlice  = items.slice(0, firstPageCount);
    const restItems   = items.slice(firstPageCount);
    const isMultiPage = !isSinglePage(items.length);

    // Halaman lanjutan (2, 3, dst) — masing-masing dimulai dengan <View break>
    const continuationPages = [];
    let idx = 0;
    while (idx < restItems.length) {
        const pageItems   = restItems.slice(idx, idx + ITEMS_PER_NEXT_PAGE);
        idx              += ITEMS_PER_NEXT_PAGE;
        const isLastChunk = idx >= restItems.length;
        continuationPages.push(
            <View key={`cont-${idx}`} break>
                <View style={[styles.table]}>
                    {buildColumnHeader()}
                    {pageItems.map((det, i) => buildItemRow(det))}
                    {isLastChunk && buildTotalRow(totalQty, totalnetto, totalSubtotalPrice)}
                </View>
                {/* Footer hanya di halaman lanjutan terakhir */}
                {isLastChunk && buildFooter(value)}
            </View>
        );
    }

    return (
        <Fragment>
            {/* Item halaman pertama */}
            <View key={`cont-1`}>
                <View style={[styles.table, isMultiPage ? {marginBottom:'250px', borderBottomWidth:1} : {borderBottomWidth:1}]}>
                    {buildColumnHeader()}
                    {firstSlice.map((det, i) => buildItemRow(det))}
                    {/* Baris Total hanya di sini jika single page (tidak ada halaman lanjutan) */}
                    {!isMultiPage && buildTotalRow(totalQty, totalnetto, totalSubtotalPrice)}
                </View>
                {/* Footer di halaman 1 jika single page */}
                {!isMultiPage && buildFooter(value)}
            </View>
            {/* Halaman lanjutan (masing-masing di page baru, Total + Footer di halaman terakhir) */}
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

const GenerateDocumentPackingListV2 = ({ valuedata }) => {
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
                                <Text style={[{ fontFamily: 'roboto',width: styles.width.widthno, maxWidth: styles.width.widthno, marginTop: '5px', fontSize: 18,marginLeft:'60px' }]}>{"Packing List"}</Text>

                            <View style={[styles.tableNoBorder]}>
                            <View style={styles.tableRow}>
                            <View style={[styles.tableColWidth, { borderLeft:1,borderTop:1,width:"58%", height: "70px" }]}>
                                <Text style={[styles.tableCell, { fontFamily: 'roboto',width: 10, maxWidth: 10, marginTop: '5px', fontSize: fontSizeBig }]}>
                                    {"To:"}
                                </Text>
                                <Text style={[styles.tableCell, { width: 10, maxWidth: 10, marginTop: '5px', fontSize: fontSizeMedium }]}>
                                    {valuedata != null?valuedata.customerName:''}
                                </Text>
                                <Text style={[styles.tableCell, { width: 10, maxWidth: 10, marginTop: '5px', fontSize: fontSizeBig }]}>
                                    {valuedata != null?valuedata.city:''}
                                </Text>
                            </View>
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

                            
                            <View style={[styles.table,{marginTop:'0px'}]}>
                            
                            <View style={styles.tableRow}>
                            <View style={[styles.tableColWidth, { fontFamily: 'roboto',backgroundColor:'#bcd6ed',width:styles.width.attnandcountryorigin, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthattnandcountryorigin, maxWidth: styles.width.widthattnandcountryorigin,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Attn"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { fontFamily: 'roboto',backgroundColor:'#bcd6ed',width:styles.width.codeandcountryfinal, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthcodeandcountryfinal, maxWidth: styles.width.widthcodeandcountryfinal, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Code"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { fontFamily: 'roboto',backgroundColor:'#bcd6ed',width:styles.width.flightnoandcollie, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthflightnoandcollie, maxWidth: styles.width.widthflightnoandcollie, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Flight No"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { fontFamily: 'roboto',backgroundColor:'#bcd6ed',width:styles.width.abwandnettokg, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthabwandnettokg, maxWidth: styles.width.widthabwandnettokg, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"AWB"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { fontFamily: 'roboto',backgroundColor:'#bcd6ed',width:styles.width.packinglistnoanddate, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthpackinglistnoanddate, maxWidth: styles.width.widthpackinglistnoanddate, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Packing List No"}</Text>
                            </View>
                            </View>

                            <View style={styles.tableRow}>
                            <View style={[styles.tableColWidth, { width:styles.width.attnandcountryorigin, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthattnandcountryorigin, maxWidth: styles.width.widthattnandcountryorigin,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?valuedata.attention:''}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.codeandcountryfinal, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthcodeandcountryfinal, maxWidth: styles.width.widthcodeandcountryfinal, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{getCodeAndCountryDest(valuedata != null?valuedata:null).code}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.flightnoandcollie, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthflightnoandcollie, maxWidth: styles.width.widthflightnoandcollie, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?valuedata.flightnumber:''}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.abwandnettokg, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthabwandnettokg, maxWidth: styles.width.widthabwandnettokg, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?valuedata.awbnumber:''}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.packinglistnoanddate, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthpackinglistnoanddate, maxWidth: styles.width.widthpackinglistnoanddate, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?valuedata.nodocument:''}</Text>
                            </View>
                            </View>

                            <View style={styles.tableRow}>
                            <View style={[styles.tableColWidth, { fontFamily: 'roboto',backgroundColor:'#bcd6ed',width:styles.width.attnandcountryorigin, height: "38px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthattnandcountryorigin, maxWidth: styles.width.widthattnandcountryorigin,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Country Of Origin"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { fontFamily: 'roboto',backgroundColor:'#bcd6ed',width:styles.width.codeandcountryfinal, height: "38px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthcodeandcountryfinal, maxWidth: styles.width.widthcodeandcountryfinal, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Country Of \n"}{"Final Dest"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { fontFamily: 'roboto',backgroundColor:'#bcd6ed',width:styles.width.flightnoandcollie, height: "38px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthflightnoandcollie, maxWidth: styles.width.widthflightnoandcollie, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Collie"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { fontFamily: 'roboto',backgroundColor:'#bcd6ed',width:styles.width.abwandnettokg, height: "38px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthabwandnettokg, maxWidth: styles.width.widthabwandnettokg, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Netto Kg"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { fontFamily: 'roboto',backgroundColor:'#bcd6ed',width:styles.width.packinglistnoanddate, height: "38px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthpackinglistnoanddate, maxWidth: styles.width.widthpackinglistnoanddate, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Packing List Date"}</Text>
                            </View>
                            </View>

                            <View style={styles.tableRow}>
                            <View style={[styles.tableColWidth, { width:styles.width.attnandcountryorigin, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthattnandcountryorigin, maxWidth: styles.width.widthattnandcountryorigin,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"CENGKARENG"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.codeandcountryfinal, height: "25px" }]}>
                                {/* <Text style={[styles.tableCell, { width: styles.width.widthcodeandcountryfinal, maxWidth: styles.width.widthcodeandcountryfinal, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{getCodeAndCountryDest(valuedata != null?valuedata:null).destination}</Text> */}
                                <Text style={[styles.tableCell, { width: styles.width.widthcodeandcountryfinal, maxWidth: styles.width.widthcodeandcountryfinal, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?valuedata.city:null}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.flightnoandcollie, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthflightnoandcollie, maxWidth: styles.width.widthflightnoandcollie, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?valuedata.koli:''}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.abwandnettokg, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthabwandnettokg, maxWidth: styles.width.widthabwandnettokg, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?formatRupiah(new String(calcNettoHeader(valuedata)).replaceAll('.',','),1):[]}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.packinglistnoanddate, height: "25px" }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthpackinglistnoanddate, maxWidth: styles.width.widthpackinglistnoanddate, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?valuedata.date:''}</Text>
                            </View>
                            </View>

                            </View>

                            {/* Tabel item — setItems mengatur column header + item rows */}
                            {setItems(valuedata != null ? valuedata : [])}


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
export default GenerateDocumentPackingListV2;