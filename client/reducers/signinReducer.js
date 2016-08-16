/**
 * Created by lxy on 16/8/12.
 */
import { sessionToggle,emailErr,pwErr } from '../constants/signinConst.js';
const initialState = {
    session: false,
    email: {
        status: false,
        text: ''
    },
    pw: {
        status: false,
        text: ''
    }
}
const signin = (state = initialState, action = undefined) => {
    switch (action.type) {
        case sessionToggle:
            return Object.assign({},state,{
                session: action.session
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
            return state;
    }
}

export default signin;