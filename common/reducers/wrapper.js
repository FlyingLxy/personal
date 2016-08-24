/**
 * Created by lxy on 16/8/10.
 */
const initialState = {
    tab: [
        {
            name: '首页',
            path: '/flyingfox'

        },
        {
            name: '个人简介',
            path: '/flyingfox/personal'

        },
        {
            name: '小黑屋',
            path: '/flyingfox/blackhouse'
        },
        {
            name: '登录',
            path: '/flyingfox/signin'

        },
        {
            name: '注册',
            path: '/flyingfox/signup'
        },
        {
            name: '退出登录',
            path: '/flyingfox/signout'
        }
    ],
    drawer: false
}
const wrapper = (state = initialState, action = undefined) => {
    switch (action.type) {
        case 'TOGGLE_DRAWER':
            return Object.assign({}, state, {
                drawer: action.drawer
            });
        default:
            return state;
    }
}

export default wrapper