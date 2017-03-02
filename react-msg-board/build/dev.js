var express = require('express'),
    webpack = require('webpack'),
    config = require('./webpack.dev.conf'),
    app = express();

var compiler = webpack(config);

//for highly stable resources
app.use('/static', express.static(config.commonPath.staticDir));

//handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

//serve webpack bundle output
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

//enable hot-reload and state-preserving
//compilation error display
app.use(require('webpack-hot-middleware')(compiler));

app.listen(9000, '127.0.0.1', function(err){
    err && console.log(err);
});