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
    getReportSaga,
    getReportTemplateSaga,
    submitAddBranchSaga,
    submitAddCompanySaga,
    submitAddProductSaga,
    submitAddProductTypeSaga,
    submitAddRoleSaga,
    submitAddUserAppsSaga,
    submitAddUserMobileSaga,
    submitDeleteBranchSaga,
    submitDeleteCompanySaga,
    submitDeleteCustomerSaga,
    submitDeleteCustomerTypeSaga,
    submitDeleteRoleSaga,
    submitDeleteUserMobileSaga,
    submitDeleteUserSaga,
    submitEditBranchSaga,
    submitEditCompanySaga,
    submitEditProductSaga,
    submitEditProductTypeSaga,
    submitEditRoleSaga,
    submitEditUserAppsSaga,
    submitEditUserMobileSaga,
    submitPostCompanySaga
} from './admin';
import { getDataCustomerSaga, getDataCustomerTypeSaga, submitAddCustomerSaga, submitAddCustomerTypeSaga, submitAEditCustomerTypeSaga, submitEditCustomerSaga } from './customer';
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
    ]);
}