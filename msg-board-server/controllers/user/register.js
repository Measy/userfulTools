var userService = require('../../services/userService'),
    forbidden = require('../../middlewares/forbidden');

//POST /register
exports.post = {
    url: '/register', //override default /user/register
    handler: function (req, res, next) {
        var userData = req.body;
        if (!userData) {
            return next({ _msg: 'invalid anth body' });
        }
        let user = userService.registerUser(userData);
        if (user) {
            req.session.user = { username: user.username };
            console.log(req.session.user);
            res.json({ username: user.username });
        } else {
            res.status(500); // 注册失败
            next({ _code: 500, _msg: 'Register failed' });
        }
    }
};

exports.get = {
    url: '/register',
    handler: function (req, res, next) {
        let username = req.query.username;
        if(!username){
            res.json(false);
        }
        let isVaild = userService.checkUsername(username);
        if(isVaild){
            res.json(true);
        }else{
            res.json(false);
        }
    }
}