import axios        from '../../Axios-BizzApps';
import {baseBranchURL,baseCompanyURL,baseRoleURL,baseUserAppsURL,baseUserMobileURL,
    baseAddressURL,baseParameterClientURL,baseCustomerURL,baseProductURL,baseVendorURL,
    baseInventoriURL,
    baseCategoryProductURL,
    baseMappingStockURL,
    basePriceListURL,
    basePurchaseReceiveURL,
    baseDepositURL,
    baseAreaURL,
    baseDraftPurchaseReceiveURL,baseStockAdjusmentURL,
    basePackingListURL,
    baseInvoiceURL,
    baseReportURL,
    basePelunasanHutangURL,
    baseCargoURL} from '../../containers/shared/apiURL';
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



export function* getAddressDataSaga(action) {
    try {
        const response = yield axios.get(baseAddressURL(action.param)).then(response => response.data);
        action.successHandler(response);
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* getParameterClientSaga(action) {
    try {
        const response = yield axios.get(baseParameterClientURL(action.param)).then(response => response.data);
        action.successHandler(response);
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* submitAddParameterClientSaga(action) {
    try {
        const response = yield axios.post(baseParameterClientURL(action.param),action.payload).then(response => response.data);
        action.successHandler(response);
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* submitEditParameterClientSaga(action) {
    try {
        const response = yield axios.put(baseParameterClientURL(action.param),action.payload).then(response => response.data);
        action.successHandler(response);
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* submitDeleteParameterClientSaga(action) {
    try {
        const response = yield axios.delete(baseParameterClientURL(action.param)).then(response => response.data);
        action.successHandler(response);
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* getCustomerSaga(action) {
    let url = action.param.url?action.param.url:'';
    let propsdata = action.param.propsdata?action.param.propsdata:'';
    try {
        const response = yield axios.get(baseCustomerURL(url)).then(response => response.data);
        action.successHandler(response,propsdata);
    }catch (error) {
        action.errorHandler(handleMessageError(error),propsdata);
    }
}

export function* submitCustomerSaga(action) {
    let url = action.param.url?action.param.url:'';
    let payload = action.param.payload?action.param.payload:'';
    let type = action.param.type?action.param.type:'';
    let propsdata = action.param.propsdata?action.param.propsdata:[];
    try {
        if(type == 'ADD'){
            const response = yield axios.post(baseCustomerURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'EDIT'){
            const response = yield axios.put(baseCustomerURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'DELETE'){
            const response = yield axios.delete(baseCustomerURL(url)).then(response => response.data);
            action.successHandler(response,propsdata);
        }
        
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* getProductSaga(action) {
    let url = action.param.url?action.param.url:'';
    let propsdata = action.param.propsdata?action.param.propsdata:'';
    try {
        const response = yield axios.get(baseProductURL(url)).then(response => response.data);
        action.successHandler(response,propsdata);
    }catch (error) {
        action.errorHandler(handleMessageError(error),propsdata);
    }
}

export function* submitProductSaga(action) {
    let url = action.param.url?action.param.url:'';
    let payload = action.param.payload?action.param.payload:'';
    let type = action.param.type?action.param.type:'';
    let propsdata = action.param.propsdata?action.param.propsdata:[];
    try {
        if(type == 'ADD'){
            const response = yield axios.post(baseProductURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'EDIT'){
            const response = yield axios.put(baseProductURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'DELETE'){
            const response = yield axios.delete(baseProductURL(url)).then(response => response.data);
            action.successHandler(response,propsdata);
        }
        
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* getVendorSaga(action) {
    let url = action.param.url?action.param.url:'';
    let propsdata = action.param.propsdata?action.param.propsdata:'';
    try {
        const response = yield axios.get(baseVendorURL(url)).then(response => response.data);
        action.successHandler(response,propsdata);
    }catch (error) {
        action.errorHandler(handleMessageError(error),propsdata);
    }
}

export function* submitVendorSaga(action) {
    let url = action.param.url?action.param.url:'';
    let payload = action.param.payload?action.param.payload:'';
    let type = action.param.type?action.param.type:'';
    let propsdata = action.param.propsdata?action.param.propsdata:[];
    try {
        if(type == 'ADD'){
            const response = yield axios.post(baseVendorURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'EDIT'){
            const response = yield axios.put(baseVendorURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'DELETE'){
            const response = yield axios.delete(baseVendorURL(url)).then(response => response.data);
            action.successHandler(response,propsdata);
        }
        
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* getInventoriSaga(action) {
    let url = action.param.url?action.param.url:'';
    let propsdata = action.param.propsdata?action.param.propsdata:'';
    try {
        const response = yield axios.get(baseInventoriURL(url)).then(response => response.data);
        action.successHandler(response,propsdata);
    }catch (error) {
        action.errorHandler(handleMessageError(error),propsdata);
    }
}

export function* submitInventoriSaga(action) {
    let url = action.param.url?action.param.url:'';
    let payload = action.param.payload?action.param.payload:'';
    let type = action.param.type?action.param.type:'';
    let propsdata = action.param.propsdata?action.param.propsdata:[];
    try {
        if(type == 'ADD'){
            const response = yield axios.post(baseInventoriURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'EDIT'){
            const response = yield axios.put(baseInventoriURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'DELETE'){
            const response = yield axios.delete(baseInventoriURL(url)).then(response => response.data);
            action.successHandler(response,propsdata);
        }
        
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* getCategoryProductSaga(action) {
    let url = action.param.url?action.param.url:'';
    let propsdata = action.param.propsdata?action.param.propsdata:'';
    try {
        const response = yield axios.get(baseCategoryProductURL(url)).then(response => response.data);
        action.successHandler(response,propsdata);
    }catch (error) {
        action.errorHandler(handleMessageError(error),propsdata);
    }
}

export function* submitCategoryProductSaga(action) {
    let url = action.param.url?action.param.url:'';
    let payload = action.param.payload?action.param.payload:'';
    let type = action.param.type?action.param.type:'';
    let propsdata = action.param.propsdata?action.param.propsdata:[];
    try {
        if(type == 'ADD'){
            const response = yield axios.post(baseCategoryProductURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'EDIT'){
            const response = yield axios.put(baseCategoryProductURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'DELETE'){
            const response = yield axios.delete(baseCategoryProductURL(url)).then(response => response.data);
            action.successHandler(response,propsdata);
        }
        
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* getMappingStockSaga(action) {
    let url = action.param.url?action.param.url:'';
    let propsdata = action.param.propsdata?action.param.propsdata:'';
    try {
        const response = yield axios.get(baseMappingStockURL(url)).then(response => response.data);
        action.successHandler(response,propsdata);
    }catch (error) {
        action.errorHandler(handleMessageError(error),propsdata);
    }
}

export function* submitMappingStockSaga(action) {
    let url = action.param.url?action.param.url:'';
    let payload = action.param.payload?action.param.payload:'';
    let type = action.param.type?action.param.type:'';
    let propsdata = action.param.propsdata?action.param.propsdata:[];
    try {
        if(type == 'ADD'){
            const response = yield axios.post(baseMappingStockURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'EDIT'){
            const response = yield axios.put(baseMappingStockURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'DELETE'){
            const response = yield axios.delete(baseMappingStockURL(url)).then(response => response.data);
            action.successHandler(response,propsdata);
        }
        
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* getPriceListSaga(action) {
    let url = action.param.url?action.param.url:'';
    let propsdata = action.param.propsdata?action.param.propsdata:'';
    try {
        const response = yield axios.get(basePriceListURL(url)).then(response => response.data);
        action.successHandler(response,propsdata);
    }catch (error) {
        action.errorHandler(handleMessageError(error),propsdata);
    }
}

export function* submitPriceListSaga(action) {
    let url = action.param.url?action.param.url:'';
    let payload = action.param.payload?action.param.payload:'';
    let type = action.param.type?action.param.type:'';
    let propsdata = action.param.propsdata?action.param.propsdata:[];
    try {
        if(type == 'ADD'){
            const response = yield axios.post(basePriceListURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'EDIT'){
            const response = yield axios.put(basePriceListURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'DELETE'){
            const response = yield axios.delete(basePriceListURL(url)).then(response => response.data);
            action.successHandler(response,propsdata);
        }
        
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* getPurchaseReceiveSaga(action) {
    let url = action.param.url?action.param.url:'';
    let propsdata = action.param.propsdata?action.param.propsdata:'';
    let typefile = action.param.typefile?action.param.typefile:'';
    let type = action.param.type?action.param.type:'GET';
    try {
        if(type == 'GET'){
            const response = yield axios.get(basePurchaseReceiveURL(url)).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'GETFILE'){
            let resType = '';
            if(typefile  === 'application/vnd.ms-powerpoint' || typefile === 'application/pdf' || typefile === 'application/vnd.ms-excel' || typefile === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
                resType = 'arraybuffer'
            }
            const response = yield axios.get(basePurchaseReceiveURL(url), {
                //arraybuffer
                responseType: resType,
                headers: {
                    Accept: typefile,
                },
            }).then(response => response.data);
            action.successHandler(response,propsdata);
        }
        
    }catch (error) {
        action.errorHandler(handleMessageError(error),propsdata);
    }
}

export function* submitPurchaseReceiveSaga(action) {
    let url = action.param.url?action.param.url:'';
    let payload = action.param.payload?action.param.payload:'';
    let type = action.param.type?action.param.type:'';
    let propsdata = action.param.propsdata?action.param.propsdata:[];
    try {
        if(type == 'ADD'){
            const response = yield axios.post(basePurchaseReceiveURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'EDIT'){
            const response = yield axios.put(basePurchaseReceiveURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'DELETE'){
            const response = yield axios.delete(basePurchaseReceiveURL(url)).then(response => response.data);
            action.successHandler(response,propsdata);
        }
        
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* getDepositDataSaga(action) {
    let url = action.param.url?action.param.url:'';
    let payload = action.param.payload?action.param.payload:'';
    let type = action.param.type?action.param.type:'GET';
    let propsdata = action.param.propsdata?action.param.propsdata:'';
    try {
        if(type == 'GET'){
            const response = yield axios.get(baseDepositURL(url)).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'POST'){
            const response = yield axios.post(baseDepositURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }
        
    }catch (error) {
        action.errorHandler(handleMessageError(error),propsdata);
    }
}

export function* submitDepositSaga(action) {
    let url = action.param.url?action.param.url:'';
    let payload = action.param.payload?action.param.payload:'';
    let type = action.param.type?action.param.type:'';
    let propsdata = action.param.propsdata?action.param.propsdata:[];
    try {
        if(type == 'ADD'){
            const response = yield axios.post(baseDepositURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'EDIT'){
            const response = yield axios.put(baseDepositURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'DELETE'){
            const response = yield axios.delete(baseDepositURL(url)).then(response => response.data);
            action.successHandler(response,propsdata);
        }
        
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* getAreaSaga(action) {
    let url = action.param.url?action.param.url:'';
    let propsdata = action.param.propsdata?action.param.propsdata:'';
    try {
        const response = yield axios.get(baseAreaURL(url)).then(response => response.data);
        action.successHandler(response,propsdata);
    }catch (error) {
        action.errorHandler(handleMessageError(error),propsdata);
    }
}

export function* submitAreaSaga(action) {
    let url = action.param.url?action.param.url:'';
    let payload = action.param.payload?action.param.payload:'';
    let type = action.param.type?action.param.type:'';
    let propsdata = action.param.propsdata?action.param.propsdata:[];
    try {
        if(type == 'ADD'){
            const response = yield axios.post(baseAreaURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'EDIT'){
            const response = yield axios.put(baseAreaURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'DELETE'){
            const response = yield axios.delete(baseAreaURL(url)).then(response => response.data);
            action.successHandler(response,propsdata);
        }
        
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* getDraftPurchaseReceiveSaga(action) {
    let url = action.param.url?action.param.url:'';
    let payload = action.param.payload?action.param.payload:'';
    let type = action.param.type?action.param.type:'GET';
    let propsdata = action.param.propsdata?action.param.propsdata:'';
    try {
        if(type == 'GET'){
            const response = yield axios.get(baseDraftPurchaseReceiveURL(url)).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'POST'){
            const response = yield axios.post(baseDraftPurchaseReceiveURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }
        
    }catch (error) {
        action.errorHandler(handleMessageError(error),propsdata);
    }
}

export function* submitDraftPurchaseReceiveSaga(action) {
    let url = action.param.url?action.param.url:'';
    let payload = action.param.payload?action.param.payload:'';
    let type = action.param.type?action.param.type:'';
    let propsdata = action.param.propsdata?action.param.propsdata:[];
    try {
        if(type == 'ADD'){
            const response = yield axios.post(baseDraftPurchaseReceiveURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'EDIT'){
            const response = yield axios.put(baseDraftPurchaseReceiveURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'DELETE'){
            const response = yield axios.delete(baseDraftPurchaseReceiveURL(url)).then(response => response.data);
            action.successHandler(response,propsdata);
        }
        
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* getStockAdjusmentSaga(action) {
    let url = action.param.url?action.param.url:'';
    let payload = action.param.payload?action.param.payload:'';
    let type = action.param.type?action.param.type:'GET';
    let propsdata = action.param.propsdata?action.param.propsdata:'';
    try {
        if(type == 'GET'){
            const response = yield axios.get(baseStockAdjusmentURL(url)).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'POST'){
            const response = yield axios.post(baseStockAdjusmentURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }
        
    }catch (error) {
        action.errorHandler(handleMessageError(error),propsdata);
    }
}

export function* submitStockAdjusmentSaga(action) {
    let url = action.param.url?action.param.url:'';
    let payload = action.param.payload?action.param.payload:'';
    let type = action.param.type?action.param.type:'';
    let propsdata = action.param.propsdata?action.param.propsdata:[];
    try {
        if(type == 'ADD'){
            const response = yield axios.post(baseStockAdjusmentURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'EDIT'){
            const response = yield axios.put(baseStockAdjusmentURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'DELETE'){
            const response = yield axios.delete(baseStockAdjusmentURL(url)).then(response => response.data);
            action.successHandler(response,propsdata);
        }
        
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* getPackingListSaga(action) {
    let url = action.param.url?action.param.url:'';
    let payload = action.param.payload?action.param.payload:'';
    let type = action.param.type?action.param.type:'GET';
    let typefile = action.param.typefile?action.param.typefile:'';
    let propsdata = action.param.propsdata?action.param.propsdata:'';
    try {
        if(type == 'GET'){
            const response = yield axios.get(basePackingListURL(url)).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'POST'){
            const response = yield axios.post(basePackingListURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'GETFILE'){
            let resType = '';
            if(typefile  === 'application/vnd.ms-powerpoint' || typefile === 'application/pdf' || typefile === 'application/vnd.ms-excel' || typefile === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
                resType = 'arraybuffer'
            }
            const response = yield axios.get(basePackingListURL(url), {
                //arraybuffer
                responseType: resType,
                headers: {
                    Accept: typefile,
                },
            }).then(response => response.data);
            action.successHandler(response,propsdata);
        }
        
    }catch (error) {
        action.errorHandler(handleMessageError(error),propsdata);
    }
}

export function* submitPackingListSaga(action) {
    let url = action.param.url?action.param.url:'';
    let payload = action.param.payload?action.param.payload:'';
    let type = action.param.type?action.param.type:'';
    let propsdata = action.param.propsdata?action.param.propsdata:[];
    try {
        if(type == 'ADD'){
            const response = yield axios.post(basePackingListURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'EDIT'){
            const response = yield axios.put(basePackingListURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'DELETE'){
            const response = yield axios.delete(basePackingListURL(url)).then(response => response.data);
            action.successHandler(response,propsdata);
        }
        
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* getInvoiceSaga(action) {
    let url = action.param.url?action.param.url:'';
    let payload = action.param.payload?action.param.payload:'';
    let type = action.param.type?action.param.type:'GET';
    let typefile = action.param.typefile?action.param.typefile:'';
    let propsdata = action.param.propsdata?action.param.propsdata:'';
    try {
        if(type == 'GET'){
            const response = yield axios.get(baseInvoiceURL(url)).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'POST'){
            const response = yield axios.post(baseInvoiceURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'GETFILE'){
            let resType = '';
            if(typefile  === 'application/vnd.ms-powerpoint' || typefile === 'application/pdf' || typefile === 'application/vnd.ms-excel' || typefile === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
                resType = 'arraybuffer'
            }
            const response = yield axios.get(baseInvoiceURL(url), {
                //arraybuffer
                responseType: resType,
                headers: {
                    Accept: typefile,
                },
            }).then(response => response.data);
            action.successHandler(response,propsdata);
        }
        
    }catch (error) {
        action.errorHandler(handleMessageError(error),propsdata);
    }
}

export function* submitInvoiceSaga(action) {
    let url = action.param.url?action.param.url:'';
    let payload = action.param.payload?action.param.payload:'';
    let type = action.param.type?action.param.type:'';
    let propsdata = action.param.propsdata?action.param.propsdata:[];
    try {
        if(type == 'ADD'){
            const response = yield axios.post(baseInvoiceURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'EDIT'){
            const response = yield axios.put(baseInvoiceURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'DELETE'){
            const response = yield axios.delete(baseInvoiceURL(url)).then(response => response.data);
            action.successHandler(response,propsdata);
        }
        
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* getReportSaga(action) {
    let url = action.param.url?action.param.url:'';
    let propsdata = action.param.propsdata?action.param.propsdata:'';
    let typefile = action.param.typefile?action.param.typefile:'';
    let type = action.param.type?action.param.type:'GET';
    try {
        if(type == 'GET'){
            const response = yield axios.get(baseReportURL(url)).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'GETFILE'){
            let resType = '';
            if(typefile  === 'application/vnd.ms-powerpoint' || typefile === 'application/pdf' || typefile === 'application/vnd.ms-excel' || typefile === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
                resType = 'arraybuffer'
            }
            const response = yield axios.get(baseReportURL(url), {
                //arraybuffer
                responseType: resType,
                headers: {
                    Accept: typefile,
                },
            }).then(response => response.data);
            action.successHandler(response,propsdata);
        }
        
    }catch (error) {
        action.errorHandler(handleMessageError(error),propsdata);
    }
}

export function* getPelunasanHutangDataSaga(action) {
    let url = action.param.url?action.param.url:'';
    let payload = action.param.payload?action.param.payload:'';
    let type = action.param.type?action.param.type:'GET';
    let propsdata = action.param.propsdata?action.param.propsdata:'';
    try {
        if(type == 'GET'){
            const response = yield axios.get(basePelunasanHutangURL(url)).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'POST'){
            const response = yield axios.post(basePelunasanHutangURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }
        
    }catch (error) {
        action.errorHandler(handleMessageError(error),propsdata);
    }
}

export function* submitPelunasanHutangSaga(action) {
    let url = action.param.url?action.param.url:'';
    let payload = action.param.payload?action.param.payload:'';
    let type = action.param.type?action.param.type:'';
    let propsdata = action.param.propsdata?action.param.propsdata:[];
    try {
        if(type == 'ADD'){
            const response = yield axios.post(basePelunasanHutangURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'EDIT'){
            const response = yield axios.put(basePelunasanHutangURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'DELETE'){
            const response = yield axios.delete(basePelunasanHutangURL(url)).then(response => response.data);
            action.successHandler(response,propsdata);
        }
        
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}

export function* getCargoDataSaga(action) {
    let url = action.param.url?action.param.url:'';
    let payload = action.param.payload?action.param.payload:'';
    let type = action.param.type?action.param.type:'GET';
    let propsdata = action.param.propsdata?action.param.propsdata:'';
    try {
        if(type == 'GET'){
            const response = yield axios.get(baseCargoURL(url)).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'POST'){
            const response = yield axios.post(baseCargoURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }
        
    }catch (error) {
        action.errorHandler(handleMessageError(error),propsdata);
    }
}

export function* submitCargoSaga(action) {
    let url = action.param.url?action.param.url:'';
    let payload = action.param.payload?action.param.payload:'';
    let type = action.param.type?action.param.type:'';
    let propsdata = action.param.propsdata?action.param.propsdata:[];
    try {
        if(type == 'ADD'){
            const response = yield axios.post(baseCargoURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'EDIT'){
            const response = yield axios.put(baseCargoURL(url),payload).then(response => response.data);
            action.successHandler(response,propsdata);
        }else if(type == 'DELETE'){
            const response = yield axios.delete(baseCargoURL(url)).then(response => response.data);
            action.successHandler(response,propsdata);
        }
        
    }catch (error) {
        action.errorHandler(handleMessageError(error));
    }
}