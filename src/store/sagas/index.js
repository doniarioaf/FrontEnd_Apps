import {takeEvery, all} from 'redux-saga/effects';
import * as actions                from '../actions/actions';

import {
    loginUserSaga,
    checkUserSaga,
    logoutUserSaga
} from './login';

import {
    getDataBranchSaga,
    getDataCompanySaga,
    getDataRoleSaga,
    getDataUserAppsSaga,
    getDataUserAppsWithParamSaga,
    getDataUserMobileSaga,
    getProductSaga,
    getProductTypeSaga,
    getProjectDataSaga,
    getReportSaga,
    getReportTemplateSaga,
    submitAddBranchSaga,
    submitAddCompanySaga,
    submitAddProductSaga,
    submitAddProductTypeSaga,
    submitAddProjectSaga,
    submitAddRoleSaga,
    submitAddUserAppsSaga,
    submitAddUserMobileSaga,
    submitDeleteBranchSaga,
    submitDeleteCompanySaga,
    submitDeleteCustomerSaga,
    submitDeleteCustomerTypeSaga,
    submitDeleteProjectSaga,
    submitDeleteRoleSaga,
    submitDeleteUserMobileSaga,
    submitDeleteUserSaga,
    submitEditBranchSaga,
    submitEditCompanySaga,
    submitEditProductSaga,
    submitEditProductTypeSaga,
    submitEditProjectSaga,
    submitEditRoleSaga,
    submitEditUserAppsSaga,
    submitEditUserMobileSaga,
    submitPostCompanySaga,
    getBankAccountDataSaga,
    submitAddBankAccountDataSaga,
    submitEditBankAccountDataSaga,
    submitDeleteBankAccountDataSaga,
    getCustomerManggalaDataSaga,
    submitAddCustomerManggalaSaga,
    submitEditCustomerManggalaSaga,
    submitDeleteCustomerManggalaSaga,
    getAddressDataSaga,
    getEmployeeManggalaDataSaga,
    submitAddEmployeeManggalaSaga,
    submitEditEmployeeManggalaSaga,
    submitDeleteEmployeeManggalaSaga,
    getVendorCategoryDataSaga,
    submitAddVendorCategorySaga,
    submitEditVendorCategorySaga,
    submitDeleteVendorCategorySaga,
    getVendorDataSaga,
    submitAddVendorSaga,
    submitEditVendorSaga,
    submitDeleteVendorSaga,
    getWorkOrderTypeDataSaga,
    submitAddWorkOrderTypeSaga,
    submitEditWorkOrderTypeSaga,
    deleteWorkOrderTypeSaga,
    getPartaiDataSaga,
    submitAddPartaiSaga,
    submitEditPartaiSaga,
    deletePartaiSaga
} from './admin';
import { getDataCustomerSaga, getDataCustomerTypeSaga, submitAddCustomerSaga, submitAddCustomerTypeSaga, submitAEditCustomerTypeSaga, submitEditCustomerSaga, submitUploadFileCustomerCallPlanSaga } from './customer';
import { getDataCallPlanSaga, getDataInfoSaga, getMonitoringDataSaga, submitAddCallPlanSaga, submitAddInfoSaga, submitDeleteCallPlanSaga, submitDeleteInfoSaga, submitEditCallPlanSaga, submitEditInfoSaga } from './mobile';

export function* watchMobile() {
    yield all([
        takeEvery(actions.GET_CALLPLAN_DATA, getDataCallPlanSaga),
        takeEvery(actions.GET_INFO_DATA, getDataInfoSaga),
        takeEvery(actions.SUBMIT_ADD_INFO, submitAddInfoSaga),
        takeEvery(actions.SUBMIT_EDIT_INFO, submitEditInfoSaga),
        takeEvery(actions.SUBMIT_ADD_CALLPLAN, submitAddCallPlanSaga),
        takeEvery(actions.SUBMIT_EDIT_CALLPLAN, submitEditCallPlanSaga),
        takeEvery(actions.SUBMIT_DELETE_CALL_PLAN, submitDeleteCallPlanSaga),
        takeEvery(actions.SUBMIT_DELETE_INFO, submitDeleteInfoSaga),
        takeEvery(actions.GET_MONITORING_DATA, getMonitoringDataSaga),
    ]);
}


export function* watchCustomer() {
    yield all([
        takeEvery(actions.GET_CUSTOMERTYPE_DATA, getDataCustomerTypeSaga),
        takeEvery(actions.SUBMIT_ADD_CUSTOMERTYPE, submitAddCustomerTypeSaga),
        takeEvery(actions.SUBMIT_EDIT_CUSTOMERTYPE, submitAEditCustomerTypeSaga),
        takeEvery(actions.GET_CUSTOMER_DATA, getDataCustomerSaga),
        takeEvery(actions.SUBMIT_ADD_CUSTOMER, submitAddCustomerSaga),
        takeEvery(actions.SUBMIT_EDIT_CUSTOMER, submitEditCustomerSaga),
        takeEvery(actions.UPLOAD_FILE_CUSTOMER_CALL_PLAN, submitUploadFileCustomerCallPlanSaga),
        
    ]);
}

export function* watchLogin() {
    yield all([
        takeEvery(actions.LOGIN_USER, loginUserSaga),
        takeEvery(actions.CHECK_AUTH_SUCCESS, checkUserSaga),
        takeEvery(actions.LOGOUT, logoutUserSaga)
    ]);
}

export function* watchAdmin() {
    yield all([
        takeEvery(actions.GET_BRANCH_DATA, getDataBranchSaga),
        takeEvery(actions.SUBMIT_ADD_BRANCH, submitAddBranchSaga),
        takeEvery(actions.SUBMIT_EDIT_BRANCH, submitEditBranchSaga),
        takeEvery(actions.GET_COMPANY_DATA, getDataCompanySaga),
        takeEvery(actions.SUBMIT_ADD_COMPANY, submitAddCompanySaga),
        takeEvery(actions.SUBMIT_EDIT_COMPANY, submitEditCompanySaga),
        takeEvery(actions.GET_ROLE_DATA, getDataRoleSaga),
        takeEvery(actions.SUBMIT_ADD_ROLE, submitAddRoleSaga),
        takeEvery(actions.SUBMIT_EDIT_ROLE, submitEditRoleSaga),
        takeEvery(actions.GET_USERAPPS_DATA, getDataUserAppsSaga),
        takeEvery(actions.SUBMIT_ADD_USERAPPS_DATA, submitAddUserAppsSaga),
        takeEvery(actions.GET_USERAPPS_WITH_PARAM_DATA, getDataUserAppsWithParamSaga),
        takeEvery(actions.SUBMIT_EDIT_USERAPPS_DATA, submitEditUserAppsSaga),
        takeEvery(actions.SUBMIT_POST_COMPANY, submitPostCompanySaga),
        takeEvery(actions.SUBMIT_DELETE_COMPANY, submitDeleteCompanySaga),
        takeEvery(actions.GET_USERMOBILE_DATA, getDataUserMobileSaga),
        takeEvery(actions.SUBMIT_ADD_USERMOBILE, submitAddUserMobileSaga),
        takeEvery(actions.SUBMIT_EDIT_USERMOBILE, submitEditUserMobileSaga),
        takeEvery(actions.GET_PRODUCTTYPE_DATA, getProductTypeSaga),
        takeEvery(actions.SUBMIT_ADD_PRODUCTTYPE, submitAddProductTypeSaga),
        takeEvery(actions.SUBMIT_EDIT_PRODUCTTYPE, submitEditProductTypeSaga),
        takeEvery(actions.GET_PRODUCT_DATA, getProductSaga),
        takeEvery(actions.SUBMIT_ADD_PRODUCT, submitAddProductSaga),
        takeEvery(actions.SUBMIT_EDIT_PRODUCT, submitEditProductSaga),
        takeEvery(actions.GET_REPORT_DATA, getReportSaga),
        takeEvery(actions.GET_REPORT_TEMPLATE_DATA, getReportTemplateSaga),
        takeEvery(actions.SUBMIT_DELETE_BRANCH, submitDeleteBranchSaga),
        takeEvery(actions.SUBMIT_DELETE_ROLE, submitDeleteRoleSaga),
        takeEvery(actions.SUBMIT_DELETE_USER, submitDeleteUserSaga),
        takeEvery(actions.SUBMIT_DELETE_USER_MOBILE, submitDeleteUserMobileSaga),
        takeEvery(actions.SUBMIT_DELETE_CUSTOMER, submitDeleteCustomerSaga),
        takeEvery(actions.SUBMIT_DELETE_CUSTOMER_TYPE, submitDeleteCustomerTypeSaga),
        takeEvery(actions.GET_PROJECT_DATA, getProjectDataSaga),
        takeEvery(actions.SUBMIT_ADD_PROJECT, submitAddProjectSaga),
        takeEvery(actions.SUBMIT_EDIT_PROJECT, submitEditProjectSaga),
        takeEvery(actions.SUBMIT_DELETE_PROJECT, submitDeleteProjectSaga),
        takeEvery(actions.GET_DATA_BANK_ACCOUNT, getBankAccountDataSaga),
        takeEvery(actions.SUBMIT_ADD_BANK_ACCOUNT, submitAddBankAccountDataSaga),
        takeEvery(actions.SUBMIT_EDIT_BANK_ACCOUNT, submitEditBankAccountDataSaga),
        takeEvery(actions.SUBMIT_DELETE_BANK_ACCOUNT, submitDeleteBankAccountDataSaga),
        takeEvery(actions.GET_DATA_CUSTOMER_MANGGALA, getCustomerManggalaDataSaga),
        takeEvery(actions.SUBMIT_ADD_CUSTOMER_MANGGALA, submitAddCustomerManggalaSaga),
        takeEvery(actions.SUBMIT_EDIT_CUSTOMER_MANGGALA, submitEditCustomerManggalaSaga),
        takeEvery(actions.SUBMIT_DELETE_CUSTOMER_MANGGALA, submitDeleteCustomerManggalaSaga),
        takeEvery(actions.GET_ADDRESS_DATA, getAddressDataSaga),
        takeEvery(actions.GET_EMPLOYEE_MANGGALA_DATA, getEmployeeManggalaDataSaga),
        takeEvery(actions.SUBMIT_ADD_EMPLOYEE_MANGGALA, submitAddEmployeeManggalaSaga),
        takeEvery(actions.SUBMIT_EDIT_EMPLOYEE_MANGGALA, submitEditEmployeeManggalaSaga),
        takeEvery(actions.SUBMIT_DELETE_EMPLOYEE_MANGGALA, submitDeleteEmployeeManggalaSaga),
        takeEvery(actions.GET_VENDOR_CATEGORY_DATA, getVendorCategoryDataSaga),
        takeEvery(actions.SUBMIT_ADD_VENDOR_CATEGORY, submitAddVendorCategorySaga),
        takeEvery(actions.SUBMIT_EDIT_VENDOR_CATEGORY, submitEditVendorCategorySaga),
        takeEvery(actions.SUBMIT_DELETE_VENDOR_CATEGORY, submitDeleteVendorCategorySaga),
        takeEvery(actions.GET_VENDOR_DATA, getVendorDataSaga),
        takeEvery(actions.SUBMIT_ADD_VENDOR, submitAddVendorSaga),
        takeEvery(actions.SUBMIT_EDIT_VENDOR, submitEditVendorSaga),
        takeEvery(actions.SUBMIT_DELETE_VENDOR, submitDeleteVendorSaga),
        takeEvery(actions.GET_WORKORDERTYPE_DATA, getWorkOrderTypeDataSaga),
        takeEvery(actions.SUBMIT_ADD_WORKORDERTYPE, submitAddWorkOrderTypeSaga),
        takeEvery(actions.SUBMIT_EDIT_WORKORDERTYPE, submitEditWorkOrderTypeSaga),
        takeEvery(actions.SUBMIT_DELETE_WORKORDERTYPE, deleteWorkOrderTypeSaga),
        takeEvery(actions.GET_PARTAI_DATA, getPartaiDataSaga),
        takeEvery(actions.SUBMIT_ADD_PARTAI, submitAddPartaiSaga),
        takeEvery(actions.SUBMIT_EDIT_PARTAI, submitEditPartaiSaga),
        takeEvery(actions.SUBMIT_DELETE_PARTAI, deletePartaiSaga),
    ]);
}