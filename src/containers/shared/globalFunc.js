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