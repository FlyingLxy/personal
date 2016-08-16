/**
 * Created by lxy on 16/8/16.
 */
import { setLocal,setSession,signout } from '../constants/userConst.js';
export const setLocalAction = user => {
    return {
        type: setLocal,
        user
    }
}
export const setSessionAction = user => {
    return {
        type: setSession,
        user
    }
}
export const signoutAction = () => {
    return {
        type:signout
    }
}

