module.exports = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9090');//just lazy
    res.setHeader('Access-Control-Allow-Credentials', true);//允许跨域
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('X-Powered-By', 'NodeJS');

    //preflight OPTIONS request
    if(req.method === 'OPTIONS'){
        return res.send(true);
    }

    next();
}