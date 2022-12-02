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

export const getProductType = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_PRODUCTTYPE_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitAddProductType = (payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_PRODUCTTYPE,
        payload: payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditProductType = (id,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_PRODUCTTYPE,
        id:id,
        payload: payload,
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

export const submitAddProduct = (payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_PRODUCT,
        payload: payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditProduct = (id,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_PRODUCT,
        id:id,
        payload: payload,
        successHandler,
        errorHandler,
    }
}

export const getReportData = (param,typefile, successHandler, errorHandler) => {
    return {
        type: actions.GET_REPORT_DATA,
        param: param,
        typefile:typefile,
        successHandler,
        errorHandler,
    }
}

export const getReportTemplateData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_REPORT_TEMPLATE_DATA,
        param: param,
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

export const submitDeleteCustomer = (id, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_CUSTOMER,
        id:id,
        successHandler,
        errorHandler,
    }
}

export const submitDeleteCustomerType = (id, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_CUSTOMER_TYPE,
        id:id,
        successHandler,
        errorHandler,
    }
}

export const getProjectData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_PROJECT_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitAddProject = (payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_PROJECT,
        payload: payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditProject = (id,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_PROJECT,
        id:id,
        payload: payload,
        successHandler,
        errorHandler,
    }
}

export const submitDeleteProject = (id, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_PROJECT,
        id:id,
        successHandler,
        errorHandler,
    }
}

export const getBankAccountData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_DATA_BANK_ACCOUNT,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitAddBankAccount = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_BANK_ACCOUNT,
        payload:payload,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitEditBankAccount = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_BANK_ACCOUNT,
        payload:payload,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitDeleteBankAccount = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_BANK_ACCOUNT,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getCustomerManggalaData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_DATA_CUSTOMER_MANGGALA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitAddCustomerManggala = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_CUSTOMER_MANGGALA,
        payload:payload,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitEditCustomerManggala = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_CUSTOMER_MANGGALA,
        payload:payload,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitDeleteCustomerManggala = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_CUSTOMER_MANGGALA,
        param: param,
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

export const getEmployeeManggalaData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_EMPLOYEE_MANGGALA_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitAddEmployeeManggalaData = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_EMPLOYEE_MANGGALA,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditEmployeeManggalaData = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_EMPLOYEE_MANGGALA,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitDeleteEmployeeManggalaData = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_EMPLOYEE_MANGGALA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getVendorCategoryData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_VENDOR_CATEGORY_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitAddVendorCategory = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_VENDOR_CATEGORY,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditVendorCategory = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_VENDOR_CATEGORY,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitDeleteVendorCategory = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_VENDOR_CATEGORY,
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

export const submitAddVendor = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_VENDOR,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditVendor = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_VENDOR,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitDeleteVendor = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_VENDOR,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getWorkOrderTypeData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_WORKORDERTYPE_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitAddWorkOrderType = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_WORKORDERTYPE,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditWorkOrderType = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_WORKORDERTYPE,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitDeleteWorkOrderType = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_WORKORDERTYPE,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getpartaiData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_PARTAI_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitAddPartai = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_PARTAI,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditPartai = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_PARTAI,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitDeletePartai = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_PARTAI,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getPortData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_PORT_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitAddPort = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_PORT,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditPort = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_PORT,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitDeletePort = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_PORT,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getParameterManggalaData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_PARAMETERMANGGALA_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitAddParameterManggala = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_PARAMETERMANGGALA,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditParameterManggala = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_PARAMETERMANGGALA,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitDeleteParameterManggala = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_PARAMETERMANGGALA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getWarehouseData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_WAREHOUSE_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitAddWarehouse = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_WAREHOUSE,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditWarehouse = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_WAREHOUSE,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitDeleteWarehouse = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_WAREHOUSE,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getInvoiceTypeData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_INVOICETYPE_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitAddInvoiceType = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_INVOICETYPE,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditInvoiceType = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_INVOICETYPE,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitDeleteInvoiceType = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_INVOICETYPE,
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

export const submitAddPriceList = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_PRICELIST,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditPriceList = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_PRICELIST,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitDeletePriceList = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_PRICELIST,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getPaymentTypeData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_PAYMENTTYPE_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitAddPaymentType = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_PAYMENTTYPE,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditPaymentType = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_PAYMENTTYPE,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitDeletePaymentType = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_PAYMENTTYPE,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getWorkOrderData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_WORKORDER_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitAddWorkOrder = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_WORKORDER,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditWorkOrder = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_WORKORDER,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitDeleteWorkOrder = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_WORKORDER,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getSuratJalanData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_SURATJALAN_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitAddSuratJalan = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_SURATJALAN,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditSuratJalan = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_SURATJALAN,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitDeleteSuratJalan = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_SURATJALAN,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getPenerimaanKasBankData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_PENERIMAANKASBANK_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitAddPenerimaanKasBank = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_PENERIMAANKASBANK,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditPenerimaanKasBank = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_PENERIMAANKASBANK,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitDeletePenerimaanKasBank = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_PENERIMAANKASBANK,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const getPengeluaranKasBankData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_PENGELUARANKASBANK_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitAddPengeluaranKasBank = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_PENGELUARANKASBANK,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditPengeluaranKasBank = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_PENGELUARANKASBANK,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitDeletePengeluaranKasBank = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_PENGELUARANKASBANK,
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

export const submitAddInvoice = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_INVOICE,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditInvoice = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_INVOICE,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitDeleteInvoice = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_INVOICE,
        param: param,
        successHandler,
        errorHandler,
    }
}


export const getAssetData = (param, successHandler, errorHandler) => {
    return {
        type: actions.GET_ASSET_DATA,
        param: param,
        successHandler,
        errorHandler,
    }
}

export const submitAddAsset = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_ADD_ASSET,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitEditAsset = (param,payload, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_EDIT_ASSET,
        param: param,
        payload:payload,
        successHandler,
        errorHandler,
    }
}

export const submitDeleteAsset = (param, successHandler, errorHandler) => {
    return {
        type: actions.SUBMIT_DELETE_ASSET,
        param: param,
        successHandler,
        errorHandler,
    }
}