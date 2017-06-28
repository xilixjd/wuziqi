import { NO_CHESS, BLACK_CHESS, WHITE_CHESS, CHESSARR } from '../constants'


export default {

  namespace: 'wuziqi',

  state: {
    fiveChess: {
        chessArr: CHESSARR,	//记录棋子
        humanPlayer: -1,	//玩家棋子颜色
        AIPlayer: 1,	//AI棋子颜色
        isPlayerTurn: true, //轮到player下棋
        // totalGames: cookieHandle.getCookie("totalGames") || 0,	//总局数
        // winGames: cookieHandle.getCookie("winGames") || 0,	//玩家赢局数
        isGameStart: false,	//游戏已经开始
        isGameOver: false, //游戏结束
        playerLastChess: [], //玩家最后下子位置
        AILastChess: [], //AI最后下子位置
    }
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
        console.log(chessArr)
        console.log(playerLastChess)
        yield put({
            type: 'save',
            payload: {
                chessArr,
                playerLastChess
            }
        })
    },
    *resetChessBoard({}, {call, put}) {
        let chessArr = CHESSARR
        yield put({
            type: 'save',
            payload: {
                chessArr
            }
        })
    },
    *gameOver({}, {call, put}) {
        yield put({
            type: 'save',
            payload: {
                isGameOver: true
            }
        })
    }
  },

  reducers: {
    save(state, action) {
        return { ...state, ...action.payload };
    },

    // gameOverReducer (state) {
    //     return { ...state, isGameOver: true }
    // }
  },

};