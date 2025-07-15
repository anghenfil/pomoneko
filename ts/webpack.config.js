const path = require('path');

module.exports = {
    entry: './Start.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    mode: 'development',
    devtool: 'source-map',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    optimization: {
        minimize: false,
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../assets/js'),
    },
};