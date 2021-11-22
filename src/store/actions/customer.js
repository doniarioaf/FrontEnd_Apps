import * as actions from './actions';

export const getCustomerTypeData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_CUSTOMERTYPE_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitAddCustomerType = (payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_CUSTOMERTYPE,
        payload: payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditCustomerType = (id,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_CUSTOMERTYPE,
        id:id,
        payload: payload,
        successHandler,
        errorHandler,
    }
}

export const getCustomerData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_CUSTOMER_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitAddCustomer = (payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_CUSTOMER,
        payload: payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditCustomer = (id,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_CUSTOMER,
        id:id,
        payload: payload,
        successHandler,
        errorHandler,
    }
}