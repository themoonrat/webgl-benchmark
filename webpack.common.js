const path = require('path');

module.exports = {
    entry: {
        app: './src/js/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]|[\\/]vendor[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
}
