const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotEnv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    resolve: {
        extensions: ['.js'],
        // alias: {
        //     '@components': path.resolve(__dirname, 'src/components/'),
        //     // '@cy': path.resolve(__dirname, 'src/utils_cy/'),
        //     '@styles': path.resolve(__dirname, 'src/styles/'),
        //     '@libs': path.resolve(__dirname, 'src/libs/'),
        // }
    },
    mode: 'development',
    devtool: 'source-map',
    watch: true,
    module: {
        rules: 
            [
                {
                    test: /\.js?$/,
                    exclude: /node_modules/,
                    use: {
                            loader: 'babel-loader'
                        }
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        'css-loader'
                    ]
                },
            ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin(),
        new DotEnv(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "styles/cy-style.json"),
                    to: "cy-style.json"
                },
                {
                    from: path.resolve(__dirname, "public", "inputs/"),
                    to: "./inputs/"
                },
                {
                    from: path.resolve(__dirname, "src", "libs/"),
                    to: "./libs/"
                }
            ]
        })
    ],
    // devServer: {
    //     contentBase: path.join(__dirname, 'dist'),
    //     compress: true,
    //     port: 4200
    // }
};
