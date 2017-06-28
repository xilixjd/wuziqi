
export const NO_CHESS = 0
export const BLACK_CHESS = -1
export const WHITE_CHESS = 1

let chessArrLet = []
var i, j
for (i = 0; i < 15; i++) {
    chessArrLet[i] = []
    for (j = 0; j < 15; j++) {
        chessArrLet[i][j] = NO_CHESS;
    }
}

export const CHESSARR = chessArrLet