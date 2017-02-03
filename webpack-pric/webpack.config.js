var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: {
        index: "./src/js/page/index.js",
        vendors: ['jquery']
    },
    output: {
        path: path.join(__dirname,'dist'),
        filename: "bundle.js"
    },
    resolve:{
        extensions: ['','.js','.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            }
        ]
    },
    plugins:[
        new webpack.ProvidePlugin({ //加载jq成为全局变量
            $: 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
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