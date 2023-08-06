const blessed = require('blessed')
const util      = require('util');
const exec      = util.promisify(require('node:child_process').exec)

module.exports = [
    blessed.box,
    {
        label: "Node Wallets",
        left: 1,
        right: 1,
        height: 10,
        align: 'left',
    },
    async (component, render) => {
        const { stdout } = await exec('goal wallet list');
        component.setContent(stdout)
        render();
    }
]

