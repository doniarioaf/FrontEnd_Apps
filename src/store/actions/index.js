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
    submitCustomerData
} from './admin';