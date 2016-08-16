/**
 * Created by lxy on 16/8/11.
 */
import { getCaptcha,sessionToggle,checkCaptcha,emailErr,pwErr } from '../constants/signupConst.js';
const initialState = {
    //session: false,
    email: {
        status: false,
        text: ''
    },
    pw: {
        status: false,
        text: ''
    }
}
const signup = (state = initialState,action = undefined) => {
    switch (action.type) {

        // 是否保存会话 开关
        //case sessionToggle:
        //    return Object.assign({},state,{
        //        session:action.toggle
        //    });

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