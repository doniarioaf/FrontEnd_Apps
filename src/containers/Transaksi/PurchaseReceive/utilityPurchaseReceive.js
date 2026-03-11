import { numToMoney } from "../../shared/globalFunc";

export const calculateSetor = (totalnota, sisadeposit,sisapinjaman)  =>{
    let setor = 0;
    let setorPinjaman = 0;
    let tempTotalNota  = 0;
    let tempSisaDeposit  = 0;
    let tempSisaPinjaman  = 0;
    if(totalnota != null && totalnota != undefined && totalnota !== ''){
        tempTotalNota = totalnota;
    }
    if(sisadeposit != null && sisadeposit != undefined && sisadeposit !== ''){
        tempSisaDeposit = sisadeposit;
    }
    if(sisapinjaman != null && sisapinjaman != undefined && sisapinjaman !== ''){
        tempSisaPinjaman = sisapinjaman;
    }
    if(tempSisaDeposit < 1){
        setor = 0;
    }else if(tempSisaDeposit >= tempTotalNota){
        setor = tempTotalNota;
    }else if(tempTotalNota > tempSisaDeposit){
        setor = tempSisaDeposit;
    }

    //Pinjaman
    // tempTotalNota = tempTotalNota - setor;
    // if(tempSisaPinjaman < 1){
    //     setorPinjaman = 0;
    // }else if(tempSisaPinjaman >= tempTotalNota){
    //     setorPinjaman = tempTotalNota;
    // }else if(tempTotalNota > tempSisaPinjaman){
    //     setorPinjaman = tempSisaPinjaman;
    // }

    // return setor;
    return {setordeposit:setor,setorpinjaman:setorPinjaman};
}

export const calculateTransfer = (totalnota, sisadeposit, nilaiSetorPinjaman)  =>{
    let transfer = 0;
    let tempTotalNota  = 0;
    let tempSisaDeposit  = 0;
    let tempNilaiSetorPinjaman  = 0;
    if(totalnota != null && totalnota != undefined && totalnota !== ''){
        tempTotalNota = totalnota;
    }
    if(sisadeposit != null && sisadeposit != undefined && sisadeposit !== ''){
        tempSisaDeposit = sisadeposit;
    }
    if(nilaiSetorPinjaman != null && nilaiSetorPinjaman != undefined && nilaiSetorPinjaman !== ''){
        tempNilaiSetorPinjaman = nilaiSetorPinjaman;
    }
    // console.log('tempTotalNota A '+tempTotalNota);
    // console.log('tempNilaiSetorPinjaman A '+tempNilaiSetorPinjaman);
    // tempTotalNota = tempTotalNota - tempNilaiSetorPinjaman;
    // console.log('tempTotalNota B '+tempTotalNota);
    if(tempTotalNota > 0){
    if(tempSisaDeposit <= 0){
        transfer = tempTotalNota;
    }else if(tempTotalNota > tempSisaDeposit){
        transfer = tempTotalNota - tempSisaDeposit;
    }
    }

    //pinjaman
    // if(transfer > 0){
    //     if(tempSisaPinjaman > 0){
    //         transfer = transfer - tempSisaPinjaman;
    //         if(transfer < 0){
    //             transfer = 0;
    //         }
    //     }
    // }
    return transfer;
}

export const calculateTotalPrice = (listitems, listbiaya, listinventori)  =>{
    let totalPrice = 0;
    let totalPriceItemHidup = 0;
    let totalQty = 0;
    let totalQtyNota = 0;
    if(listitems != null && listitems.length > 0){
        for(let i=0; i < listitems.length > 0; i++){
            let det = listitems[i];
            let qty = det.qty?det.qty:0;
            let qtynota = det.qtynota?det.qtynota:0;
            let subtotalprice = new String(det.subtotalprice).replaceAll('.','') !== ''?new String(det.subtotalprice).replaceAll('.',''):0;
            if(det.idproduct !== 'TOTAL'){
                totalQty += parseInt(qty);
                totalQtyNota += parseInt(qtynota);

                totalPrice += parseFloat(subtotalprice);
                totalPriceItemHidup += parseFloat(subtotalprice);
            }
            
        }
    }

    /**
     * BOX = + totaprice
     * BOAT = + totaprice
     * BANTUAN = + totaprice
     * ONGKOS = - totaprice
     * SETOR = - totaprice
     * SETORPINJAMAN = - totaprice
     */
    if(listbiaya != null && listbiaya.length > 0){
        for(let i=0; i < listbiaya.length > 0; i++){
            let det = listbiaya[i];
            if(det.namabiaya !== 'SETOR'){
                let subtotalprice = new String(det.subtotal).replaceAll('.','') !== ''?new String(det.subtotal).replaceAll('.',''):0;
                if(det.namabiaya == 'BOX' || det.namabiaya == 'BOAT' || det.namabiaya == 'BANTUAN'){
                    totalPrice += parseFloat(subtotalprice);
                }else {
                    totalPrice -= parseFloat(subtotalprice);
                }
            }
        }
    }
    // console.log('totalPrice ',totalPrice);
    if(listinventori != null && listinventori.length > 0){
        for(let i=0; i < listinventori.length > 0; i++){
            let det = listinventori[i];
            let subtotalprice = new String(det.subtotalprice).replaceAll('.','') !== ''?new String(det.subtotalprice).replaceAll('.',''):0;
            totalPrice -= parseFloat(subtotalprice);
        }
    }

    return  {'totalPrice':totalPrice,'totalPriceItemHidup':totalPriceItemHidup, 'totalqty':totalQty,'totalqtynota':totalQtyNota} ;
}

export const setPriceBoxOngkosByVendor = (listcharge,pricebox,priceongkos)  =>{
        let listBiaya = [...listcharge];
        let indexBox = listBiaya.findIndex(obj => obj.namabiaya == 'BOX');
        let indexOngkos = listBiaya.findIndex(obj => obj.namabiaya == 'ONGKOS');
        listBiaya[indexBox]['price'] = pricebox;
        listBiaya[indexBox]['subtotal'] = 0;
        listBiaya[indexBox]['qty'] = 0;
        listBiaya[indexOngkos]['price'] = priceongkos;
        listBiaya[indexOngkos]['subtotal'] = 0;
        listBiaya[indexOngkos]['qty'] = 0;

        return listBiaya;

}

export const setPriceBox = (listcharge,qtybox)  =>{
    let listBiaya = [...listcharge];
    let indexBox = listBiaya.findIndex(obj => obj.namabiaya == 'BOX');
    let subtotalBox = 0;
    let qtyBoxTemp = 0;
    if(qtybox != null && qtybox != undefined){
        let pricebox = listBiaya[indexBox]['price']
        qtyBoxTemp = qtybox;
        subtotalBox = parseFloat(new String(pricebox).replaceAll('.','')) * qtybox;
    }
    listBiaya[indexBox]['subtotal'] = subtotalBox;
    listBiaya[indexBox]['qty'] = qtyBoxTemp;
    return listBiaya;

}

export const setSetorValueTotalPrice = (listcharge,totalprice)  =>{
    let listBiaya = [...listcharge];
    let indexSetor = listBiaya.findIndex(obj => obj.namabiaya == 'SETOR');
    let tempPrice = new String(listBiaya[indexSetor]['price']).replaceAll('.','') !== ''?new String(listBiaya[indexSetor]['price']).replaceAll('.',''):0;
    let tempQty = new String(listBiaya[indexSetor]['qty']).replaceAll('.','') !== ''?new String(listBiaya[indexSetor]['qty']).replaceAll('.',''):0;
    let temptotalprice = new String(totalprice).replaceAll('.','') !== ''?new String(totalprice).replaceAll('.',''):0;
    /**
     * ketika ada perbedaan jumlah setor dan total price, 
     * ada kemungkinan angka nya sudah di edit oleh admin, maka value mengikuti nilai yang telah di input oleh admin
     * tidak mengikuti default totalnota/ totalprice lagi
     * 
     */
    
    if(parseInt(tempQty) > 0 ){
        listBiaya[indexSetor]['price'] = temptotalprice;
        listBiaya[indexSetor]['subtotal'] = temptotalprice;
    }

    tempPrice = new String(listBiaya[indexSetor]['price']).replaceAll('.','') !== ''?new String(listBiaya[indexSetor]['price']).replaceAll('.',''):0;
    if(parseFloat(tempPrice) > 0){
        listBiaya[indexSetor]['qty'] = 1;
    }

    
    return listBiaya;

}

/**
 * BOX = + totaprice
 * BOAT = + totaprice
 * BANTUAN = + totaprice
 * ONGKOS = - totaprice
 * SETOR = - totaprice
 */
export const addKurungBukaPadaValue = (nama,value)  =>{
    /** yang bertanda minus, kasih kurung buka, artinya nilai itu dikurang */
    if(nama == 'ONGKOS') { return '('+value+')'}
    return value;
}

export const totalTableItemMati = (list) => {
        let totalQty = 0;
        let totalPrice = 0;
        if(list != null && list.length > 0){
            for(let i=0; i < list.length; i++){
                let det = list[i];
                totalQty += det.qtymati?parseInt(det.qtymati):0;
                totalPrice += det.subtotalprice?parseFloat(det.subtotalprice):0;
            }

            return (
                <tr>
                    <td></td>
                    <td style={{ width: '20%',fontSize:15 }}>{'TOTAL'}</td>
                    <td style={{ width: '20%' }}></td>
                    <td style={{ fontSize:15 }}>{totalQty}</td>
                    <td style={{ width: '15%' }}></td>
                    <td style={{ width: '15%',fontSize:15 }}>{numToMoney(totalPrice)}</td>
                    
                </tr>
            )
        }

        return "";
    }

    export const totalTableBiaya = (list) => {
        let totalQty = 0;
        let totalPrice = 0;
        if(list != null && list.length > 0){
            for(let i=0; i < list.length; i++){
                let det = list[i];
                totalQty += det.qty?parseInt(det.qty):0;
                totalPrice += det.subtotal?parseFloat(det.subtotal):0;
            }

            return (
                <tr>
                    <td></td>
                    <td style={{ fontSize:15 }}>{'TOTAL'}</td>
                    <td style={{ fontSize:15 }}>{totalQty}</td>
                    <td style={{ width: '15%' }}></td>
                    <td style={{ width: '15%',fontSize:15 }}>{numToMoney(totalPrice)}</td>
                    
                </tr>
            )
        }

        return "";
    }

    export const totalTablePenguranganBiaya = (list) => {
        let totalQty = 0;
        let totalPrice = 0;
        if(list != null && list.length > 0){
            for(let i=0; i < list.length; i++){
                let det = list[i];
                totalQty += det.qty?parseInt(det.qty):0;
                totalPrice += det.subtotal?parseFloat(det.subtotal):0;
            }

            return (
                <tr>
                    <td></td>
                    <td style={{ fontSize:15 }}>{'TOTAL'}</td>
                    <td style={{ fontSize:15 }}>{totalQty}</td>
                    <td style={{ width: '15%' }}></td>
                    <td style={{ width: '15%',fontSize:15 }}>{numToMoney(totalPrice)}</td>
                    
                </tr>
            )
        }

        return "";
    }

    export const totalTableInventori = (list) => {
        let totalQty = 0;
        let totalPrice = 0;
        if(list != null && list.length > 0){
            for(let i=0; i < list.length; i++){
                let det = list[i];
                totalQty += det.qty?parseInt(det.qty):0;
                totalPrice += det.subtotalprice?parseFloat(det.subtotalprice):0;
            }

            return (
                <tr>
                    <td></td>
                    <td style={{ fontSize:15 }}>{'TOTAL'}</td>
                    <td style={{ fontSize:15 }}>{totalQty}</td>
                    <td style={{ width: '15%' }}></td>
                    <td style={{ width: '15%',fontSize:15 }}>{numToMoney(totalPrice)}</td>
                    
                </tr>
            )
        }

        return "";
    }