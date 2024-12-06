import React, { Fragment, useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';
// import roboto from '../../../../components/';
import roboto from '../../../../components/Fonts/Roboto/Roboto-Bold.ttf';
import { numToMoney } from '../../../shared/globalFunc';
import { addKurungBukaPadaValue } from '../utilityPurchaseReceive';

const fontSizeBig = 10;
const fontSizeMedium = 8;
const fontSizeSmall = 0;

const styles = StyleSheet.create({
    width:{
        no:'5%',
        product:'20%',
        size:'15%',
        gram:'15%',
        qty:'10%',
        price:'17%',
        subprice:'18%'
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
const setCharges = (items) =>{
    if(items != undefined && items != null){
        let listRow = [];
        let listfilteroutput = items.filter(output => output.qty > 0);
        for(let i=0; i < listfilteroutput.length; i++){
            let rowItem = [];
            let det = listfilteroutput[i];

            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.no, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{''}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.product,height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: 290, maxWidth: 290, marginTop: '5px', fontSize: fontSizeBig }]}>{det.chargename}</Text>
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
                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{det.qty}</Text>
                </View> 
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.price, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{det.price?numToMoney(det.price):''}</Text>
                </View> 
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.subprice, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{det.subtotalprice?addKurungBukaPadaValue(det.chargename,numToMoney(det.subtotalprice)) :''}</Text>
                </View> 
            );
            listRow.push(<View style={styles.tableRow}>{rowItem}</View>);
        }
        return listRow;
    }
    return null;
}
const setItems = (items) =>{
    
    if(items != undefined && items != null){
        let listfilteroutput = items.filter(output => output.type == 'H');
        let listRow = [];
        let no =1;
        let totalQtyItems = 0;
        let totalSubtotalPriceItems = 0;
        for(let i=0; i < listfilteroutput.length; i++){
            let rowItem = [];
            let det = listfilteroutput[i];
            let qty = parseInt(det.qty) + parseInt(det.qtybonus);
            if(qty == 0){
                continue;
            }
            let subtotalprice = det.subtotalprice?parseFloat(det.subtotalprice):0;
            totalQtyItems += qty;
            totalSubtotalPriceItems += subtotalprice;

            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.no, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{no}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.product,height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: 290, maxWidth: 290, marginTop: '5px', fontSize: fontSizeBig }]}>{det.productName}</Text>
                </View>
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.size, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{det.size}</Text>
                </View> 
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.gram, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{(det.weightfrom?det.weightfrom+'-':'')}{(det.weightto?det.weightto:'')}</Text>
                </View> 
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.qty, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{qty}</Text>
                </View> 
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.price, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{det.price?numToMoney(det.price):''}</Text>
                </View> 
            );
            rowItem.push(
                <View style={[styles.tableColWidth, { width:styles.width.subprice, height: "25px" }]}>
                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{det.subtotalprice?numToMoney(det.subtotalprice):''}</Text>
                </View> 
            );
            listRow.push(<View style={styles.tableRow}>{rowItem}</View>)
            no++;
        }

        /** Total SubtotalItems */
        let rowItem = [];
        rowItem.push(
            <View style={[styles.tableColWidth, { width:styles.width.no, height: "25px" }]}>
                <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{''}</Text>
            </View>
        );
        rowItem.push(
            <View style={[styles.tableColWidth, { width:styles.width.product,height: "25px" }]}>
                <Text style={[styles.tableCell, { width: 290, maxWidth: 290, marginTop: '5px', fontSize: fontSizeBig }]}>{''}</Text>
            </View>
        );
        rowItem.push(
            <View style={[styles.tableColWidth, { width:styles.width.size, height: "25px" }]}>
                <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{''}</Text>
            </View> 
        );
        rowItem.push(
            <View style={[styles.tableColWidth, { width:styles.width.gram, height: "25px" }]}>
                <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{'Subtotal'}</Text>
            </View> 
        );
        rowItem.push(
            <View style={[styles.tableColWidth, { width:styles.width.qty, height: "25px" }]}>
                <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{totalQtyItems}</Text>
            </View> 
        );
        rowItem.push(
            <View style={[styles.tableColWidth, { width:styles.width.price, height: "25px" }]}>
                <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{''}</Text>
            </View> 
        );
        rowItem.push(
            <View style={[styles.tableColWidth, { width:styles.width.subprice, height: "25px" }]}>
                <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{totalSubtotalPriceItems?numToMoney(totalSubtotalPriceItems):0}</Text>
            </View> 
        );
        listRow.push(<View style={styles.tableRow}>{rowItem}</View>)

        return listRow;
    }
    return null;
}

const setUdangMati = (items) =>{
    if(items != undefined && items != null){
        let listfilteroutput = items.filter(output => output.type == 'M' && output.qty > 0);
        let list = [];
        if(listfilteroutput.length > 0){
            for(let i=0; i < listfilteroutput.length; i++){
                let det = listfilteroutput[i];
                list.push(det.size+det.qty);
            }
            
            return [
                <View style={{ flexDirection: 'row'}}>
                <View style={{ flexDirection: 'row-reverse', }}>
                        <Text style={{ fontSize: fontSizeBig }}>{'Udang Mati '+list.join()}</Text>
                    </View>
                </View>
            ]
        }
        
    }
    return null;
}

const setInformasiNilaiUang = (items) =>{
    /**
     * Jika setor sesuai nota,maka kolom setor jangan dimunculkan, hanya muncul saldo dan sisa deposit
     * jika supplier tidak ada deposit makan jangan ditampilkan info deposit
     * jika ada iddeposit maka, info tambah dp dimunculkan
     */
    let setor = items.setor?parseFloat(items.setor):0;
    let totalprice = items.totalprice?parseFloat(items.totalprice):0;
    let sisaDeposit = items.sisaDeposit?parseFloat(items.sisaDeposit):0;
    let tambahDP = items.depositAmount?parseFloat(items.depositAmount):0;
    let saldoDepositBeforeNotaSubmit = items.saldoDepositBeforeNotaSubmit?parseFloat(items.saldoDepositBeforeNotaSubmit):0;
    let row = [];

    let list = ['SALDO','SETOR','TAMBAHDP','SISADP'];
    let listDone = [];
    let no = 1;
    for(let i =0 ; i < 4; i++){
    let label = '';
    let value = '';
    for(let i =0 ; i < list.length; i++){
        let val = list[i];
        if(listDone.indexOf(val) > -1){
            continue;
        }else{
            listDone.push(val);
        }
        if(val == 'SALDO' && saldoDepositBeforeNotaSubmit > 0){
            label = 'Saldo :';
            value = numToMoney(saldoDepositBeforeNotaSubmit);
            break;
        }else if(val == 'SETOR' && setor !== totalprice){
            label = 'Setor :';
            value = numToMoney(setor);
            break;
        }else if(val == 'TAMBAHDP' && tambahDP > 0){
            label = 'Tambah DP :';
            value = numToMoney(tambahDP);
            break;
        }else if(val == 'SISADP' && sisaDeposit > 0){
            label = 'Sisa Deposit :';
            value = numToMoney(sisaDeposit);
            break;
        }
    }
        if(no == 1){
            row.push(
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row-reverse' }}>
                        <Text style={[{ margin: '0 auto', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', width: 250, maxWidth: 250 }]}>{label}{value}</Text>
                    </View>
        
                    <View style={{ flexDirection: 'row-reverse', marginLeft: '20%' }}>
                        <Text style={{ fontSize: fontSizeBig }}>{'Bank :  '}{items.bank}</Text>
                    </View>
                </View>
            );
            no = 2;
            continue;
        }

        if(no == 2 ){
            row.push(
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row-reverse' }}>
                        <Text style={[{ margin: '0 auto', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', width: 250, maxWidth: 250 }]}>{label}{value}</Text>
                    </View>
        
                    <View style={{ flexDirection: 'row-reverse', marginLeft: '20%' }}>
                        <Text style={{ fontSize: fontSizeBig }}>{'Nama :  '}{items.accountnamebank}</Text>
                    </View>
                </View>
            );
            no = 3;
            continue;
        }

        if(no == 3 ){
            row.push(
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row-reverse' }}>
                        <Text style={[{ margin: '0 auto', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', width: 250, maxWidth: 250 }]}>{label}{value}</Text>
                    </View>
        
                    <View style={{ flexDirection: 'row-reverse', marginLeft: '20%' }}>
                        <Text style={{ fontSize: fontSizeBig }}>{'No Rekening :  '}{items.accountnobank}</Text>
                    </View>
                </View>
            );
            no = 4;
            continue;
        }

        if(no == 4){
            row.push(
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row-reverse', }}>
                        <Text style={{ fontSize: fontSizeBig }}>{label}{value}</Text>
                    </View>
                </View>
            );
        }
    }
    // row.push(
    //     <View style={{ flexDirection: 'row' }}>
    //         <View style={{ flexDirection: 'row-reverse' }}>
    //             <Text style={[{ margin: '0 auto', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', width: 250, maxWidth: 250 }]}>{'Saldo : '}{numToMoney(saldoDepositBeforeNotaSubmit)}</Text>
    //         </View>

    //         <View style={{ flexDirection: 'row-reverse', marginLeft: '20%' }}>
    //             <Text style={{ fontSize: fontSizeBig }}>{'Bank :  '}{items.bank}</Text>
    //         </View>
    //     </View>
    // );
    // row.push(
    //     <View style={{ flexDirection: 'row' }}>
    //         <View style={{ flexDirection: 'row-reverse' }}>
    //             <Text style={[{ margin: '0 auto', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', width: 250, maxWidth: 250 }]}>{'Setor : '}{numToMoney(setor)}</Text>
    //         </View>

    //         <View style={{ flexDirection: 'row-reverse', marginLeft: '20%' }}>
    //             <Text style={{ fontSize: fontSizeBig }}>{'Nama :  '}{items.accountnamebank}</Text>
    //         </View>
    //     </View>
    // );

    // row.push(
    //     <View style={{ flexDirection: 'row' }}>
    //         <View style={{ flexDirection: 'row-reverse' }}>
    //             <Text style={[{ margin: '0 auto', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', width: 250, maxWidth: 250 }]}>{'Tambah DP : '}{numToMoney(tambahDP)}</Text>
    //         </View>

    //         <View style={{ flexDirection: 'row-reverse', marginLeft: '20%' }}>
    //             <Text style={{ fontSize: fontSizeBig }}>{'No Rekening :  '}{items.accountnobank}</Text>
    //         </View>
    //     </View>
    // );

    // row.push(
    //     <View style={{ flexDirection: 'row' }}>
    //         <View style={{ flexDirection: 'row-reverse', }}>
    //             <Text style={{ fontSize: fontSizeBig }}>{'Sisa DP :'}{numToMoney(sisaDeposit)}</Text>
    //         </View>
    //     </View>
    // );
    return row;

}

const GenerateSupplier = ({ valuedata }) => {
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
                            <View style={{ flexDirection: 'row-reverse' }}>
                                <Text style={[{ fontFamily: 'roboto', fontSize: fontSizeBig, margin: '0 auto', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', width: 250, maxWidth: 250 }]}>{valuedata != null ? valuedata.companyName : ''}</Text>
                            </View>

                            <View style={{ flexDirection: 'row-reverse', marginLeft: '20%' }}>
                                <Text style={{ fontSize: fontSizeBig }}>{"Kepada  : "}{valuedata != null ? valuedata.vendorNama : ''}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row-reverse' }}>
                                <Text style={[{ margin: '0 auto', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', width: 250, maxWidth: 250 }]}>{''}</Text>
                            </View>

                            <View style={{ flexDirection: 'row-reverse', marginLeft: '20%' }}>
                                <Text style={{ fontSize: fontSizeBig }}>{'Koli        : '}{valuedata != null ? valuedata.koli : ''}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row-reverse' }}>
                                <Text style={[{ margin: '0 auto', textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', width: 250, maxWidth: 250 }]}>{'NOTA SUPPLIER'}</Text>
                            </View>

                            <View style={{ flexDirection: 'row-reverse', marginLeft: '20%' }}>
                                <Text style={{ fontSize: fontSizeBig }}>{'Tanggal : '}{valuedata != null ? valuedata.transactiondate : ''}</Text>
                            </View>
                        </View>

                        <View style={styles.table}>
                            {/* header judul */}
                            <View style={styles.tableRow}>
                                <View style={[styles.tableColWidth, { width:styles.width.no, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{"No."}</Text>
                                </View>
                                <View style={[styles.tableColWidth, { width:styles.width.product,height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: 290, maxWidth: 290, marginTop: '5px', fontSize: fontSizeBig }]}>{"Product"}</Text>
                                </View>
                                <View style={[styles.tableColWidth, { width:styles.width.size, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{"Size"}</Text>
                                </View> 
                                <View style={[styles.tableColWidth, { width:styles.width.gram, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{"Gram"}</Text>
                                </View> 
                                <View style={[styles.tableColWidth, { width:styles.width.qty, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{"Kuantitas"}</Text>
                                </View> 
                                <View style={[styles.tableColWidth, { width:styles.width.price, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{"Harga"}</Text>
                                </View> 
                                <View style={[styles.tableColWidth, { width:styles.width.subprice, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{"Jumlah"}</Text>
                                </View> 
                            </View>

                            {/* Items */}
                            {setItems(valuedata != null ? valuedata.items : [])}

                            {/* Charges */}
                            {setCharges(valuedata != null ? valuedata.charges : [])}

                            {/* Total */}
                            <View style={styles.tableRow}>
                                <View style={[styles.tableColWidth, { width:styles.width.no, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{""}</Text>
                                </View>
                                <View style={[styles.tableColWidth, { width:styles.width.product,height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: 290, maxWidth: 290, marginTop: '5px', fontSize: fontSizeBig }]}>{""}</Text>
                                </View>
                                <View style={[styles.tableColWidth, { width:styles.width.size, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{""}</Text>
                                </View> 
                                <View style={[styles.tableColWidth, { width:styles.width.gram, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{"Total Nota"}</Text>
                                </View> 
                                <View style={[styles.tableColWidth, { width:styles.width.qty, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{""}</Text>
                                </View> 
                                <View style={[styles.tableColWidth, { width:styles.width.price, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{""}</Text>
                                </View> 
                                <View style={[styles.tableColWidth, { width:styles.width.subprice, height: "25px" }]}>
                                    <Text style={[styles.tableCell, { width: 440, maxWidth: 440, marginTop: '5px', fontSize: fontSizeBig }]}>{valuedata != null ? (valuedata.totalprice?numToMoney(valuedata.totalprice):'' ): []}</Text>
                                </View> 
                            </View>
                            
                        </View>

                            {/* NB */}
                            <View style={{ flexDirection: 'row', paddingTop:'10px' }}>
                                <View style={{ flexDirection: 'row-reverse', }}>
                                    <Text style={{ fontSize: fontSizeBig }}>{'NB'}</Text>
                                </View>
                            </View>

                            {/* List udang Mati */}
                            {setUdangMati(valuedata != null ? valuedata.items : [])}

                            {setInformasiNilaiUang(valuedata != null ? valuedata : [])}

                    </View>

                    :<View style={{ marginTop: '20px' }}>
                    <Text>{" "}</Text>
                    </View>
                }
            </Fragment>
        )
    }

    return (
        generatePdf(valuedata)
    );

};
export default GenerateSupplier;