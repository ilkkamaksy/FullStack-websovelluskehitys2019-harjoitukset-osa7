module.exports = {
    context: __dirname,
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: __dirname,
        filename: './public/js/app.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
};