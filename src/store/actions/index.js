import { from } from 'core-js/fn/array';

export {
    changeSetting
} from './settings.actions';

export {
    loginUser,
    authSuccess,
    checkUser,
    retrieveDatacheckUser,
    logoutUser
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
    getProductType,
    submitAddProductType,
    submitEditProductType,
    getProductData,
    submitAddProduct,
    submitEditProduct,
    getReportData,
    getReportTemplateData,
    submitDeleteBranch,
    submitDeleteRole,
    submitDeleteUser,
    submitDeleteUserMobile,
    submitDeleteCustomer,
    submitDeleteCustomerType,
    getProjectData,
    submitAddProject,
    submitEditProject,
    submitDeleteProject,
    getBankAccountData,
    submitAddBankAccount,
    submitEditBankAccount,
    submitDeleteBankAccount,
    getCustomerManggalaData,
    submitAddCustomerManggala,
    submitEditCustomerManggala,
    submitDeleteCustomerManggala,
    getAddressData
} from './admin';

export {
    getCustomerTypeData,
    submitAddCustomerType,
    submitEditCustomerType,
    getCustomerData,
    submitAddCustomer,
    submitEditCustomer,
    submitUploadFileCustomerCallPlan
} from './customer';

export {
    getCallPlanData,
    getInfoData,
    submitAddInfo,
    submitEditInfo,
    submitAddCallPlan,
    submitEditCallPlan,
    submitDeleteCallPlan,
    submitDeleteInfo,
    getMonitoringData
} from './mobile';