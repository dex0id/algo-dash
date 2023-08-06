const contrib   = require('blessed-contrib')


module.exports = [
    contrib.picture,
    {
        file: './component/logo/logo.png',
        type: 'overlay',
        cols: 18
    },
    (component) => true
]