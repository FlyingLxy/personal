/**
 * Created by lxy on 16/8/16.
 */
import {getCaptcha,checkCaptcha} from '../constants/captchaConst.js';

const initialState = {
    checkCaptcha: false,
    text: '',
    img: ''
}
const captcha = (state = initialState, action = undefined) => {
    switch (action.type) {
        case getCaptcha:
            return Object.assign({}, state, {
                text: action.captcha.text,
                img: action.captcha.img
            });
        // 检查验证码输入
        case checkCaptcha:
            return Object.assign({},state,{
                checkCaptcha:action.result
            });
        default :
            return state
    }
}
export default captcha;