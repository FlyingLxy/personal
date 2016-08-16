/**
 * Created by lxy on 16/8/16.
 */
import {getCaptcha,checkCaptcha} from '../constants/captchaConst.js';
import { errorAction } from '../actions/errorAction.js';
import request from '../common/request.js';
const captcha = (captcha) => {
    return {
        type: getCaptcha,
        captcha
    }
}
export const captchaAction = () => {
    return (dispatch, getState) => {
        request.get({path: '/api/account/captcha'})
              .then(json => dispatch(captcha({text: json.captchaText, img: json.captchaImg})))
              .catch(err => {
                  dispatch(errorAction({status: true, msg: '连接失败!请检查您的网络'}))
                  console.log(err);
              })
    }
}
// 验证码验证
export const checkCaptchaAction = (result) => {
    return {
        type: checkCaptcha,
        result: result
    }
}