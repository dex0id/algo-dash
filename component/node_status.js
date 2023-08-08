const blessed   = require('blessed');
const { clearInterval } = require('timers');
const dataModel = require('../data/model');

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
        setInterval(async() => {
            const {
                genesis_id,
                genesis_hash,
                time_since_last_block,
                current_round,
            } = dataModel.get('node');

            component.setContent([
                `Current Block: ${current_round}`,
                `Time Since Last Block: ${ time_since_last_block / 1000 }s`,
                `Genesis ID: ${genesis_id}`,
                `Genesis Hash: ${genesis_hash}`,
            ].join("\n"));

            layout.debounceRender();
        }, 1000)

    }
]