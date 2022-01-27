import axios        from '../../Axios-BizzApps';
import {baseCustomerTypeURL,baseCustomerURL} from '../../containers/shared/apiURL';
import {handleMessageError} from '../../containers/shared/globalFunc';

export function* getDataCustomerTypeSaga(action) {
    try {
        const response = yield axios.get(baseCustomerTypeURL(action.param)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitAddCustomerTypeSaga(action) {
    try {
        const response = yield axios.post(baseCustomerTypeURL(''),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitAEditCustomerTypeSaga(action) {
    try {
        const response = yield axios.put(baseCustomerTypeURL('/'+action.id),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* getDataCustomerSaga(action) {
    try {
        const response = yield axios.get(baseCustomerURL(action.param)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitAddCustomerSaga(action) {
    try {
        const response = yield axios.post(baseCustomerURL(''),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitEditCustomerSaga(action) {
    try {
        const response = yield axios.put(baseCustomerURL('/'+action.id),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}