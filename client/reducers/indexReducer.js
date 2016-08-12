/**
 * Created by lxy on 16/8/10.
 */
const initialState = {
    tab: [
        {
            name: '首页',
            path: '/'

        },
        {
            name: '个人简介',
            path: '/personal'

        },
        {
            name: '登录',
            path: '/signin'

        },
        {
            name: '注册',
            path: '/signup'
        },
        {
            name: '退出登录',
            path: '/signout'
        }
    ],
    drawer: false
}
const index = (state = initialState, action = undefined) => {
    switch (action.type) {
        case 'TOGGLE_DRAWER':
            return Object.assign({}, state, {
                drawer: action.drawer
            });
        default:
            return state;
    }
}

export default index