var userService = require('../../services/userService'),
    authentication = require('../../middlewares/authentication');

//GET /logout
exports.get = {
    url: '/logout', //override default /user/logout
    middlewares: authentication,
    handler: function (req, res, next) {
        delete req.session.user;
        res.json(true);
    }
}