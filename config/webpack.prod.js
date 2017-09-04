const path = require('path');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const ngToolsWebpack = require('@ngtools/webpack');

const root = path.resolve(__dirname, '..');

console.log('Starting production build');

module.exports = {

    entry: {
        'app': root + '/app/main-aot.ts' // AoT compilation
    },

    output: {
        path: root + '/public/',
        filename: 'js-aot/[name].[hash:8].bundle.js',
        chunkFilename: 'js-aot/[id].[hash:8].chunk.js',
        publicPath: '/'
    },

    resolve: {
        extensions: ['.ts', '.js', '.json']
    },

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        outputPath: path.join(root, 'public/')
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: '@ngtools/webpack'
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot)$/,
                use: 'file-loader?name=assets/[name]-[hash:6].[ext]'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
              test: /\.(css|scss)$/,
              loaders: ['to-string-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            }
        ],
        exprContextCritical: false
    },

    plugins: [
        // AoT plugin.
        new ngToolsWebpack.AotPlugin({
            tsConfigPath: './config/tsconfig-aot.json',
            basePath: root,
            entryModule: path.resolve(root, 'app/app.module#AppModule')
        }),
        new CleanWebpackPlugin(
            [
              './public/js-aot/'
            ],
            { root: root }
        ),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: false
        }),
        new CompressionPlugin({
          asset: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.js$|\.html$/,
          threshold: 10240,
          minRatio: 0.8
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: 'index-template.html'
        }),
        new CopyWebpackPlugin([{from: root + '/app/styles.css'}]),
    ]
};