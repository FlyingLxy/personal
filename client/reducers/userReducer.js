/**
 * Created by lxy on 16/8/12.
 */
import { auth,setLocal,signout,authOverdue,errText } from '../constants/userConst.js';

const userInfo = JSON.parse(window.localStorage.getItem('user')) || {};
const initialState = {
    id: userInfo.id || '',
    email: userInfo.email || '',
    token: userInfo.token || '',
    err: ''
}
const user = (state = initialState, action = undefined) => {
    switch (action.type) {
        case setLocal:
            window.localStorage.setItem('user', JSON.stringify(action.user));
            return Object.assign({}, state, {
                id: action.user.id,
                email: action.user.email,
                token: action.user.token
            })
        case signout:
            window.localStorage.removeItem('user');
            return Object.assign({}, state, {
                id: '',
                email: '',
                token: '',
                err: ''
            })
        case authOverdue:
            window.localStorage.removeItem('user');
            return Object.assign({}, state, {
                id: '',
                email: '',
                token: '',
                err: action.num === '1' ? '登录超时,请重新登录' : '验证失败,请重新登录'
            })
        case errText:
            return Object.assign({}, state, {
                err: action.msg
            })
        default:
            return state;
    }
}


export default user;