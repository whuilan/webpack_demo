const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development'
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const apiMocker = require('mocker-api');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const config = require('./public/config')[isDev ? 'dev' : 'build'];

var HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

module.exports = {
    entry: {
        index: './src/index.js',
        // login: './src/login.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:6].js',
        publicPath: '/'
    },
    mode: 'development',
    devtool: 'source-map',
    devServer: {
      contentBase: path.resolve(__dirname, 'dist')
    },
    resolve: {
        modules: ['./src', 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['cache-loader','babel-loader'],
                // exclude: /node_modules/
                include: [path.resolve(__dirname, 'src')]
            },
            // {
            //     test: /\.html$/,
            //     use: 'html-withimg-loader'
            // },
            {
                test: /\.(c|le)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true,
                        }
                    },
                    // MiniCssExtractPlugin.loader,
                    'css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')()
                                ]
                            }
                        }
                    }, 'less-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp|eot|ttf|woff)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10,
                            name: '[name]_[hash:6].[ext]',
                            outputPath: 'assets',
                            esModule: false,
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html', //打包后的文件名
            config: config.template,
            chunks: ['index']
        }),
        new CleanWebpackPlugin({
          cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'] //不删除dll目录
        }),
        new webpack.DllReferencePlugin({
          manifest: require(path.resolve(__dirname, 'dist', 'dll', 'manifest.json'))
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new CopyWebpackPlugin([
            {
                from: 'public/js/*.js',
                to: path.resolve(__dirname, 'dist', 'js'),
                flatten: true,
            }
        ], {
            ignore: ['other.js']
        }),
        new webpack.ProvidePlugin({
            _map: ['lodash', 'map'],
            Vue: ['vue/dist/vue.esm.js', 'default'],
            $: 'jquery',
            React: 'react'
        }),
        new HardSourceWebpackPlugin(),
    ]
}