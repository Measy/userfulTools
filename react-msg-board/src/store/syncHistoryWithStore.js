// ======================================================
// 同步history配置
// ======================================================
import { useRouterHistory } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'

const browserHistory = useRouterHistory(createBrowserHistory)({
    basename: '' //相当于rootPath
});

export const historyMiddleware = routerMiddleware(browserHistory)

export default function (store) {
    return syncHistoryWithStore(
        browserHistory,
        store,
        { selectLocationState: (state) => state.router }
    )
}