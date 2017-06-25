import React from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

import Wuziqi from '../../components/Wuziqi/Wuziqi'

const WuziqiRoute = ({ location, dispatch }) => {
    return (
        <div>
            <Wuziqi/>
        </div>
    )
}

export default connect()(WuziqiRoute)