/**
 * Created by lxy on 16/8/16.
 */
import { error as _error } from '../constants';
// 错误信息弹窗
const errorAction = (error) => {
    return {
        type: _error.errorInfo,
        error
    }
}

export default {
    errorAction
}
