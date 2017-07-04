import React from 'react'
import ReactDOM from 'react-dom'

import styles from './Messages.less'

import { Input, Button } from 'antd'

import moment from 'moment'

export default class Messages extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            value: ''
        }
    }

    onChangeHandle = (e) => {
        let value = e.target.value
        this.setState({
            value: value
        })
    }

    onSubmit = (e) => {
        let message = this.state.value.trim()
        this.props.handleSubmit(message)
        this.setState({
            value: ''
        })
    }

    render() {
        // const messages = [{
        //     timestamp: 123456677,
        //     sender: 'fff',
        //     message: '123dfsgfdsgfdsgfdsgfdsgfdsgdfsgf,',
        // },
        // {
        //     timestamp: 124321321,
        //     sender: 'xjd',
        //     message: '12213',
        // }
        // ]
        const messages = this.props.messages

        const chatMessages = messages.map((chat, key) =>
            <li className={styles.li} key={key}>
                <p className={styles.messageText}>
                    {   chat.sender ?
                        (chat.sender + ':' + chat.message)
                        :
                        chat.message
                    }
                </p>
                <p className={styles.timestampText}>
                    {   chat.sender ?
                        moment(chat.timestamp).format('YYYY.MM.DD HH:mm:ss')
                        : ''
                    }
                </p>
            </li>
        )

        return (
            <div className={styles.message}>
                <ul className={styles.ul}>
                    {chatMessages}
                </ul>
                <Input onChange={this.onChangeHandle} value={this.state.value}/>
                <Button onClick={this.onSubmit} className={styles.button} type="primary">Submit</Button>
            </div>
        )
    }
}