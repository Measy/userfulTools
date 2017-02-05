var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: {
        index: "./src/js/page/index.js",
        delegate: "./src/js/page/jsEvent.js",
        // vendors: ['jquery']
    },
    output: {
        path: path.join(__dirname,'dist'),
        publicPath: "/dist/",
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"
    },
    resolve:{
        extensions: ['','.js','.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.html$/,
                loader: "html"
            },
            {
                test: /\.(png|jpg)$/,
                loader: "url-loader?limit=8192"
            }
        ]
    },
    plugins:[
        new webpack.ProvidePlugin({ //加载jq成为全局变量
            $: 'jquery'
        }),
        // new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new webpack.optimize.CommonsChunkPlugin("commons.js", ["index", "delegate"])
    ],
    devServer:{
        port: 8080,
        hot: true,
        historyApiFallback: true,
        publicPath: "",
        stats: {
            colors: true
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    }
}