import { NO_CHESS, BLACK_CHESS, WHITE_CHESS, CHESSARR, initChessArr } from '../constants'
import { getCurrentUser, userInfo } from '../services/wuziqi'


export default {

  namespace: 'wuziqi',

  state: {
    fiveChess: {
        chessArr: CHESSARR,	//记录棋子
        humanPlayer: -1,	//玩家棋子颜色
        AIPlayer: 1,	//AI棋子颜色
        isPlayerTurn: true, //轮到player下棋
        isGameStart: false,	//游戏已经开始
        isGameOver: false, //游戏结束
        playerLastChess: [], //玩家最后下子位置
        AILastChess: [], //AI最后下子位置
        winInfo: '',
        username: '',
        room: '',
    },
    userList: [],
    messages: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *playChess({ payload: { chessArr, playerLastChess } }, { call, put }) {
        yield put({
            type: 'save',
            payload: {
                chessArr,
                playerLastChess
            }
        })
    },
    *resetChessBoard({}, {call, put}) {
        let chessArr = initChessArr()
        yield put({
            type: 'save',
            payload: {
                chessArr,
                isGameOver: false,
                winInfo: ''
            }
        })
    },
    *gameOver({ payload: { winInfo } }, {call, put}) {
        yield put({
            type: 'save',
            payload: {
                isGameOver: true,
                winInfo
            }
        })
    },
    *getCurrentUser({}, { call, put }) {
        const data = yield call(getCurrentUser, null)
    },
    *userInfo ({ payload }, { call, put }) {
          const data = yield call(userInfo, payload)
          yield put({
              type: 'save',
              payload: {
                  username: data.data.username,
                  room: data.data.room,
              }
        })
    },
    *getUserList({ payload: { userList } }, { call, put }) {
        yield put({
            type: 'saveNormal',
            payload: {
                userList,
            }
        })
    },
    *addMessage({ payload: { message } }, { call, put }) {
        yield put({
            type: 'addMessageReducer',
            payload: message,
        })
    },
    *isPlayerTurn({ payload: { isPlayerTurn } }, { call, put }) {
        console.log(isPlayerTurn)
        yield put({
            type: 'save',
            payload: {
                isPlayerTurn
            }
        })
    }
  },

  reducers: {
    save(state, action) {
        let fiveChess = {
            ...state.fiveChess,
            ...action.payload
        }
        return { ...state, fiveChess }
    },
    saveNormal(state, action) {
        return { ...state, ...action.payload }
    },
    addMessageReducer(state, action) {
        let { messages } = state
        messages = [
            ...messages,
            action.payload
        ]
        return { ...state, messages }
    },

    // gameOverReducer (state) {
    //     return { ...state, isGameOver: true }
    // }
  },

}
