import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'dva'

import { NO_CHESS, BLACK_CHESS, WHITE_CHESS } from '../../constants'
import { config } from '../../utils'

const { DOMAIN } = config

import styles from './Wuziqi.less'

import io from 'socket.io-client'

export default class Wuziqi extends React.Component {
    constructor (props) {
		super(props)
		this.state = {
			status: '',
			playWith: 'pc',
			chess: ''
		}
    }

	playChess = (i, j, chess, chessArr) => {
		const socket = io(DOMAIN)
		const { dispatch } = this.props
		let playerLastChess = [i, j]
		chessArr[i][j] = chess
		// dispatch({
		// 	type: 'wuziqi/playChess',
		// 	payload: {
		// 		chessArr,
		// 		playerLastChess
		// 	}
		// })
		if (this.state.playWith === 'player') {
			socket.emit('operate', chessArr)
		}
		if (chess === BLACK_CHESS) {
			this.addChessToChessboard(i, j, "black")
		} else if (chess === WHITE_CHESS) {
			this.addChessToChessboard(i, j, "white")
		}
	}

	mouseClick = (e) => {
		let index = this.index(e.target, e.target.parentNode.childNodes)
		let i = index / 15 | 0
		let j = index % 15
		let { chessArr, isGameOver } = this.props.fiveChess
		if (isGameOver) {
			return
		}
		if (chessArr[i][j] === NO_CHESS) {
			if (this.state.playWith === 'pc') {
				this.playChess(i, j, this.props.fiveChess.humanPlayer, chessArr)
			} else if (this.state.playWith === 'player') {
				this.playChess(i, j, this.state.chess, chessArr)
			}
			if (i === 0 && j === 0) {
				this.removeClass(e.target, "hover_up_left");
			}
			else if (i === 0 && j === 14) {
				this.removeClass(e.target, "hover_up_right");
			}
			else if (i === 14 && j === 0) {
				this.removeClass(e.target, "hover_down_left");
			}
			else if (i === 14 && j === 14) {
				this.removeClass(e.target, "hover_down_right");
			}
			else if (i === 0) {
				this.removeClass(e.target, "hover_up");
			}
			else if (i === 14) {
				this.removeClass(e.target, "hover_down");
			}
			else if (j === 0) {
				this.removeClass(e.target, "hover_left");
			}
			else if (j === 14) {
				this.removeClass(e.target, "hover_right");
			}
			else {
				this.removeClass(e.target, "hover");
			}
			// this.AImoveChess()
			
			if (this.state.playWith === 'pc') {
				this.playerWinOrNot(i, j, this.props.fiveChess.humanPlayer)
			} else if (this.state.playWith === 'player') {
				this.playerWinOrNot(i, j, this.state.chess)
			}
		}
	}

	mouseOver = (e) => {
		let index = this.index(e.target, e.target.parentNode.childNodes)
		let i = index / 15 | 0
		let j = index % 15
		let { chessArr, isGameOver } = this.props.fiveChess
		if (isGameOver) {
			return
		}
		if (chessArr[i][j] === NO_CHESS) {
			if (i === 0 && j === 0) {
				this.addClass(e.target, "hover_up_left");
			}
			else if (i === 0 && j === 14) {
				this.addClass(e.target, "hover_up_right");
			}
			else if (i === 14 && j === 0) {
				this.addClass(e.target, "hover_down_left");
			}
			else if (i === 14 && j === 14) {
				this.addClass(e.target, "hover_down_right");
			}
			else if (i === 0) {
				this.addClass(e.target, "hover_up");
			}
			else if (i === 14) {
				this.addClass(e.target, "hover_down");
			}
			else if (j === 0) {
				this.addClass(e.target, "hover_left");
			}
			else if (j === 14) {
				this.addClass(e.target, "hover_right");
			}
			else {
				this.addClass(e.target, "hover");
			}
		}
	}

	mouseOut = (e) => {
		let index = this.index(e.target, e.target.parentNode.childNodes)
		let i = index / 15 | 0
		let j = index % 15
		let { chessArr, isGameOver } = this.props.fiveChess
		if (isGameOver) {
			return
		}
		if (chessArr[i][j] === NO_CHESS) {
			if (i === 0 && j === 0) {
				this.removeClass(e.target, "hover_up_left");
			}
			else if (i === 0 && j === 14) {
				this.removeClass(e.target, "hover_up_right");
			}
			else if (i === 14 && j === 0) {
				this.removeClass(e.target, "hover_down_left");
			}
			else if (i === 14 && j === 14) {
				this.removeClass(e.target, "hover_down_right");
			}
			else if (i === 0) {
				this.removeClass(e.target, "hover_up");
			}
			else if (i === 14) {
				this.removeClass(e.target, "hover_down");
			}
			else if (j === 0) {
				this.removeClass(e.target, "hover_left");
			}
			else if (j === 14) {
				this.removeClass(e.target, "hover_right");
			}
			else {
				this.removeClass(e.target, "hover");
			}
		}
	}

	// index 转为 dom
	indexToDom = (i, j) => {
		return document.querySelector('.bigChessBoard').childNodes[i * 15 + j]
	}

	// 在棋盘上添加棋子
	addChessToChessboard = (i, j, chessColor) => {
		let chessDom = this.indexToDom(i, j)
		this.addClass(chessDom, chessColor)
	}

	calcIndex = (e) => {
		return this.index(e.target, e.target.parentNode.childNodes)
	}

	index = (ele, obj) => {
		for (let i = 0; i < obj.length; i++) {
			if (ele == obj[i]) {
				return i
			}
		}
	}

	hasClass = (obj, cls) => {  
    	return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
	}  
	
	addClass = (obj, cls) => {  
		if (!this.hasClass(obj, cls)) obj.className += " " + cls;  
	}  
	
	removeClass = (obj, cls) => {  
		if (this.hasClass(obj, cls)) {  
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
			obj.className = obj.className.replace(reg, ' ');  
		}  
	}

	playerWin = () => {
		this.gameOver('你赢了')
		console.log('player win')
	}

	playerWinOrNot = (i, j, chessColor) => {
		let chessArr = this.props.fiveChess.chessArr
		var nums = 1,	//连续棋子个数
			m, n;
		//x方向
		for (m = j - 1; m >= 0; m--) {
			if (chessArr[i][m] === chessColor) {
				nums++;
			}
			else {
				break;
			}
		}
		for (m = j + 1; m < 15; m++) {
			if (chessArr[i][m] === chessColor) {
				nums++;
			}
			else {
				break;
			}
		}
		if (nums >= 5) {
			this.playerWin();
			return;
		}
		else {
			nums = 1;
		}
		//y方向
		for (m = i - 1; m >= 0; m--) {
			if (chessArr[m][j] === chessColor) {
				nums++;
			}
			else {
				break;
			}
		}
		for (m = i + 1; m < 15; m++) {
			if (chessArr[m][j] === chessColor) {
				nums++;
			}
			else {
				break;
			}
		}
		if (nums >= 5) {
			this.playerWin();
			return;
		}
		else {
			nums = 1;
		}
		//左斜方向
		for (m = i - 1, n = j - 1; m >= 0 && n >= 0; m--, n--) {
			if (chessArr[m][n] === chessColor) {
				nums++;
			}
			else {
				break;
			}
		}
		for (m = i + 1, n = j + 1; m < 15 && n < 15; m++, n++) {
			if (chessArr[m][n] === chessColor) {
				nums++;
			}
			else {
				break;
			}
		}
		if (nums >= 5) {
			this.playerWin();
			return;
		}
		else {
			nums = 1;
		}
		//右斜方向
		for (m = i - 1, n = j + 1; m >= 0 && n < 15; m--, n++) {
			if (chessArr[m][n] === chessColor) {
				nums++;
			}
			else {
				break;
			}
		}
		for (m = i + 1, n = j - 1; m < 15 && n >= 0; m++, n--) {
			if (chessArr[m][n] === chessColor) {
				nums++;
			}
			else {
				break;
			}
		}
		if (nums >= 5) {
			this.playerWin();
			return;
		}
		if (this.state.playWith !== 'player') {
			this.AImoveChess()
		}
	}

	AImoveChess = () => {
		let chessArr = this.props.fiveChess.chessArr
		var maxX = 0,
			maxY = 0,
			maxWeight = 0,
			i, j, tem;
		for (i = 14; i >= 0; i--) {
			for (j = 14; j >= 0; j--) {
				if (chessArr[i][j] !== NO_CHESS) {
					continue
				}
				tem = this.computeWeight(i, j)
				if (tem > maxWeight) {
					maxWeight = tem
					maxX = i
					maxY = j
				}
			}
		}
		this.playChess(maxX, maxY, this.props.fiveChess.AIPlayer, chessArr)
		if ((maxWeight >= 100000 && maxWeight < 250000) || (maxWeight >= 500000)) {
			// this.showResult(false);
			this.gameOver('电脑赢了')
			console.log('pc win')
		}
		else {
			// this.isPlayerTurn = true;
		}
	}

	gameOver = (winInfo) => {
		console.log("gameover")
		const { dispatch } = this.props
		dispatch({
			type: 'wuziqi/gameOver',
			payload: {
				winInfo
			}
		})
	}

	resetChessBoard = () => {
		console.log('reset')
		const { dispatch } = this.props
		let { chessArr } = this.props.fiveChess
		for (let i = 0; i < 15; i++) {
			for (let j = 0; j < 15; j++) {
				if (chessArr[i][j] !== NO_CHESS) {
					let chessDom = this.indexToDom(i, j)
					this.removeClass(chessDom, "black")
					this.removeClass(chessDom, "white")
				}
			}
		}
		dispatch({
			type: 'wuziqi/resetChessBoard',
		})

	}

	matchUser =  () => {
		const { dispatch } = this.props
		let currentUsername = this.props.fiveChess.username
		const socket = io(DOMAIN)
		socket.emit('match', currentUsername)
		// socket.on('match', (user) => {
		// 	console.log(user)
		// 	if (user !== currentUsername) {
		// 		socket.emit('matchPassword', `Room${user}${currentUsername}`)
		// 	}
		// })
		socket.on('password', (msg) => {
			console.log(msg)
			if (this.state.chess) {
				this.setState({
					status: msg.status,
					playWith: 'player',
				})
			} else {
				this.setState({
					status: msg.status,
					playWith: 'player',
					chess: msg.chess
				})
			}
		})
		
	}

	computeWeight = (i, j) => {
		var weight = 14 - (Math.abs(i - 7) + Math.abs(j - 7)), //基于棋盘位置权重
			pointInfo = {},	//某点下子后连子信息
			chessColor = 1
		//x方向
		pointInfo = this.putDirectX(i, j, chessColor);
		weight += this.weightStatus(pointInfo.nums, pointInfo.side1, pointInfo.side2, true);//AI下子权重
		pointInfo = this.putDirectX(i, j, -chessColor);
		weight += this.weightStatus(pointInfo.nums, pointInfo.side1, pointInfo.side2, false);//player下子权重
		//y方向
		pointInfo = this.putDirectY(i, j, chessColor);
		weight += this.weightStatus(pointInfo.nums, pointInfo.side1, pointInfo.side2, true);//AI下子权重
		pointInfo = this.putDirectY(i, j, -chessColor);
		weight += this.weightStatus(pointInfo.nums, pointInfo.side1, pointInfo.side2, false);//player下子权重
		//左斜方向
		pointInfo = this.putDirectXY(i, j, chessColor);
		weight += this.weightStatus(pointInfo.nums, pointInfo.side1, pointInfo.side2, true);//AI下子权重
		pointInfo = this.putDirectXY(i, j, -chessColor);
		weight += this.weightStatus(pointInfo.nums, pointInfo.side1, pointInfo.side2, false);//player下子权重
		//右斜方向
		pointInfo = this.putDirectYX(i, j, chessColor);
		weight += this.weightStatus(pointInfo.nums, pointInfo.side1, pointInfo.side2, true);//AI下子权重
		pointInfo = this.putDirectYX(i, j, -chessColor);
		weight += this.weightStatus(pointInfo.nums, pointInfo.side1, pointInfo.side2, false);//player下子权重
		return weight;
	}
	//权重方案   独：两边为空可下子，单：一边为空
	weightStatus = (nums, side1, side2, isAI) => {
		var weight = 0;
		switch (nums) {
			case 1:
				if (side1 && side2) {
					weight = isAI ? 15 : 10;	//独一
				}
				break;
			case 2:
				if (side1 && side2) {
					weight = isAI ? 100 : 50;	//独二
				}
				else if (side1 || side2) {
					weight = isAI ? 10 : 5;	//单二
				}
				break;
			case 3:
				if (side1 && side2) {
					weight = isAI ? 500 : 200;	//独三
				}
				else if (side1 || side2) {
					weight = isAI ? 30 : 20;	//单三
				}
				break;
			case 4:
				if (side1 && side2) {
					weight = isAI ? 5000 : 2000;	//独四
				}
				else if (side1 || side2) {
					weight = isAI ? 400 : 100;	//单四
				}
				break;
			case 5:
				weight = isAI ? 100000 : 10000;	//五
				break;
			default:
				weight = isAI ? 500000 : 250000;
				break;
		}
		return weight;
	}

	putDirectX = (i, j, chessColor) => {
		let chessArr = this.props.fiveChess.chessArr
		var m, n,
			nums = 1,
			side1 = false,
			side2 = false;
		for (m = j - 1; m >= 0; m--) {
			if (chessArr[i][m] === chessColor) {
				nums++;
			}
			else {
				if (chessArr[i][m] === NO_CHESS) {
					side1 = true;
				}
				break;
			}
		}
		for (m = j + 1; m < 15; m++) {
			if (chessArr[i][m] === chessColor) {
				nums++;
			}
			else {
				if (chessArr[i][m] === NO_CHESS) {
					side2 = true;
				}
				break;
			}
		}
		return {"nums": nums, "side1": side1, "side2": side2};
	}

	//下子到i，j Y方向 结果
	putDirectY = (i, j, chessColor) => {
		let chessArr = this.props.fiveChess.chessArr
		var m, n,
			nums = 1,
			side1 = false,
			side2 = false;
		for (m = i - 1; m >= 0; m--) {
			if (chessArr[m][j] === chessColor) {
				nums++;
			}
			else {
				if (chessArr[m][j] === NO_CHESS) {
					side1 = true;
				}
				break;
			}
		}
		for (m = i + 1; m < 15; m++) {
			if (chessArr[m][j] === chessColor) {
				nums++;
			}
			else {
				if (chessArr[m][j] === NO_CHESS) {
					side2 = true;
				}
				break;
			}
		}
		return {"nums": nums, "side1": side1, "side2": side2};
	}

	//下子到i，j XY方向 结果
	putDirectXY = (i, j, chessColor) => {
		let chessArr = this.props.fiveChess.chessArr
		var m, n,
			nums = 1,
			side1 = false,
			side2 = false;
		for (m = i - 1, n = j - 1; m >= 0 && n >= 0; m--, n--) {
			if (chessArr[m][n] === chessColor) {
				nums++;
			}
			else {
				if (chessArr[m][n] === NO_CHESS) {
					side1 = true;
				}
				break;
			}
		}
		for (m = i + 1, n = j + 1; m < 15 && n < 15; m++, n++) {
			if (chessArr[m][n] === chessColor) {
				nums++;
			}
			else {
				if (chessArr[m][n] === NO_CHESS) {
					side2 = true;
				}
				break;
			}
		}
		return {"nums": nums, "side1": side1, "side2": side2};
	}

	putDirectYX = (i, j, chessColor) => {
		let chessArr = this.props.fiveChess.chessArr
		var m, n,
			nums = 1,
			side1 = false,
			side2 = false;
		for (m = i - 1, n = j + 1; m >= 0 && n < 15; m--, n++) {
			if (chessArr[m][n] === chessColor) {
				nums++;
			}
			else {
				if (chessArr[m][n] === NO_CHESS) {
					side1 = true;
				}
				break;
			}
		}
		for (m = i + 1, n = j - 1; m < 15 && n >= 0; m++, n--) {
			if (chessArr[m][n] === chessColor) {
				nums++;
			}
			else {
				if (chessArr[m][n] === NO_CHESS) {
					side2 = true;
				}
				break;
			}
		}
		return {"nums": nums, "side1": side1, "side2": side2};
	}

	info = () => {
		console.log(this.props.fiveChess)
	}

    render () {
		let readyButton
		if (this.state.status === 'waiting') {
			readyButton = <a disabled={true} href="JavaScript:void(0)" onClick={this.matchUser}>等待</a>
		} else if (this.state.status === 'ready') {
			readyButton = <a disabled={true} href="JavaScript:void(0)" onClick={this.matchUser}>开始</a>
		} else {
			readyButton = <a href="JavaScript:void(0)" onClick={this.matchUser}>准备</a>
		}

        return (
            <div className={styles.wrapper}>
				<div className={styles.chessboard + " bigChessBoard"}>
					{/*<!-- top line -->*/}
					{[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((value, index) => {
						return <div key={index} className={'chess-top'} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					})}
					<div className={"chess-top chess-right"} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					{/*<!-- line 1 -->*/}
					<div className="chess-left" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>		
					{[1,2,3,4,5,6,7,8,9,10,11,12,13].map((value, index) => {
						return <div key={index} className="chess-middle" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					})}
					<div className="chess-right" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					{/*<!-- line 2 -->*/}
					<div className="chess-right" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					{[1,2,3,4,5,6,7,8,9,10,11,12,13].map((value, index) => {
						return <div key={index} className="chess-middle" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					})}
					<div className="chess-right" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					{/*<!-- line 3 -->*/}
					<div className="chess-left" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					{[1,2,3,4,5,6,7,8,9,10,11,12,13].map((value, index) => {
						return <div key={index} className="chess-middle" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					})}
					<div className="chess-right" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					{/*<!-- line 4 -->*/}
					<div className="chess-left" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					{[1,2,3,4,5,6,7,8,9,10,11,12,13].map((value, index) => {
						return <div key={index} className="chess-middle" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					})}
					<div className="chess-right" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					{/*<!-- line 5 -->*/}
					<div className="chess-left" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					{[1,2,3,4,5,6,7,8,9,10,11,12,13].map((value, index) => {
						return <div key={index} className="chess-middle" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					})}
					<div className="chess-right" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					{/*<!-- line 6 -->*/}
					<div className="chess-left" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					{[1,2,3,4,5,6,7,8,9,10,11,12,13].map((value, index) => {
						return <div key={index} className="chess-middle" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					})}
					<div className="chess-right" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					{/*<!-- line 7 -->*/}
					<div className="chess-left" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					{[1,2,3,4,5,6,7,8,9,10,11,12,13].map((value, index) => {
						return <div key={index} className="chess-middle" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					})}
					<div className="chess-right" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					{/*<!-- line 8 -->*/}
					<div className="chess-left" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					{[1,2,3,4,5,6,7,8,9,10,11,12,13].map((value, index) => {
						return <div key={index} className="chess-middle" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					})}
					<div className="chess-right" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					{/*<!-- line 9 -->*/}
					<div className="chess-left" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					{[1,2,3,4,5,6,7,8,9,10,11,12,13].map((value, index) => {
						return <div key={index} className="chess-middle" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					})}
					<div className="chess-right" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					{/*<!-- line 10 -->*/}
					<div className="chess-left" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					{[1,2,3,4,5,6,7,8,9,10,11,12,13].map((value, index) => {
						return <div key={index} className="chess-middle" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					})}
					<div className="chess-right" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					{/*<!-- line 11 -->*/}
					<div className="chess-left" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					{[1,2,3,4,5,6,7,8,9,10,11,12,13].map((value, index) => {
						return <div key={index} className="chess-middle" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					})}
					<div className="chess-right" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					{/*<!-- line 12 -->*/}
					<div className="chess-left" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					{[1,2,3,4,5,6,7,8,9,10,11,12,13].map((value, index) => {
						return <div key={index} className="chess-middle" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					})}
					<div className="chess-right" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					{/*<!-- line 13 -->*/}
					<div className="chess-left" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					{[1,2,3,4,5,6,7,8,9,10,11,12,13].map((value, index) => {
						return <div key={index} className="chess-middle" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					})}
					<div className="chess-right" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					{/*<!-- bottom line  -->*/}
					{[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((value, index) => {
						return <div key={index} className="chess-bottom" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
					})}
					<div className="chess-bottom chess-right" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}></div>
				</div>

				<div className={styles.operating_panel}>
					<p>用户：{this.props.fiveChess.username}</p>
					<p className={styles.p_room}>房间号：{this.props.fiveChess.room}</p>
					<p>
						<a id="black_btn" className={styles.selected} href="JavaScript:void(0)">黑子</a>
						<a id="white_btn" href="JavaScript:void(0)">白子</a>
					</p>
					<p>
						<a id="first_move_btn" className={styles.selected} href="JavaScript:void(0)">先手</a>
						<a id="second_move_btn" href="JavaScript:void(0)">后手</a>
					</p>
					<a id="replay_btn" href="JavaScript:void(0)" onClick={this.resetChessBoard}>重置</a>
					{readyButton}
					<p id="result_info">胜率：100%</p>
					<p id="result_tips">{this.props.fiveChess.winInfo}</p>
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

	componentDidMount () {
		const socket = io(DOMAIN)
		window.addEventListener('beforeunload', (ev) => {
			ev.preventDefault()
			socket.emit('leave')
		})
		const { dispatch } = this.props
		dispatch({
			type: 'wuziqi/userInfo',
		})
		socket.on('connect', () => {
			socket.emit('joined', 'xjd joined')
			socket.on('users', (userList) => {
				dispatch({
					type: 'wuziqi/getUserList',
					payload: {
						userList
					}
				})
			})
			socket.on('messages', (message) => {
				console.log(message)
				dispatch({
					type: 'wuziqi/addMessage',
					payload: {
						message
					}
				})
			})
			socket.on('resetChessBoard', (msg) => {
				this.resetChessBoard()
			})
			socket.on('chessChange', (msg) => {
				let chessArr = JSON.parse(msg)
				dispatch({
					type: 'wuziqi/playChess',
					payload: {
						chessArr,
					}
				})
				for (let i = 0; i < 15; i++) {
					for (let j = 0; j < 15; j++) {
						let chessDom = this.indexToDom(i, j)
						if (chessArr[i][j] === BLACK_CHESS) {
							this.addClass(chessDom, "black")
						} else if (chessArr[i][j] === WHITE_CHESS) {
							this.addClass(chessDom, "white")
						} else {
							this.removeClass(chessDom, "white")
							this.removeClass(chessDom, "black")
						}
					}
				}
			})
		})
	}

	componentWillReceiveProps (nextProps) {
		// console.log(nextProps)
	}
}
