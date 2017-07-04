import React from 'react'
import ReactDOM from 'react-dom'

import styles from './UserList.less'


export default class UserList extends React.Component {
    constructor (props) {
        super(props)
    }

    render() {
        const list = this.props.userList
        const userList = list.map((username, key) =>
            <li key={key}>
                {username}
            </li>
        )
            
        return (
            <div className={styles.wrap}>
                <ul>
                    {userList}
                </ul>
            </div>
        )
    }
}