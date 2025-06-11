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

export const getParameterClientData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_PARAMETERCLIENT_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitAddParameterClient = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_PARAMETERCLIENT,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditParameterClient = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_PARAMETERCLIENT,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitDeleteParameterClient = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_PARAMETERCLIENT,
        param: param,
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

export const submitCustomerData = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_CUSTOMER,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getProductData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_PRODUCT_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitProductData = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_PRODUCT,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getVendorData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_VENDOR_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitVendorData = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_VENDOR,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getInventoriData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_INVENTORI_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitInventoriData = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_INVENTORI,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getCategoryProductData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_CATEGORYPRODUCT_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitCategoryProductData = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_CATEGORYPRODUCT,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getMappingStockData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_MAPPINGSTOCK_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitMappingStockData = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_MAPPINGSTOCK,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getPriceListData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_PRICELIST_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitPriceListData = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_PRICELIST,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getPurchaseReceiveData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_PURCHASERECEIVE_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitPurchaseReceiveData = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_PURCHASERECEIVE,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getDepositData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_DEPOSIT_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitDeposit = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DEPOSIT,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getAreaData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_AREA_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitArea = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_AREA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getDraftPurchaseReceiveData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_DRAFTPURCHASERECEIVE_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitDraftPurchaseReceive = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DRAFTPURCHASERECEIVE,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getStockAdjusmentData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_STOCKADJUSMENT_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitStockAdjusment = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_STOCKADJUSMENT,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getPackingListData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_PACKINGLIST_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitPackingList = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_PACKINGLIST,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getInvoiceData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_INVOICE_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitInvoice = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_INVOICE,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getReport = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_REPORT,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getPelunasanHutangData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_PELUNASANHUTANG_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitPelunasanHutang = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_PELUNASANHUTANG,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getCargoData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_CARGO_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitCargo = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_CARGO,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getPelunasanPiutangData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_PELUNASANPIUTANG_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitPelunasanPiutang = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_PELUNASANPIUTANG,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getKomisiData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_KOMISI_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitKomisi = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_KOMISI,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getPinjamanData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_PINJAMANA_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitPinjaman = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_PINJAMAN,
        param: param,
        successHandler,
        errorHandler,
    }
}