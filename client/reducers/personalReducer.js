/**
 * Created by lxy on 16/8/12.
 */

import {updateStep,resPersonalInfo} from '../constants/personalConst.js';
const initialState = {
    tab: [],
    step: 0,
    name: '',
    age: '26',
    tel: '',
    skills: [],
    workExperience: [],
    educationExperience: [],
    introduction: '',
    instructions: ''
}
const personal = (state = initialState, action = undefined) => {
    switch (action.type) {
        case updateStep:
            return Object.assign({}, state, {
                step: action.step
            });
        case resPersonalInfo:
            return Object.assign({}, state, action.info);
        default :
            return state;
    }
}


export default personal;