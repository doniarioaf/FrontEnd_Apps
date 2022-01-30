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
    if(error.data){
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
    //     let val = error.data;
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

export const convertFormtUOMToUOM4 = (value,conv1to4,conv2to4,conv3to4,txtuom1,txtuom2,txtuom3,txtuom4) =>{
    let tempVal = value.split(".");
    let uom1 = 0;
    let uom2 = 0;
    let uom3 = 0;
    let uom4 = 0;

    let obj = new Object();
    if(tempVal.length == 4){
        let valUom1 = tempVal[0];
        if(!isNaN(valUom1) ){
            uom1 = valUom1;
        }

        let valUom2 = tempVal[1];
        if(!isNaN(valUom2) ){
            uom2 = valUom2;
        }

        let valUom3 = tempVal[2];
        if(!isNaN(valUom3) ){
            uom3 = valUom3;
        }

        let valUom4 = tempVal[3];
        
        if(!isNaN(valUom4) ){
            uom4 = valUom4;
        }

        let intUom1 = uom1 == ''?0:parseInt(uom1);
        let intUom2 = uom2 == ''?0:parseInt(uom2);
        let intUom3 = uom3 == ''?0:parseInt(uom3);
        let intUom4 = uom4 == ''?0:parseInt(uom4);

        let stockuom4 = (intUom1 * conv1to4)+(intUom2 * conv2to4)+(intUom3 * conv3to4)+intUom4;
        obj.stockuom4 = stockuom4;

        intUom1 = 0;
        intUom2 = 0;
        intUom3 = 0;
        intUom4 = 0;
        if(stockuom4 >= conv1to4){
            let hasilbagi1to4 = Math.floor(stockuom4 / conv1to4);
            let sisabagi1to4 = stockuom4 - (conv1to4 * hasilbagi1to4);
            stockuom4 = sisabagi1to4;// - (conv1to4 * hasilbagi1to4);
            intUom1 = intUom1 + hasilbagi1to4;

            if(sisabagi1to4 >= conv2to4){
                let hasilbagi2to4 = Math.floor(sisabagi1to4 / conv2to4);
                let sisabagi2to4 = sisabagi1to4 - (conv2to4 * hasilbagi2to4);
                stockuom4 = sisabagi2to4;
                intUom2 = intUom2 + hasilbagi2to4;

                if(sisabagi2to4 >= conv3to4){
                    let hasilbagi3to4 = Math.floor(sisabagi2to4 / conv3to4);
                    let sisabagi3to4 = sisabagi2to4 - (conv3to4 * hasilbagi3to4);
                    stockuom4 = sisabagi3to4;
                    intUom3 = intUom3 + hasilbagi3to4;
                }
            }else if(sisabagi1to4 >= conv3to4){
                let hasilbagi3to4 = Math.floor(sisabagi1to4 / conv3to4);
                let sisabagi3to4 = sisabagi1to4 - (conv3to4 * hasilbagi3to4);
                stockuom4 = sisabagi3to4;
                intUom3 = intUom3 + hasilbagi3to4;
            }
        }else if(stockuom4 >= conv2to4){
            let hasilbagi2to4 = Math.floor(stockuom4 / conv2to4);
            let sisabagi2to4 = stockuom4 - (conv2to4 * hasilbagi2to4);
            stockuom4 = sisabagi2to4;
            intUom2 = hasilbagi2to4;

            if(sisabagi2to4 >= conv3to4){
                let hasilbagi3to4 = Math.floor(sisabagi2to4 / conv3to4);
                let sisabagi3to4 = sisabagi2to4 - (conv3to4 * hasilbagi3to4);
                stockuom4 = sisabagi3to4;
                intUom3 = intUom3 + hasilbagi3to4;
            }
        }else if(stockuom4 >= conv3to4){
            let hasilbagi3to4 = Math.floor(stockuom4 / conv3to4);
            let sisabagi3to4 = stockuom4 - (conv3to4 * hasilbagi3to4);
            stockuom4 = sisabagi3to4;
            intUom3 = intUom3 + hasilbagi3to4;
        }
        
        intUom4 = stockuom4;
        uom1 = intUom1;// != 0 ?intUom1:uom1;
        uom2 = intUom2;// != 0 ?intUom2:uom2;
        uom3 = intUom3;// != 0 ?intUom3:uom3;
        uom4 = intUom4;// != 0 ?intUom4:uom4;

        obj.formatuom = uom1+"."+uom2+"."+uom3+"."+uom4;
        obj.nilaiuom = uom1+" "+txtuom1+" "+uom2+" "+txtuom2+" "+uom3+" "+txtuom3+" "+uom4+" "+txtuom4
        return obj;
    }

    obj.stockuom4 = 0;
    obj.formatuom = uom1+"."+uom2+"."+uom3+"."+uom4;
    obj.nilaiuom = uom1+" "+txtuom1+" "+uom2+" "+txtuom2+" "+uom3+" "+txtuom3+" "+uom4+" "+txtuom4
    return obj;
}