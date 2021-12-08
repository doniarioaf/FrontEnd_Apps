import axios        from '../../Axios-BizzApps';
import {baseBranchURL,baseCompanyURL,baseRoleURL,baseUserAppsURL,baseUserMobileURL,
    baseProductTypeURL,baseProductURL,baseReportURL, baseCustomerURL, baseCustomerTypeURL} from '../../containers/shared/apiURL';

export function* getDataBranchSaga(action) {
    try {
        const response = yield axios.get(baseBranchURL(action.param)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* submitAddBranchSaga(action) {
    try {
        const response = yield axios.post(baseBranchURL(''),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* submitEditBranchSaga(action) {
    try {
        const response = yield axios.put(baseBranchURL('/'+action.id),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* getDataCompanySaga(action) {
    try {
        const response = yield axios.get(baseCompanyURL(action.param)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* submitAddCompanySaga(action) {
    try {
        const response = yield axios.post(baseCompanyURL(''),action.payload).then(response => response.data);
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* submitEditCompanySaga(action) {
    try {
        const response = yield axios.put(baseCompanyURL('/'+action.id),action.payload).then(response => response.data);
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* getDataRoleSaga(action) {
    try {
        const response = yield axios.get(baseRoleURL(action.param)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        console.log('error ',error);
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* submitAddRoleSaga(action) {
    try {
        const response = yield axios.post(baseRoleURL(''),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* submitEditRoleSaga(action) {
    try {
        const response = yield axios.put(baseRoleURL('/'+action.id),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* getDataUserAppsSaga(action) {
    try {
        const response = yield axios.get(baseUserAppsURL(action.param)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        console.log('error ',error);
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* submitAddUserAppsSaga(action) {
    try {
        const response = yield axios.post(baseUserAppsURL(''),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* getDataUserAppsWithParamSaga(action) {
    try {
        const response = yield axios.get(baseUserAppsURL(action.param)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response,action.valueparam);
    }catch (error) {
        console.log('error ',error);
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* submitEditUserAppsSaga(action) {
    try {
        const response = yield axios.put(baseUserAppsURL('/'+action.id),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* submitPostCompanySaga(action) {
    try {
        const response = yield axios.post(baseCompanyURL(action.param),action.payload).then(response => response.data);
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* submitDeleteCompanySaga(action) {
    try {
        const response = yield axios.delete(baseCompanyURL('/'+action.id)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* getDataUserMobileSaga(action) {
    try {
        const response = yield axios.get(baseUserMobileURL(action.param)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        console.log('error ',error);
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* submitAddUserMobileSaga(action) {
    try {
        const response = yield axios.post(baseUserMobileURL(''),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* submitEditUserMobileSaga(action) {
    try {
        const response = yield axios.put(baseUserMobileURL('/'+action.id),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* getProductTypeSaga(action) {
    try {
        const response = yield axios.get(baseProductTypeURL(action.param)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        console.log('error ',error);
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* submitAddProductTypeSaga(action) {
    try {
        const response = yield axios.post(baseProductTypeURL(''),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* submitEditProductTypeSaga(action) {
    try {
        const response = yield axios.put(baseProductTypeURL('/'+action.id),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* getProductSaga(action) {
    try {
        const response = yield axios.get(baseProductURL(action.param)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        console.log('error ',error);
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* submitAddProductSaga(action) {
    try {
        const response = yield axios.post(baseProductURL(''),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* submitEditProductSaga(action) {
    try {
        const response = yield axios.put(baseProductURL('/'+action.id),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}


export function* getReportSaga(action) {
    try {
        let resType = '';
        if(action.typefile === 'application/pdf' || action.typefile === 'application/vnd.ms-excel' || action.typefile === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
            resType = 'arraybuffer'
        }
        // const response = yield axios.get(baseReportURL(action.param)).then(response => response.data);
        const response = yield axios.get(baseReportURL(action.param), {
            //arraybuffer
            responseType: resType,
            headers: {
                Accept: action.typefile,
            },
        }).then(response => response.data)

        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        console.log('error ',error);
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* getReportTemplateSaga(action) {
    try {
        const response = yield axios.get(baseReportURL(action.param)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        console.log('error ',error);
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* submitDeleteBranchSaga(action) {
    try {
        const response = yield axios.delete(baseBranchURL('/'+action.id)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* submitDeleteRoleSaga(action) {
    try {
        const response = yield axios.delete(baseRoleURL('/'+action.id)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* submitDeleteUserSaga(action) {
    try {
        const response = yield axios.delete(baseUserAppsURL('/'+action.id)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* submitDeleteUserMobileSaga(action) {
    try {
        const response = yield axios.delete(baseUserMobileURL('/'+action.id)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* submitDeleteCustomerSaga(action) {
    try {
        const response = yield axios.delete(baseCustomerURL('/'+action.id)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}

export function* submitDeleteCustomerTypeSaga(action) {
    try {
        const response = yield axios.delete(baseCustomerTypeURL('/'+action.id)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}