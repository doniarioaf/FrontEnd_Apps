import axios from 'axios';
import {baseApiURL} from './containers/shared/apiURL';

const instance = axios.create({
    baseURL: baseApiURL,
    headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
});

export default instance;