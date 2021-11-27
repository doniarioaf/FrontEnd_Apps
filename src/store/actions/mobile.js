import * as actions from './actions';

export const getCallPlanData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_CALLPLAN_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getInfoData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_INFO_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitAddInfo = (payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_INFO,
        payload: payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditInfo = (id,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_INFO,
        id:id,
        payload: payload,
        successHandler,
        errorHandler,
    }
}