/**
 * Created by lxy on 16/8/16.
 */
import { errorInfo } from '../constants/errorConst.js';
// 错误信息弹窗
export const errorAction = (error) => {
    return {
        type: errorInfo,
        error
    }
}
