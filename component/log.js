const contrib = require('blessed-contrib')
const Tail = require('nodejs-tail');

const log = [];
module.exports = [
    contrib.log,
    {
        fg: "green",
        label: 'Server Log',
        height: "20%",
        tags: true,
        border: {
            type: "line",
            fg: "cyan"
        }
    },
    (component, layout) => {
        const filename = '/home/ubuntu/node/data/node.log';
        const tail = new Tail(filename);

        component.logLines = [].concat(log);
        if (component.logLines.length>component.options.bufferLength) {
            component.logLines.shift();
        }
        component.setItems(component.logLines);
        component.scrollTo(component.logLines.length);

        tail.on('line', (line) => {
            if (!~line.indexOf(process.env.PART_KEY_ADDRESS)) return;
            log.push(line)
            component.log(line);
            layout.debounceRender();
        })

        tail.watch();
    }
]