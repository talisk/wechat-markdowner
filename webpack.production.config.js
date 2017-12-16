
var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, './src');
var DIST_PATH = path.resolve(ROOT_PATH, './dist');

module.exports = {
    //插件项
    // plugins: [commonsPlugin],
    //页面入口文件配置
    entry: {
        index : './src/js/index.js'
    },
    //入口文件输出配置
    output: {
        path: path.resolve(DIST_PATH, 'js'),
        filename: '[name].js'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    plugins: [
        new CleanPlugin([
          'dist',
        ],{
          root: ROOT_PATH, //指定根目录
        }),
        new HtmlWebpackPlugin({
          filename: '../index.html',  //默认目录路径为output.path
          template: './src/index.html', //默认目录路径为根目录
          inject: true,
        }),
        new CopyWebpackPlugin([
            {
                context: path.join(__dirname, './src/css/pageThemes'),
                from: '*',
                to: '../pageThemes',
                force: true
            },
            {
                context: path.join(__dirname, './src/imgs'),
                from: '*',
                to: '../imgs',
                force: true
            },
            {
                context: path.join(__dirname, './src/css/themes'),
                from: '*',
                to: '../themes',
                force: true
            },
            {
                context: path.join(__dirname, './src'),
                from: "demo.md",
                to: '../demo.md',
                force: true
            },
            {
                context: path.join(__dirname, './src'),
                from: "favicon.ico",
                to: '../favicon.ico',
                force: true
            },
            {
                context: path.join(__dirname, './src'),
                from: "CNAME",
                to: '../CNAME',
                toType: 'file',
                force: true
            }
        ])
    ]
};
