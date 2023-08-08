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
    (component, { render }) => {
        const filename = '/home/ubuntu/node/data/node.log';
        const tail = new Tail(filename);

        component.setContent(log.join("/n"));

        tail.on('line', (line) => {
            if (!~line.indexOf(process.env.PART_KEY_ADDRESS)) return;
            const parsed = JSON.parse(line);
            log.push(parsed)
            component.log(parsed);
            render();
        })

        tail.watch();
    }
]