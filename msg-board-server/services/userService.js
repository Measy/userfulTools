var DbOptService = require('./DbOptService');

function UserService() { }

UserService.prototype = new DbOptService('../db/user.session');

/**
 * @return {Object/Null} userData/null(unantherized)
 * 能读出数据就说明登入了 否则返回Null，因为目前为单用户模式,user.session只存储一个用户
 */
UserService.prototype.isLogin = function (req, res) {
    if (req.session && req.session.user) {
        return req.session.user;
    }
    return null;
};

UserService.prototype.login = function (userData) {
    var curUser = this.read();
    if (curUser) {
        console.info('[INFO] You had already loged in');
        return;
    }
    this.save(userData);
};

UserService.prototype.authUser = function (userData) {
    let users = this.read();
    let username = userData.username;
    let pwd = userData.password;
    let user = users.find(function (el) {
        return el.username === username;
    });
    if (!user) {
        console.info('[INFO] the uesrName is not existed');
        return;
    } else if (pwd !== user.password) {
        console.info('[INFO] the password is error');
        return;
    } else {
        return user;
    }
};

UserService.prototype.logout = function () {
    this.delDb();
};

module.exports = new UserService();