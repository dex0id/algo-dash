const { exec } = require('node:child_process')
const blessed = require('blessed')

module.exports = [
    blessed.box,
    {
        label: "Node Wallets",
        left: 1,
        right: 1,
        height: 10,
        align: 'left',
    },
    (component) => exec('goal wallet list', (err, output) => component.setContent(err || output))
]

