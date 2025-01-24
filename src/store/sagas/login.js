import AxiosLogin from '../../Axios-login';
import axios        from '../../Axios-BizzApps';
import {put, call}         from 'redux-saga/effects';
import * as actions                from '../actions';
import CryptoJS from 'crypto-js';
import {loginURL,preloginURL,checkAuthURL,baseUserAppsURL} from '../../containers/shared/apiURL';
import * as key from '../../containers/shared/constantKey';
import {handleMessageError} from '../../containers/shared/globalFunc';

export function* loginUserSaga(action) {
    let url = action.param.url?action.param.url:'';
    let payload = action.param.payload?action.param.payload:[];
    let propsdata = action.param.propsdata?action.param.propsdata:null;
    
    try {
        const response = yield AxiosLogin.post(loginURL,payload,{timeout:10000})
        .then(response => response.data ?response.data:[] );
        // console.log('loginUserSaga ',response);
        let flag = false;
        let responflag = response.data?.token?true:false;
        let message = '';
        
        if(response.message == 'SUCCESS' && responflag){
            if(response.validations){
                if(response.validations.length > 0){
                    message = response.validations[0].message;
                }
            }
            const permissions = CryptoJS.AES.encrypt(JSON.stringify(response.data.permissions),key.keyEcncrypt).toString();

            localStorage.setItem(key.token,response.data.token);
            localStorage.setItem(key.permissions,permissions);
            sessionStorage.setItem(key.sessionuser,payload.user);
            
            let obj = new Object();
            obj.username = payload.user;
            obj.permissions = response.data.permissions;
            obj.typeaction = 'login';
            
            yield put(actions.authSuccess(obj));
            flag = true;
        }
        let obj = new Object();
        obj.flag = flag;
        obj.msg = message;
        
        action.successHandler(obj,propsdata);
    }catch (error) {
        action.errorHandler(handleMessageError(error).msg,propsdata);
    }
}

export function* checkUserSaga(action) {
    try {
        const response = yield axios.get(checkAuthURL).then(response => response.data);
        let obj = new Object();
        obj.success = response.success;
        // console.log('checkUserSaga ',response);
        yield put(actions.retrieveDatacheckUser(obj));
    }catch (error) {
        // console.log('checkUserSaga err ',error);
        let obj = new Object();
        obj.success = false;
        yield put(actions.retrieveDatacheckUser(obj));
    }
}

export function* logoutUserSaga(action) {
    try {
        const response = yield axios.get(baseUserAppsURL('/logout')).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* preLoginUserSaga(action) {
    let url = action.param.url?action.param.url:'';
    let payload = action.param.payload?action.param.payload:'';
    let propsdata = action.param.propsdata?action.param.propsdata:null;
    try {
        const response = yield AxiosLogin.post(preloginURL,payload,{timeout:10000})
        .then(response => response.data ?response.data:[] );
        action.successHandler(response,propsdata);
    }catch (error) {
        action.errorHandler(handleMessageError(error).msg,propsdata);
    }
}