module.exports = {
    context: __dirname,
    entry: './css/main.scss',
    output: {
        path: __dirname,
        filename: './css/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './public/css/main.css',
                        },
                    },
                    { loader: 'extract-loader',
                        options: {
                            url: false,
                        }
                    },
                    { loader: 'css-loader',
                        options: {
                            url: false,
                        }
                    },
                    { loader: 'sass-loader'
                    },
                ]
            }
        ]
    }
};