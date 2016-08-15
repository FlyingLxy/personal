/**
 * Created by lxy on 16/8/11.
 */
import { getCaptcha ,sessionToggle ,checkCaptcha, errorInfo,emailErr,pwErr,signup } from '../constants/signupConst.js';
import { auth } from '../constants/userConst.js';
import request from '../common/request.js';
// 获取验证码图片
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
//session toggle
//export const sessionAction = (toggle) => {
//    return {
//        type: sessionToggle,
//        toggle: toggle.sessionToggle
//    }
//}
// 邮箱错误提示开关
export const emailErrAction = (result = {status: false, text: ''}) => {
    return {
        type: emailErr,
        email: result
    }
}
// 服务端验证邮箱
export const emailRegAction = (email) => {
    return (dispatch, getState) => {
        request.get({path: '/api/account/email', data: {email: email}})
              .then(json => {
                  if (json.msg === 'ok') {
                      dispatch(emailErrAction({status: 1}))
                  } else {
                      dispatch(emailErrAction({status: 0, text: json.msg}));
                  }
              })
              .catch(err => console.log(err))
    }
}
// 密码错误提示开关
export const pwErrAction = (result = {status: false, text: ''}) => {
    return {
        type: pwErr,
        pw: result
    }
}
// 注册验证
export const signupAction = (userInfo) => {
    return (dispatch, getState) => {
        request.post({path: '/api/account/signup', data: {email: userInfo.email, password: userInfo.pw}})
              .then(json => {
                  if (json.msg === 'ok') {
                      dispatch(authAction(json.result));
                  } else {
                      dispatch(errorAction({status: true, msg: json.err}));
                  }
              })
              .catch(err =>  dispatch(errorAction({status: true, msg: err})));
    }
}
export const authAction = (userInfo) => {
    return {
        type: auth,
        user: userInfo
    }
}
// 错误信息弹窗
export const errorAction = (error) => {
    return {
        type: errorInfo,
        error
    }
}
