import { from } from 'core-js/fn/array';

export {
    changeSetting
} from './settings.actions';

export {
    loginUser,
    authSuccess,
    checkUser,
    retrieveDatacheckUser,
    logoutUser,
    preLoginUser
} from './login';

export {
    getBranchData,
    submitAddBranch,
    submitEditBranch,
    getCompanyData,
    submitAddCompany,
    submitEditCompany,
    getRoleData,
    submitAddRole,
    submitEditRole,
    getUserAppsData,
    submitAddUserApps,
    getUserAppsDataWithParam,
    submitEditUserApps,
    submitPostCompany,
    submitDeleteCompany,
    getUserMobileData,
    submitAddUserMobile,
    submitEditUserMobile,
    submitDeleteBranch,
    submitDeleteRole,
    submitDeleteUser,
    submitDeleteUserMobile,
    getAddressData,
    getParameterClientData,
    submitAddParameterClient,
    submitEditParameterClient,
    submitDeleteParameterClient,
    getCustomerData,
    submitCustomerData,
    getProductData,
    submitProductData,
    getVendorData,
    submitVendorData,
    getInventoriData,
    submitInventoriData,
    getCategoryProductData,
    submitCategoryProductData,
    getMappingStockData,
    submitMappingStockData,
    getPriceListData,
    submitPriceListData,
    getPurchaseReceiveData,
    submitPurchaseReceiveData,
    getDepositData,
    submitDeposit,
    getAreaData,
    submitArea,
    getDraftPurchaseReceiveData,
    submitDraftPurchaseReceive,
    getStockAdjusmentData,
    submitStockAdjusment
} from './admin';