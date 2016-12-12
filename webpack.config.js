module.exports = {
    entry: './src/index.js',
    output: { filename: './dist/index.js' },
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
