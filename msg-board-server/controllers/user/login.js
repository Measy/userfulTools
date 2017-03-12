var userService = require('../../services/userService'),
    forbidden = require('../../middlewares/forbidden');

//POST /login
exports.post = {
    url: '/login', //override default /user/login
    middlewares: forbidden,
    handler: function (req, res, next) {
        var userData = req.body;
        if (!userData) {
            return next({ _msg: 'invalid anth body' });
        }
        let user = userService.authUser(userData);
        if (user) {
            req.session.user = { username: user.username };
            console.log(req.session.user);
            res.json({ username: user.username });
        } else {
            res.status(401); // 这个401无效
            next({ _code: 401, _msg: 'User auth unvalid' });
        }
    }
};