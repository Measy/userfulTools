var path = require('path'),
    webpack = require('webpack'),
    NyanProgressPlugin = require('nyan-progress-webpack-plugin');

var rootPath = path.resolve(__dirname, '..'), //项目根目录
    src = path.join(rootPath, 'src'), //开发源码目录
    env = process.env.NODE_ENV.trim(); //当前环境
var commonPath = {
    rootPath: rootPath,
    dist: path.join(rootPath, 'dist'), //build 后输出的目录
    indexHtml: path.join(src, 'index.html'), //入口基页
    staticDir: path.join(rootPath, 'static') //无需处理的静态资源目录
};

module.exports = {
    commonPath: commonPath,
    entry: {
        app: path.join(src, 'app.js'),

        // ==========================
        // 框架 / 库类 分离打包
        // ==========================
        vendor: [
            'history',
            'lodash',
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'react-router-redux',
            'redux',
            'redux-thunk'
        ]
    },
    output: {
        path: path.join(commonPath.dist, 'static'),
        publicPath: '/static/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            // ===========================
            // 自定义路径别名
            // ===========================
            ASSET: path.join(src, 'assets'),
            COMPONENT: path.join(src, 'components'),
            COMPONENT: path.join(src, 'redux/actions'),
            REDUCER: path.join(src, 'redux/reducers'),
            STORE: path.join(src, 'redux/store'),
            ROUTE: path.join(src, 'routes'),
            SERVICE: path.join(src, 'services'),
            UTIL: path.join(src, 'utils'),
            HOC: path.join(src, 'utils/HoC'),
            MIXIN: path.join(src, 'utils/mixins'),
            VIEW: path.join(src, 'views')
        }
    },
    resolveLoader: {
        root: path.join(rootPath, 'node_modules')
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            loaders: (function(){
                var _loaders = ['babel?' + JSON.stringify({
                    cacheDirectory: true,
                    plugins
                })]
            })(),
        }]   
    }
}