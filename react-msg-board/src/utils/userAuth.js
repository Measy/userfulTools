import store, { history } from 'STORE'

// 判断当前是否是登入模式还是普通的鉴权判定
const isLogin = pathname => pathname.startsWith('/login')

/**
 * 用户访问权限拦截器
 * @export {Function} onEnter，详见以下文档：
 * https://github.com/reactjs/react-router/blob/master/docs/API.md#onEnter
 */
export default function userAuth(nextState, replace, next) {
    let {userData} = store.getState()
    if (isLogin(nextState.location.pathname)) {
        if (userData) history.goBack() // 进入登入页时,如果已经登录，则返回
    } else {
        if (userData) return next()
        alert('请先登入后访问')
        history.goBack()
    }
    // next(replace('/loginPage')) # 举例:跳转到登入页的写法
}
