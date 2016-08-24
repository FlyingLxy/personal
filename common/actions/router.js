/**
 * Created by lxy on 16/8/24.
 */
const CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD';

const updateLocation = method => {
    return (...args) => ({
        type: CALL_HISTORY_METHOD,
        payload: {method, args}
    })
};


const push = updateLocation('push');
const replace = updateLocation('replace');
const go = updateLocation('go');
const goBack = updateLocation('goBack');
const goForward = updateLocation('goForward');
const router = { push , replace, go, goBack, goForward };

export default  {
    push,
    replace,
    go,
    goBack,
    goForward,
    router
}