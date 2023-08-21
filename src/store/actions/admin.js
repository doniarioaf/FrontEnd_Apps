import * as actions from './actions';

export const getBranchData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_BRANCH_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitAddBranch = (payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_BRANCH,
        payload: payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditBranch = (id,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_BRANCH,
        id:id,
        payload: payload,
        successHandler,
        errorHandler,
    }
}

export const submitDeleteBranch = (id, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_BRANCH,
        id:id,
        successHandler,
        errorHandler,
    }
}

export const getCompanyData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_COMPANY_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitAddCompany = (payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_COMPANY,
        payload: payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditCompany = (id,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_COMPANY,
        id:id,
        payload: payload,
        successHandler,
        errorHandler,
    }
}

export const getRoleData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_ROLE_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitAddRole = (payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_ROLE,
        payload: payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditRole = (id,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_ROLE,
        id:id,
        payload: payload,
        successHandler,
        errorHandler,
    }
}

export const getUserAppsData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_USERAPPS_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitAddUserApps = (payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_USERAPPS_DATA,
        payload: payload,
        successHandler,
        errorHandler,
    }
}

export const getUserAppsDataWithParam = (param,valueparam, successHandler, errorHandler) => {
    return {
        type: actions.GET_USERAPPS_WITH_PARAM_DATA,
        param: param,
        valueparam:valueparam,
        successHandler,
        errorHandler,
    }
}

export const submitEditUserApps = (id,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_USERAPPS_DATA,
        id:id,
        payload: payload,
        successHandler,
        errorHandler,
    }
}

export const submitPostCompany = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_POST_COMPANY,
        param:param,
        payload: payload,
        successHandler,
        errorHandler,
    }
}

export const submitDeleteCompany = (id, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_COMPANY,
        id:id,
        successHandler,
        errorHandler,
    }
}

export const getUserMobileData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_USERMOBILE_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitAddUserMobile = (payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_USERMOBILE,
        payload: payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditUserMobile = (id,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_USERMOBILE,
        id:id,
        payload: payload,
        successHandler,
        errorHandler,
    }
}



export const submitDeleteRole = (id, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_ROLE,
        id:id,
        successHandler,
        errorHandler,
    }
}

export const submitDeleteUser = (id, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_USER,
        id:id,
        successHandler,
        errorHandler,
    }
}

export const submitDeleteUserMobile = (id, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_USER_MOBILE,
        id:id,
        successHandler,
        errorHandler,
    }
}




export const getAddressData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_ADDRESS_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}