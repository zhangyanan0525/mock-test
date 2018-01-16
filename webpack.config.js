const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

module.exports = {
    // 入口文件名称
    entry: './src/index.jsx',
    // 输出文件名称
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    //   options: {
                    //     presets: ['react']
                    //   }
                }
            },
            {
                test: /\.css|less$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: "less-loader",
                        // options: {
                        //     strictMath: true,
                        //     noIeCompat: true
                        // },
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            title: 'Test App',
            template: __dirname + '/src/index.html',
            filename: 'index.html',
        })
    ],
    // devServer: {


    //     hot: true,
    //     hotOnly: true,
    //     host: "0.0.0.0",
    //     disableHostCheck: true,
    //     overlay: {
    //         warnings: true,
    //         errors: true
    //     },
    // },
    // devServer: {
    //     // contentBase: path.join(__dirname, "dist"),
    //     compress: true,
    //     host:"127.0.0.1",
    //     port: 9000
    //   },
    devtool: 'inline-source-map',
}
