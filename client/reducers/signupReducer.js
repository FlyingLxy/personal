/**
 * Created by lxy on 16/8/11.
 */
import { getCaptcha,sessionToggle,checkCaptcha,errorInfo,emailErr,pwErr } from '../constants/signupConst.js';
const initialState = {
    //session: false,
    email: {
        status: false,
        text: ''
    },
    pw: {
        status: false,
        text: ''
    },
    checkCaptcha: false,
    captcha: {},
    error: {
        status: false,
        msg: ''
    },
}
const signup = (state = initialState,action = undefined) => {
    switch (action.type) {
        // 获取验证码
        case getCaptcha:
            return Object.assign({},state,{
                captcha: {
                    text: action.captcha.text,
                    img: action.captcha.img
                }
            });
        // 是否保存会话 开关
        //case sessionToggle:
        //    return Object.assign({},state,{
        //        session:action.toggle
        //    });
        // 检查验证码输入
        case checkCaptcha:
            return Object.assign({},state,{
                checkCaptcha:action.result
            });
        // 错误信息弹窗
        case errorInfo:
            return Object.assign({},state,{
                error: {
                    status: action.error.status,
                    msg: action.error.msg
                }
            });
        // 邮箱验证
        case emailErr:
            return Object.assign({},state,{
                email: {
                    status: action.email.status,
                    text: action.email.text
                }
            });
        case pwErr:
            return Object.assign({},state,{
                pw: {
                    status: action.pw.status,
                    text: action.pw.text
                }
            });
        default:
            return state
    }
}


export default signup;