import * as actions from './actions';

export const loginUser = (payload, successHandler, errorHandler) => {
    return {
        type: actions.LOGIN_USER,
        payload: payload,
        successHandler,
        errorHandler,
    }
}

export const authSuccess = (data) => {
    return {
        type: actions.AUTH_SUCCESS,
        username: data.username,
        permissions: data.permissions,
        roles: [],
        typeaction:data.typeaction,
    };
};

export const checkUser = () => {
    return {
        type: actions.CHECK_AUTH_SUCCESS,
    };
};

export const retrieveDatacheckUser = (data) => {
    return {
        type: actions.CHECK_AUTH_SUCCESS,
        success: data.success,
    };
};

export const logoutUser = (successHandler, errorHandler) => {
    return {
        type: actions.LOGOUT,
        successHandler,
        errorHandler,
    }
}

