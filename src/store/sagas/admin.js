import axios        from '../../Axios-BizzApps';
import {baseBranchURL,baseCompanyURL,baseRoleURL,baseUserAppsURL,baseUserMobileURL,
    baseProductTypeURL,baseProductURL,baseReportURL, baseCustomerURL, baseCustomerTypeURL, baseProjectURL,baseBankAccountURL,baseCustomerManggalaURL,
    baseAddressURL,baseEmployeeManggalaURL,baseVendorCategoryURL} from '../../containers/shared/apiURL';
import {handleMessageError} from '../../containers/shared/globalFunc';

export function* getDataBranchSaga(action) {
    try {
        const response = yield axios.get(baseBranchURL(action.param)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitAddBranchSaga(action) {
    try {
        const response = yield axios.post(baseBranchURL(''),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitEditBranchSaga(action) {
    try {
        const response = yield axios.put(baseBranchURL('/'+action.id),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* getDataCompanySaga(action) {
    try {
        const response = yield axios.get(baseCompanyURL(action.param)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitAddCompanySaga(action) {
    try {
        const response = yield axios.post(baseCompanyURL(''),action.payload).then(response => response.data);
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitEditCompanySaga(action) {
    try {
        const response = yield axios.put(baseCompanyURL('/'+action.id),action.payload).then(response => response.data);
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* getDataRoleSaga(action) {
    try {
        const response = yield axios.get(baseRoleURL(action.param)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // console.log('error ',error);
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitAddRoleSaga(action) {
    try {
        const response = yield axios.post(baseRoleURL(''),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitEditRoleSaga(action) {
    try {
        const response = yield axios.put(baseRoleURL('/'+action.id),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* getDataUserAppsSaga(action) {
    try {
        const response = yield axios.get(baseUserAppsURL(action.param)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // console.log('error ',error);
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitAddUserAppsSaga(action) {
    try {
        const response = yield axios.post(baseUserAppsURL(''),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* getDataUserAppsWithParamSaga(action) {
    try {
        const response = yield axios.get(baseUserAppsURL(action.param)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response,action.valueparam);
    }catch (error) {
        // console.log('error ',error);
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitEditUserAppsSaga(action) {
    try {
        const response = yield axios.put(baseUserAppsURL('/'+action.id),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitPostCompanySaga(action) {
    try {
        const response = yield axios.post(baseCompanyURL(action.param),action.payload).then(response => response.data);
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitDeleteCompanySaga(action) {
    try {
        const response = yield axios.delete(baseCompanyURL('/'+action.id)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* getDataUserMobileSaga(action) {
    try {
        const response = yield axios.get(baseUserMobileURL(action.param)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // console.log('error ',error);
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitAddUserMobileSaga(action) {
    try {
        const response = yield axios.post(baseUserMobileURL(''),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitEditUserMobileSaga(action) {
    try {
        const response = yield axios.put(baseUserMobileURL('/'+action.id),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* getProductTypeSaga(action) {
    try {
        const response = yield axios.get(baseProductTypeURL(action.param)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // console.log('error ',error);
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitAddProductTypeSaga(action) {
    try {
        const response = yield axios.post(baseProductTypeURL(''),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitEditProductTypeSaga(action) {
    try {
        const response = yield axios.put(baseProductTypeURL('/'+action.id),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* getProductSaga(action) {
    try {
        const response = yield axios.get(baseProductURL(action.param)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // console.log('error ',error);
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitAddProductSaga(action) {
    try {
        const response = yield axios.post(baseProductURL(''),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitEditProductSaga(action) {
    try {
        const response = yield axios.put(baseProductURL('/'+action.id),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}


export function* getReportSaga(action) {
    try {
        let resType = '';
        if(action.typefile  === 'application/vnd.ms-powerpoint' || action.typefile === 'application/pdf' || action.typefile === 'application/vnd.ms-excel' || action.typefile === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
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
        // console.log('error ',error);
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* getReportTemplateSaga(action) {
    try {
        const response = yield axios.get(baseReportURL(action.param)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // console.log('error ',error);
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitDeleteBranchSaga(action) {
    try {
        const response = yield axios.delete(baseBranchURL('/'+action.id)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitDeleteRoleSaga(action) {
    try {
        const response = yield axios.delete(baseRoleURL('/'+action.id)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitDeleteUserSaga(action) {
    try {
        const response = yield axios.delete(baseUserAppsURL('/'+action.id)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitDeleteUserMobileSaga(action) {
    try {
        const response = yield axios.delete(baseUserMobileURL('/'+action.id)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitDeleteCustomerSaga(action) {
    try {
        const response = yield axios.delete(baseCustomerURL('/'+action.id)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitDeleteCustomerTypeSaga(action) {
    try {
        const response = yield axios.delete(baseCustomerTypeURL('/'+action.id)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* getProjectDataSaga(action) {
    try {
        const response = yield axios.get(baseProjectURL(action.param)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // console.log('error ',error);
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitAddProjectSaga(action) {
    try {
        const response = yield axios.post(baseProjectURL(''),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitEditProjectSaga(action) {
    try {
        const response = yield axios.put(baseProjectURL('/'+action.id),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* submitDeleteProjectSaga(action) {
    try {
        const response = yield axios.delete(baseProjectURL('/'+action.id)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error).msg);
    }
}

export function* getBankAccountDataSaga(action) {
    try {
        const response = yield axios.get(baseBankAccountURL(action.param)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // console.log('error ',error);
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error));
    }
}

export function* submitAddBankAccountDataSaga(action) {
    try {
        const response = yield axios.post(baseBankAccountURL(action.param),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // console.log('error ',error);
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error));
    }
}

export function* submitEditBankAccountDataSaga(action) {
    try {
        const response = yield axios.put(baseBankAccountURL(action.param),action.payload).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // console.log('error ',error);
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error));
    }
}

export function* submitDeleteBankAccountDataSaga(action) {
    try {
        const response = yield axios.delete(baseBankAccountURL(action.param)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // console.log('error ',error);
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(handleMessageError(error));
    }
}

export function* getCustomerManggalaDataSaga(action) {
    try {
        const response = yield axios.get(baseCustomerManggalaURL(action.param)).then(response => response.data);
        action.successHandler(response);
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* submitAddCustomerManggalaSaga(action) {
    try {
        const response = yield axios.post(baseCustomerManggalaURL(action.param),action.payload).then(response => response.data);
        action.successHandler(response);
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* submitEditCustomerManggalaSaga(action) {
    try {
        const response = yield axios.put(baseCustomerManggalaURL(action.param),action.payload).then(response => response.data);
        action.successHandler(response);
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* submitDeleteCustomerManggalaSaga(action) {
    try {
        const response = yield axios.delete(baseCustomerManggalaURL(action.param)).then(response => response.data);
        action.successHandler(response);
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* getAddressDataSaga(action) {
    try {
        const response = yield axios.get(baseAddressURL(action.param)).then(response => response.data);
        action.successHandler(response);
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* getEmployeeManggalaDataSaga(action) {
    try {
        const response = yield axios.get(baseEmployeeManggalaURL(action.param)).then(response => response.data);
        action.successHandler(response);
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* submitAddEmployeeManggalaSaga(action) {
    try {
        const response = yield axios.post(baseEmployeeManggalaURL(action.param),action.payload).then(response => response.data);
        action.successHandler(response);
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* submitEditEmployeeManggalaSaga(action) {
    try {
        const response = yield axios.put(baseEmployeeManggalaURL(action.param),action.payload).then(response => response.data);
        action.successHandler(response);
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* submitDeleteEmployeeManggalaSaga(action) {
    try {
        const response = yield axios.delete(baseEmployeeManggalaURL(action.param)).then(response => response.data);
        action.successHandler(response);
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* getVendorCategoryDataSaga(action) {
    try {
        const response = yield axios.get(baseVendorCategoryURL(action.param)).then(response => response.data);
        action.successHandler(response);
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* submitAddVendorCategorySaga(action) {
    try {
        const response = yield axios.post(baseVendorCategoryURL(action.param),action.payload).then(response => response.data);
        action.successHandler(response);
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* submitEditVendorCategorySaga(action) {
    try {
        const response = yield axios.put(baseVendorCategoryURL(action.param),action.payload).then(response => response.data);
        action.successHandler(response);
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* submitDeleteVendorCategorySaga(action) {
    try {
        const response = yield axios.delete(baseEmployeeManggalaURL(action.param)).then(response => response.data);
        action.successHandler(response);
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}