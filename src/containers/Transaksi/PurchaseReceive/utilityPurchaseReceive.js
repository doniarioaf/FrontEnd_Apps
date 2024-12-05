export const calculateTotalPrice = (listitems, listbiaya)  =>{
    let totalPrice = 0;
    if(listitems != null && listitems.length > 0){
        for(let i=0; i < listitems.length > 0; i++){
            let det = listitems[i];
            let subtotalprice = new String(det.subtotalprice).replaceAll('.','') !== ''?new String(det.subtotalprice).replaceAll('.',''):0;
            totalPrice += parseFloat(subtotalprice);
        }
    }

    /**
     * BOX = + totaprice
     * BOAT = + totaprice
     * BANTUAN = + totaprice
     * ONGKOS = - totaprice
     * SETOR = - totaprice
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
    
    return totalPrice;
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