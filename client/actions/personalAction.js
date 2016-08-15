import {updateStep,resPersonalInfo} from '../constants/personalConst.js';
import $ from 'jquery';

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
    return (dispatch,getState) => {
        $.ajax('/api/personal/info',{
            type: 'GET',
            success: data => {
                if (data.msg === 'ok') {
                    dispatch(resPersonalAction(data.result));
                }
            },
            error: err => {
                console.log(err);
            }
        })
    }
}