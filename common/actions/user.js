/**
 * Created by lxy on 16/8/16.
 */
import { user } from '../constants';
import request from '../middleware/request.js';
import { router } from './router.js';
const setLocalAction = users => {
    //console.log(users);
    return {
        type: user.setLocal,
        users
    }
}
const getLocalAction = () => {
    return {
        type: user.getLocal
    }
}
const signoutAction = () => {
    return {
        type: user.signout
    }
}
const authAction = () => {
    return (dispatch, getState) => {
        let token = getState().user.token;
        request.post({path: '/api/account/authorization', token: token})
              .then(json => {
                  if (json.msg !== 'ok') {
                      dispatch(authOverdueAction(json.msg));
                      dispatch(router.push('/flyingfox/signin'));

                  }
              })
    }
}
const authOverdueAction = (num) => {
    return {
        type: user.authOverdue,
        num
    }
}
const userErrAction = (msg) => {
    return {
        type: user.errText,
        msg
    }
}

export default {
    setLocalAction,
    getLocalAction,
    signoutAction,
    authAction,
    authOverdueAction,
    userErrAction
}
