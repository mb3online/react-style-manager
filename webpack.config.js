module.exports = {
    entry: './src/index.js',
    output: { filename: './dist/index.js', 'libraryTarget': 'var' },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel',
                include: __dirname,
            },
        ],
    },
};
