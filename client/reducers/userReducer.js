/**
 * Created by lxy on 16/8/12.
 */
import { auth } from '../constants/userConst.js';
const initialState = {
    id: '',
    email: '',
    token: ''
}
const user = (state = initialState, action = undefined) => {
    switch (action.type) {
        case auth:
            return Object.assign({},state,{
                id: action.user.id,
                email: action.user.email,
                token: action.user.token
            })
        default:
            return state;
    }
}


export default user;