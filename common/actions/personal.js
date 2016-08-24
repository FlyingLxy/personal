import { personal } from '../constants';
import request from '../middleware/request.js';

const updateStepAction = (step) => {
    return {
        type: personal.updateStep,
        step
    }
}
const resPersonalAction = (info) => {
    return {
        type: personal.resPersonalInfo,
        info
    }
}
const getPersonalAction = () => {
    return (dispatch, getState) => {
        request.get({path: '/api/personal/info'}).then(json=> {
            dispatch(resPersonalAction(json.result));
        }).catch(err => {
            console.log(err);
        })
    }
}
export default {
    updateStepAction,
    resPersonalAction,
    getPersonalAction
}