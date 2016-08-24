/**
 * Created by lxy on 16/8/12.
 */
import { user as _user } from '../constants';

const initialState = {
    id: '',
    email: '',
    token: '',
    err: ''
}
const user = (state = initialState, action = undefined) => {
    switch (action.type) {
        case _user.setLocal:
            window.localStorage.setItem('user', JSON.stringify(action.users));
            return Object.assign({}, state, {
                id: action.users.id,
                email: action.users.email,
                token: action.users.token
            })
        case _user.getLocal:
            let userInfo = JSON.parse(window.localStorage.getItem('user')) || {};
            return Object.assign({}, state, {
                id: userInfo.id || '',
                email: userInfo.email || '',
                token: userInfo.token || ''
            })
        case _user.signout:
            window.localStorage.removeItem('user');
            return Object.assign({}, state, {
                id: '',
                email: '',
                token: '',
                err: ''
            })
        case _user.authOverdue:
            window.localStorage.removeItem('user');
            return Object.assign({}, state, {
                id: '',
                email: '',
                token: '',
                err: action.num === '1' ? '登录超时,请重新登录' : '验证失败,请重新登录'
            })
        case _user.errText:
            return Object.assign({}, state, {
                err: action.msg
            })
        default:
            return state;
    }
}


export default user;