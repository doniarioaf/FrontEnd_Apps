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
    submitAddBranchSaga,
    submitAddCompanySaga,
    submitAddRoleSaga,
    submitAddUserAppsSaga,
    submitAddUserMobileSaga,
    submitDeleteBranchSaga,
    submitDeleteCompanySaga,
    submitDeleteRoleSaga,
    submitDeleteUserMobileSaga,
    submitDeleteUserSaga,
    submitEditBranchSaga,
    submitEditCompanySaga,
    submitEditRoleSaga,
    submitEditUserAppsSaga,
    submitEditUserMobileSaga,
    submitPostCompanySaga,
    getAddressDataSaga,
} from './admin';


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
        takeEvery(actions.GET_ADDRESS_DATA, getAddressDataSaga),
    ]);
}