var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        index: "./src/js/page/index.js"
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "/dist/",
        filename: "js/[name].js",
        chunkFilename: "js/[id].chunk.js"
    },
    module:{
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'
            },
            {
                test: /\.html$/,
                loader: 'html'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new ExtractTextPlugin("css/[name].css"), //单独使用style标签加载css并设置其路径
        new HtmlWebpackPlugin({
            favicon: './src/img/favicon.ico', //favicon路径
            filename: '/view/index.html', //生成的html存放路径,相对于path
            template: './src/view/index.html', //html的模板路径
            inject: true, //允许插件修改那些内容,包括head与body,true为两者皆允许
            hash: true, //为静态资源生成hash值
            minify: { //压缩html文件
                removeComments: true, //移除html注释
                collapseWhitespace: false //移除空白符与换行符
            }
        })
    ]
}