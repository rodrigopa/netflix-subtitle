module.exports = {
    entry: './src/App.js',
    output: {
        path: __dirname + '/assets/js',
        filename: 'popup.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    }
}