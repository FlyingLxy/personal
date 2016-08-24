/**
 * Created by lxy on 16/8/16.
 */
import { captcha as _captcha } from '../constants';
import { errorAction } from './error.js';
import request from '../middleware/request.js';

const captcha = (captcha) => {
    return {
        type: _captcha.getCaptcha,
        captcha
    }
}
const captchaAction = () => {
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
const checkCaptchaAction = (result) => {
    return {
        type: _captcha.checkCaptcha,
        result: result
    }
}

export default {
    captchaAction,
    checkCaptchaAction
}