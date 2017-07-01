import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'dva'

import { Button, Row, Form, Input } from 'antd'

import styles from './index.less'

const FormItem = Form.Item

const Login = ({
    dispatch,
    form: {
        getFieldDecorator,
        validateFieldsAndScroll,
    }
}) => {
    function handleOk () {
        validateFieldsAndScroll((errors, values) => {
        if (errors) {
            return
        }
        dispatch({ type: 'login/login', payload: values })
        })
    }

    return (
        <div className={styles.wrap}>
            <form>
                <FormItem hasFeedback>
                    {getFieldDecorator('room', {
                        rules: [
                        {
                            required: true,
                        },
                        ],
                    })(<Input size="large" onPressEnter={handleOk} placeholder="room" />)}
                </FormItem>
                <FormItem hasFeedback>
                    {getFieldDecorator('username', {
                        rules: [
                        {
                            required: true,
                        },
                        ],
                    })(<Input size="large" onPressEnter={handleOk} placeholder="username" />)}
                </FormItem>
                <Row>
                    <Button type="primary" size="large" onClick={handleOk}>
                        Sign in
                    </Button>
                </Row>
            </form>
        </div>
    )
}

export default connect(({ login }) => ({ login }))(Form.create()(Login))