import createContainer from 'UTIL/createContainer'

export default {
    path: '/',

    component: require('COMPONENT/App').default,

    indexRoute: {
        component: require('COMPONENT/Welcome').default
    },

    childRoutes: [
        // 路由按模块组织分离，避免单文件代码量过大
        require('./msg').default,
        require('./todo').default,

        // 强制“刷新”页面的hack
        { path: 'redirect', component: require('COMPONENT/Redirect').default },

        // 登录页面
        {
            path: 'login',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    // 注入Reducer

                    /* 组件连接state */
                    const LoginContainer = createContainer(
                        ({userDate}) => ({ userDate }), // mapStateToProps
                        require('ACTION/user').default, // mapActionCreators,
                        require('COMPONENT/Auth/').default // 木偶组件
                    )

                    cb(null, LoginContainer)
                })
            }
        },

        // 无路由匹配的情况一定要放到最后，防止拦截所有路由
        { path: '*', component: require('COMPONENT/404').default }
    ]
}

/*
  当前路由树如下
  ├ /
  |
  ├ /msg
  ├ /msg/add
  ├ /msg/detail/:msgId
  ├ /msg/modify/:msgId
  |
  ├ /todo
  |
  ├ /redirect
*/
