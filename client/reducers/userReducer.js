/**
 * Created by lxy on 16/8/12.
 */
import { auth,setLocal,setSession,signout } from '../constants/userConst.js';
const userInfo = JSON.parse(window.localStorage.getItem('user') || window.sessionStorage.getItem('user')) || {};
const initialState = {
    id: userInfo.id || '',
    email: userInfo.email || '',
    token: userInfo.token || ''
}
const user = (state = initialState, action = undefined) => {
    switch (action.type) {
        case setLocal:
            window.localStorage.setItem('user',JSON.stringify(action.user));
            return Object.assign({},state,{
                id: action.user.id,
                email: action.user.email,
                token: action.user.token
            })
        case setSession:
            window.sessionStorage.setItem('user',JSON.stringify(action.user));
            return Object.assign({},state,{
                id: action.user.id,
                email: action.user.email,
                token: action.user.token
            })
        case signout:
            window.sessionStorage.removeItem('user');
            window.localStorage.removeItem('user');
            return Object.assign({},state,{
                id: '',
                email: '',
                token: ''
            })
        default:
            return state;
    }
}


export default user;