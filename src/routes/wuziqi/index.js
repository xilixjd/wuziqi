import React from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

import Wuziqi from '../../components/Wuziqi/Wuziqi'
import Messages from '../../components/Messages/Messages'
import UserList from '../../components/Messages/UserList'

import io from 'socket.io-client'

import { config } from '../../utils'

const { DOMAIN } = config


class WuziqiRoute extends React.Component {
    constructor (props) {
		super(props)
    }

    handleSubmit = (message) => {
        const socket = io.connect(DOMAIN)
        socket.emit('chat', message)
    }

    render() {
        return (
            <div>
                <Wuziqi {...this.props}/>
                <Messages messages={this.props.messages} handleSubmit={this.handleSubmit}/>
                <UserList userList={this.props.userList}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
	const { fiveChess, userList, messages } = state.wuziqi
	return {
		fiveChess,
        userList,
        messages,
	}
}

export default connect(mapStateToProps)(WuziqiRoute)