const blessed = require('blessed')
const dataModel = require('../data/model')

module.exports = [
    blessed.box,
    {
        tags: true,
        style: {
            fg: "green",
        }
    },
    async (component, layout) => {
        const { process_id, version } = dataModel.get('node');
        component.setContent([
            'Algorand Node Dashboad: v0.0.1',
            `Process ID: ${process_id}`,
            ' ',
            ' ',
        ].join("\n"));
        layout.debounceRender();
    }
]