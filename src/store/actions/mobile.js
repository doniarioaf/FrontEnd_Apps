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

export const submitAddCallPlan = (payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_CALLPLAN,
        payload: payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditCallPlan = (id,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_CALLPLAN,
        id:id,
        payload: payload,
        successHandler,
        errorHandler,
    }
}

export const submitDeleteCallPlan = (id, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_CALL_PLAN,
        id:id,
        successHandler,
        errorHandler,
    }
}

export const submitDeleteInfo = (id, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_INFO,
        id:id,
        successHandler,
        errorHandler,
    }
}

export const getMonitoringData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_MONITORING_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}