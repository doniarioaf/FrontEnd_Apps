import { from } from 'core-js/fn/array';

export {
    changeSetting
} from './settings.actions';

export {
    loginUser,
    authSuccess,
    checkUser,
    retrieveDatacheckUser
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
    submitEditProductType
} from './admin';

export {
    getCustomerTypeData,
    submitAddCustomerType,
    submitEditCustomerType,
    getCustomerData,
    submitAddCustomer,
    submitEditCustomer
} from './customer';

export {
    getCallPlanData
} from './mobile';