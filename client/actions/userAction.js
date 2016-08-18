/**
 * Created by lxy on 16/8/16.
 */
import { setLocal,signout,auth,authOverdue,errText } from '../constants/userConst.js';
import { errorAction } from './errorAction.js';
import request from '../common/request.js';
import history from '../store/history.js';
export const setLocalAction = user => {
    return {
        type: setLocal,
        user
    }
}

export const signoutAction = () => {
    return {
        type: signout
    }
}
export const authAction = () => {
    return (dispatch, getState) => {
        let token = getState().user.token;
        request.post({path: '/api/account/authorization', token: token})
              .then(json => {
                  if (json.msg !== 'ok') {
                      console.log(json);
                      dispatch(authOverdueAction(json.msg));
                      history.push('/flyingfox/signin');
                  }
              })
    }
}
export const authOverdueAction = (num) => {
    return {
        type: authOverdue,
        num
    }
}
export const userErrAction = (msg) => {
    return {
        type: errText,
        msg
    }
}
