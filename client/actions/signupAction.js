/**
 * Created by lxy on 16/8/11.
 */
import $ from 'jquery';
import { getCaptcha ,sessionToggle ,checkCaptcha, errorInfo,emailErr,pwErr,signup } from '../constants/signupConst.js';
import { auth } from '../constants/userConst.js';
// 获取验证码图片
const captcha = (captcha) => {
    return {
        type: getCaptcha,
        captcha
    }
}
export const captchaAction = () => {
    return (dispatch, getState) => {
        $.ajax('/api/account/captcha', {
            type: 'GET',
            success: result => {
                if (result.msg === 'ok') {
                    dispatch(captcha({text: result.captchaText, img: result.captchaImg}));
                }
            },
            error: err => {
                dispatch(errorAction({status: true, msg: '连接失败!请检查您的网络'}))
                console.log(err);
            }
        });
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
        $.ajax('/api/account/email', {
            type: 'get',
            data: {
                email: email
            },
            success: result => {
                if (result.msg === 'ok') {
                    dispatch(emailErrAction({status: 1}));
                } else {
                    dispatch(emailErrAction({status: 0, text: result.msg}))
                }
            },
            error: err => {
                console.log(err);
            }
        })
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
        $.ajax('/api/account/signup', {
            type: 'POST',
            data: {
                email: userInfo.email,
                password: userInfo.pw
            },
            success: data => {
                if (data.msg === 'ok') {
                    dispatch(authAction(data.result));
                }else {
                    dispatch(errorAction({status:true,msg:data.err}));
                }
            },
            error: err => {
                console.log(err);
                dispatch(errorAction({status:true,msg:data.err}));
            }
        })
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
