import { login } from '../services/login'
import { routerRedux } from 'dva/router'


export default {

  namespace: 'login',

  state: {
      username: '',
      room: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
      *login ({ payload }, { put, call }) {
          const data = yield call(login, payload)
          if (data.data.username && data.data.room) {
              yield put(routerRedux.push('/wuziqi'))
          }
      },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

}