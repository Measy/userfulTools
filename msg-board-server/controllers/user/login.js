var userService = require('../../services/userService'),
    forbidden = require('../../middlewares/forbidden');

//POST /login
exports.post = {
    url: '/login', //override default /user/login
    middlewares: forbidden,
    handler: function (req, res, next) {
        var username = req.body.username.trim();

        if(!username){
            return next({_msg: 'invalid username'});
        }

        userService.login({username});
        console.log(111)
        res.json({username});
    }
};