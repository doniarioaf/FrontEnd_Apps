import axios from 'axios';
import {baseApiURL} from './containers/shared/apiURL';
import * as key from './containers/shared/constantKey'

const instance = axios.create({
    baseURL: baseApiURL,
    headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
});

instance.interceptors.response.use(undefined, err =>{
    if(err.message == 'timeout of 4000ms exceeded'){
        sessionStorage.setItem(key.messageError,'timeout');
    }
    if(err.response){
        const error = err.response;
        if(error.data){
            sessionStorage.setItem(key.messageError,JSON.stringify(error.data));
        }
    }
    
})

export default instance;