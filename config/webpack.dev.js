let ExtractTextPlugin = require('extract-text-webpack-plugin');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let path = require('path');

const root = path.resolve(__dirname, '..');

module.exports = {
    devtool: 'source-map',
    performance: {
        hints: false
    },

    entry: {
        'app': root + '/app/main.ts' // JiT compilation
    },

    output: {
        path: root + '/public/',
        filename: 'js-jit/[name].bundle.js'
    },

    resolve: {
        extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'awesome-typescript-loader',
                    'angular-router-loader',
                    'angular2-template-loader',
                    'source-map-loader'
                ]
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            },
            {
                test: /\.(png|jpg|gif|ico|woff|woff2|ttf|svg|eot)$/,
                loader: 'file-loader?name=assets/[name].[ext]',
            },
            {
                test: /\.(css|scss)$/,
                loaders: ['to-string-loader', 'css-loader', 'sass-loader']
            }
        ]
    },

    devServer: {
        historyApiFallback: true,
        contentBase: path.join(root, '/public')
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: 'index-template.html'
        }),
        new CopyWebpackPlugin([{from: root + '/app/styles.css'}]),
    ]
};