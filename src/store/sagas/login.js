import AxiosLogin from '../../Axios-login';
import axios        from '../../Axios-BizzApps';
import {put, call}         from 'redux-saga/effects';
import * as actions                from '../actions';
import CryptoJS from 'crypto-js';
import {loginURL,checkAuthURL} from '../../containers/shared/apiURL';
import * as key from '../../containers/shared/constantKey';
import {handleMessageError} from '../../containers/shared/globalFunc';

export function* loginUserSaga(action) {
    try {
        const response = yield AxiosLogin.post(loginURL,action.payload,{timeout:4000})
        .then(response => response.data ?response.data:[] );
        // console.log('loginUserSaga ',response);
        let flag = false;
        let responflag = response.data?.token?true:false;
        if(response.message == 'SUCCESS' && responflag){
            const permissions = CryptoJS.AES.encrypt(JSON.stringify(response.data.permissions),key.keyEcncrypt).toString();

            localStorage.setItem(key.token,response.data.token);
            localStorage.setItem(key.permissions,permissions);
            sessionStorage.setItem(key.sessionuser,action.payload.user);
            
            let obj = new Object();
            obj.username = action.payload.user;
            obj.permissions = response.data.permissions;
            obj.typeaction = 'login';
            yield put(actions.authSuccess(obj));
            flag = true;
        }
        action.successHandler(flag);
    }catch (error) {
        action.errorHandler(handleMessageError(error).msg);
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