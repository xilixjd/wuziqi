import { routerRedux } from 'dva/router'

export default {
    namespace: 'indexPage',

    state: {
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
            history.listen(location => {
                if (location.pathname === '/') {
                    dispatch({
                        type: 'redirect',
                    })
                }
            })
        },
    },

    effects: {
        *redirect ({ payload = {} }, { call, put }) {
            yield put(routerRedux.push('/login'))
        },
    },
}
