/**
 * Created by lxy on 16/8/16.
 */

import { error as _error } from '../constants';

const initialState = {
    status: false,
    msg: ''
}
const error = (state = initialState, action = undefined) => {
    switch (action.type) {
        // 错误信息弹窗
        case _error.errorInfo:
            return Object.assign({}, state, {
                status: action.error.status,
                msg: action.error.msg
            });
        default :
            return state;
    }
}

export default error;