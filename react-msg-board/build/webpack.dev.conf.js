var webpack = require('webpack'),
    config = require('./webpack.base.conf'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
    SOURCE_MAP = false;

config, output.filename = '[name].js';
config.output.chunkFilename = '[id].js';

config.devtool = SOURCE_MAP ? 'eval-source-map' : false;

//add hot-reload related conde to entry chunk
config.entry.app = [
    'eventsource-polyfill',
    'webpack-hot-middleware/client?reload=true',
    'webpack/hot/only-dev-server',
    config.entry.app
];

config.output.publicPath = '/';

//开发环境下直接内嵌CSS以支持热替换
config.module.loaders.push(
    {
        test: /\.css$/,
        loader: 'style!css'
    }, {
        test: /\.less$/,
        loader: 'style!css!less'
    }, {
        test: /\.scss$/,
        loader: 'style!css!sass'
    }
);


config.plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(), //允许错误不打断程序运行
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: config.commonPath.indexHtml,
        chunksSortMode: 'none' //允许控制块在添加到页面之前的排序方式
    }),
    new BrowserSyncPlugin({
        host: '127.0.0.1',
        port: 9090,
        proxy: 'http://127.0.0.1:9090/',
        logConnections: false,
        notify: false
    },{
        reload: false
    })
);

module.exports = config;

