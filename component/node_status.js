const blessed   = require('blessed')
const util      = require('util');
const exec      = util.promisify(require('node:child_process').exec)

module.exports = [
    blessed.box,
    {
        label: "Node Status",
        left: 1,
        right: 1,
        height: 10,
        align: 'left',
    },
    (component, render) => setInterval(async() => {
        const { stdout } = await exec('goal node status');
        component.setContent(stdout)
        render();
    }, 1000)
]