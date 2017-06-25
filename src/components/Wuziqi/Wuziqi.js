import React from 'react'
import ReactDOM from 'react-dom'

import styles from './Wuziqi.less'

class Wuziqi extends React.Component {
    constructor (props) {
		super(props)
    }

    render () {
        return (
            <div className={styles.wrapper}>
				<div className={styles.chessboard}>
					{/*<!-- top line -->*/}
					{[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((value, index) => {
						return <div className="chess-top"></div>
					})}
					<div className="chess-top chess-right"></div>
					{/*<!-- line 1 -->*/}
					<div className="chess-left"></div>		
					{[1,2,3,4,5,6,7,8,9,10,11,12,13].map((value, index) => {
						return <div className="chess-middle"></div>
					})}
					<div className="chess-right"></div>
					{/*<!-- line 2 -->*/}
					{[1,2,3,4,5,6,7,8,9,10,11,12,13].map((value, index) => {
						return <div className="chess-middle" onMouseOver></div>
					})}
					<div className="chess-right"></div>
					{/*<!-- line 3 -->*/}
					<div className="chess-left"></div>
					{[1,2,3,4,5,6,7,8,9,10,11,12,13].map((value, index) => {
						return <div className="chess-middle"></div>
					})}
					<div className="chess-right"></div>
					{/*<!-- line 4 -->*/}
					<div className="chess-left"></div>
					{[1,2,3,4,5,6,7,8,9,10,11,12,13].map((value, index) => {
						return <div className="chess-middle"></div>
					})}
					<div className="chess-right"></div>
					{/*<!-- line 5 -->*/}
					<div className="chess-left"></div>
					{[1,2,3,4,5,6,7,8,9,10,11,12,13].map((value, index) => {
						return <div className="chess-middle"></div>
					})}
					<div className="chess-right"></div>
					{/*<!-- line 6 -->*/}
					<div className="chess-left"></div>
					{[1,2,3,4,5,6,7,8,9,10,11,12,13].map((value, index) => {
						return <div className="chess-middle"></div>
					})}
					<div className="chess-right"></div>
					{/*<!-- line 7 -->*/}
					<div className="chess-left"></div>
					{[1,2,3,4,5,6,7,8,9,10,11,12,13].map((value, index) => {
						return <div className="chess-middle"></div>
					})}
					<div className="chess-right"></div>
					{/*<!-- line 8 -->*/}
					<div className="chess-left"></div>
					{[1,2,3,4,5,6,7,8,9,10,11,12,13].map((value, index) => {
						return <div className="chess-middle"></div>
					})}
					<div className="chess-right"></div>
					{/*<!-- line 9 -->*/}
					<div className="chess-left"></div>
					{[1,2,3,4,5,6,7,8,9,10,11,12,13].map((value, index) => {
						return <div className="chess-middle"></div>
					})}
					<div className="chess-right"></div>
					{/*<!-- line 10 -->*/}
					<div className="chess-left"></div>
					{[1,2,3,4,5,6,7,8,9,10,11,12,13].map((value, index) => {
						return <div className="chess-middle"></div>
					})}
					<div className="chess-right"></div>
					{/*<!-- line 11 -->*/}
					<div className="chess-left"></div>
					{[1,2,3,4,5,6,7,8,9,10,11,12,13].map((value, index) => {
						return <div className="chess-middle"></div>
					})}
					<div className="chess-right"></div>
					{/*<!-- line 12 -->*/}
					<div className="chess-left"></div>
					{[1,2,3,4,5,6,7,8,9,10,11,12,13].map((value, index) => {
						return <div className="chess-middle"></div>
					})}
					<div className="chess-right"></div>
					{/*<!-- line 13 -->*/}
					<div className="chess-left"></div>
					{[1,2,3,4,5,6,7,8,9,10,11,12,13].map((value, index) => {
						return <div className="chess-middle"></div>
					})}
					<div className="chess-right"></div>
					{/*<!-- bottom line  -->*/}
					{[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((value, index) => {
						return <div className="chess-bottom"></div>
					})}
					<div className="chess-bottom chess-right"></div>
				</div>

				<div className={styles.operating_panel}>
					<p>
						<a id="black_btn" className={styles.selected} href="#">黑子</a>
						<a id="white_btn" href="#">白子</a>
					</p>
					<p>
						<a id="first_move_btn" className={styles.selected} href="#">先手</a>
						<a id="second_move_btn" href="#">后手</a>
					</p>
					<a id="replay_btn" href="#">开始</a>
					<p id="result_info">胜率：100%</p>
					<p id="result_tips"></p>
				</div>

				<div style={{display: "none"}}>
					{/*<!-- 图片需合并 减少http请求数 -->*/}
					<img src="http://sandbox.runjs.cn/uploads/rs/102/r2dy3tyw/black.png" alt="preload" />
					<img src="http://sandbox.runjs.cn/uploads/rs/102/r2dy3tyw/white.png" alt="preload" />
					<img src="http://sandbox.runjs.cn/uploads/rs/102/r2dy3tyw/hover.png" alt="preload" />
					<img src="http://sandbox.runjs.cn/uploads/rs/102/r2dy3tyw/hover_up.png" alt="preload" />
					<img src="http://sandbox.runjs.cn/uploads/rs/102/r2dy3tyw/hover_down.png" alt="preload" />
					<img src="http://sandbox.runjs.cn/uploads/rs/102/r2dy3tyw/hover_up_left.png" alt="preload" />
					<img src="http://sandbox.runjs.cn/uploads/rs/102/r2dy3tyw/hover_up_right.png" alt="preload" />
					<img src="http://sandbox.runjs.cn/uploads/rs/102/r2dy3tyw/hover_left.png" alt="preload" />
					<img src="http://sandbox.runjs.cn/uploads/rs/102/r2dy3tyw/hover_right.png" alt="preload" />
					<img src="http://sandbox.runjs.cn/uploads/rs/102/r2dy3tyw/hover_down_left.png" alt="preload" />
					<img src="http://sandbox.runjs.cn/uploads/rs/102/r2dy3tyw/hover_down_right.png" alt="preload" />
					<img src="http://sandbox.runjs.cn/uploads/rs/102/r2dy3tyw/black_last.png" alt="preload" />
					<img src="http://sandbox.runjs.cn/uploads/rs/102/r2dy3tyw/white_last.png" alt="preload" />
				</div>
			</div>
        )
    }
}

export default Wuziqi