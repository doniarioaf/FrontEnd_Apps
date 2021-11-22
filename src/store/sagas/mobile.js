import axios        from '../../Axios-BizzApps';
import {baseCallPlanURL} from '../../containers/shared/apiURL';

export function* getDataCallPlanSaga(action) {
    try {
        const response = yield axios.get(baseCallPlanURL(action.param)).then(response => response.data);
        //officeId,resourceId,isTellerTransaction
        action.successHandler(response);
    }catch (error) {
        // const errMessages = yield error.data.errors.reduce((obj, el) => [...obj, el.defaultUserMessage], []);
        action.errorHandler(error);
    }
}