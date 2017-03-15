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

    register(userData) {
        return xhr({
            method: 'post',
            url: '/register',
            body: userData
        })
    }

    checkUsername(username) {
        return xhr({
            method: 'get',
            url: `/register?username=${username}`
        })
    }
}

export default new UserService()
