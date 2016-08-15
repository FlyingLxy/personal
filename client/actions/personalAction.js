import {updateStep,resPersonalInfo} from '../constants/personalConst.js';
import request from '../common/request.js';

export const updateStepAction = (step) => {
    return {
        type: updateStep,
        step
    }
}
export const resPersonalAction = (info) => {
    return {
        type: resPersonalInfo,
        info
    }
}
export const getPersonalAction = () => {
    return (dispatch, getState) => {
        request.get({path: '/api/personal/info'}).then(json=> {
            dispatch(resPersonalAction(json.result));
        }).catch(err => {
            console.log(err);
        })
    }
}