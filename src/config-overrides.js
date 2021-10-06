const {override, fixBabelImports} = require('customize-cra');
//Implement on demand packaging
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
            libraryDirectory:'es',
            style:'css',
        }),
    );