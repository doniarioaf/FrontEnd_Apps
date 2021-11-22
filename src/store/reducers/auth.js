import * as actionTypes from '../../store/actions/actions';
import {updateObject} from "../../containers/shared/utility";

const initialState = {
    permissions: [],
    roles:[],
    username:'',
    isvalid:false,
    isfirst:true,
    typeaction:'',
};

const authSuccess = (state, action) => {
    return updateObject( state, {
        permissions: action.permissions,
        roles: action.roles,
        username: action.username,
        typeaction:action.typeaction,
        // isfirst:true,
        // isvalid:null,
        
    });
};

const checkAuth = (state, action) => {
    // console.log('checkAuth ',action.success);
    return updateObject( state, {
        isvalid: action.success,
        isfirst:false,
        // iserror: action.iserror,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.CHECK_AUTH_SUCCESS: return checkAuth(state, action);
        default:
            return state;
    }
}
export default reducer;