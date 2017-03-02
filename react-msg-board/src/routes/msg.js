import { injectReducer } from 'REDUCER'
import userAuth from 'UTIL/userAuth' // 用户访问拦截器
import createContainer from 'UTIL/createContainer'

const connectComponent = createContainer(
    ({userData, msg}) => ({ userData, msg }), // mapStateToProps
    require('ACTION/msg').default // mapActionCreators
)

export default {
    path: 'msg',

    /* 布局基页 */
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            // 立即注入 Reducer
            injectReducer('msg', require('REDUCER/msg/').default)

            cb(null, require('VIEW/msg').default)
        }, 'msgView') // ensure第三个参数msgView指定代码分块的name变量
    },

    indexRoute: { // 对应 /msg
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, connectComponent(require('COMPONENT/Msg/MsgList').default))
            }, 'MsgList')
        }
    },

    childRoutes: [
        { // 对应 /msg/detail/:msgId
            path: 'detail/:msgId',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/Msg/MsgDetail').default))
                }, 'MsgDetail')
            }
        },
        { // 对应 /msg/add
            path: 'add',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/Msg/MsgForm').default))
                }, 'msgForm')
            },
            onEnter: userAuth
        },
        {
            path: 'modify/:msgId',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/Msg/MsgForm').default))
                }, 'msgForm')
            },
            onEnter: userAuth
        }
    ]
}
