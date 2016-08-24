/**
 * Created by lxy on 16/8/11.
 */
import { signup as _signup } from '../constants';
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
        // 邮箱验证
        case _signup.emailErr:
            return Object.assign({},state,{
                email: {
                    status: action.email.status,
                    text: action.email.text
                }
            });
        case _signup.pwErr:
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