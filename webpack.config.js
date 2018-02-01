const path = require('path');

const PATHS = {
    source: path.join(__dirname, 'src'),
    build:path.join(__dirname, 'build'),
};
module.exports = {
    entry: {
        pg_index:'./src/pages/index/pg_index.js',
    },
    output: {        
        path: PATHS.build + '/components',
        filename: '[name]/[name].bundle.js'
    }
};
