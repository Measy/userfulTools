import xhr from './xhr/'

/**
 * 对应后端涉及到用户认证的 API
 */
class UserService {
    checkLogin() {
        return xhr({ url: '/user' })
    }

    login(userData) {
        return xhr({
            method: 'post',
            url: '/login',
            body: userData
        })
    }

    /**
     * @param  {Object} userData
     * @return {Promise}
     */
    logout() {
        return xhr({ url: '/logout' })
    }
}

export default new UserService()
