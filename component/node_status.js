const blessed   = require('blessed');
const { clearInterval } = require('timers');
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
    (component, layout) => {
        const timeout = setInterval(async() => {
            const content = [];
            try {
                const { stdout } = await exec('goal node status');
                stdout.split("\n").forEach((line) => {
                    if (~line.indexOf('Last committed block:')) content.push(line);
                    else if (~line.indexOf('Time since last block:')) content.push(line);
                    else if (~line.indexOf('Genesis ID:')) content.push(line);
                    else if (~line.indexOf('Genesis hash:')) content.push(line);
                });

                // component.setContent(stdout)
                // content.push(e.toString())
            } catch(e) {
                clearInterval(timeout);
                content.push(e.toString())
            }

            component.setContent(content.join("\n"));
            layout.debounceRender();
        }, 1000)

    }
]