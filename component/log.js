const contrib = require('blessed-contrib')
const Tail = require('nodejs-tail');
const dataModel = require('../data/model')

const log = [];
module.exports = [
    contrib.log,
    {
        fg: "green",
        label: 'Server Log',
        // height: "20%",
        tags: true,
        scrollable: true,
        border: {
            type: "line",
            fg: "cyan"
        },
        style: {
            scrollbar: {
              bg: 'red',
              fg: 'blue'
            }
        }
    },
    (component, layout) => {
        component.on('click', () => component.focus());

        const partKeyAddresses = dataModel.get('participation').map(x=>x.address);
        const tail = new Tail(`${process.env.DATA_DIR}/node.log`);

        component.setItems(log);
        component.scrollTo(log.length);

        tail.on('line', (line) => {
            if (partKeyAddresses.some((addr) => !~line.indexOf(addr))) return;
            const parsed = JSON.parse(line);
            const formatted = Object.keys(parsed).map((key) => {
                const ln = typeof parsed[key] === 'string' ? `${key}: ${parsed[key]}` : `${key}: ${JSON.stringify(parsed[key])}`
                log.push(ln)
                log.push(' ');
                component.log(ln);
            });

            layout.debounceRender();
        })

        tail.watch();
    }
]