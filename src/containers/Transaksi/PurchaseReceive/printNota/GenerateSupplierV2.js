import React, { Fragment, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
// import roboto from '../../../../components/';
import roboto from '../../../../components/Fonts/Roboto/Roboto-Bold.ttf';
import { desimal00, desimal000, formatRupiah, numToMoney, terbilangRupiah } from '../../../shared/globalFunc';
import { addKurungBukaPadaValue } from '../utilityPurchaseReceive';

// import logo from "img/logo.png";

const heightRow = "19px";
const fontSizeBig = 8;
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
        widthharga:68,
        widthjumlah:89,
        no:'5%',
        namabarang:'20%',
        ukuran:'15%',
        gram:'14%',
        kuantitas:'14%',
        harga:'14%',
        jumlah:'18%',

        widthflightno:120,
        widthsmuno:150,
        widthkoli:70,
        widthprno:170,
        flightno:"25%",
        smuno:"29%",
        koli:"14%",
        prno:"32%",


        // widthno:20,
        // widthnamabarang:100,
        // widthukuran:75,
        // widthgram:70,
        // widthkuantitas:70,

        widthchargeandinventori:265,
        chargeandinventori:"54%",

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

const getTransfer = (items) =>{
    let totalprice = items.totalprice?parseFloat(items.totalprice):0;
    let setor = items.setor?parseFloat(items.setor):0;
    let deposits = items.deposits;
    if(deposits){
        for(let i=0; i < deposits.length; i++){
            let det = deposits[i];
            let amount = det.amount?det.amount:0;
            setor = setor + parseFloat(amount);
        }
    }
    let transfer = 0;
    if(totalprice > setor){
        transfer = totalprice - setor;
    }
    return transfer;
}
//    
const penyesuaianTerbilang = (value) =>{
    let deposits = value.deposits;
    let list = [];
    if(deposits){
        if(deposits.length == 1){
            // list.push(<Text style={[styles.tableCell, { width: 300, maxWidth: 300, marginTop: '8px', fontSize: fontSizeBig }]}>{''}</Text>);
        }else if(deposits.length == 0){
            list.push(<Text style={[styles.tableCell, { width: 300, maxWidth: 300, marginTop: '8px', fontSize: fontSizeBig }]}>{''}</Text>);
            list.push(<Text style={[styles.tableCell, { width: 300, maxWidth: 300, marginTop: '8px', fontSize: fontSizeBig }]}>{''}</Text>);
        }
        
    }else{
        list.push(<Text style={[styles.tableCell, { width: 300, maxWidth: 300, marginTop: '8px', fontSize: fontSizeBig }]}>{''}</Text>);
        list.push(<Text style={[styles.tableCell, { width: 300, maxWidth: 300, marginTop: '8px', fontSize: fontSizeBig }]}>{''}</Text>);
    }

    return list;
}
const lsitTambahDP = (value) =>{
    let deposits = value.deposits;
    let totalprice = parseFloat(value.totalprice);
    let saldoDP = value.saldoDepositBeforeNotaSubmit?value.saldoDepositBeforeNotaSubmit:0;
    let setorDeposit = parseFloat(value.setor);
    saldoDP = saldoDP + setorDeposit;
    let sisaDP = 0;
    let totalDP = parseFloat(saldoDP);
    let list = [];
    let setorPinjaman = value.setorPinjaman?value.setorPinjaman:0;
    let nilaiNota = totalprice;
    let transfer = getTransfer(value);

    let saldoAkhirPinjaman = value.saldoPinjaman?value.saldoPinjaman:0;
    let saldoPinjaman = value.saldoPinjaman?value.saldoPinjaman:0;
    saldoPinjaman = saldoPinjaman + setorPinjaman;


    let listRow1 = [<View style={{flexDirection:'row'}}>
                <View style={[{ width:"68%", height: "20px",paddingLeft:'4px' }]}>
                <Text style={[ { width: 200, maxWidth: 200,textAlign:'left', marginTop: '5px', fontSize: fontSizeBig }]}>{""}</Text>
                </View>

                <View style={[{ width:"14%", height: "20px" }]}>
                <Text style={[ { width: 75, maxWidth: 75,textAlign:'left', marginTop: '5px', fontSize: fontSizeBig }]}>{"Total"}</Text>
                </View>

                <View style={[{ width:"18%", height: "20px" }]}>
                <Text style={[ { width: 94, maxWidth: 94,textAlign:'right', marginTop: '5px', fontSize: fontSizeBig }]}>{nilaiNota?desimal00(formatRupiah(new String(nilaiNota).replaceAll('.',','),2),{isShow000:false}):''}</Text>
                </View>

                </View>];
    let viewSaldoPinjaman = <View style={[{ width:"34%", height: "17px",paddingLeft:'7px' }]}>
        <Text style={[ { width: 200, maxWidth: 200,textAlign:'left', marginTop: '5px', fontSize: fontSizeBig }]}>{"Saldo Pinjaman "}{desimal00(formatRupiah(new String(saldoPinjaman).replaceAll('.',','),2)) }</Text>
        </View>;
    let viewSetorPinjaman = <View style={[{ width:"34%", height: "25px",paddingLeft:'7px' }]}>
                    <Text style={[ { width: 200, maxWidth: 200,textAlign:'left', marginTop: '0px', fontSize: fontSizeBig }]}>
                        {"Setor Pinjaman "}{desimal00(formatRupiah(new String(setorPinjaman).replaceAll('.',','),2)) }{" \n"}
                        {"Sisa Pinjaman "}{desimal00(formatRupiah(new String(saldoAkhirPinjaman).replaceAll('.',','),2)) }

                    </Text>
                    </View>;
    // let viewSisaPinjaman = (<View style={[{ width:"34%", height: "17px",paddingLeft:'7px' }]}>
    //                 <Text style={[ { width: 200, maxWidth: 200,textAlign:'left', marginTop: '0px', fontSize: fontSizeBig }]}>{"Sisa Pinjaman "}{desimal00(formatRupiah(new String(saldoAkhirPinjaman).replaceAll('.',','),2)) }</Text>
    //                 </View>);                    
    let tempViewSaldoPinjaman = saldoPinjaman > 0?viewSaldoPinjaman:null;
    let tempViewSetorPinjaman = setorPinjaman > 0?viewSetorPinjaman:null;
    // let tempViewSisaPinjaman = viewSisaPinjaman;
    let tempViewSisaPinjaman = null;

     let viewLabelTransfer = <View  style={[{ width:"14%", height: "20px"}]}>
            <Text style={[ { width: 75, maxWidth: 75,textAlign:'left', marginTop: '5px', fontSize: fontSizeBig }]}>{"Transfer "}</Text>
            </View>;
    let viewValueTransfer = <View style={[{ width:"18%", height: "20px" }]}>
            <Text style={[ { width: 94, maxWidth: 94,textAlign:'right', marginTop: '5px', fontSize: fontSizeBig }]}>{desimal00(formatRupiah(new String(transfer).replaceAll('.',','),2)) }</Text>
            </View>; 
   if(transfer == 0){
        viewLabelTransfer = null;
        viewValueTransfer = null;
   }
   
   let viewSaldoDP = <View style={[{ width:"34%", height: "20px",paddingLeft:'4px' }]}>
            <Text style={[ { width: 200, maxWidth: 200,textAlign:'left', marginTop: '5px', fontSize: fontSizeBig }]}>{"Saldo DP "}{desimal00(formatRupiah(new String(saldoDP).replaceAll('.',','),2)) }</Text>
            </View>; 
    let viewTambahDPIndex0 = null;

    let showLabelDP = true;
    if(setorDeposit <= 0){
        showLabelDP = false;
    }

    if(saldoDP <= 0 && setorDeposit <= 0){
        viewSaldoDP = null;   
    }
    let indexDep = 0;
    if(viewSaldoDP == null){
        if(deposits){
            if(deposits.length > 0){
                indexDep = 1;
                let det = deposits[0];
                let amount = det.amount?det.amount:0;
                totalDP = totalDP + parseFloat(amount);
                viewTambahDPIndex0 = <View style={[{ width:"34%", height: "20px",paddingLeft:'4px' }]}>
                <Text style={[ { width: 200, maxWidth: 200,textAlign:'left', marginTop: '5px', fontSize: fontSizeBig }]}>{"Tambah DP "}{desimal00(formatRupiah(new String(amount).replaceAll('.',','),2))}{' ('+det.date+')'}</Text>
                </View>; 
            }   
        }
    }

    list.push(
        <View style={{display:'table',width:'auto'}}>
            {listRow1}

            <View style={{flexDirection:'row'}}>
            {/* <View style={[{ width:"34%", height: "20px",paddingLeft:'4px' }]}>
            <Text style={[ { width: 200, maxWidth: 200,textAlign:'left', marginTop: '5px', fontSize: fontSizeBig }]}>{saldoDP > 0?"Saldo DP "+desimal00(formatRupiah(new String(saldoDP).replaceAll('.',','),2)):null }</Text>
            </View> */}
            {viewSaldoDP !== null?viewSaldoDP:viewTambahDPIndex0}
            {tempViewSaldoPinjaman}
            {viewLabelTransfer}
            {viewValueTransfer}
            </View>
        </View>
    );
    
    if(deposits){
        for(let i=0; i < deposits.length; i++){
            let det = deposits[i];
            let amount = det.amount?det.amount:0;
            totalDP = totalDP + parseFloat(amount);
            
            if(i == 0){
                list.push(
                <View style={{display:'table',width:'auto'}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={[{ width:"34%", height: "17px",paddingLeft:'4px' }]}>
                        <Text style={[ { width: 200, maxWidth: 200,textAlign:'left', marginTop: '1px', fontSize: fontSizeBig }]}>{indexDep == 0?"Tambah DP "+desimal00(formatRupiah(new String(amount).replaceAll('.',','),2)) +' ('+det.date+')' :""}</Text>
                        </View>
                        {tempViewSetorPinjaman}
                    </View>
                </View>
                
            );
            tempViewSetorPinjaman = null;
            }else if(i == 1){
                list.push(
                <View style={{display:'table',width:'auto'}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={[{ width:"34%", height: "17px",paddingLeft:'4px' }]}>
                        <Text style={[ { width: 200, maxWidth: 200,textAlign:'left', marginTop: '1px', fontSize: fontSizeBig }]}>{"Tambah DP "}{desimal00(formatRupiah(new String(amount).replaceAll('.',','),2))}{' ('+det.date+')'}</Text>
                        </View>
                        {tempViewSisaPinjaman}
                    </View>
                </View>
                
            );
            tempViewSisaPinjaman = null;
            }else{
                list.push(<Text style={[styles.tableCell, { width: 300, maxWidth: 300, marginTop: '1px', fontSize: fontSizeBig }]}>{"Tambah DP : "}{desimal00(formatRupiah(new String(amount).replaceAll('.',','),2))}{' ('+det.date+')'}</Text>);
            }            
        }   
    }
    if(setorPinjaman > 0){
        // totalprice = totalprice - setorPinjaman;
        nilaiNota = nilaiNota - setorPinjaman;
    // if(false){
        list.push(
        <View style={{display:'table',width:'auto'}}>
             <View style={{flexDirection:'row'}}>
            <View style={[{ width:"34%", height: "25px",paddingLeft:'4px' }]}>
            <Text style={[ { width: 200, maxWidth: 200,textAlign:'left', marginTop: '1px', fontSize: fontSizeBig }]}>
                {"Total Invoice - Setoran Pinjaman \n"}
                {desimal00(formatRupiah(new String(totalprice).replaceAll('.',','),2))}{" - "}{desimal00(formatRupiah(new String(setorPinjaman).replaceAll('.',','),2))}{" = "}{desimal00(formatRupiah(new String(nilaiNota).replaceAll('.',','),2))}
                </Text>
            </View>
            {tempViewSetorPinjaman !== null?tempViewSetorPinjaman:tempViewSisaPinjaman}
            </View>

            {/* <View style={{flexDirection:'row'}}>
            <View style={[{ width:"34%", height: "17px",paddingLeft:'4px' }]}>
            <Text style={[ { width: 200, maxWidth: 200,textAlign:'left', marginTop: '1px', fontSize: fontSizeBig }]}>{desimal00(formatRupiah(new String(totalprice).replaceAll('.',','),2))}{" - "}{desimal00(formatRupiah(new String(setorPinjaman).replaceAll('.',','),2))}{" = "}{desimal00(formatRupiah(new String(nilaiNota).replaceAll('.',','),2))}</Text>
            </View>
            {tempViewSetorPinjaman !== null?tempViewSisaPinjaman:null}
            </View> */}
        </View>
        );
        tempViewSetorPinjaman = null;
        tempViewSisaPinjaman = null;
    }
    
    sisaDP = totalDP - (nilaiNota - transfer);
    if(tempViewSetorPinjaman !== null && tempViewSisaPinjaman !== null){
        list.push(
        <View style={{display:'table',width:'auto'}}>
            <View style={{flexDirection:'row'}}>
                <View style={[{ width:"34%", height: "17px",paddingLeft:'4px' }]}>
                <Text style={[ { width: 200, maxWidth: 200,textAlign:'left', marginTop: '0px', fontSize: fontSizeBig }]}>{showLabelDP ?"Sisa DP "+desimal00(formatRupiah(new String(sisaDP).replaceAll('.',','),2)):null}</Text>
                </View>
                {tempViewSetorPinjaman}
            </View>
            {/* <View style={{flexDirection:'row'}}>
                <View style={[{ width:"34%", height: "17px",paddingLeft:'4px' }]}>
                <Text style={[ { width: 200, maxWidth: 200,textAlign:'left', marginTop: '0px', fontSize: fontSizeBig }]}>{""}</Text>
                </View>
                {tempViewSisaPinjaman}
            </View> */}
        </View>
    );
    }else if(tempViewSetorPinjaman !== null || tempViewSisaPinjaman !== null){
        list.push(
        <View style={{display:'table',width:'auto'}}>
            <View style={{flexDirection:'row'}}>
                <View style={[{ width:"34%", height: "17px",paddingLeft:'4px' }]}>
                <Text style={[ { width: 200, maxWidth: 200,textAlign:'left', marginTop: '0px', fontSize: fontSizeBig }]}>{showLabelDP ? "Sisa DP "+desimal00(formatRupiah(new String(sisaDP).replaceAll('.',','),2)):null}</Text>
                </View>
                {tempViewSetorPinjaman !== null?tempViewSetorPinjaman:tempViewSisaPinjaman}
            </View>
        </View>
    );
    }else{
        list.push(<Text style={[styles.tableCell, { width: 300, maxWidth: 300, marginTop: '1px', fontSize: fontSizeBig }]}> {showLabelDP ? "Sisa DP : "+desimal00(formatRupiah(new String(sisaDP).replaceAll('.',','),2)) :null}  </Text>);
    }
    
    
    return list;
}

const setUdangMati = (items) =>{
    if(items != undefined && items != null){
        let listfilteroutput = items.filter(output => output.type == 'M' && output.qty > 0);
        let list = [];
        if(listfilteroutput.length > 0){
            for(let i=0; i < listfilteroutput.length; i++){
                let det = listfilteroutput[i];
                list.push(det.size+'('+det.qty+')');
            }
            
            return <Text style={[styles.tableCell, { width: 300, maxWidth: 300, marginTop: '1px', fontSize: fontSizeBig }]}>{'Udang Mati '+list.join()}</Text>
            
        }
        
    }
    return null;
}
const getBankVendor = (items) =>{
    if(items){
        let det = items;
        let list = [];
        if(det.vendorBank !== '' && det.vendorAccNo !== '' && det.vendorAccNameBank !== ''){
            list.push(<Text style={[styles.tableCell, { width: 200, maxWidth: 200, marginTop: '1px', fontSize: fontSizeBig }]}>{"Bank Account :"}</Text>);
            list.push(<Text style={[styles.tableCell, { width: 200, maxWidth: 200, marginTop: '1px', fontSize: fontSizeBig }]}>{det.vendorBank}</Text>);
            list.push(<Text style={[styles.tableCell, { width: 200, maxWidth: 200, marginTop: '1px', fontSize: fontSizeBig }]}>{"a/c "+det.vendorAccNo}</Text>);
            list.push(<Text style={[styles.tableCell, { width: 200, maxWidth: 200, marginTop: '1px', fontSize: fontSizeBig }]}>{"a/n "+det.vendorAccNameBank}</Text>);
            return list;
        }
        
        // return null;
    }
    return null;
}
const setItems = (value) =>{
    let items = value.items
    let charges = value.charges
    let inventori = value.inventori
    if(items != undefined && items != null){
        let listRow = [];
        let totalQty = 0;
        let totalSubtotalPrice = 0;
        let no = 1;

        let listfilteroutput = items.filter(output => output.qtynota > 0 && output.type == 'H');
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
            let qtyHidup = '';
            let qtyMati = '';
            // let totalQtyHidup = 0;
            
            let listfilteroutputHidup = listfilteroutput.filter(output => output.type == 'H' && output.idcategoryproduct == det.idcategoryproduct);
            // console.log('det.idcategoryproduct '+det.idcategoryproduct+' '+qtyHidup);
            if(listfilteroutputHidup.length > 0){
                qtyHidup = listfilteroutputHidup[0].qtynota;
                totalQty += parseInt(qtyHidup);
                totalSubtotalPrice += parseFloat(listfilteroutputHidup[0].subtotalprice)
            }
            
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.no, height: heightRow }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthno, maxWidth: styles.width.widthno, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{no}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.namabarang, height: heightRow }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthnamabarang, maxWidth: styles.width.widthnamabarang, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.productName}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.ukuran, height: heightRow }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthukuran, maxWidth: styles.width.widthukuran, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.size}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.gram, height: heightRow }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthgram, maxWidth: styles.width.widthgram, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.weightfrom+' - '+det.weightto}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.kuantitas, height: heightRow }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthkuantitas, maxWidth: styles.width.widthkuantitas, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{qtyHidup}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.harga, height: heightRow }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthharga, maxWidth: styles.width.widthharga, textAlign:'right', marginTop: '5px', fontSize: fontSizeBig }]}>{det.price?desimal00(formatRupiah(new String(det.price).replaceAll('.',','),2)):0}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.jumlah, height: heightRow }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthjumlah, maxWidth: styles.width.widthjumlah, textAlign:'right', marginTop: '5px', fontSize: fontSizeBig }]}>{det.subtotalprice?desimal00(formatRupiah(new String(det.subtotalprice).replaceAll('.',','),2)):0}</Text>
                </View>
            );
            
            listRow.push(<View style={styles.tableRow}>{rowItem}</View>)
            no++;
        }
        let rowItem = [];
        rowItem.push(
            <View style={[styles.tableColWidth, { width:styles.width.chargeandinventori, height: heightRow }]}>
                <Text style={[styles.tableCell, { width: styles.width.widthchargeandinventori, maxWidth: styles.width.widthchargeandinventori, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{''}</Text>
            </View>
        );
        rowItem.push(
            <View style={[styles.tableColWidth, { width:styles.width.kuantitas, height: heightRow }]}>
                <Text style={[styles.tableCell, { width: styles.width.widthkuantitas, maxWidth: styles.width.widthkuantitas, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{totalQty}</Text>
            </View>
        );
        rowItem.push(
            <View style={[styles.tableColWidth, { width:styles.width.harga, height: heightRow }]}>
                <Text style={[styles.tableCell, { width: styles.width.widthharga, maxWidth: styles.width.widthharga, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{''}</Text>
            </View>
        );
        rowItem.push(
            <View style={[styles.tableColWidth, { width:styles.width.jumlah, height: heightRow }]}>
                <Text style={[styles.tableCell, { width: styles.width.widthjumlah, maxWidth: styles.width.widthjumlah, textAlign:'right', marginTop: '5px', fontSize: fontSizeBig }]}>{desimal00(formatRupiah(new String(totalSubtotalPrice).replaceAll('.',','),2),{isShow000:false})}</Text>
            </View>
        );
        
        listRow.push(<View style={styles.tableRow}>{rowItem}</View>)

        let listfilteroutputcharges = charges.filter(output => output.qty > 0 && output.chargename !== 'SETORPINJAMAN');
        for(let i=0; i < listfilteroutputcharges.length; i++){
            let det = listfilteroutputcharges[i];
            rowItem = [];
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.chargeandinventori, height: heightRow }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthchargeandinventori, maxWidth: styles.width.widthchargeandinventori, textAlign:'left', marginTop: '5px', fontSize: fontSizeBig }]}>{det.chargenamecustom?det.chargenamecustom :det.chargename}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.kuantitas, height: heightRow }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthkuantitas, maxWidth: styles.width.widthkuantitas, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.qty}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.harga, height: heightRow }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthharga, maxWidth: styles.width.widthharga, textAlign:'right', marginTop: '5px', fontSize: fontSizeBig }]}>{det.price?desimal00(formatRupiah(new String(det.price).replaceAll('.',','),2)):0}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.jumlah, height: heightRow }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthjumlah, maxWidth: styles.width.widthjumlah, textAlign:'right', marginTop: '5px', fontSize: fontSizeBig }]}>{det.subtotalprice?addKurungBukaPadaValue(det.chargename,desimal00(formatRupiah(new String(det.subtotalprice).replaceAll('.',','),2))):0}</Text>
                </View>
            );
            
            listRow.push(<View style={styles.tableRow}>{rowItem}</View>)
        }
        
        let listfilteroutputinventori = inventori.filter(output => output.qty > 0);
        for(let i=0; i < listfilteroutputinventori.length; i++){
            let det = listfilteroutputinventori[i];
            rowItem = [];
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.chargeandinventori, height: heightRow }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthchargeandinventori, maxWidth: styles.width.widthchargeandinventori, textAlign:'left', marginTop: '5px', fontSize: fontSizeBig }]}>{det.inventoriname}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.kuantitas, height: heightRow }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthkuantitas, maxWidth: styles.width.widthkuantitas, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{det.qty}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.harga, height: heightRow }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthharga, maxWidth: styles.width.widthharga, textAlign:'right', marginTop: '5px', fontSize: fontSizeBig }]}>{det.price?desimal00(formatRupiah(new String(det.price).replaceAll('.',','),2)):0}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.jumlah, height: heightRow }]}>
                    <Text style={[styles.tableCell, { width: styles.width.widthjumlah, maxWidth: styles.width.widthjumlah, textAlign:'right', marginTop: '5px', fontSize: fontSizeBig }]}>{det.subtotalprice?addKurungBukaPadaValue(det.chargename,desimal00(formatRupiah(new String(det.subtotalprice).replaceAll('.',','),2))):0}</Text>
                </View>
            );
            
            listRow.push(<View style={styles.tableRow}>{rowItem}</View>)
        }
        
        return listRow;
    }
    return null;
}

const getValueChargesBox = (items) =>{
    if(items !== null && items !== undefined){
        let listfilteroutput = items.filter(output => output.chargename  == 'BOX');
        if(listfilteroutput.length > 0){
            return listfilteroutput[0].qty;
        }
    }
    
    return 0
}

const GeneratePurchaseReceiveSupplier = ({ valuedata }) => {
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
                                <Image source={"img/logoheaderpdf.png"} style={{width:'200px',height:'80px'}}/>
                            </View>

                            <View style={{ flexDirection: 'row-reverse', paddingTop: '0px' }}>
                            <View style={[styles.tableNoBorder,{marginLeft:'0px'}]}>
                            <View style={styles.tableRow}>

                            <View style={[styles.tableColWidthNoBorder, {  height: "50px",marginBottom:'80px',marginLeft:'100px' }]}>
                                <Text style={[{ fontFamily: 'roboto',width: styles.width.widthno, maxWidth: styles.width.widthno, marginTop: '5px', fontSize: 18,marginLeft:'50px' }]}>{"Purchase Invoice"}</Text>

                            <View style={[styles.tableNoBorder]}>
                            <View style={styles.tableRow}>
                            <View style={[styles.tableColWidth, { borderLeft:1,borderTop:1,width:"53%", height: "70px" }]}>
                                <Text style={[styles.tableCell, { fontFamily: 'roboto',width: 10, maxWidth: 10, marginTop: '5px', fontSize: fontSizeBig }]}>
                                    {"Kepada Yth:"}
                                </Text>
                                <Text style={[styles.tableCell, { width: 200, maxWidth: 200, marginTop: '5px', fontSize: fontSizeBig }]}>
                                    {valuedata != null?valuedata.vendorNama+' / '+valuedata.vendorAlias:''}
                                </Text>
                                <Text style={[styles.tableCell, { width: 200, maxWidth: 200, marginTop: '5px', fontSize: fontSizeBig }]}>
                                    {valuedata != null?valuedata.namaArea:''}
                                </Text>
                            </View>
                            <View style={[styles.tableColWidthNoBorder, { borderBottom:0,borderTop:0,width:"47%", height: "70px" }]}>
                                <Text style={[styles.tableCell, { width: 100, maxWidth: 100, marginTop: '5px', fontSize: fontSizeBig }]}>{""}</Text>
                            </View>
                            </View>
                            </View>

                            <Text style={[styles.tableCell, {width: 10, maxWidth: 10, marginTop: '5px', fontSize: fontSizeBig }]}>
                                
                               <Text style={{fontFamily: 'roboto'}}>{'Purchase Inv Date :                                        '}</Text> {valuedata != null?valuedata.transactiondate:''}
                            </Text>
                                
                            </View>
                            
                            </View>
                            </View>
                            
                            </View>    

                            </View>

                            
                            <View style={[styles.table,{marginTop:'0px'}]}>
                            <View style={styles.tableRow}>
                            <View style={[styles.tableColWidth, { fontFamily: 'roboto',backgroundColor:'#bcd6ed',width:styles.width.flightno, height: heightRow }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthflightno, maxWidth: styles.width.widthflightno,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Flight No."}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { fontFamily: 'roboto',backgroundColor:'#bcd6ed',width:styles.width.smuno, height: heightRow }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthsmuno, maxWidth: styles.width.widthsmuno, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"SMU No."}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { fontFamily: 'roboto',backgroundColor:'#bcd6ed',width:styles.width.koli, height: heightRow }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthkoli, maxWidth: styles.width.widthkoli, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Collie"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { fontFamily: 'roboto',backgroundColor:'#bcd6ed',width:styles.width.prno, height: heightRow }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthprno, maxWidth: styles.width.widthprno, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Invoice No."}</Text>
                            </View>
                            </View>

                            <View style={styles.tableRow}>
                            <View style={[styles.tableColWidth, { width:styles.width.flightno, height: heightRow }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthflightno, maxWidth: styles.width.widthflightno,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?valuedata.flightno:''}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.smuno, height: heightRow }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthsmuno, maxWidth: styles.width.widthsmuno, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?valuedata.noSMU:''}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.koli, height: heightRow }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthkoli, maxWidth: styles.width.widthkoli, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?getValueChargesBox(valuedata.charges):''}</Text>
                            </View>
                            <View style={[styles.tableColWidth, { width:styles.width.prno, height: heightRow }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthprno, maxWidth: styles.width.widthprno, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null?valuedata.nodocument:''}</Text>
                            </View>
                            </View>

                            <View style={styles.tableRow}>
                            <View style={[styles.tableColWidth, {fontFamily: 'roboto',backgroundColor:'#bcd6ed', width:styles.width.no, height: heightRow }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthno, maxWidth: styles.width.widthno, marginTop: '5px', fontSize: fontSizeBig }]}>{"No"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, {fontFamily: 'roboto',backgroundColor:'#bcd6ed', width:styles.width.namabarang, height: heightRow }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthnamabarang, maxWidth: styles.width.widthnamabarang, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Nama Barang"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, {fontFamily: 'roboto',backgroundColor:'#bcd6ed',width:styles.width.ukuran, height: heightRow }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthukuran, maxWidth: styles.width.widthukuran, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Ukuran"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, {fontFamily: 'roboto',backgroundColor:'#bcd6ed', width:styles.width.gram, height: heightRow }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthgram, maxWidth: styles.width.widthgram, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Gram"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, {fontFamily: 'roboto',backgroundColor:'#bcd6ed', width:styles.width.kuantitas, height: heightRow }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthkuantitas, maxWidth: styles.width.widthkuantitas, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Kuantitas"}</Text>
                            </View>
                            <View style={[styles.tableColWidth, {fontFamily: 'roboto',backgroundColor:'#bcd6ed', width:styles.width.harga, height: heightRow }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthkilo, maxWidth: styles.width.widthharga, textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Harga"}</Text>
                            </View>

                            <View style={[styles.tableColWidth, {fontFamily: 'roboto',backgroundColor:'#bcd6ed', width:styles.width.jumlah, height: heightRow }]}>
                                <Text style={[styles.tableCell, { width: styles.width.widthmati, maxWidth: styles.width.widthjumlah,textAlign:'center', marginTop: '5px', fontSize: fontSizeBig }]}>{"Jumlah"}</Text>
                            </View>

                            </View>
                            {setItems(valuedata != null ? valuedata : [])}

                            </View>

                            <View style={[styles.table]}>
                            <View style={styles.tableRow}>
                            {/* <View style={[styles.tableColWidth, { width:"100%", height:(valuedata != null ? valuedata.sizeHeightBoxInfoDPDLL : "150px") }]}> */}
                            {/* Height dihapus agar fleksibel */}
                            <View style={[styles.tableColWidth, { width:"100%"}]}>
                                {lsitTambahDP(valuedata != null ? valuedata : [])}
                                <Text style={[styles.tableCell, { fontFamily: 'roboto',width: 200, maxWidth: 200, marginTop: '1px', fontSize: fontSizeBig }]}>{"Keterangan: "}</Text>
                                <Text style={[styles.tableCell, { width: 300, maxWidth: 300, marginTop: '1px', fontSize: fontSizeBig }]}>{valuedata != null ? valuedata.notes : ''}</Text>
                                <Text style={[styles.tableCell, { width: 300, maxWidth: 300, marginTop: '1px', fontSize: fontSizeBig }]}>{valuedata != null ? valuedata.notes2 : ''}</Text>
                                {setUdangMati(valuedata != null ? valuedata.items : [])}
                                {penyesuaianTerbilang(valuedata != null ? valuedata : [])}
                                <Text style={[styles.tableCell, { fontFamily: 'roboto',width: 500, maxWidth: 500, marginTop: '1px', fontSize: fontSizeBig }]}>{'Terbilang :'}{valuedata != null ? terbilangRupiah(valuedata.totalprice) : ''}</Text>    
                            </View>
                            
                            </View>
                            
                            </View>

                            <View style={[styles.table]}>
                            <View style={styles.tableRow}>
                            <View style={[styles.tableColWidth, { width:"60%", height: "90px" }]}>
                                <Text style={[styles.tableCell, { fontFamily: 'roboto',width: 100, maxWidth: 100, marginTop: '5px', fontSize: fontSizeBig }]}>{"Remarks"}</Text>
                                {getBankVendor(valuedata != null ? valuedata : [])}
                            </View>
                            <View style={[styles.tableColWidth, { width:"40%", height: "90px", paddingLeft:'5px' }]}>
                            <View style={{ flexDirection: 'row',paddingTop:'78px' }}>
                                <View style={{ flexDirection: 'row-reverse' }}>
                                
                                <Text style={{ fontSize: 7 }}>{'Print By : '+(valuedata != null?valuedata.namaUser+' '+valuedata.currtime+', '+valuedata.currdate:'')}</Text>
                                </View>

                            </View>

                            </View>
                            </View>
                            </View>
                            
                            <Text style={{textAlign:'right',marginRight:"2px",fontSize:7}}>{"Edit:"}{(valuedata != null?valuedata.countEdit:'')}{"  Print:"}{(valuedata != null?(valuedata.countPrint?valuedata.countPrint+1:1):'')}{" Page 1/1"}</Text>

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
export default GeneratePurchaseReceiveSupplier;