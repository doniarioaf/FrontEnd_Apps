import * as actions from './actions';

export const getCallPlanData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_CALLPLAN_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}