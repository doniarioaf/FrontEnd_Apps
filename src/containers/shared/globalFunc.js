import numeral from 'numeral';
import * as key from '../../containers/shared/constantKey';
import CryptoJS from 'crypto-js';
import * as pathmenu           from './pathMenu';

export const deleteSessionAndLocalStorage = () =>{
    localStorage.removeItem(key.token);
    localStorage.removeItem(key.permissions);
    sessionStorage.removeItem(key.sessionuser);
};

export const mappingMessageError = (error) =>{
    let arrMsg = [];
    if(error.data){
        let val = error.data;
        if(val.messagecode == 'data.validation'){
            for(let i=0; i < val.validations.length; i++){
                let valid = val.validations[i];
                arrMsg.push(valid.messageCode);
            }
        }
    }
    return arrMsg
}

export const handleMessageError = (error) =>{
    let arrMsg = [];
    let msgcode = '';
    let msg = '';
    let msgObj = new Object();
    
    let val = [];
    if(error.data && error.data !== null){
        val = error.data;
    }else if(sessionStorage.getItem(key.messageError) !== null){
        if(sessionStorage.getItem(key.messageError) == 'timeout'){
            msg = 'Mohon maaf, system kami sedang dalam pemeliharaan, Mohon tunggu beberapa saat lagi dan pastikan Anda terhubung ke jaringan internet';
            msgcode = msg;
            arrMsg.push(msgcode);
        }else{
            val = JSON.parse(sessionStorage.getItem(key.messageError).toString());
        }
        
        sessionStorage.removeItem(key.messageError);
    }
    if(msg == ''){
        
        if(val.messagecode == 'data.validation'){
            for(let i=0; i < val.validations.length; i++){
                let valid = val.validations[i];
                arrMsg.push(valid.messageCode);

                msgcode = valid.messageCode;
                msg = valid.message;
            }
        }else{
            msgcode = val.messagecode;
            msg = val.message;
        }
    }
    if(msgcode == 'security.login.not.authorized' || msgcode == 'security.token.password'){
        window.location.href = '/logout';
    }
    msgObj.msgcode = msgcode;
    msgObj.msg = msg;
    msgObj.msglist = arrMsg;

    return msgObj
}

export const listTypeReport = () => {
    var tempOutPut = [];
    
    // tempOutPut.push({"value":"HTML","label":"Normal Format","typeapi":"text/html"});
    tempOutPut.push({"value":"XLSX","label":"Excel Format","typeapi":"application/vnd.ms-excel"});
    // tempOutPut.push({"value":"XLS","label":"Excel 97-2003 Format","typeapi":"application/vnd.ms-excel"});
    tempOutPut.push({"value":"PDF","label":"PDF Format","typeapi":"application/pdf"});
    tempOutPut.push({"value":"PPT","label":"PPT Format","typeapi":"application/vnd.ms-powerpoint"});
    return tempOutPut;
}

export const reloadToHomeNotAuthorize = (listPermission,action)  =>{
    const flag =  isGetPermissions(listPermission,action);
    if(!flag){
        window.location.href = pathmenu.unauthorized;
    }
}

export const getPermissions = ()  =>{
    const permissionenc = localStorage.getItem(key.permissions) ? localStorage.getItem(key.permissions):[];
    try{
        const bytes = CryptoJS.AES.decrypt(permissionenc, key.keyEcncrypt);
        const permissionsuser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        // let idx = permissionsuser.indexOf('');
        return permissionsuser;
    }catch(err){
        // window.location.href = '/';
        return [];
    }
}

export const isGetPermissions = (listPermission,action)  =>{
    // if(action === 'READ'){
    //     if(getPermissions().indexOf('ALL_FUNCTIONS_READ') > -1 || getPermissions().indexOf('ALL_FUNCTIONS') > -1){
    //         return false;
    //     }
    // }else if(action === 'TRANSACTION'){
    //     if(getPermissions().indexOf('ALL_FUNCTIONS') > -1){
    //         return false;
    //     }
    // }

    if(getPermissions().indexOf('SUPERUSER') > -1){
        return true;
    }else if(listPermission.length > 0){
        let countPermission = 0;
        for (var i = 0; i < listPermission.length; i++) {
            if(getPermissions().indexOf(listPermission[i]) > -1){
                countPermission++;
            }
        }
        return listPermission.length == countPermission;
    }
    return false;
}

export const handlePermissionMenu = (menu)  =>{
    let listMenu = menu;
    let retMenu = [];
    if(listMenu.length > 0){
        retMenu.push(listMenu[0]);
    }
    if(listMenu.length > 1){
        // let menuHeader = [];
        for(let i=1; i < listMenu.length; i++){
            let valMenu = listMenu[i];
            // if(valMenu.name === 'Administrator'){
                if(valMenu.submenu){
                    if(valMenu.submenu.length > 0){
                        let listsubmenu = handleSubMenu(valMenu.submenu);
                        if(listsubmenu.length > 0){
                            let header = {
                                name: valMenu.name,
                                icon: valMenu.icon,
                                translate: valMenu.translate,
                                submenu:listsubmenu
                            }
                            retMenu.push(header);
                        }
                    }
                }
            // }
        }
    }
    
    return retMenu;
}

const handleSubMenu = (submenu)  =>{
    let listsubmenu = [];
    for(let ii=0; ii < submenu.length; ii++){
        let permissionSubMenu = submenu[ii].permission;
        if(isGetPermissions(permissionSubMenu,'')){
            listsubmenu.push(submenu[ii]);
        }
    }
    return listsubmenu;
}

export const inputJustNumberAndCommaDot = (temp) =>{
    let lengthVal = temp.length;
    let endchar = temp.charAt(lengthVal-1);
    if(endchar === ',' || !isNaN(endchar) || endchar === '.'){
        return true
    }else{
        return false;
    }
}

export const numToMoney = (amount) =>{
    
    if(amount !== null && !isNaN(amount)){
            
            const amountInt = parseInt(amount);
            
            const amountNum = amount.toFixed(2);
            
            const amountStr = amountNum.toString();
            
            let afterComma;

            if (amountStr.includes('.')) {
                afterComma = amountStr.slice(amountStr.length - 2, amountStr.length);
            }

            if (afterComma != null) {
                if (afterComma === "00") {
                    return amountInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                } else {
                    return amountInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + afterComma;
                }
            } else {
                return amountInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }
        }else{
            return '0'
        }
};

export const formatMoney = (amount) => {
    const returnamount = amount;
    amount = amount.replaceAll('.','');
    let aftercomma = '';
    if(amount.includes(',')){
        aftercomma = ','+amount.split(',')[1];
        amount = amount.split(',')[0];
    }
    if(amount.length > 3){
        let sisabagi = amount.length % 3;
        let isFirst = true;
        let val = '';
        let count = 0;
        for(var i=0; i< amount.length; i++){
            val += amount.charAt(i);
            count++;
            if((i == sisabagi - 1) && isFirst){
                val += ".";
                isFirst = false;
                count = 0;
            }else if(count == 3 && i !== amount.length - 1){
                val += ".";
                count = 0;
            }
            
        }
        return val+aftercomma;
    }else{
        return returnamount;
    }
};

export const numToMoneyWithComma = (amount) =>{
    let string = numeral(amount).format('0,0.00');
    let befcomma = string.split('.')[0].replaceAll(',','.');
    let aftercomma = string.split('.')[1];
    string = befcomma+','+aftercomma;
    return string;
}

export const checkValuePDf = (data,valreturn) =>{
    if(data == undefined){
        return valreturn;
    }else if(data == null){
        return valreturn;
    }else if(data == ''){
        return valreturn;
    }

    return data;
}

export const invoiceTypeName = (data) =>{
    if(data == 'JASA'){
        return 'Jasa';
    }else if(data == 'REIMBURSEMENT'){
        return 'Reimbursement';
    }else if(data == 'DP'){
        return 'DP';
    }

    return data;
}

export const decryptObject = (keystorage)  =>{
    const objectenc = localStorage.getItem(keystorage) ? localStorage.getItem(keystorage):[];
    try{
        const bytes = CryptoJS.AES.decrypt(objectenc, key.keyEcncrypt);
        const objectdec = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        // let idx = permissionsuser.indexOf('');
        return objectdec;
    }catch(err){
        // window.location.href = '/';
        return [];
    }
}

export const decryptObjectNotLocalStorage = (encrypt, isJsonParse)  =>{
    const objectenc = encrypt;
    try{
        const bytes = CryptoJS.AES.decrypt(encrypt, key.keyEcncrypt);
        if(isJsonParse){
            const objectdec = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            // let idx = permissionsuser.indexOf('');
            return objectdec;
        }
        return bytes;
        
    }catch(err){
        // window.location.href = '/';
        return null;
    }
}

export const addDays = (date, days)  =>{
    //const date = new Date(); *Harus new Date*
    return date.setDate(date.getDate() + days);
}

export const firstAndLastDateInMonth = ()  =>{
    let date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return {first:firstDay,last:lastDay};
}

export const terbilang = (nilai) =>{
    // deklarasi variabel nilai sebagai angka matemarika
    // Objek Math bertujuan agar kita bisa melakukan tugas matemarika dengan javascript
    nilai = Math.floor(Math.abs(nilai));

    // deklarasi nama angka dalam bahasa indonesia
    var huruf = [
      '',
      'satu',
      'dua',
      'tiga',
      'empat',
      'lima',
      'enam',
      'tujuh',
      'delapan',
      'sembilan',
      'sepuluh',
      'sebelas',
      ];

    // menyimpan nilai default untuk pembagian
    var bagi = 0;
    // deklarasi variabel penyimpanan untuk menyimpan proses rumus terbilang
    var penyimpanan = '';

    // rumus terbilang
    if (nilai < 12) {
      penyimpanan = ' ' + huruf[nilai];
    } else if (nilai < 20) {
      penyimpanan = terbilang(Math.floor(nilai - 10)) + ' belas';
    } else if (nilai < 100) {
      bagi = Math.floor(nilai / 10);
      penyimpanan = terbilang(bagi) + ' puluh' + terbilang(nilai % 10);
    } else if (nilai < 200) {
      penyimpanan = ' seratus' + terbilang(nilai - 100);
    } else if (nilai < 1000) {
      bagi = Math.floor(nilai / 100);
      penyimpanan = terbilang(bagi) + ' ratus' + terbilang(nilai % 100);
    } else if (nilai < 2000) {
      penyimpanan = ' seribu' + terbilang(nilai - 1000);
    } else if (nilai < 1000000) {
      bagi = Math.floor(nilai / 1000);
      penyimpanan = terbilang(bagi) + ' ribu' + terbilang(nilai % 1000);
    } else if (nilai < 1000000000) {
      bagi = Math.floor(nilai / 1000000);
      penyimpanan = terbilang(bagi) + ' juta' + terbilang(nilai % 1000000);
    } else if (nilai < 1000000000000) {
      bagi = Math.floor(nilai / 1000000000);
      penyimpanan = terbilang(bagi) + ' miliar' + terbilang(nilai % 1000000000);
    } else if (nilai < 1000000000000000) {
      bagi = Math.floor(nilai / 1000000000000);
      penyimpanan = terbilang(nilai / 1000000000000) + ' triliun' + terbilang(nilai % 1000000000000);
    }

    // mengambalikan nilai yang ada dalam variabel penyimpanan
    return penyimpanan;
  }

  export const terbilangRupiah = (nilai) =>{
    let text = terbilang(nilai);
    let result = new String(text.substring(1, 2)).toUpperCase();
    let result1 = text.substring(2, text.length);
    if(text.replaceAll(' ','') !== ''){
        return result+result1+' rupiah';
    }
    return '';
  }

  export const removeFormatRupiah = (nilai) =>{
    let removeDot = new String(nilai).replaceAll('.','');
    let changeCommaToDot = new String(removeDot).replaceAll(',','.');
    return changeCommaToDot;
  }

  export const formatRupiah = (nilai,numberdesimal) =>{
    if(new String(nilai).includes(',')){
        let numDes = numberdesimal !== undefined ? numberdesimal:2;
        let splitComma = new String(nilai).split(','); 
        let angka = splitComma[0];
        let desimal = splitComma[1] !== undefined?new String(splitComma[1]).substring(0,numDes):'';
        return numToMoney(parseFloat(angka))+','+desimal;
    }
    return numToMoney(parseFloat(nilai));
  }

  export const desimal00 = (nilai) =>{
    if(new String(nilai).includes(',')){
        let splitComma = new String(nilai).split(','); 
        let angka = splitComma[0];
        let desimal = splitComma[1] !== undefined?splitComma[1]:'';
        if(new String(desimal).length == 1){
            return angka+','+desimal+'0';
        }else if(new String(desimal).length == 0){
            return angka+',00';
        }   
    }
    return nilai+',00';
  }