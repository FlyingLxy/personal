/**
 * Created by lxy on 16/8/12.
 */
import { signin as _signin } from '../constants';
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
        case _signin.sessionToggle:
            return Object.assign({},state,{
                session: action.session
            });
        // 邮箱验证
        case _signin.emailErr:
            return Object.assign({},state,{
                email: {
                    status: action.email.status,
                    text: action.email.text
                }
            });
        case _signin.pwErr:
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