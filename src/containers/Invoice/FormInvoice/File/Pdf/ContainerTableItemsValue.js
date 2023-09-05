import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { numToMoney } from '../../../../shared/globalFunc';
import moment                          from 'moment';
import { formatdate } from '../../../../shared/constantValue';

// const borderColor = '#3778C2';
const borderColor = 'black';
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        // borderBottomColor: '#3778C2',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 20,
        fontStyle: 'bold',
        flexGrow: 1,
    },
    rowtes: {
        flexDirection: 'row',
        // borderBottomColor: '#3778C2',
        // borderBottomColor: 'black',
        // borderBottomWidth: 1,
        alignItems: 'center',
        height: 20,
        fontStyle: 'bold',
        flexGrow: 1,
    },
    no: {
        width: '10%',
        textAlign: 'center',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        textAlign: 'center',
        borderRightWidth: 1,
    },
    jasa: {
        width: '30%',
        textAlign: 'left',
        paddingLeft:'4px',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    jasates: {
        width: '30%',
        textAlign: 'left',
        paddingLeft:'4px',
        // borderRightColor: borderColor,
        // borderRightWidth: 1,
    },
    discjasa: {
        width: '12%',
        textAlign: 'center',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        
    },
    hargajasa: {
        width: '19%',
        textAlign: 'center',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    subtotaljasa: {
        width: '19%',
        textAlign: 'center',
        borderRightColor: borderColor,
        borderRightWidth: 0,
    },
    reimbursement: {
        width: '40%',
        textAlign: 'left',
        paddingLeft:'4px',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    reimbursementdp: {
        width: '40%',
        textAlign: 'right',
        paddingRight:'10px',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    discreimbursement: {
        width: '12%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    hargareimbursement: {
        width: '19%',
        textAlign: 'center',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    subtotalreimbursement: {
        width: '19%',
        textAlign: 'center',
        borderRightColor: borderColor,
        borderRightWidth: 0,
    }
});

const styleValueDiskon = (defaultstyle,diskon) =>{
    if(diskon == '0'){
        // width: '15%',
        // textAlign: 'center',
        // borderRightColor: borderColor,
        // borderRightWidth: 1,
        let val = Object();
        val.width = defaultstyle.width;
        val.textAlign = defaultstyle.textAlign;
        val.borderRightColor = defaultstyle.borderRightColor;
        val.borderRightWidth = defaultstyle.borderRightWidth;
        val.color = 'white';
       return val;
    }else{
        return defaultstyle;
    }
}
const checkDiskon = (diskon) =>{
    if(parseFloat(diskon) == 0){
        return '0';
    }else if(parseFloat(diskon) >= 50){
        return numToMoney(parseFloat(diskon));
    }else{
        return numToMoney(parseFloat(diskon))+'%';
    }
}
const setItems = (items) =>{
    let tanggalDp = "";
    let jumlahDp = "";
    // if(items.summarypenerimaanDP){
    //     if(!isNaN(items.summarypenerimaanDP)){
    //         let summarypenerimaanDP = parseFloat(items.summarypenerimaanDP)
    //         if(summarypenerimaanDP > 0){
    //             jumlahDp = items.summarypenerimaanDP;
    //         }   
    //     }
    // }
    // if(items.detailspenerimaan){
    //     let filterArrDet = items.detailspenerimaan.filter(output => output.isdownpayment == 'Y');
    //     if(filterArrDet.length > 0){
    //         let filterArr = items.listpenerimaan.filter(output => output.id == filterArrDet[0].idpenerimaankasbank);
    //         if(filterArr.length > 0){
    //             tanggalDp = filterArr[0].receivedate?moment (new Date(filterArr[0].receivedate)).format(formatdate):'' ;
    //         }
    //         jumlahDp = filterArrDet[0].amount;
    //     }
    // }

    if(items.listDP !== null && items.listDP !== undefined){
        jumlahDp = 0;
        for(let i=0; i < items.listDP.length > 0; i++){
            let det = items.listDP[i];
            if(tanggalDp == ""){
                tanggalDp = det.tanggal ? moment (new Date(det.tanggal)).format(formatdate):"";
            }

            if(det.totalinvoice !== null && det.totalinvoice !== undefined){
                if(!isNaN(det.totalinvoice)){
                    jumlahDp = jumlahDp + parseFloat(det.totalinvoice);
                }
            }
        }

        if(jumlahDp == 0){
            jumlahDp = "";
        }
    }

    let showDiskon = false;
    if(items.idinvoicetype == 'JASA'){
        let rows = [];
        let tagihan = 0;
        if(items.detailsprice){
            let no = 1;
            let gross = 0
            let totalinvoice = items.totalinvoice?parseFloat(items.totalinvoice):0;
            let ppnPersen = items.nilaippn?parseFloat(items.nilaippn):0;
            let ppn = 0;
            for(let i=0; i < items.detailsprice.length; i++){
                let det = items.detailsprice[i];
                gross += det.subtotal?parseFloat(det.subtotal):0;
                if(det.diskon){
                    showDiskon = true;
                }
            }
            if(ppnPersen != 0){
                if(!isNaN(ppnPersen)){
                    ppn = ppnPersen
                }
            }
            
            let rowItem = [];
            // let tesNamaPanjgna = '123456789,123456789,1234567';
            for(let i=0; i < items.detailsprice.length; i++){
                rowItem = [];
                let det = items.detailsprice[i];
                rowItem.push(<Text style={styles.no}>{no}</Text>);
                rowItem.push(<Text style={styles.jasa}>{det.invoicetypename}</Text>);
                // rowItem.push(<Text style={styles.jasa}>{tesNamaPanjgna}</Text>);
                rowItem.push(<Text style={styles.qty}>{det.qty}</Text>);
                rowItem.push(<Text style={styles.hargajasa}>{det.price?numToMoney(parseFloat(det.price)):0}</Text>);
                if(showDiskon){
                    rowItem.push(<Text style={styleValueDiskon(styles.discjasa,(det.diskon?checkDiskon(det.diskon):'0'))}>{det.diskon?checkDiskon(det.diskon):'0'}</Text>);
                }
                
                rowItem.push(<Text style={styles.subtotaljasa}>{det.subtotal?numToMoney(parseFloat(det.subtotal)):0}</Text>);
                rows.push(<View style={styles.row} key={no}>{rowItem}</View>);
                no++;
            }
            
            // rowItem = [];
            // rowItem.push(<Text style={styles.no}>{''}</Text>);
            // rowItem.push(<Text style={styles.jasates}>{'asdakml lkamsd'}</Text>);
            // rowItem.push(<Text style={styles.qty}>{''}</Text>);
            // rowItem.push(<Text style={styles.hargajasa}>{''}</Text>);
            // rowItem.push(<Text style={styles.subtotaljasa}>{''}</Text>);
            // rows.push(<View style={styles.rowtes} key={999}>{rowItem}</View>);

            rowItem = [];
            no++;
            rowItem.push(<Text style={styles.no}>{''}</Text>);
            rowItem.push(<Text style={styles.jasa}>{''}</Text>);
            rowItem.push(<Text style={styles.qty}>{''}</Text>);
            if(showDiskon){
                rowItem.push(<Text style={styles.discjasa}>{''}</Text>);
            }
            rowItem.push(<Text style={styles.hargajasa}>{'Sub Total'}</Text>);
            rowItem.push(<Text style={styles.subtotaljasa}>{numToMoney(gross)}</Text>);
            rows.push(<View style={styles.row} key={no}>{rowItem}</View>);

            rowItem = [];
            no++;
            rowItem.push(<Text style={styles.no}>{''}</Text>);
            rowItem.push(<Text style={styles.jasa}>{''}</Text>);
            rowItem.push(<Text style={styles.qty}>{''}</Text>);
            if(showDiskon){
                rowItem.push(<Text style={styles.discjasa}>{''}</Text>);
            }
            rowItem.push(<Text style={styles.hargajasa}>{'PPN'}</Text>);
            rowItem.push(<Text style={styles.subtotaljasa}>{numToMoney(ppn)}</Text>);
            rows.push(<View style={styles.row} key={no}>{rowItem}</View>);

            if(items.diskonnota){
                rowItem = [];
                no++;
                rowItem.push(<Text style={styles.no}>{''}</Text>);
                rowItem.push(<Text style={styles.jasa}>{''}</Text>);
                rowItem.push(<Text style={styles.qty}>{''}</Text>);
                if(showDiskon){
                    rowItem.push(<Text style={styles.discjasa}>{''}</Text>);
                }
                rowItem.push(<Text style={styles.hargajasa}>{'Diskon Nota'}</Text>);
                rowItem.push(<Text style={styleValueDiskon(styles.subtotaljasa,(items.diskonnota?checkDiskon(items.diskonnota):'0')) }>{items.diskonnota?checkDiskon(items.diskonnota):''}</Text>);
                rows.push(<View style={styles.row} key={no}>{rowItem}</View>);
            }

            // if(items.ppn !== null && items.ppn !== undefined && !isNaN(items.ppn)){
            //     let valPPN = parseFloat(items.ppn);
            //     if(valPPN > 0){
            //         let pembagiDpp = (100 + valPPN) / 100;
            //         let hasilDPP = parseFloat(gross) / pembagiDpp;
            //         let hasilPPN = parseFloat(gross) - parseFloat(hasilDPP);
            //         rowItem = [];
            //         no++;
            //         rowItem.push(<Text style={styles.no}>{''}</Text>);
            //         rowItem.push(<Text style={styles.jasa}>{''}</Text>);
            //         rowItem.push(<Text style={styles.qty}>{''}</Text>);
            //         if(showDiskon){
            //             rowItem.push(<Text style={styles.discjasa}>{''}</Text>);
            //         }
            //         rowItem.push(<Text style={styles.hargajasa}>{'DPP'}</Text>);
            //         rowItem.push(<Text style={styles.subtotaljasa}>{numToMoney(parseFloat(hasilDPP))}</Text>);
            //         rows.push(<View style={styles.row} key={no}>{rowItem}</View>);

            //         rowItem = [];
            //         no++;
            //         rowItem.push(<Text style={styles.no}>{''}</Text>);
            //         rowItem.push(<Text style={styles.jasa}>{''}</Text>);
            //         rowItem.push(<Text style={styles.qty}>{''}</Text>);
            //         if(showDiskon){
            //             rowItem.push(<Text style={styles.discjasa}>{''}</Text>);
            //         }
            //         rowItem.push(<Text style={styles.hargajasa}>{'PPN'}</Text>);
            //         rowItem.push(<Text style={styles.subtotaljasa}>{numToMoney(parseFloat(hasilPPN))}</Text>);
            //         rows.push(<View style={styles.row} key={no}>{rowItem}</View>);
            //     }
            // }


            // rowItem = [];
            // no++;
            // rowItem.push(<Text style={styles.no}>{''}</Text>);
            // rowItem.push(<Text style={styles.jasa}>{''}</Text>);
            // rowItem.push(<Text style={styles.qty}>{''}</Text>);
            // if(showDiskon){
            //     rowItem.push(<Text style={styles.discjasa}>{''}</Text>);
            // }
            // rowItem.push(<Text style={styles.hargajasa}>{'Total'}</Text>);
            // rowItem.push(<Text style={styles.subtotaljasa}>{items.totalinvoice?numToMoney(parseFloat(items.totalinvoice)):0}</Text>);
            // rows.push(<View style={styles.row} key={no}>{rowItem}</View>);


            tagihan = items.totalinvoice?parseFloat(items.totalinvoice):0;
            // if(jumlahDp !== ''){
            //     tagihan = tagihan - parseFloat(jumlahDp);
            //     rowItem = [];
            //     no++;
            //     rowItem.push(<Text style={styles.no}>{''}</Text>);
            //     rowItem.push(<Text style={styles.jasa}>{''}</Text>);
                
            //     if(showDiskon){
            //         rowItem.push(<Text style={styles.qty}>{''}</Text>);
            //         rowItem.push(<Text style={styles.discjasa}>{'DP'}</Text>);
            //     }else{
            //         // rowItem.push(<Text style={styles.qty}>{''}</Text>);
            //         rowItem.push(<Text style={styles.qty}>{'DP'}</Text>);
            //     }
            //     rowItem.push(<Text style={styles.hargajasa}>{tanggalDp}</Text>);
            //     rowItem.push(<Text style={styles.subtotaljasa}>{numToMoney(parseFloat(jumlahDp))}</Text>);
            //     rows.push(<View style={styles.row} key={no}>{rowItem}</View>);
            // }

                rowItem = [];
                no++;
                rowItem.push(<Text style={styles.no}>{''}</Text>);
                rowItem.push(<Text style={styles.jasa}>{''}</Text>);
                rowItem.push(<Text style={styles.qty}>{''}</Text>);
                if(showDiskon){
                rowItem.push(<Text style={styles.discjasa}>{''}</Text>);
                }
                rowItem.push(<Text style={styles.hargajasa}>{'Total'}</Text>);
                rowItem.push(<Text style={styles.subtotaljasa}>{numToMoney(parseFloat(tagihan))}</Text>);
                rows.push(<View style={styles.row} key={no}>{rowItem}</View>);
        }
        
        return rows;
    }else if(items.idinvoicetype == 'REIMBURSEMENT'){
        let rows = [];
        let tagihan = 0;
        if(items.detailsprice){
            let no = 1;
            let gross = 0
            for(let i=0; i < items.detailsprice.length; i++){
                let det = items.detailsprice[i];
                gross += det.subtotal?parseFloat(det.subtotal):0;

                if(det.diskon){
                    showDiskon = true;
                }
            }
            for(let i=0; i < items.detailsprice.length; i++){
                let rowItem = [];
                let det = items.detailsprice[i];
                rowItem.push(<Text style={styles.no}>{no}</Text>);
                rowItem.push(<Text style={styles.reimbursement}>{det.invoicetypename}</Text>);
                // rowItem.push(<Text style={styles.qty}>{det.qty}</Text>);
                rowItem.push(<Text style={styles.hargareimbursement}>{det.price?numToMoney(parseFloat(det.price)):0}</Text>);
                if(showDiskon){
                    rowItem.push(<Text style={styleValueDiskon(styles.discreimbursement,(det.diskon?checkDiskon(det.diskon):'0'))}>{det.diskon?checkDiskon(det.diskon):'0'}</Text>);
                }
                
                rowItem.push(<Text style={styles.subtotalreimbursement}>{det.subtotal?numToMoney(parseFloat(det.subtotal)):0}</Text>);

                rows.push(<View style={styles.row} key={no}>{rowItem}</View>);
                no++;
            }

            rowItem = [];
            no++;
            rowItem.push(<Text style={styles.no}>{''}</Text>);
            rowItem.push(<Text style={styles.reimbursement}>{''}</Text>);
            // rowItem.push(<Text style={styles.qty}>{''}</Text>);
            // if(showDiskon){
            //     rowItem.push(<Text style={styles.discreimbursement}>{''}</Text>);
            // }
            rowItem.push(<Text style={styles.hargareimbursement}>{'Sub Total'}</Text>);
            rowItem.push(<Text style={styles.subtotalreimbursement}>{numToMoney(gross)}</Text>);
            rows.push(<View style={styles.row} key={no}>{rowItem}</View>);

            // if(items.diskonnota){
            // rowItem = [];
            // no++;
            // rowItem.push(<Text style={styles.no}>{''}</Text>);
            // rowItem.push(<Text style={styles.reimbursement}>{''}</Text>);
            // rowItem.push(<Text style={styles.qty}>{''}</Text>);
            // if(showDiskon){
            //     rowItem.push(<Text style={styles.discreimbursement}>{''}</Text>);
            // }
            // rowItem.push(<Text style={styles.hargareimbursement}>{'Diskon Nota'}</Text>);
            // rowItem.push(<Text style={styleValueDiskon(styles.subtotalreimbursement,(items.diskonnota?checkDiskon(items.diskonnota):'0')) }>{items.diskonnota?checkDiskon(items.diskonnota):''}</Text>);
            // rows.push(<View style={styles.row} key={no}>{rowItem}</View>);
            // }

            // rowItem = [];
            // no++;
            // rowItem.push(<Text style={styles.no}>{''}</Text>);
            // rowItem.push(<Text style={styles.reimbursement}>{''}</Text>);
            // rowItem.push(<Text style={styles.qty}>{''}</Text>);
            // if(showDiskon){
            //     rowItem.push(<Text style={styles.discreimbursement}>{''}</Text>);
            // }
            // rowItem.push(<Text style={styles.hargareimbursement}>{'Total'}</Text>);
            // rowItem.push(<Text style={styles.subtotalreimbursement}>{items.totalinvoice?numToMoney(parseFloat(items.totalinvoice)):0}</Text>);
            // rows.push(<View style={styles.row} key={no}>{rowItem}</View>);

            tagihan = items.totalinvoice?parseFloat(items.totalinvoice):0;
            let totalinvoice = items.totalinvoice?parseFloat(items.totalinvoice):0;
            let ppn = 0;
            if(totalinvoice !== gross){
                ppn = totalinvoice - gross;
            }

            // rowItem = [];
            // no++;
            // rowItem.push(<Text style={styles.no}>{''}</Text>);
            // rowItem.push(<Text style={styles.reimbursement}>{''}</Text>);
            // rowItem.push(<Text style={styles.hargareimbursement}>{'PPN'}</Text>);
            // rowItem.push(<Text style={styles.subtotalreimbursement}>{numToMoney(ppn)}</Text>);
            // rows.push(<View style={styles.row} key={no}>{rowItem}</View>);

            // rowItem = [];
            // no++;
            // rowItem.push(<Text style={styles.no}>{''}</Text>);
            // rowItem.push(<Text style={styles.reimbursement}>{''}</Text>);
            // // rowItem.push(<Text style={styles.qty}>{''}</Text>);
            // // if(showDiskon){
            // //     rowItem.push(<Text style={styles.discreimbursement}>{''}</Text>);
            // // }
            // rowItem.push(<Text style={styles.hargareimbursement}>{'Total'}</Text>);
            // rowItem.push(<Text style={styles.subtotalreimbursement}>{numToMoney(totalinvoice)}</Text>);
            // rows.push(<View style={styles.row} key={no}>{rowItem}</View>);
            if(tanggalDp !== "" && jumlahDp !== ""){
                tagihan = tagihan - parseFloat(jumlahDp);
                rowItem = [];
                no++;
                rowItem.push(<Text style={styles.no}>{''}</Text>);
                // if(showDiskon){
                //     // rowItem.push(<Text style={styles.qty}>{''}</Text>);
                //     // rowItem.push(<Text style={styles.discreimbursement}>{'DP'}</Text>);
                //     rowItem.push(<Text style={styles.reimbursement}>{'DP'}</Text>);
                // }else{
                //     rowItem.push(<Text style={styles.qty}>{'DP'}</Text>);
                // }

                rowItem.push(<Text style={styles.reimbursementdp }>{'DP'}</Text>);
                
                rowItem.push(<Text style={styles.hargareimbursement}>{tanggalDp}</Text>);
                rowItem.push(<Text style={styles.subtotalreimbursement}>{numToMoney(parseFloat(jumlahDp))}</Text>);
                rows.push(<View style={styles.row} key={no}>{rowItem}</View>);
            }

            let rowItem = [];
            no++;
            rowItem.push(<Text style={styles.no}>{''}</Text>);
            rowItem.push(<Text style={styles.reimbursement}>{''}</Text>);
            // rowItem.push(<Text style={styles.qty}>{''}</Text>);
            if(showDiskon){
                rowItem.push(<Text style={styles.discreimbursement}>{''}</Text>);
            }
            rowItem.push(<Text style={styles.hargareimbursement}>{'Total'}</Text>);
            rowItem.push(<Text style={styles.subtotalreimbursement}>{numToMoney(parseFloat(tagihan))}</Text>);
            rows.push(<View style={styles.row} key={no}>{rowItem}</View>);
            return rows;
        }
        
        
    }else if(items.idinvoicetype == 'DP'){
        let rows = [];
        let rowItem = [];
        rowItem.push(<Text style={styles.no}>{'1'}</Text>);
        rowItem.push(<Text style={styles.reimbursement}>{'DP (Down Payment)'}</Text>);
        rowItem.push(<Text style={styles.hargareimbursement}>{items.totalinvoice?numToMoney(parseFloat(items.totalinvoice)):0}</Text>);
        rowItem.push(<Text style={styles.subtotalreimbursement}>{items.totalinvoice?numToMoney(parseFloat(items.totalinvoice)):0}</Text>);

        rows.push(<View style={styles.row} key={'1'}>{rowItem}</View>);

        rowItem = [];
        rowItem.push(<Text style={styles.no}>{''}</Text>);
        rowItem.push(<Text style={styles.reimbursement}>{''}</Text>);
        rowItem.push(<Text style={styles.hargareimbursement}>{'Tagihan'}</Text>);
        rowItem.push(<Text style={styles.subtotalreimbursement}>{items.totalinvoice?numToMoney(parseFloat(items.totalinvoice)):0}</Text>);
        rows.push(<View style={styles.row} key={'1'}>{rowItem}</View>);

        return rows;
    }
}
const ContainerTableItemsValue = ({ items }) => {
    return (<Fragment>{setItems(items)}</Fragment>)
};
export default ContainerTableItemsValue;