import {updateStep} from '../constants/personalConst.js';

export const updateStepAction = (step) => {
    return {
        type: updateStep,
        step
    }
}