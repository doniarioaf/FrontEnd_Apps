import axios        from '../../Axios-BizzApps';
import {baseCallPlanURL,baseInfoURL,baseReportURL} from '../../containers/shared/apiURL';

export function* getDataCallPlanSaga(action) {
    try {
        const response = yield axios.get(baseCallPlanURL(action.param)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* getDataInfoSaga(action) {
    try {
        const response = yield axios.get(baseInfoURL(action.param)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* submitAddInfoSaga(action) {
    try {
        const response = yield axios.post(baseInfoURL(''),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* submitEditInfoSaga(action) {
    try {
        const response = yield axios.put(baseInfoURL('/'+action.id),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        console.log('error ',error);
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* submitAddCallPlanSaga(action) {
    try {
        const response = yield axios.post(baseCallPlanURL(''),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* submitEditCallPlanSaga(action) {
    try {
        const response = yield axios.put(baseCallPlanURL('/'+action.id),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        console.log('error ',error);
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* submitDeleteCallPlanSaga(action) {
    try {
        const response = yield axios.delete(baseCallPlanURL('/'+action.id)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        console.log('error ',error);
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* submitDeleteInfoSaga(action) {
    try {
        const response = yield axios.delete(baseInfoURL('/'+action.id)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        console.log('error ',error);
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* getMonitoringDataSaga(action) {
    try {
        const response = yield axios.get(baseReportURL(action.param)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}