/**
 * Created by lxy on 16/8/16.
 */
import { captcha as _captcha} from '../constants';

const initialState = {
    checkCaptcha: false,
    text: '',
    img: ''
}
const captcha = (state = initialState, action = undefined) => {
    switch (action.type) {
        case _captcha.getCaptcha:
            return Object.assign({}, state, {
                text: action.captcha.text,
                img: action.captcha.img
            });
        // 检查验证码输入
        case _captcha.checkCaptcha:
            return Object.assign({},state,{
                checkCaptcha:action.result
            });
        default :
            return state
    }
}
export default captcha;