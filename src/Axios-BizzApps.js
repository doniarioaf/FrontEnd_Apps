import axios                                from 'axios';
import {baseApiURL} from './containers/shared/apiURL';
import {token} from './containers/shared/constantKey';

const instance = axios.create({
    baseURL: baseApiURL,
    headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
});

instance.interceptors.request.use(req => {
    try {
        req.headers['Authorization'] = localStorage.getItem(token);
    }catch (error) {
        console.log('INSIDE AXIOS', error);
    }
    return req;
});

instance.interceptors.response.use( res => res, error => {
    // console.log('interceptors error1', error);
    // console.log('interceptors error2', error.response);
    if(error.response){
        return Promise.reject(error.response);
    }
    else{
        return Promise.reject(error);
    }
    //throw new Error(error.response.data);
    //errorAxios('INVALID_TOKEN');
});

export default instance;