var webpack = require('webpack'),
    config = require('./webpack.base.conf'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    SOURCE_MAP = false;

config.output.filename = '[name].[chunkhash:6].js';
config.output.chunkFilename = '[id].[chunkhash:6].js';

config.devtool = SOURCE_MAP ? 'source-map' : false;

//生产环境下分离出css文件
config.module.loaders.push({
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style', 'css')
}, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', 'css!less')
    }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!less')
    }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')
    });

config.plugins.push(
    //用于在building之前删除你以前build过的文件
    new CleanWebpackPlugin('dist', {
        root: config.commonPath.rootPath,
        werbose: false
    }),
    new CopyWebpackPlugin([ //复制高度静态的依赖资源
        {
            context: config.commonPath.staticDir,
            from: '**/*',
            ignore: ['*.md']
        }
    ]),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        //公共代码分离打包
        names: ['vendor', 'mainifest']
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 30000
    }),
    new HtmlWebpackPlugin({
        filename: '../index.html',
        template: config.commonPath.indexHtml,
        chunksSortMode: 'none'
    })
);

module.exports = config;