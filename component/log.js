const contrib = require('blessed-contrib')
const Tail = require('nodejs-tail');

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

        tail.on('line', (line) => {
            if (!~line.indexOf(process.env.partKeyAddress)) return;
            component.log(JSON.parse(line));
            render();
        })

        tail.watch();
    }
]