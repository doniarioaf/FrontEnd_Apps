import CryptoJS from 'crypto-js';
import * as key from '../../containers/shared/constantKey';

export const dataLoginEnc = (response,param) => {
    let username = param?.username?param.username:'';
    
    const obj = new Object();
    obj.iduser = response.id;
    obj.username = username;

    const enc = CryptoJS.AES.encrypt(JSON.stringify(obj),key.keyEcncrypt).toString();

    localStorage.setItem(key.infologin,enc);

    return "";
}

export const getInfoLogin = () => {
    let value = localStorage.getItem(key.infologin);
    try{
        const bytes = CryptoJS.AES.decrypt(value, key.keyEcncrypt);
        const valDecrypt = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    // console.log("valDecrypt ",valDecrypt);
        return valDecrypt;
    }catch(err){

    }
    
    return null;
}