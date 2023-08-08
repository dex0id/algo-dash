const blessed = require('blessed')
const Tail = require('nodejs-tail');

const log = [];
module.exports = [
    blessed.box,
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
        const tail = new Tail(`${process.env.DATA_DIR}/node.log`);

        // component.logLines = [].concat(log);
        // if (component.logLines.length>component.options.bufferLength) {
        //     component.logLines.shift();
        // }
        component.setContent(log.join("\n"));
        // component.scrollTo(component.logLines.length);

        tail.on('line', (line) => {
            if (!~line.indexOf(process.env.PART_KEY_ADDRESS)) return;
            const parsed = JSON.parse(line);
            const formatted = Object.keys(parsed).map((key) => {
                const ln = typeof parsed[key] === 'string' ? `${key}: ${parsed[key]}` : `${key}: ${JSON.stringify(parsed[key])}`
                log.push(ln)
            });
            log.push(' ');

            component.setContent(log.join("\n"));
            layout.debounceRender();
        })

        tail.watch();
    }
]