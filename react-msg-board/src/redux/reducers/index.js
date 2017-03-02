import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import store from 'STORE'
import userReducer from 'REDUCER/user'

// ======================================================
// 同步的Reducers(即应用初始化所必须的)
// ======================================================
const syncReducers = {
    router: routerReducer,
    userData: userReducer
}

// ======================================================
// 异步加载的Reducers (Code Splitting 按需加载的)
// ======================================================
const asyncReducers = {}

/**
 * @return {Function} rootReducer
 */
export function createRootReducer() {
    return combineReducers({
        ...syncReducers,
        ...asyncReducers
    })
}

/**
 * 按需加载时，立即注入对应的 Reducer
 * @param  {String}   key
 * @param  {Function} reducer
 */
export function injectReducer(key, reducer) {
    asyncReducers[key] = reducer
    store.replaceReducer(createRootReducer()) // 替换当前的rootReducer,加入异步加载的reducer
}
