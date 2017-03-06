var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // if(req.cookies.user !== null){
  //   req.user = req.cookies.user;
  // }
  if (req.session.user !== null) {
    req.user = req.session.user;
  }
  res.render('index', req);
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.get('/logout', function (req, res, next) {
  //删除cookie
  // res.clearCookie('user');
  //删除session
  delete req.session.user;
  res.redirect('/');
});

router.post('/login', function (req, res, next) {
  var username = req.body.username;
  var pwd = req.body.pwd;
  var user = {
    username: 'admin',
    pwd: 123456
  };
  if (username == user.username && pwd == user.pwd) {
    //设置cookie
    // res.cookie("user", {username: username}, {maxAge: 600000, httpOnly: false});
    //设置session
    req.session.user = { username: username, pwd: pwd };
    res.redirect('/');
  } else {
    req.error = '用户名密码错误'
    res.render('login', req);
  }
})

module.exports = router;
